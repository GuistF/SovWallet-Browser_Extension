import React, {Component} from 'react'
import { connect } from 'react-redux'
import Identicon from '../identicon'
import { addressSummary } from '../../util'
import EthBalance from '../eth-balance'
import TokenBalance from '../token-balance'
import { getMetaMaskAccounts } from '../../../../ui/app/selectors'

class SendProfile extends Component {
	render () {
		const props = this.props
		const {
			address,
			account,
			identity,
			network,
			conversionRate,
			currentCurrency,
			isToken,
			token,
		} = props
		return (
			<div
				className="account-data-subsection flex-row flex-grow"
				style={{
					 width: '91%',
      			     boxSizing: 'border-box',
                     color: 'white',
                     backgroundColor: 'rgb(255, 249, 162)',
                     backgroundImage: 'radial-gradient(farthest-side at 30% 0px, rgb(255, 181, 99) 0%, rgb(255, 90, 0) 300px)',
                     boxShadow: 'rgba(251, 86, 0, 0.3) 0px 8px 16px 0px',
                     height: '135px',
                     margin: '3px 11px 15px',
                     padding: '20px',
                     borderRadius: '10px',
				}}
			>
				{/* header - identicon + nav */}
				<div className="flex-row flex-space-between">
					{/* large identicon*/}
					<div
					className="identicon-wrapper flex-column flex-center select-none"
					style={{ display: 'inline-block' }}
					>
						<Identicon diameter={62} address={address} />
					</div>
					{/* invisible place holder */}
					<i className="fa fa-users fa-lg invisible" style={{ marginTop: '28px' }} />
				</div>
				{/* account label */}
				<div className="flex-column" style={{ alignItems: 'flex-start' }} >
					<h2
						className="send-profile-identity-name font-medium flex-center"
						style={{
							color: '#ffffff',
							paddingTop: '8px',
							marginBottom: '8px',
						}}
					>{identity && identity.name}</h2>
					{/* address and getter actions */}
					<div
						className="flex-row flex-center"
						style={{
							color: 'rgba(255, 255, 255, 0.7)',
							marginBottom: '18px',
						}}
					>
						<div className="send-profile-address" style={{ lineHeight: '16px', fontSize: '14px' }}>
							{addressSummary(address)}
						</div>
					</div>
					{/* balance */}
					<div className="flex-row flex-center">
						{isToken ? <TokenBalance token={token} /> : <EthBalance {...{
							value: account && account.balance,
							conversionRate,
							currentCurrency,
							network,
						}} />}
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps (state) {
	const accounts = getMetaMaskAccounts(state)
	var result = {
		address: state.metamask.selectedAddress,
		accounts,
		identities: state.metamask.identities,
		network: state.metamask.network,
		conversionRate: state.metamask.conversionRate,
		currentCurrency: state.metamask.currentCurrency,
	}

	result.account = result.accounts[result.address]
	result.identity = result.identities[result.address]

	return result
}

module.exports = connect(mapStateToProps)(SendProfile)
