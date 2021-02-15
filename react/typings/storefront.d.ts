import type { FunctionComponent } from 'react'

declare global {
  interface StorefrontFunctionComponent<P = Record<string, unknown>>
    extends FunctionComponent<P> {
    getSchema?(props: P): unknown
    schema?: unknown
  }

  interface StorefrontComponent<
    P = Record<string, unknown>,
    S = Record<string, unknown>
  > extends Component<P, S> {
    getSchema?(props: P): unknown
    schema: unknown
  }
}
