import { For, JSXElement, splitProps } from "solid-js"

import { HtmlAtrribute } from "../../../types/htmlAttributes"
import { FUITableHeaderCol } from "../types/table"

export interface FUITableTrData<T extends object, SortKey extends string = string> {
    headers: Array<FUITableHeaderCol<T, SortKey>>
}
export const tableTrKeys = ["headers"] as const

export interface FUITableTrProps<T extends object, SortKey extends string = string> extends
    Omit<HtmlAtrribute<"tr">, "children">, FUITableTrData<T, SortKey> {
    children: (header: FUITableHeaderCol<T, SortKey>, index: number) => JSXElement
}

export default function FUITableTr<T extends object, SortKey extends string = string>(props: FUITableTrProps<T, SortKey>) {
    const [pickProps, trProps] = splitProps(props, ["children", ...tableTrKeys])
    return (
        <tr {...trProps}>
            <For each={pickProps.headers}>
                {(header, index) => pickProps.children(header, index())}
            </For>
        </tr>
    )
}
