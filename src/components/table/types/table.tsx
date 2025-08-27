import { JSXElement } from "solid-js"

export type FUITableSize = "sm" | "md"
export type FUITableSticky = "sticky-left" | "sticky-right" | "card-left" | "card-right" | "modal-left" | "modal-right"

export interface FUITableSort<SortKey extends string = string> {
    key?: SortKey
    desc?: boolean
    disabled?: boolean
}

export interface FUITableHeader<T extends object, SortKey extends string = string> {
    key?: keyof T | number
    name: JSXElement
    info?: string
    sort?: FUITableSort<SortKey>
    size?: FUITableSize
    sticky?: FUITableSticky
}

export interface FUITableCol<T extends object> {
    key?: keyof T | number
    size?: FUITableSize
    sticky?: FUITableSticky
    render?(item: T, index: number, header: FUITableHeader<T>): JSXElement
}

export interface FUITableHeaderCol<T extends object, SortKey extends string = string> {
    header: FUITableHeader<T, SortKey>
    col: FUITableCol<T>
}
