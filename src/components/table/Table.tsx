import { ErrorBoundary, splitProps } from "solid-js"

import { HtmlAtrribute } from "../../types/htmlAttributes"
import { cn } from "../../utils/class"
import FUITableRow from "./row/TableRow"
import { FUITableTbodyData, tableTbodyKeys } from "./row/TableTbody"
import { FUITableTbodyFeedbackData, tableTbodyFeedbackKeys } from "./row/TableTbodyFeedback"
import { FUITableTheadData, tableTheadKeys } from "./row/TableThead"

export interface FUITableProps<T extends object, SortKey extends string = string> extends
    HtmlAtrribute<"table">, FUITableTheadData<T, SortKey>, FUITableTbodyData<T, SortKey>, FUITableTbodyFeedbackData<T, SortKey> { }

export default function FUITable<T extends object, SortKey extends string = string>(props: FUITableProps<T, SortKey>) {

    const [pickProps, tableProps] = splitProps(props, [...tableTheadKeys, ...tableTbodyKeys, ...tableTbodyFeedbackKeys])
    const [theadProps, _1] = splitProps(pickProps, [...tableTheadKeys])
    const [tbodyProps, _2] = splitProps(pickProps, [...tableTbodyKeys])
    const [tbodyFeedbackProps, _3] = splitProps(pickProps, [...tableTbodyFeedbackKeys])

    return (
        <table {...tableProps} class={cn("table-auto min-w-full rounded-md", tableProps.class)}>
            <ErrorBoundary fallback={(error) => tbodyFeedbackProps.renderError?.(error)}>
                <FUITableRow.Thead {...theadProps} />
                <FUITableRow.Tbody {...tbodyProps} />
                <FUITableRow.TbodyFeedback {...tbodyFeedbackProps} />
            </ErrorBoundary>
        </table>
    )
}
