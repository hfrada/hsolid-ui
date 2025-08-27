import { BsInfoCircle } from "solid-icons/bs"
import { CgSpinner } from "solid-icons/cg"
import { FaSolidSort, FaSolidSortDown, FaSolidSortUp } from "solid-icons/fa"

export const iconMap = {
    info: BsInfoCircle,
    sort: FaSolidSort,
    sortDown: FaSolidSortDown,
    sortUp: FaSolidSortUp,
    spinner: CgSpinner
}

export type FUIIconType = keyof typeof iconMap
export const getIcon = (type: FUIIconType) => iconMap[type]
