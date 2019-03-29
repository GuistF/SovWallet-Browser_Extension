import ConfirmScreen from './components/confirm'
import React from 'react'
import { connect } from 'react-redux'
import actions from '../../ui/app/actions'

class RemoveTokenScreen extends ConfirmScreen {
  render () {
    return (
      <ConfirmScreen
        subtitle="Remove Token"
        question={`Are you sure you want to remove token "${this.props.symbol}"?`}
        onCancelClick={() => this.props.dispatch(actions.goHome())}
        onNoClick={() => this.props.dispatch(actions.goHome())}
        onYesClick={() => {
          this.props.dispatch(actions.removeToken(this.props.address))
            .then(() => {
              this.props.dispatch(actions.goHome())
            })
        }}
      />
    )
  }
}

module.exports = connect()(RemoveTokenScreen)
