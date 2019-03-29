import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Identicon from '../identicon'
import TransactionStatus from '../transaction-status'
import TransactionAction from '../transaction-action'
import UserPreferencedCurrencyDisplay from '../user-preferenced-currency-display'
import TokenCurrencyDisplay from '../token-currency-display'
import TransactionListItemDetails from '../transaction-list-item-details'
import { CONFIRM_TRANSACTION_ROUTE } from '../../routes'
import { UNAPPROVED_STATUS, TOKEN_METHOD_TRANSFER } from '../../constants/transactions'
import { PRIMARY, SECONDARY } from '../../constants/common'
import { ENVIRONMENT_TYPE_FULLSCREEN } from '../../../../app/scripts/lib/enums'
import { getStatusKey } from '../../helpers/transactions.util'

export default class TransactionListItem extends PureComponent {
  static propTypes = {
    assetImages: PropTypes.object,
    history: PropTypes.object,
    methodData: PropTypes.object,
    nonceAndDate: PropTypes.string,
    retryTransaction: PropTypes.func,
    setSelectedToken: PropTypes.func,
    showCancelModal: PropTypes.func,
    showCancel: PropTypes.bool,
    showRetry: PropTypes.bool,
    showTransactionDetailsModal: PropTypes.func,
    token: PropTypes.object,
    tokenData: PropTypes.object,
    transaction: PropTypes.object,
    value: PropTypes.string,
  }

  state = {
    showTransactionDetails: false,
  }

  handleClick = () => {
    const {
      transaction,
      history,
      showTransactionDetailsModal,
      methodData,
      showCancel,
      showRetry,
    } = this.props
    const { id, status } = transaction
    const { showTransactionDetails } = this.state
    const windowType = window.METAMASK_UI_TYPE

    if (status === UNAPPROVED_STATUS) {
      history.push(`${CONFIRM_TRANSACTION_ROUTE}/${id}`)
      return
    }

    if (windowType === ENVIRONMENT_TYPE_FULLSCREEN) {
      this.setState({ showTransactionDetails: !showTransactionDetails })
    } else {
      showTransactionDetailsModal({
        transaction,
        onRetry: this.handleRetry,
        showRetry: showRetry && methodData.done,
        onCancel: this.handleCancel,
        showCancel,
      })
    }
  }

  handleCancel = () => {
    const { transaction: { id, txParams: { gasPrice } } = {}, showCancelModal } = this.props
    showCancelModal(id, gasPrice)
  }

  handleRetry = () => {
    const {
      transaction: { txParams: { to } = {} },
      methodData: { name } = {},
      setSelectedToken,
    } = this.props

    if (name === TOKEN_METHOD_TRANSFER) {
      setSelectedToken(to)
    }

    return this.resubmit()
  }

  resubmit () {
    const { transaction: { id }, retryTransaction, history } = this.props
    return retryTransaction(id)
      .then(id => history.push(`${CONFIRM_TRANSACTION_ROUTE}/${id}`))
  }

  renderPrimaryCurrency () {
    const { token, transaction: { txParams: { data } = {} } = {}, value } = this.props

    return token
      ? (
        <TokenCurrencyDisplay
          className="transaction-list-item__amount transaction-list-item__amount--primary"
          token={token}
          transactionData={data}
          prefix="-"
        />
      ) : (
        <UserPreferencedCurrencyDisplay
          className="transaction-list-item__amount transaction-list-item__amount--primary"
          value={value}
          type={PRIMARY}
          prefix="-"
        />
      )
  }

  renderSecondaryCurrency () {
    const { token, value } = this.props

    return token
      ? null
      : (
        <UserPreferencedCurrencyDisplay
          className="transaction-list-item__amount transaction-list-item__amount--secondary"
          value={value}
          prefix="-"
          type={SECONDARY}
        />
      )
  }

  render () {
    const {
      assetImages,
      methodData,
      nonceAndDate,
      showCancel,
      showRetry,
      tokenData,
      transaction,
    } = this.props
    const { txParams = {} } = transaction
    const { showTransactionDetails } = this.state
    const toAddress = tokenData
      ? tokenData.params && tokenData.params[0] && tokenData.params[0].value || txParams.to
      : txParams.to

    return (
      <div className="transaction-list-item">
        <div
          className="transaction-list-item__grid"
          onClick={this.handleClick}
        >
          <Identicon
            className="transaction-list-item__identicon"
            address={toAddress}
            diameter={34}
            image={assetImages[toAddress]}
          />
          <TransactionAction
            transaction={transaction}
            methodData={methodData}
            className="transaction-list-item__action"
          />
          <div
            className="transaction-list-item__nonce"
            title={nonceAndDate}
          >
            { nonceAndDate }
          </div>
          <TransactionStatus
            className="transaction-list-item__status"
            statusKey={getStatusKey(transaction)}
            title={(
              (transaction.err && transaction.err.rpc)
                ? transaction.err.rpc.message
                : transaction.err && transaction.err.message
            )}
          />
          { this.renderPrimaryCurrency() }
          { this.renderSecondaryCurrency() }
        </div>
        <div className={classnames('transaction-list-item__expander', {
          'transaction-list-item__expander--show': showTransactionDetails,
        })}>
          {
            showTransactionDetails && (
              <div className="transaction-list-item__details-container">
                <TransactionListItemDetails
                  transaction={transaction}
                  onRetry={this.handleRetry}
                  showRetry={showRetry && methodData.done}
                  onCancel={this.handleCancel}
                  showCancel={showCancel}
                />
              </div>
            )
          }
        </div>
      </div>
    )
  }
}
