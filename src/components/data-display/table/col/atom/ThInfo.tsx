import { Show } from "solid-js"

import FIUIcon from "../../../../icon/Icon"
import Tooltip from "../../../../overlay/Tooltip"

export interface FUIThInfoProps {
    info?: string
}

export default function FUIThInfo(props: FUIThInfoProps) {
    return (
        <Show when={props.info}>
            <Tooltip
                as="i"
                text={props.info}
                class="text-secondary"
                children={<FIUIcon icon="info" />}
            />
        </Show>
    )
}
