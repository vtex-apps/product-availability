import React, {Fragment} from 'react'

import {useContextCssHandles} from './CssHandlesContext'

interface Props {
    showAvailabilityMessage?: string
    availableQuantity: number
}

function HighStock({showAvailabilityMessage, availableQuantity}: Props) {
    const {handles} = useContextCssHandles()

    return (
        <span className={`${handles.showAvailableText} c-muted-2 t-body b mh1`}>
            {showAvailabilityMessage} {availableQuantity}
        </span>
    )
}

export default HighStock
