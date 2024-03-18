import {Component} from 'react'

import {v4} from 'uuid'

import MoneyDetails from '../MoneyDetails'

import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactionsList: [],
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  deleteTransaction = id => {
    const {transactionsList} = this.state
    this.setState({
      transactionsList: transactionsList.filter(trans => trans.id !== id),
    })
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeType = event => {
    this.setState({optionId: event.target.value})
  }

  renderTransactionsList = () => {
    const {transactionsList} = this.state
    return transactionsList.map(eachTransaction => (
      <TransactionItem
        key={eachTransaction.id}
        transactionDetails={eachTransaction}
        deleteTransaction={this.deleteTransaction}
      />
    ))
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      eachTrans => eachTrans.optionId === optionId,
    )
    const {displayText} = typeOption
    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }

    this.setState(previousState => ({
      transactionsList: [...previousState.transactionsList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  getExpenses = () => {
    const {transactionsList} = this.state
    let expensesAmount = 0
    transactionsList.forEach(eachTrans => {
      if (eachTrans.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTrans.amount
      }
    })
    return expensesAmount
  }

  getIncome = () => {
    const {transactionsList} = this.state
    let incomeAmount = 0
    transactionsList.forEach(eachTrans => {
      if (eachTrans.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTrans.amount
      }
    })
    return incomeAmount
  }

  getBalance = () => {
    const {transactionsList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0

    transactionsList.forEach(eachTrans => {
      if (eachTrans.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTrans.amount
      } else {
        expensesAmount += eachTrans.amount
      }
    })

    balanceAmount = incomeAmount - expensesAmount
    return balanceAmount
  }

  render() {
    const {titleInput, amountInput, optionId, transactionsList} = this.state
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()
    return (
      <div className="app-container">
        <div className="header-container">
          <h1 className="heading1">Hi, Richard</h1>
          <p className="main-para">
            Welcome back to your <span className="span">Money Manager</span>
          </p>
        </div>
        <div className="money-details-list">
          <MoneyDetails
            balanceAmount={balanceAmount}
            incomeAmount={incomeAmount}
            expensesAmount={expensesAmount}
          />
        </div>

        <div className="adding-history-container">
          <form className="form" onSubmit={this.onAddTransaction}>
            <h1 className="heading2">Add Transaction</h1>
            <div className="inputs-containers">
              <label className="label" htmlFor="title">
                TITLE
              </label>
              <input
                type="text"
                id="title"
                placeholder="TITLE"
                className="input"
                onChange={this.onChangeTitle}
                value={titleInput}
              />
            </div>
            <div className="inputs-containers">
              <label className="label" htmlFor="amount">
                AMOUNT
              </label>
              <input
                type="text"
                id="amount"
                placeholder="AMOUNT"
                className="input"
                onChange={this.onChangeAmount}
                value={amountInput}
              />
            </div>
            <div className="inputs-containers">
              <label className="label" htmlFor="selectType">
                TYPE
              </label>
              <select
                className="input"
                id="selectType"
                onChange={this.onChangeType}
              >
                {transactionTypeOptions.map(eachType => (
                  <option className="option" key={eachType.optionId}>
                    {eachType.displayText}
                  </option>
                ))}
              </select>
            </div>

            <button className="add-btn" type="submit">
              Add
            </button>
          </form>

          <div className="form">
            <h1 className="heading2">History</h1>
            <ul className="history-container">
              <li className="each-list-item">
                <h1 className="history-titles">Title</h1>
                <h1 className="history-titles">Amount</h1>
                <h1 className="history-titles">Type</h1>
              </li>
              {this.renderTransactionsList()}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
