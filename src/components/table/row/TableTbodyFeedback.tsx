import { createMemo, JSXElement, Match, Show, splitProps, Switch } from "solid-js"

import { HtmlAtrribute } from "../../../types/htmlAttributes"
import { cn } from "../../../utils/class"
import FUISpinner from "../../feedback/Spinner"
import { FUITableTrItemData, tableTrItemKeys } from "./TableTrItem"

export interface FUITableTbodyFeedbackData<T extends object, SortKey extends string = string> extends FUITableTrItemData<T, SortKey> {
    loading?: boolean
    error?: Error
    renderEmpty?(): JSXElement
    renderLoading?(): JSXElement
    renderError?(error: Error): JSXElement
}
export const tableTbodyFeedbackKeys = ["loading", "error", "renderEmpty", "renderLoading", "renderError", ...tableTrItemKeys] as const

export interface FUITableTbodyFeedbackProps<T extends object, SortKey extends string = string> extends
    HtmlAtrribute<"tbody">, FUITableTbodyFeedbackData<T, SortKey> { }

export default function FUITableTbodyFeedback<T extends object, SortKey extends string = string>(props: FUITableTbodyFeedbackProps<T, SortKey>) {

    const [pickProps, tbodyProps] = splitProps(props, tableTbodyFeedbackKeys)

    const empty = createMemo(() => pickProps.items.length === 0)
    const colspan = createMemo(() => pickProps.headers.length)

    return (
        <tbody
            {...tbodyProps}
            class={cn(
                "child:border-b child:border-main last:border-0",
                tbodyProps.class,
            )}
        >
            <Switch>
                <Match when={empty()}>
                    <tr>
                        <td colSpan={colspan()}>
                            <Show when={!pickProps.renderEmpty} fallback={pickProps.renderEmpty?.()}>
                                empty
                            </Show>
                        </td>
                    </tr>
                </Match>
                <Match when={pickProps.loading}>
                    <tr>
                        <td colSpan={colspan()}>
                            <Show when={!pickProps.renderLoading} fallback={pickProps.renderLoading?.()}>
                                <div class="flex flex-col justify-center py-auto min-h-[30vh] items-center">
                                    <FUISpinner />
                                </div>
                            </Show>
                        </td>
                    </tr>
                </Match>
                <Match when={pickProps.error}>
                    <tr>
                        <td colSpan={colspan()}>
                            <Show when={!pickProps.renderError} fallback={pickProps.renderError?.(pickProps.error!)}>
                                error
                            </Show>
                        </td>
                    </tr>
                </Match>
            </Switch>
        </tbody>
    )
}
