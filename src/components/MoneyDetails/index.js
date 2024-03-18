import './index.css'

const MoneyDetails = props => {
  const {balanceAmount, incomeAmount, expensesAmount} = props

  return (
    <div className="money-details-container">
      <div className="each-money-item balance">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          className="money-detail-image"
          alt="balance"
        />
        <div>
          <p className="title">Your Balance</p>
          <p className="money" data-testid="balanceAmount">
            Rs {balanceAmount}
          </p>
        </div>
      </div>
      <div className="each-money-item income">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          className="money-detail-image"
          alt="income"
        />
        <div>
          <p className="title">Your Income</p>
          <p className="money" data-testid="incomeAmount">
            Rs {incomeAmount}
          </p>
        </div>
      </div>
      <div className="each-money-item expenses">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          className="money-detail-image"
          alt="expenses"
        />
        <div>
          <p className="title">Your Expenses</p>
          <p className="money" data-testid="expensesAmount">
            Rs {expensesAmount}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
