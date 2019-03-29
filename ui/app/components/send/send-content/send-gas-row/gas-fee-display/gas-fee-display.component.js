import React, {Component} from 'react'
import PropTypes from 'prop-types'
import UserPreferencedCurrencyDisplay from '../../../../user-preferenced-currency-display'
import { PRIMARY, SECONDARY } from '../../../../../constants/common'

export default class GasFeeDisplay extends Component {

  static propTypes = {
    conversionRate: PropTypes.number,
    primaryCurrency: PropTypes.string,
    convertedCurrency: PropTypes.string,
    gasLoadingError: PropTypes.bool,
    gasTotal: PropTypes.string,
    onClick: PropTypes.func,
  };

  static contextTypes = {
    t: PropTypes.func,
  };

  render () {
    const { gasTotal, onClick, gasLoadingError } = this.props

    return (
      <div className="send-v2__gas-fee-display">
        {gasTotal
          ? (
            <div className="currency-display">
              <UserPreferencedCurrencyDisplay
                value={gasTotal}
                type={PRIMARY}
              />
              <UserPreferencedCurrencyDisplay
                className="currency-display__converted-value"
                value={gasTotal}
                type={SECONDARY}
              />
            </div>
          )
          : gasLoadingError
            ? <div className="currency-display.currency-display--message">
                {this.context.t('setGasPrice')}
              </div>
            : <div className="currency-display">
                {this.context.t('loading')}
              </div>
        }
        <button
          className="sliders-icon-container"
          onClick={onClick}
          disabled={!gasTotal && !gasLoadingError}
        >
          <i className="fa fa-sliders sliders-icon" />
        </button>
      </div>
    )
  }
}
