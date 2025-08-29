import { Show } from "solid-js"

import { cn } from "../../../../../utils/class"
import FIUIcon from "../../../../icon/Icon"
import { FUITableSort } from "../../types/table"

export interface FUIThSortProps<K extends string = string> {
    value?: FUITableSort<K>
    sort?: FUITableSort<K>
}

export default function FUIThSort(props: FUIThSortProps) {

    function getOpacity(desc: boolean) {
        if (props.sort && props.value?.key === props.sort?.key) {
            if (props.value?.desc === desc) return "opacity-100"
        }
        return "opacity-0"
    }

    return (
        <Show when={props.sort?.key}>
            <span class="relative" classList={{ "cursor-not-allowed": props.sort?.disabled }}>
                <FIUIcon icon="sort" class="text-secondary opacity-50" />
                <FIUIcon icon="sortUp" class={cn("absolute top-0", getOpacity(false))} />
                <FIUIcon icon="sortDown" class={cn("absolute top-0", getOpacity(true))} />
            </span>
        </Show>
    )
}
