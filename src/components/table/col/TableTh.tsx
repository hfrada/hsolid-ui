import { createMemo, splitProps } from "solid-js"

import { HtmlAtrribute } from "../../../types/htmlAttributes"
import { cn } from "../../../utils/class"
import tableCol from "../const/col"
import { FUITableHeader, FUITableSort } from "../types/table"
import FuiThAtom from "./atom/ThAtom"

export interface FUITableThData<SortKey extends string = string> {
    sortValue?: FUITableSort<SortKey>
    onSort?(sort?: FUITableSort<SortKey>): void
}
export const tableThKeys = ["sortValue", "onSort"] as const

export interface FUITableThProps<T extends object, SortKey extends string = string> extends
    HtmlAtrribute<"th">, FUITableHeader<T, SortKey>, FUITableThData<SortKey> { }

export default function FUITableTh<T extends object, SortKey extends string = string>(props: FUITableThProps<T, SortKey>) {

    const [pickProps, thProps] = splitProps(props, ["key", "name", "sort", "info", "size", "sticky", ...tableThKeys])

    const size = createMemo(() => tableCol.sizes[pickProps.size || "md"])
    const sticky = createMemo(() => pickProps.sticky && tableCol.stikis[pickProps.sticky])
    const showSort = createMemo(() => Boolean(pickProps.sort?.key))

    function onSort() {
        const { key: skey, disabled } = props.sort || {}
        if (!skey || disabled) return

        const { key, desc } = props.sortValue || {}
        if (skey === key && desc) props.onSort?.()
        else if (!props.sortValue) props.onSort?.({ key: skey, desc: false })
        else props.onSort?.({ key: skey, desc: true })
    }

    return (
        <th
            {...thProps}
            class={cn(
                "text-left text-gray-700 leading-4 tracking-wide",
                "first:rounded-l-md last:rounded-r-md bg-neutral-100",
                "select-none bg-neutral-100",
                showSort() && "cursor-pointer",
                size(),
                sticky(),
                thProps.class,
            )}
            onClick={onSort}
        >
            <div class="flex items-center gap-1">
                <FuiThAtom.Info info={pickProps.info} />
                {pickProps.name}
                <FuiThAtom.Sort
                    sort={pickProps.sort}
                    value={pickProps.sortValue}
                />
            </div>
        </th>
    )
}
