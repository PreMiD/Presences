declare module "lint-staged" {
  export interface LintStagedOptions {
    config: Record<string, ((files: string[]) => string) | string>;
    relative: boolean;
    shell: boolean;
    quiet: boolean;
    debug: boolean;
  }

  export default function lintStaged(
    options?: Partial<LintStagedOptions>
  ): Promise<boolean>;
}
