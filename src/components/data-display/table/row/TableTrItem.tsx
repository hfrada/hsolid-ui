import { For, JSXElement, splitProps } from "solid-js"

import { HtmlAtrribute } from "../../../../types/htmlAttributes"
import { FUITableHeaderCol } from "../types/table"
import FUITableTr, { FUITableTrData, tableTrKeys } from "./TableTr"

export interface FUITableTrItemData<T extends object, SortKey extends string = string> extends FUITableTrData<T, SortKey> {
    items: Array<T>
}
export const tableTrItemKeys = ["items", ...tableTrKeys] as const

export interface FUITableTrItemMeta<T extends object, SortKey extends string = string> {
    header: FUITableHeaderCol<T, SortKey>
    headerIndex: number
    index: number
}
export interface FUITableTrItemProps<T extends object, SortKey extends string = string> extends
    Omit<HtmlAtrribute<"tr">, "children">, FUITableTrItemData<T, SortKey> {
    children: (item: T, meta: FUITableTrItemMeta<T, SortKey>) => JSXElement
}

export default function FUITableTrItem<T extends object, SortKey extends string = string>(props: FUITableTrItemProps<T, SortKey>) {
    const [reProps, tabtrProps] = splitProps(props, ["children", ...tableTrItemKeys])
    const [trProps, pickProps] = splitProps(reProps, tableTrKeys)
    return (
        <For each={pickProps.items}>
            {(item, index) => (
                <FUITableTr
                    {...tabtrProps} {...trProps}
                    children={(header, headerIndex) => (
                        pickProps.children(item, {
                            header,
                            headerIndex,
                            index: index()
                        })
                    )}
                />
            )}
        </For>
    )
}
