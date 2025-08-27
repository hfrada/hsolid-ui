import { IconProps } from "solid-icons"
import { splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"

import { FUIIconType, getIcon } from "./const/icon"

export interface FIUIconProps extends IconProps {
    icon: FUIIconType
}

export default function FIUIcon(props: FIUIconProps) {
    const [pickProps, iProps] = splitProps(props, ["icon"])
    return <Dynamic component={getIcon(pickProps.icon)} {...iProps} />
}
