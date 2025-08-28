import { IconProps } from "solid-icons"
import { splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"

import { FUIIconType, getIcon } from "./const/icon"

export interface FUIIconProps extends IconProps {
    icon: FUIIconType
}

export default function FUIIcon(props: FUIIconProps) {
    const [pickProps, iProps] = splitProps(props, ["icon"])
    return <Dynamic component={getIcon(pickProps.icon)} {...iProps} />
}
