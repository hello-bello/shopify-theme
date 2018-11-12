import classNames from 'classnames'
import * as React from 'react'

export interface Props {
  mainProduct?: Product,
  possibleChoices?: Variant[],
}

interface State {
  selChoices: Variant[],
  selMainVariant?: Variant,
}

export default class BundlerApp extends React.Component<Props, State> {
  public state: State = {
    selChoices: [],
  }

  public render() {
    const {mainProduct, possibleChoices} = this.props

    if (!mainProduct || !possibleChoices) { return null }

    const {selChoices, selMainVariant} = this.state

    return <div>
      <h1>Bundler App</h1>

      <div>
        <div>Select a {mainProduct.options.join(', ')}</div>
        {mainProduct.variants.map((variant) => <button
          className={classNames('button', selMainVariant === variant && 'success')}
          key={variant.id}
          onClick={this.handleChangeMainVariantClick(variant)}
        >
          {variant.title}
        </button>)}
      </div>

      <div>
        <div>Choose</div>
        {possibleChoices
          .filter((variant) => selMainVariant ? variant.option1 === selMainVariant.option1 : false)
          .map((variant) => <button className={classNames('button', selChoices.includes(variant) && 'success')} key={variant.id} onClick={this.handleToggleChoiceClick(variant)}>
          {variant.title}
        </button>)}
      </div>
    </div>
  }

  private handleChangeMainVariantClick = (selMainVariant: Variant) => () => {
    this.setState((state) => ({...state, selMainVariant}))
  }

  // TODO: add appropriate amounts of variants, depending on bundle size
  // e.g., 1 choice, bundle size 7 = 7 variants of 1 choice
  // e.g., 2 choices, bundle size 7 = 4 + 3 variants of 2 choices
  private handleToggleChoiceClick = (choice: Variant) => () => {
    const {selChoices} = this.state
    const selChoiceIdx = selChoices.findIndex((variant) => variant.id === choice.id)
    if (selChoiceIdx === -1) { selChoices.push(choice) } else { selChoices.splice(selChoiceIdx, 1) }
    this.setState((state) => ({...state, selChoices}))
  }
}
