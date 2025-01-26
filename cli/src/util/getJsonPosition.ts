import type {
  ArrayNode,
  LiteralNode,
  ObjectNode,
  PropertyNode,
} from 'json-to-ast'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import jsonAst from 'json-to-ast'

type ValueNode = ObjectNode | ArrayNode | LiteralNode | PropertyNode

export async function getLine(filePath: string, ...path: string[]): Promise<number> {
  const AST = jsonAst(
    await readFile(resolve(filePath), 'utf-8'),
    {
      source: filePath,
    },
  ) as ObjectNode

  let currentNode: ValueNode | undefined = AST.children.find(
    x => x.key.value === path[0],
  )
  let isRoot = true

  for (const value of path) {
    if (isRoot) {
      isRoot = false
      continue
    }

    if (!currentNode)
      return 0
    else currentNode = findNodeLine(currentNode, value) as PropertyNode
  }

  return currentNode?.loc?.start.line ?? 0
}

function findNodeLine(
  node: ValueNode,
  value: string | number,
): ValueNode | undefined {
  switch (node.type) {
    case 'Property':
      return findNodeLine(node.value, value)
    case 'Array':
      if (Number.isInteger(value))
        return node.children[value as number]
      else return node.children.find(x => findNodeLine(x, value))
    case 'Object':
      return node.children.find(x => x.key.value === value)
    case 'Literal':
      return node
  }
}
