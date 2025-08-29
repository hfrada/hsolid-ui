import { createMemo, For, splitProps } from "solid-js"

import { HtmlAtrribute } from "../../types/htmlAttributes"
import { cn } from "../../utils/class"
import tabs from "./const/tabs"
import { FUI_TabsAllowedTypeItem, FUITabsItem, FUITabsSize } from "./types/tabs"

export interface FUITabsProps<T extends FUI_TabsAllowedTypeItem, I = unknown> extends Omit<HtmlAtrribute<"div">, "onChange"> {
    size?: FUITabsSize
    clearable?: boolean
    disabled?: boolean
    value?: T
    items: Array<FUITabsItem<T, I>>
    itemClass?: string
    isActive?(item: FUITabsItem<T, I>): boolean
    onChange?(value?: T, item?: FUITabsItem<T, I>): void
}

export default function FUITabs<T extends FUI_TabsAllowedTypeItem, I = unknown>(props: FUITabsProps<T, I>) {

    const [pickProps, divProps] = splitProps(props, ["size", "clearable", "disabled", "value", "items", "itemClass", "isActive", "onChange"])
    const items = createMemo(() => pickProps.items.filter((i) => !i.hidden))
    const size = createMemo(() => tabs.sizes[pickProps.size || "md"])

    function applyOnChange(value?: T) {
        if (pickProps.value !== value) pickProps.onChange?.(value)
        else if (pickProps.clearable && value === value) pickProps.onChange?.(undefined)
    }

    return (
        <div
            {...divProps}
            class={cn(
                "flex flex-wrap items-baseline justify-start gap-[1px]",
                "overflow-x-auto py-1.5 touch-pan-x",
                divProps.class
            )}
        >
            <For each={items()}>
                {(item) => (
                    <button
                        aria-current={item.value === pickProps.value || item.active || pickProps.isActive?.(item)}
                        disabled={pickProps.disabled || item.disabled}
                        class={cn(
                            "group inline-flex items-center justify-center align-middle", // flex
                            "whitespace-nowrap font-bold text-neutral-300 hover:text-rose-500 disabled:text-neutral-200 aria-[current=true]:text-rose-500", //text
                            "px-5 h-8 md:h-10 w-full sm:w-auto rounded-full aria-[current=true]:bg-rose-50", // box & sizing
                            "ring-0 border-offset-[-1px] border border-transparent aria-[current=true]:border-rose-500", // border
                            "cursor-pointer disabled:cursor-not-allowed", // cursor
                            "transition-all duration-200 ease-in", // animation
                            size(),
                            pickProps.itemClass,
                        )}
                        onClick={() => !item.disabled && applyOnChange(item.value)}
                    >
                        <span>{item.name}</span>
                    </button>
                )}
            </For>
        </div>
    )
}
