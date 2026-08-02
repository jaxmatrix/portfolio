/* tslint:disable */
/* eslint-disable */

/**
 * Converts Markdown using the bare CommonMark rules, with no plugins registered.
 *
 * Exposed so a caller can show what the plugin layer is actually contributing.
 *
 * # Errors
 * Returns a `JsValue` error if Markdown parsing fails.
 */
export function convert_markdown_core_only(markdown: string): string;

/**
 * Converts Markdown syntax string into continuous, natural speech text for TTS synthesis.
 *
 * # Errors
 * Returns a `JsValue` error if Markdown parsing fails.
 */
export function convert_markdown_to_voiceover(markdown: string): string;

/**
 * Returns the JSON representation of the parsed Markdown Voice AST.
 *
 * # Errors
 * Returns a `JsValue` error if parsing or JSON serialization fails.
 */
export function parse_markdown_ast_json(markdown: string): string;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly convert_markdown_core_only: (a: number, b: number) => [number, number, number, number];
    readonly convert_markdown_to_voiceover: (a: number, b: number) => [number, number, number, number];
    readonly parse_markdown_ast_json: (a: number, b: number) => [number, number, number, number];
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __externref_table_dealloc: (a: number) => void;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
