import { createMemo, splitProps } from "solid-js"

import { HtmlAtrribute } from "../../../../types/htmlAttributes"
import { cn } from "../../../../utils/class"
import tableCol from "../const/col"
import { FUITableCol, FUITableHeader } from "../types/table"

export interface FUITableTdProps<T extends object> extends
    HtmlAtrribute<"td">, FUITableCol<T> {
    header: FUITableHeader<T>
    item: T
    index: number
}

export default function FUITableTd<T extends object>(props: FUITableTdProps<T>) {

    const [pickProps, tdProps] = splitProps(props, ["key", "size", "sticky", "render", "header", "item", "index"])

    const size = createMemo(() => tableCol.sizes[pickProps.size || "md"])
    const sticky = createMemo(() => pickProps.sticky && tableCol.stikis[pickProps.sticky])
    const content = createMemo(() => {
        if (pickProps.render) return pickProps.render(pickProps.item, pickProps.index, pickProps.header)
        else if (typeof pickProps.header.key === "string") return pickProps.item[pickProps.header.key]?.toString()
    })

    return (
        <td
            {...tdProps}
            class={cn(
                "whitespace-no-wrap leading-5 text-gray-800",
                size(),
                sticky(),
                tdProps.class,
            )}
        >{content()}</td>
    )
}
