import { FUI_AllowedTypeItem, FUITypeItem } from "../../../types/item"
import { FUIIconType } from "../../icon/const/icon"

export type FUITabsSize = "sm" | "md"
export type FUI_TabsAllowedTypeItem = FUI_AllowedTypeItem

export interface FUITabsItem<T extends FUI_AllowedTypeItem, I = unknown> extends FUITypeItem<T, I> {
    icon?: FUIIconType
}
