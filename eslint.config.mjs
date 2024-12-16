import typescriptEslint from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import sortImportsEs6Autofix from "eslint-plugin-sort-imports-es6-autofix";
import _import from "eslint-plugin-import";
import { fixupPluginRules } from "@eslint/compat";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["**/node_modules", "**/artifacts", "**/cache", "**/coverage"],
}, ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
), {
    plugins: {
        "@typescript-eslint": typescriptEslint,
        prettier,
        "sort-imports-es6-autofix": sortImportsEs6Autofix,
        import: fixupPluginRules(_import),
    },

    languageOptions: {
        globals: {
            ...globals.node,
        },

        parser: tsParser,
        ecmaVersion: 12,
        sourceType: "module",

        parserOptions: {
            project: "./tsconfig.json",
        },
    },

    rules: {
        "import/newline-after-import": ["error"],
        "@typescript-eslint/no-floating-promises": "error",
        "require-await": "error",

        "prettier/prettier": ["error", {
            trailingComma: "es5",
            tabWidth: 2,
            semi: false,
            singleQuote: true,
            endOfLine: "auto",
        }],

        "sort-imports-es6-autofix/sort-imports-es6": [2, {
            ignoreCase: false,
            ignoreMemberSort: false,
            memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        }],

        "import/prefer-default-export": "error",
    },
}];