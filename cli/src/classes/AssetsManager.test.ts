import type { CdnAsset } from './AssetsManager.js'
import { Buffer } from 'node:buffer'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AssetsManager, AssetType, MimeType } from './AssetsManager.js'

const mocks = vi.hoisted(() => ({
  globby: vi.fn(),
  readFile: vi.fn(),
  ky: Object.assign(
    vi.fn(),
    {
      get: vi.fn(),
      head: vi.fn(),
      delete: vi.fn().mockImplementation(() => Promise.resolve()),
    },
  ),
  sharp: vi.fn(),
  formData: vi.fn().mockImplementation(() => {
    const appendSpy = vi.fn()
    return {
      append: appendSpy,
      getHeaders: vi.fn().mockReturnValue({ 'content-type': 'multipart/form-data' }),
      getBuffer: vi.fn().mockReturnValue(Buffer.from('mock-buffer')),
      //* Track the last appended values for assertions
      _lastAppended: () => appendSpy.mock.calls[appendSpy.mock.calls.length - 1],
    }
  }),
}))

//* Mock external dependencies
vi.mock('ky', () => ({
  default: mocks.ky,
}))

vi.mock('sharp', () => ({
  default: mocks.sharp,
}))

vi.mock('globby', () => ({
  globby: mocks.globby,
}))

vi.mock('node:fs/promises', () => ({
  readFile: mocks.readFile,
}))

vi.mock('form-data', () => {
  return {
    __esModule: true,
    default: mocks.formData,
  }
})

const mockActivity = {
  service: 'TestService',
  apiVersion: 1,
  version: '1.0.0',
  logo: 'https://example.com/logo.png',
  thumbnail: 'https://example.com/thumbnail.png',
  description: {
    en: 'Test description',
  },
}

