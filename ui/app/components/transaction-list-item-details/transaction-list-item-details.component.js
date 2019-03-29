import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import SenderToRecipient from '../sender-to-recipient'
import { CARDS_VARIANT } from '../sender-to-recipient/sender-to-recipient.constants'
import TransactionActivityLog from '../transaction-activity-log'
import TransactionBreakdown from '../transaction-breakdown'
import Button from '../button'
import Tooltip from '../tooltip'

export default class TransactionListItemDetails extends PureComponent {
  static contextTypes = {
    t: PropTypes.func,
  }

  static propTypes = {
    onCancel: PropTypes.func,
    onRetry: PropTypes.func,
    showCancel: PropTypes.bool,
    showRetry: PropTypes.bool,
    transaction: PropTypes.object,
  }

  handleEtherscanClick = () => {
    const { hash } = this.props.transaction

    const prefix = ''
    const etherscanUrl = `https://${prefix}etherscan.io/tx/${hash}`
    global.platform.openWindow({ url: etherscanUrl })
    this.setState({ showTransactionDetails: true })
  }

  handleCancel = event => {
    const { onCancel } = this.props

    event.stopPropagation()
    onCancel()
  }

  handleRetry = event => {
    const { onRetry } = this.props

    event.stopPropagation()
    onRetry()
  }

  render () {
    const { t } = this.context
    const { transaction, showCancel, showRetry } = this.props
    const { txParams: { to, from } = {} } = transaction

    return (
      <div className="transaction-list-item-details">
        <div className="transaction-list-item-details__header">
          <div>Details</div>
          <div className="transaction-list-item-details__header-buttons">
            {
              showRetry && (
                <Button
                  type="raised"
                  onClick={this.handleRetry}
                  className="transaction-list-item-details__header-button"
                >
                  { t('speedUp') }
                </Button>
              )
            }
            {
              showCancel && (
                <Button
                  type="raised"
                  onClick={this.handleCancel}
                  className="transaction-list-item-details__header-button"
                >
                  { t('cancel') }
                </Button>
              )
            }
            <Tooltip title={t('viewOnEtherscan')}>
              <Button
                type="raised"
                onClick={this.handleEtherscanClick}
                className="transaction-list-item-details__header-button"
                >
                <img src="/images/arrow-popout.svg" />
              </Button>
            </Tooltip>
          </div>
        </div>
        <div className="transaction-list-item-details__sender-to-recipient-container">
          <SenderToRecipient
            variant={CARDS_VARIANT}
            addressOnly
            recipientAddress={to}
            senderAddress={from}
          />
        </div>
        <div className="transaction-list-item-details__cards-container">
          <TransactionBreakdown
            transaction={transaction}
            className="transaction-list-item-details__transaction-breakdown"
          />
          <TransactionActivityLog
            transaction={transaction}
            className="transaction-list-item-details__transaction-activity-log"
          />
        </div>
      </div>
    )
  }
}
