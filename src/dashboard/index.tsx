import React from 'react'
import { IWalletContext, useWallet } from '../providers/Wallet'
import { AccountPreview } from './AccountPreview'
import { AccountsList } from './AccountsList'
import { CreateAccount } from './CreateAccount'
import { Header } from './Header'

const Dashboard = () => {
  const wallet = useWallet()
  const [showShowCreateAccountPanel, setShowCreateAccountPanel] = React.useState(
    (wallet as IWalletContext).state.accounts.length === 0,
  )
  const showCreateAccountPanel = () => setShowCreateAccountPanel(true)

  const onAccountSelect = (accountAddress: string) => {
    ;(wallet as IWalletContext).changeOperatingAccount(accountAddress)
    setShowCreateAccountPanel(false)
  }

  React.useEffect(() => {
    if ((wallet as IWalletContext).state.operatingAccountAddress === null) {
      return
    }
    setShowCreateAccountPanel(false)
  }, [(wallet as IWalletContext).state.operatingAccountAddress])

  return (
    <div className="flex flex-col h-page">
      <div className="flex flex-row align-items-center px-1">
        <Header />
      </div>
      <div className="flex-grow-1 px-1 flex-row flex">
        <div className="min-w-1/5 flex flex-col align-items-center">
          <h1>Accounts</h1>
          <AccountsList onSelect={onAccountSelect} />
          <button onClick={showCreateAccountPanel}>Create account</button>
        </div>
        <div className="flex-grow-1 align-items-center flex flex-col">
          {showShowCreateAccountPanel ? <CreateAccount /> : <AccountPreview />}
        </div>
      </div>
    </div>
  )
}

export { Dashboard }
