const abi = require('human-standard-token-abi')
import {
  transactionsSelector,
} from './selectors/transactions'
const {
  multiplyCurrencies,
} = require('./conversion-util')

const selectors = {
  getSelectedAddress,
  getSelectedIdentity,
  getSelectedAccount,
  getSelectedToken,
  getSelectedTokenExchangeRate,
  getSelectedTokenAssetImage,
  getAssetImages,
  getTokenExchangeRate,
  conversionRateSelector,
  transactionsSelector,
  accountsWithSendEtherInfoSelector,
  getCurrentAccountWithSendEtherInfo,
  getGasIsLoading,
  getForceGasMin,
  getAddressBook,
  getSendFrom,
  getCurrentCurrency,
  getSendAmount,
  getSelectedTokenToFiatRate,
  getSelectedTokenContract,
  autoAddToBetaUI,
  getSendMaxModeState,
  getCurrentViewContext,
  getTotalUnapprovedCount,
  preferencesSelector,
  getMetaMaskAccounts,
}

module.exports = selectors

function getSelectedAddress (state) {
  const selectedAddress = state.metamask.selectedAddress || Object.keys(getMetaMaskAccounts(state))[0]

  return selectedAddress
}

function getSelectedIdentity (state) {
  const selectedAddress = getSelectedAddress(state)
  const identities = state.metamask.identities

  return identities[selectedAddress]
}

function getMetaMaskAccounts (state) {
  const currentAccounts = state.metamask.accounts
  const cachedBalances = state.metamask.cachedBalances
  const selectedAccounts = {}

  Object.keys(currentAccounts).forEach(accountID => {
    const account = currentAccounts[accountID]
    if (account && account.balance === null || account.balance === undefined) {
      selectedAccounts[accountID] = {
        ...account,
        balance: cachedBalances[accountID],
      }
    } else {
      selectedAccounts[accountID] = account
    }
  })
  return selectedAccounts
}

function getSelectedAccount (state) {
  const accounts = getMetaMaskAccounts(state)
  const selectedAddress = getSelectedAddress(state)

  return accounts[selectedAddress]
}

function getSelectedToken (state) {
  const tokens = state.metamask.tokens || []
  const selectedTokenAddress = state.metamask.selectedTokenAddress
  const selectedToken = tokens.filter(({ address }) => address === selectedTokenAddress)[0]
  const sendToken = state.metamask.send.token

  return selectedToken || sendToken || null
}

function getSelectedTokenExchangeRate (state) {
  const contractExchangeRates = state.metamask.contractExchangeRates
  const selectedToken = getSelectedToken(state) || {}
  const { address } = selectedToken
  return contractExchangeRates[address] || 0
}

function getSelectedTokenAssetImage (state) {
  const assetImages = state.metamask.assetImages || {}
  const selectedToken = getSelectedToken(state) || {}
  const { address } = selectedToken
  return assetImages[address]
}

function getAssetImages (state) {
  const assetImages = state.metamask.assetImages || {}
  return assetImages
}

function getTokenExchangeRate (state, address) {
  const contractExchangeRates = state.metamask.contractExchangeRates
  return contractExchangeRates[address] || 0
}

function conversionRateSelector (state) {
  return state.metamask.conversionRate
}

function getAddressBook (state) {
  return state.metamask.addressBook
}

function accountsWithSendEtherInfoSelector (state) {
  const accounts = getMetaMaskAccounts(state)
  const { identities } = state.metamask

  const accountsWithSendEtherInfo = Object.entries(accounts).map(([key, account]) => {
    return Object.assign({}, account, identities[key])
  })

  return accountsWithSendEtherInfo
}

function getCurrentAccountWithSendEtherInfo (state) {
  const currentAddress = getSelectedAddress(state)
  const accounts = accountsWithSendEtherInfoSelector(state)

  return accounts.find(({ address }) => address === currentAddress)
}

function getGasIsLoading (state) {
  return state.appState.gasIsLoading
}

function getForceGasMin (state) {
  return state.metamask.send.forceGasMin
}

function getSendFrom (state) {
  return state.metamask.send.from
}

function getSendAmount (state) {
  return state.metamask.send.amount
}

function getSendMaxModeState (state) {
  return state.metamask.send.maxModeOn
}

function getCurrentCurrency (state) {
  return state.metamask.currentCurrency
}

function getSelectedTokenToFiatRate (state) {
  const selectedTokenExchangeRate = getSelectedTokenExchangeRate(state)
  const conversionRate = conversionRateSelector(state)

  const tokenToFiatRate = multiplyCurrencies(
    conversionRate,
    selectedTokenExchangeRate,
    { toNumericBase: 'dec' }
  )

  return tokenToFiatRate
}

function getSelectedTokenContract (state) {
  const selectedToken = getSelectedToken(state)
  return selectedToken
    ? global.eth.contract(abi).at(selectedToken.address)
    : null
}

function autoAddToBetaUI (state) {
  const autoAddTransactionThreshold = 12
  const autoAddAccountsThreshold = 2
  const autoAddTokensThreshold = 1

  const numberOfTransactions = state.metamask.selectedAddressTxList.length
  const numberOfAccounts = Object.keys(getMetaMaskAccounts(state)).length
  const numberOfTokensAdded = state.metamask.tokens.length

  const userPassesThreshold = (numberOfTransactions > autoAddTransactionThreshold) &&
    (numberOfAccounts > autoAddAccountsThreshold) &&
    (numberOfTokensAdded > autoAddTokensThreshold)
  const userIsNotInBeta = !state.metamask.featureFlags.betaUI

  return userIsNotInBeta && userPassesThreshold
}

function getCurrentViewContext (state) {
  const { currentView = {} } = state.appState
  return currentView.context
}

function getTotalUnapprovedCount ({ metamask }) {
  const {
    unapprovedTxs = {},
    unapprovedMsgCount,
    unapprovedPersonalMsgCount,
    unapprovedTypedMessagesCount,
  } = metamask

  return Object.keys(unapprovedTxs).length + unapprovedMsgCount + unapprovedPersonalMsgCount +
    unapprovedTypedMessagesCount
}

function preferencesSelector ({ metamask }) {
  return metamask.preferences
}
