import React from 'react'

import {useContextCssHandles} from './CssHandlesContext'

interface Props {
    text: string,
}

function HighStock({text}: Props) {
    const {handles} = useContextCssHandles()

    return (
        <span className={`${handles.highStockText} c-muted-2 t-body`}>{text}</span>
    )
}

export default HighStock
