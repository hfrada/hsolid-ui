import { FUITableSize, FUITableSticky } from "../types/table"

export const sizes: Record<FUITableSize, string> = {
    sm: "p-1.5 lg:p-2",
    md: "p-1.5 lg:p-2.5 lg:px-2",
}

export const stikis: Record<FUITableSticky, string> = {
    "sticky-left": "!sticky !left-0 !z-[1]",
    "sticky-right": "!sticky !right-0 !z-[1]",
    "card-left": "!sticky !left-0 lg:!left-[-.65rem] !z-[1]",
    "card-right": "!sticky !right-0 lg:!right-[-.65rem] !z-[1]",
    "modal-left": "!sticky !left-0 md:!left-[-1.5rem] !z-[1]",
    "modal-right": "!sticky !right-0 md:!right-[-1.5rem] !z-[1]",
}

const tableCol = { sizes, stikis }

export default tableCol
