import { JSX } from "solid-js"

export interface HtmlAtrrs {
    button: JSX.ButtonHTMLAttributes<HTMLButtonElement>
    canvas: JSX.CanvasHTMLAttributes<HTMLCanvasElement>
    div: JSX.HTMLAttributes<HTMLDivElement>
    dlist: JSX.HTMLAttributes<HTMLDListElement>
    image: JSX.ImgHTMLAttributes<HTMLImageElement>
    input: JSX.InputHTMLAttributes<HTMLInputElement>
    label: JSX.LabelHTMLAttributes<HTMLLabelElement>
    paragraph: JSX.HTMLAttributes<HTMLParagraphElement>
    span: JSX.HTMLAttributes<HTMLSpanElement>
    textArea: JSX.TextareaHTMLAttributes<HTMLTextAreaElement>
    table: JSX.HTMLAttributes<HTMLTableElement>
    tbody: JSX.HTMLAttributes<HTMLTableSectionElement>
    td: JSX.TdHTMLAttributes<HTMLTableCellElement>
    th: JSX.ThHTMLAttributes<HTMLTableCellElement>
    thead: JSX.HTMLAttributes<HTMLTableSectionElement>
    tr: JSX.HTMLAttributes<HTMLTableRowElement>
}
export type HtmlAtrribute<K extends keyof HtmlAtrrs> = HtmlAtrrs[K]

export type FUI_HtmlElKey = keyof HTMLElementTagNameMap
export type FUI_HtmlElAttr<K extends FUI_HtmlElKey> = JSX.HTMLAttributes<HTMLElementTagNameMap[K]>
export type FUI_HtmlElement<T extends { as: FUI_HtmlElKey }> = HTMLElementTagNameMap[T["as"]]
export type FUI_WithHtmlElement<T extends { as: FUI_HtmlElKey }> = T & JSX.HTMLElementTags[T["as"]]
