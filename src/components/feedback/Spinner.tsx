import { createMemo, splitProps } from "solid-js"

import { cn } from "../../utils/class"
import FIUIcon, { FIUIconProps } from "../icon/Icon"
import spinner from "./const/spinner"
import { FUISpinnerSize } from "./types/spinner"

export interface FUISpinnerProps extends Omit<FIUIconProps, "icon"> {
    size?: FUISpinnerSize
}

export default function FUISpinner(props: FUISpinnerProps) {

    const [pickProps, iProps] = splitProps(props, ["size"])
    const size = createMemo(() => spinner.sizes[pickProps.size || "md"])

    return (
        <FIUIcon
            icon="spinner"
            {...iProps}
            class={cn(
                "animate-spin text-rose-500",
                size(),
                iProps.class,
            )}
        />
    )
}
