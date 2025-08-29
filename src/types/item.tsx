export type FUI_AllowedTypeItem = string | number | boolean | null | undefined

export interface FUITypeItem<T extends FUI_AllowedTypeItem, I = unknown> {
    name: string
    value: T
    item?: I
    active?: boolean
    disabled?: boolean
    hidden?: boolean
}
