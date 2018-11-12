import * as React from 'react'

export interface Props {
  product?: Product,
  variants?: Variant[],
}

export default class BundlerApp extends React.Component<Props> {
  public render() {
    return <div>
      bundler app
    </div>
  }
}
