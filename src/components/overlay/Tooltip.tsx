import { createEffect, createMemo, onCleanup, splitProps } from "solid-js"
import { Dynamic, spread } from "solid-js/web"
import tippy, { Instance, Placement, Props } from "tippy.js"

import { FUI_HtmlElAttr, FUI_HtmlElement, FUI_HtmlElKey, FUI_WithHtmlElement } from "../../types/htmlAttributes"

export interface TooltipProps<K extends FUI_HtmlElKey> extends FUI_HtmlElAttr<K> {
    as: K
    text?: string
    placement?: Placement
    options?: Partial<Props>
    show?(el: FUI_HtmlElement<TooltipProps<K>>): boolean
}

const defOpts: Partial<Props> = {
    showOnCreate: false,
    hideOnClick: false,
}

export default function FUITooltip<K extends FUI_HtmlElKey>(props: FUI_WithHtmlElement<TooltipProps<K>>) {

    const [pickProps, elProps] = splitProps(props, ["as", "text", "placement", "options", "show"])
    const element = createMemo(() => {
        const el = document.createElement(pickProps.as)
        spread(el, elProps)
        return el
    })

    let tips: Instance<Props> | undefined
    const placement = createMemo(() => pickProps.placement)
    createEffect(() => {
        const el = element()
        const pl = placement()
        tips = el && tippy(el, { placement: pl, ...defOpts, ...pickProps.options })
    })
    createEffect(() => tips?.setProps({ placement: props.placement, ...pickProps.options }))

    createEffect(() => pickProps.text && tips?.setContent(pickProps.text))
    createEffect(() => {
        if (pickProps.text && (pickProps.show?.(element()) ?? true)) tips?.enable()
        else tips?.disable()
    })

    onCleanup(() => tips?.destroy())
    return <>{element()}</>
}

FUITooltip.Clipped = function <K extends FUI_HtmlElKey>(props: TooltipProps<K>) {

    const [pickProps, tProps] = splitProps(props, ["as", "show"])
    const show: (typeof props)["show"] = (el) => {
        const { clientHeight: ch, clientWidth: cw, scrollHeight: sh, scrollWidth: sw } = el
        return (ch !== sh || cw !== sw) && (pickProps.show?.(el) ?? true)
    }
    return <Dynamic
        as={pickProps.as}
        show={show}
        {...tProps as object}
        component={FUITooltip}
    />
}
