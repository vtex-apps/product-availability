import React from 'react'
import type { CssHandlesTypes } from 'vtex.css-handles'

export const useCssHandles = (cssHandles: string[]) => {
  const handles: Record<string, string> = {}

  cssHandles.forEach(handle => {
    handles[handle] = handle
  })

  return {
    handles,
    withModifiers: (handle: string, modifier: string) => {
      return `${handle} ${handle}--${modifier}`
    },
  }
}

export function createCssHandlesContext(_handles: string[]) {
  const Context = React.createContext<unknown>({ handles: [] })

  const useContextCssHandles = () => {
    return React.useContext(Context)
  }

  const CssHandlesProvider = ({
    withModifiers,
    handles,
    children,
  }: React.PropsWithChildren<CssHandlesTypes.CssHandlesBag<string[]>>) => {
    const value = React.useMemo(
      () => ({
        handles,
        withModifiers,
      }),
      [withModifiers, handles]
    )

    return <Context.Provider value={value}>{children}</Context.Provider>
  }

  return {
    CssHandlesProvider,
    useContextCssHandles,
  }
}
