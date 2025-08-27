import { JSXElement, Show, splitProps } from "solid-js"

import { HtmlAtrribute } from "../../../types/htmlAttributes"
import { cn } from "../../../utils/class"
import FUITableCol from "../col/TableCol"
import { FUITableHeaderCol } from "../types/table"
import FUITableTrItem, { FUITableTrItemData, FUITableTrItemMeta, tableTrItemKeys } from "./TableTrItem"

export interface FUITableTbodyData<T extends object, SortKey extends string = string> extends FUITableTrItemData<T, SortKey> {
    renderTbody?(headers: Array<FUITableHeaderCol<T, SortKey>>): JSXElement
    renderTd?(item: T, meta: FUITableTrItemMeta<T, SortKey>): JSXElement
}
export const tableTbodyKeys = ["renderTbody", "renderTd", ...tableTrItemKeys] as const

export interface FUITableTbodyProps<T extends object, SortKey extends string = string> extends
    HtmlAtrribute<"tbody">, FUITableTbodyData<T, SortKey> { }

export default function FUITableTbody<T extends object, SortKey extends string = string>(props: FUITableTbodyProps<T, SortKey>) {

    const [pickProps, tbodyProps] = splitProps(props, tableTbodyKeys)

    return (
        <tbody
            {...tbodyProps}
            class={cn(
                "child:border-b child:border-main last:border-0",
                tbodyProps.class,
            )}
        >
            <Show when={!pickProps.renderTbody} fallback={pickProps.renderTbody!(pickProps.headers)}>
                <FUITableTrItem class="!relative" items={pickProps.items} headers={pickProps.headers}>
                    {(item, meta) => <Show when={!pickProps.renderTd} fallback={pickProps.renderTd!(item, meta)}>
                        <FUITableCol.Td
                            header={meta.header.header}
                            index={meta.index}
                            item={item}
                            {...meta.header.col}
                        />
                    </Show>}
                </FUITableTrItem>
            </Show>
        </tbody>
    )
}
