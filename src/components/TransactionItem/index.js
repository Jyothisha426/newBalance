import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteTransaction} = props
  const {id, title, amount, type} = transactionDetails
  // console.log(type)
  const onDeleteTrans = () => {
    deleteTransaction(id)
  }

  return (
    <li className="each-history-item">
      <p className="detail">{title}</p>
      <p className="detail">{amount}</p>
      <p className="detail">{type}</p>
      <button
        type="button"
        className="delete-btn"
        onClick={onDeleteTrans}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default TransactionItem
