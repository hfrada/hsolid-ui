import { createMemo, JSXElement, Show, splitProps } from "solid-js"

import { HtmlAtrribute } from "../../../types/htmlAttributes"
import { cn } from "../../../utils/class"
import FUITableCol from "../col/TableCol"
import { FUITableThData, tableThKeys } from "../col/TableTh"
import { FUITableHeader } from "../types/table"
import FUITableTr, { FUITableTrData, tableTrKeys } from "./TableTr"

export interface FUITableTheadData<T extends object, SortKey extends string = string> extends FUITableTrData<T, SortKey>, FUITableThData<SortKey> {
    theadSticky?: boolean
    renderThead?(headers: Array<FUITableHeader<T, SortKey>>): JSXElement
    renderTh?(header: FUITableHeader<T, SortKey>, index: number): JSXElement
}
export const tableTheadKeys = ["theadSticky", "renderThead", "renderTh", ...tableTrKeys, ...tableThKeys] as const

export interface FUITableTheadProps<T extends object, SortKey extends string = string> extends
    HtmlAtrribute<"thead">, FUITableTheadData<T, SortKey> { }

export default function FUITableThead<T extends object, SortKey extends string = string>(props: FUITableTheadProps<T, SortKey>) {

    const [pickProps, theadProps] = splitProps(props, tableTheadKeys)
    const headers = createMemo(() => pickProps.headers.map((h) => h.header))

    return (
        <thead
            {...theadProps}
            class={cn(
                "bg-neutral-100 rounded-md",
                props.theadSticky && "sticky top-0 z-[2]",
                theadProps.class,
            )}
        >
            <Show when={!pickProps.renderThead} fallback={pickProps.renderThead!(headers())}>
                <FUITableTr headers={props.headers}>
                    {(header, index) => <Show when={!pickProps.renderTh} fallback={pickProps.renderTh!(header.header, index)}>
                        <FUITableCol.Th
                            {...header.header}
                            sortValue={pickProps.sortValue}
                            onSort={pickProps.onSort}
                        />
                    </Show>}
                </FUITableTr>
            </Show>
        </thead>
    )
}
