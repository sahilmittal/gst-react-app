import React from 'react'

import StatusDiv from '../StatusDiv'

export default class TaxCalculator extends React.Component {

  state = {
    initialAmount: 1000.0,
    gstRate: '5',
    operation: 'add',
    netAmount: 0.0,
    gstAmount: 0.0,
    grossAmount: 0.0
  }

  handleAmountChange = (e) => {
    this.updateResult({initialAmount: Number(e.target.value)})
  }

  handleGSTRateChange = (e) => {
    this.updateResult({gstRate: e.target.value})
  }

  changeOperation = (operation, e) => {
    this.updateResult({operation})
  }

  componentWillMount () {
    this.updateResult()
  }

  updateResult = (obj) => {
    let inputs = Object.assign(this.state, obj)
    inputs.gstRate = Number(inputs.gstRate)
    const {initialAmount, operation, gstRate} = inputs
    let netAmount=0.0, grossAmount=0.0, gstAmount

    if(operation == 'add') {
      netAmount = initialAmount
      gstAmount = (initialAmount*gstRate)/100
      grossAmount = netAmount + gstAmount
    } else if(operation == 'remove') {
      grossAmount = initialAmount
      netAmount = (grossAmount*100)/(100+gstRate)
      gstAmount = grossAmount - netAmount
    }
    this.setState({initialAmount, operation, gstRate: gstRate.toString(), netAmount, gstAmount, grossAmount})
  }

  render() {
    const {initialAmount, operation, gstRate, netAmount, gstAmount, grossAmount} = this.state
    return(
      <div className='tax-calculator'>
        <div className='initial-amount'>
          <label>Initial Amount:
            <input type='number' value={initialAmount} onChange={this.handleAmountChange} />
          </label>
        </div>
        GST Rate: 
        <div className="radio">
          <label>
            <input type="radio" value="5" checked={gstRate === '5'} onChange={this.handleGSTRateChange} />
            5%
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="12" checked={gstRate === '12'} onChange={this.handleGSTRateChange} />
            12%
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="18" checked={gstRate === '18'} onChange={this.handleGSTRateChange} />
            18%
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="28" checked={gstRate === '28'} onChange={this.handleGSTRateChange} />
            28%
          </label>
        </div>
        <div className={'gst-btn ' + ((operation=='add') ? 'active': '')} onClick={this.changeOperation.bind(this, 'add')}>Add<br/>GST</div>
        <div className={'gst-btn ' + ((operation=='remove') ? 'active': '')} onClick={this.changeOperation.bind(this, 'remove')}>Remove<br/>GST</div>
        <table className='result'>
          <tbody>
            <tr>
              <td>Net Amount</td>
              <td><span className='amount'><i className="fa fa-inr"></i> {netAmount.toLocaleString()}</span></td>
            </tr>
            <tr>
              <td>GST Amount</td>
              <td><span className='amount'><i className="fa fa-inr"></i> {gstAmount.toLocaleString()} ({gstRate}%)</span></td>
            </tr>
            <tr>
              <td>Gross Amount</td>
              <td><span className='amount'><i className="fa fa-inr"></i> {grossAmount.toLocaleString()}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

}