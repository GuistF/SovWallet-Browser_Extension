import React, { Component } from 'react'
import PendingTxDetails from './pending-typed-msg-details'

export default class PendingMsg extends Component {
  render () {
    var state = this.props
    var msgData = state.txData

    return (
      <div key={msgData.id} style={{height: '100%'}}>
        <h3 style={{
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#9e5b0f',
          margin: '20px',
        }}>Sign message</h3>
        <PendingTxDetails {...state}/>
        <div className="flex-row flex-space-around" style={{
          marginRight: '30px',
          float: 'right',
          display: 'block',
        }}>
          <button style={{width: '109px'}} onClick={state.cancelTypedMessage}>Cancel</button>
          <button style={{width: '109px', marginTop: '-40px', marginLeft: '209'}}  onClick={state.signTypedMessage}>Sign</button>
        </div>
      </div>
    )
  }
}
