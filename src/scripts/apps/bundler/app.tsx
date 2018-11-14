import classNames from 'classnames'
import * as React from 'react'

import allocateChoices from './allocate-choices'
import groupVariantsForCartAdd from './group-variants-for-cart-add'

export interface Props {
  allocationLength: number,
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
          .map((variant) => <button
            className={classNames('button', selChoices.includes(variant) && 'success')}
            key={variant.id}
            onClick={this.handleToggleChoiceClick(variant)}
          >
          {variant.title}
        </button>)}
      </div>

      <div>
        <button className='button' disabled={!selMainVariant || selChoices.length === 0} onClick={this.handleAddToCartClick} type='button'>Add to cart</button>
      </div>
    </div>
  }

  private handleAddToCartClick = async () => {
    const {selChoices, selMainVariant} = this.state

    if (!selMainVariant || selChoices.length === 0) { return }

    const bundleId = (new Date()).getTime().toString()

    window.cartApp.add([
      [selMainVariant.id, {properties: {bundle_id: bundleId}}],
      ...groupVariantsForCartAdd(selChoices, {parent_bundle_id: bundleId}),
    ])
  }

  private handleChangeMainVariantClick = (selMainVariant: Variant) => () => {
    this.setState((state) => ({...state, selChoices: [], selMainVariant}))
  }

  private handleToggleChoiceClick = (incoming: Variant) => () => {
    const selChoices = allocateChoices({incoming, choices: this.state.selChoices, length: this.props.allocationLength})
    this.setState((state) => ({...state, selChoices}))
  }
}