describe('assetsManager', () => {
  let assetsManager: AssetsManager

  beforeEach(() => {
    vi.clearAllMocks()
    assetsManager = new AssetsManager('/test/path', mockActivity, true)
  })

  describe('baseUrl', () => {
    it('should generate correct base URL with API version', () => {
      const expectedUrl = 'https://cdn.rcd.gg/PreMiD/websites/T/TestService/v1/assets'
      expect(assetsManager.baseUrl).toBe(expectedUrl)
    })

    it('should generate correct base URL without API version', () => {
      assetsManager = new AssetsManager('/test/path', mockActivity, false)
      const expectedUrl = 'https://cdn.rcd.gg/PreMiD/websites/T/TestService/assets'
      expect(assetsManager.baseUrl).toBe(expectedUrl)
    })
  })

  describe('validateImage', () => {
    it('should validate correct 512x512 image', async () => {
      const mockAsset = {
        type: AssetType.Logo,
        url: 'https://example.com/valid.png',
        location: { filePath: 'test.json', line: 1, column: 1 },
      }

      //* Mock image validation responses
      mocks.ky.get.mockReturnValue({
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      } as any)

      mocks.sharp.mockReturnValue({
        metadata: () => Promise.resolve({
          width: 512,
          height: 512,
          format: 'png',
        }),
      } as any)

      const result = await assetsManager.validateImage({ asset: mockAsset, kill: false })
      expect(result).toBe(true)
    })

    it('should reject image with wrong dimensions', async () => {
      const mockAsset = {
        type: AssetType.Logo,
        url: 'https://example.com/invalid.png',
        location: { filePath: 'test.json', line: 1, column: 1 },
      }

      mocks.ky.get.mockReturnValue({
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      } as any)

      mocks.sharp.mockReturnValue({
        metadata: () => Promise.resolve({
          width: 256,
          height: 256,
          format: 'png',
        }),
      } as any)

      mocks.readFile.mockImplementation((filePath) => {
        if (filePath.endsWith('package.json')) {
          return Promise.resolve(JSON.stringify({ version: '1.0.0' }))
        }
        return Promise.resolve('')
      })

      const result = await assetsManager.validateImage({ asset: mockAsset, kill: false })
      expect(result).toBe(false)
    })

    it('should reject image with wrong MIME type', async () => {
      const mockAsset = {
        type: AssetType.Logo,
        url: 'https://example.com/invalid.svg',
        location: { filePath: 'test.json', line: 1, column: 1 },
      }

      mocks.ky.get.mockReturnValue({
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      } as any)

      mocks.sharp.mockReturnValue({
        metadata: () => Promise.resolve({
          width: 512,
          height: 512,
          format: 'svg',
        }),
      } as any)

      const result = await assetsManager.validateImage({ asset: mockAsset, kill: false })
      expect(result).toBe(false)
    })
  })

  describe('getAssets', () => {
    beforeEach(() => {
      mocks.globby.mockReset()
      mocks.readFile.mockReset()
    })

    it('should return logo and thumbnail assets', async () => {
      mocks.globby.mockResolvedValue([])
      mocks.readFile.mockImplementation((filePath) => {
        if (filePath.endsWith('metadata.json')) {
          return Promise.resolve(JSON.stringify(mockActivity))
        }
        return Promise.resolve('')
      })

      const assets = await assetsManager.getAssets()

      expect(assets).toHaveLength(2)
      expect(assets[0]).toEqual(expect.objectContaining({
        type: AssetType.Logo,
        url: mockActivity.logo,
      }))
      expect(assets[1]).toEqual(expect.objectContaining({
        type: AssetType.Thumbnail,
        url: mockActivity.thumbnail,
      }))
    })

    it('should find image URLs in TypeScript files', async () => {
      mocks.globby.mockResolvedValue(['test.ts'])
      mocks.readFile.mockImplementation((filePath) => {
        if (filePath === 'test.ts') {
          return Promise.resolve(`
            const img = "https://example.com/image.png"
            const img2 = 'https://example.com/image2.jpg'
          `)
        }
        if (filePath.endsWith('metadata.json')) {
          return Promise.resolve(JSON.stringify(mockActivity))
        }
        return Promise.resolve('')
      })

      const assets = await assetsManager.getAssets()
      expect(assets).toHaveLength(4) //* Logo, thumbnail, and 2 activity assets
      expect(assets[2]).toEqual(expect.objectContaining({
        type: AssetType.ActivityAsset,
        url: 'https://example.com/image.png',
      }))
      expect(assets[3]).toEqual(expect.objectContaining({
        type: AssetType.ActivityAsset,
        url: 'https://example.com/image2.jpg',
      }))
    })

    it('should return both static and activity assets', async () => {
      mocks.globby.mockResolvedValue(['test.ts'])
      mocks.readFile.mockImplementation((filePath) => {
        if (filePath === 'test.ts') {
          return Promise.resolve(`
            const img = "https://example.com/image.png"
            const img2 = 'https://example.com/image2.jpg'
          `)
        }
        if (filePath.endsWith('metadata.json')) {
          return Promise.resolve(JSON.stringify(mockActivity))
        }
        return Promise.resolve('')
      })

      const assets = await assetsManager.getAssets()
      expect(assets).toHaveLength(4) //* Logo, thumbnail, and 2 activity assets
      expect(assets[0]).toEqual(expect.objectContaining({
        type: AssetType.Logo,
        url: mockActivity.logo,
      }))
      expect(assets[1]).toEqual(expect.objectContaining({
        type: AssetType.Thumbnail,
        url: mockActivity.thumbnail,
      }))
      expect(assets[2]).toEqual(expect.objectContaining({
        type: AssetType.ActivityAsset,
        url: 'https://example.com/image.png',
      }))
      expect(assets[3]).toEqual(expect.objectContaining({
        type: AssetType.ActivityAsset,
        url: 'https://example.com/image2.jpg',
      }))
    })
  })

  describe('getCdnAssets', () => {
    beforeEach(() => {
      vi.clearAllMocks()
    })

    it('should return empty array when no assets exist on CDN', async () => {
      //* Mock head requests to return 404
      mocks.ky.head.mockRejectedValue(new Error('Not found'))

      const assets = await assetsManager.getCdnAssets()
      expect(assets).toHaveLength(0)
    })

    it('should return logo and thumbnail when they exist', async () => {
      //* Mock successful head requests for logo and thumbnail
      mocks.ky.head.mockImplementation((url) => {
        const urlStr = url.toString()
        if (urlStr.includes('logo.png') || urlStr.includes('thumbnail.png')) {
          return Promise.resolve({ ok: true })
        }
        return Promise.reject(new Error('Not found'))
      })

      const assets = await assetsManager.getCdnAssets()
      expect(assets).toHaveLength(2)
      expect(assets[0]).toEqual({
        type: AssetType.Logo,
        url: `${assetsManager.baseUrl}/logo.png`,
        mimeType: MimeType.PNG,
      })
      expect(assets[1]).toEqual({
        type: AssetType.Thumbnail,
        url: `${assetsManager.baseUrl}/thumbnail.png`,
        mimeType: MimeType.PNG,
      })
    })

    it('should return activity assets with sequential indices', async () => {
      //* Mock head requests to return success for first 3 activity assets and fail for the 4th
      mocks.ky.head.mockImplementation((url) => {
        const urlStr = url.toString()
        if (urlStr.includes('0.png') || urlStr.includes('1.jpg') || urlStr.includes('2.gif')) {
          return Promise.resolve({ ok: true })
        }
        return Promise.reject(new Error('Not found'))
      })

      const assets = await assetsManager.getCdnAssets()
      expect(assets).toHaveLength(3)
      expect(assets).toEqual([
        {
          type: AssetType.ActivityAsset,
          url: `${assetsManager.baseUrl}/0.png`,
          mimeType: MimeType.PNG,
          index: 0,
        },
        {
          type: AssetType.ActivityAsset,
          url: `${assetsManager.baseUrl}/1.jpg`,
          mimeType: MimeType.JPG,
          index: 1,
        },
        {
          type: AssetType.ActivityAsset,
          url: `${assetsManager.baseUrl}/2.gif`,
          mimeType: MimeType.GIF,
          index: 2,
        },
      ])
    })

    it('should return both static and activity assets', async () => {
      //* Mock head requests to return success for first 3 activity assets and fail for the 4th
      mocks.ky.head.mockImplementation((url) => {
        const urlStr = url.toString()
        if (
          urlStr.includes('0.png')
          || urlStr.includes('1.jpg')
          || urlStr.includes('2.gif')
          || urlStr.includes('logo.webp')
          || urlStr.includes('thumbnail.jpeg')
        ) {
          return Promise.resolve({ ok: true })
        }
        return Promise.reject(new Error('Not found'))
      })

      const assets = await assetsManager.getCdnAssets()
      expect(assets).toHaveLength(5)
      expect(assets).toEqual([
        {
          type: AssetType.Logo,
          url: `${assetsManager.baseUrl}/logo.webp`,
          mimeType: MimeType.WEBP,
        },
        {
          type: AssetType.Thumbnail,
          url: `${assetsManager.baseUrl}/thumbnail.jpeg`,
          mimeType: MimeType.JPEG,
        },
        {
          type: AssetType.ActivityAsset,
          url: `${assetsManager.baseUrl}/0.png`,
          mimeType: MimeType.PNG,
          index: 0,
        },
        {
          type: AssetType.ActivityAsset,
          url: `${assetsManager.baseUrl}/1.jpg`,
          mimeType: MimeType.JPG,
          index: 1,
        },
        {
          type: AssetType.ActivityAsset,
          url: `${assetsManager.baseUrl}/2.gif`,
          mimeType: MimeType.GIF,
          index: 2,
        },
      ])
    })
  })

  describe('updateCdnAssets', () => {
    beforeEach(() => {
      vi.clearAllMocks()
      process.env.CDN_TOKEN = 'test-token'

      //* Mock ky direct calls for file uploads
      mocks.ky.mockImplementation((url, options) => {
        if (options?.method === 'POST' || options?.method === 'PUT') {
          return Promise.resolve()
        }
        return Promise.reject(new Error('Unexpected ky call'))
      })

      //* Ensure all ky methods return promises
      mocks.ky.delete.mockImplementation(() => Promise.resolve())
      mocks.ky.head.mockImplementation(() => Promise.resolve({ ok: true }))
      mocks.ky.get.mockImplementation(() => ({
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      }))
    })

    it('should handle new logo and thumbnail upload', async () => {
      const mockAssets = [
        {
          type: AssetType.Logo,
          url: 'https://example.com/new-logo.png',
          location: { filePath: 'test.json', line: 1, column: 1 },
        },
        {
          type: AssetType.Thumbnail,
          url: 'https://example.com/new-thumbnail.jpg',
          location: { filePath: 'test.json', line: 2, column: 1 },
        },
      ]

      //* Mock getAssets to return our test assets
      vi.spyOn(assetsManager, 'getAssets').mockResolvedValue(mockAssets)
      //* Mock getCdnAssets to return empty array (no existing assets)
      vi.spyOn(assetsManager, 'getCdnAssets').mockResolvedValue([])

      //* Mock successful image downloads
      mocks.ky.get.mockReturnValue({
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      } as any)

      await assetsManager.updateCdnAssets()

      //* Verify upload calls were made for both assets
      expect(mocks.ky).toHaveBeenCalledWith(
        `${assetsManager.baseUrl}/logo.png`,
        expect.objectContaining({ method: 'POST' }),
      )
      expect(mocks.ky).toHaveBeenCalledWith(
        `${assetsManager.baseUrl}/thumbnail.jpg`,
        expect.objectContaining({ method: 'POST' }),
      )

      //* Verify FormData was used correctly
      expect(mocks.formData).toHaveBeenCalledTimes(2)
      const formInstances = mocks.formData.mock.results
      expect(formInstances[0].value._lastAppended()).toEqual([
        'file',
        expect.any(Blob),
        { contentType: MimeType.PNG },
      ])
      expect(formInstances[1].value._lastAppended()).toEqual([
        'file',
        expect.any(Blob),
        { contentType: MimeType.JPG },
      ])
    })

    it('should handle updating existing assets with different extensions', async () => {
      const mockAssets = [
        {
          type: AssetType.Logo,
          url: 'https://example.com/logo.jpg',
          location: { filePath: 'test.json', line: 1, column: 1 },
        },
      ]

      const mockCdnAssets: CdnAsset[] = [{
        type: AssetType.Logo as const,
        url: `${assetsManager.baseUrl}/logo.png`,
        mimeType: MimeType.PNG,
      }]

      vi.spyOn(assetsManager, 'getAssets').mockResolvedValue(mockAssets)
      vi.spyOn(assetsManager, 'getCdnAssets').mockResolvedValue(mockCdnAssets)

      mocks.ky.get.mockReturnValue({
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      } as any)

      await assetsManager.updateCdnAssets()

      //* Verify old asset is deleted and new one is uploaded
      expect(mocks.ky.delete).toHaveBeenCalledWith(
        `${assetsManager.baseUrl}/logo.png`,
        expect.any(Object),
      )
      expect(mocks.ky).toHaveBeenCalledWith(
        `${assetsManager.baseUrl}/logo.jpg`,
        expect.objectContaining({ method: 'POST' }),
      )
    })

    it('should handle activity assets with gaps in indices', async () => {
      const mockAssets = [
        {
          type: AssetType.ActivityAsset,
          url: `${assetsManager.baseUrl}/0.png`,
          location: { filePath: '0.png', line: 1, column: 1 },
        },
        {
          type: AssetType.ActivityAsset,
          url: `${assetsManager.baseUrl}/2.png`,
          location: { filePath: '2.png', line: 2, column: 1 },
        },
      ]

      const mockCdnAssets: CdnAsset[] = [
        {
          type: AssetType.ActivityAsset,
          url: `${assetsManager.baseUrl}/0.png`,
          mimeType: MimeType.PNG,
          index: 0,
        },
        {
          type: AssetType.ActivityAsset,
          url: `${assetsManager.baseUrl}/2.png`,
          mimeType: MimeType.PNG,
          index: 2,
        },
      ]

      vi.spyOn(assetsManager, 'getAssets').mockResolvedValue(mockAssets)
      vi.spyOn(assetsManager, 'getCdnAssets').mockResolvedValue(mockCdnAssets)

      mocks.ky.get.mockReturnValue({
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      } as any)

      await assetsManager.updateCdnAssets()

      //* Verify asset at index 2 is moved to index 1
      expect(mocks.ky).toHaveBeenCalledWith(
        `${assetsManager.baseUrl}/1.png`,
        expect.objectContaining({ method: 'POST' }),
      )
      expect(mocks.ky.delete).toHaveBeenCalledWith(
        `${assetsManager.baseUrl}/2.png`,
        expect.any(Object),
      )
    })

    it('should handle deletion of unused assets', async () => {
      const mockAssets = [
        {
          type: AssetType.Logo,
          url: 'https://example.com/logo.png',
          location: { filePath: 'test.json', line: 1, column: 1 },
        },
      ]

      const mockCdnAssets: CdnAsset[] = [
        {
          type: AssetType.Logo as const,
          url: `${assetsManager.baseUrl}/logo.png`,
          mimeType: MimeType.PNG,
        },
        {
          type: AssetType.Thumbnail as const,
          url: `${assetsManager.baseUrl}/thumbnail.png`,
          mimeType: MimeType.PNG,
        },
        {
          type: AssetType.ActivityAsset,
          url: `${assetsManager.baseUrl}/0.png`,
          mimeType: MimeType.PNG,
          index: 0,
        },
      ]

      vi.spyOn(assetsManager, 'getAssets').mockResolvedValue(mockAssets)
      vi.spyOn(assetsManager, 'getCdnAssets').mockResolvedValue(mockCdnAssets)

      mocks.ky.get.mockReturnValue({
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      } as any)

      await assetsManager.updateCdnAssets()

      //* Verify unused assets are deleted
      expect(mocks.ky.delete).toHaveBeenCalledWith(
        `${assetsManager.baseUrl}/thumbnail.png`,
        expect.any(Object),
      )
      expect(mocks.ky.delete).toHaveBeenCalledWith(
        `${assetsManager.baseUrl}/0.png`,
        expect.any(Object),
      )
    })

    it('should handle new activity assets upload', async () => {
      const mockAssets = [
        {
          type: AssetType.ActivityAsset,
          url: 'https://example.com/new-asset.png',
          location: { filePath: 'test.json', line: 1, column: 1 },
        },
      ]

      vi.spyOn(assetsManager, 'getAssets').mockResolvedValue(mockAssets)
      vi.spyOn(assetsManager, 'getCdnAssets').mockResolvedValue([])

      mocks.ky.get.mockReturnValue({
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      } as any)

      await assetsManager.updateCdnAssets()

      //* Verify new activity asset is uploaded with index 0
      expect(mocks.ky).toHaveBeenCalledWith(
        `${assetsManager.baseUrl}/0.png`,
        expect.objectContaining({ method: 'POST' }),
      )
    })

    it('should not perform any uploads when assets have not changed', async () => {
      const mockAssets = [
        {
          type: AssetType.Logo,
          url: `${assetsManager.baseUrl}/logo.png`,
          location: { filePath: 'test.json', line: 1, column: 1 },
        },
        {
          type: AssetType.Thumbnail,
          url: `${assetsManager.baseUrl}/thumbnail.jpg`,
          location: { filePath: 'test.json', line: 2, column: 1 },
        },
        {
          type: AssetType.ActivityAsset,
          url: `${assetsManager.baseUrl}/0.webp`,
          location: { filePath: 'test.ts', line: 1, column: 1 },
        },
      ]

      const mockCdnAssets: CdnAsset[] = [
        {
          type: AssetType.Logo,
          url: `${assetsManager.baseUrl}/logo.png`,
          mimeType: MimeType.PNG,
        },
        {
          type: AssetType.Thumbnail,
          url: `${assetsManager.baseUrl}/thumbnail.jpg`,
          mimeType: MimeType.JPG,
        },
        {
          type: AssetType.ActivityAsset,
          url: `${assetsManager.baseUrl}/0.webp`,
          mimeType: MimeType.WEBP,
          index: 0,
        },
      ]

      vi.spyOn(assetsManager, 'getAssets').mockResolvedValue(mockAssets)
      vi.spyOn(assetsManager, 'getCdnAssets').mockResolvedValue(mockCdnAssets)

      await assetsManager.updateCdnAssets()

      //* Verify no uploads or deletions occurred
      expect(mocks.ky).not.toHaveBeenCalled()
      expect(mocks.ky.delete).not.toHaveBeenCalled()
      expect(mocks.formData).not.toHaveBeenCalled()
    })
  })
})
