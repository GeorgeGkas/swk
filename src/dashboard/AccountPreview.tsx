import React from 'react'
import { NETWORKS } from '../constants/networks'
import { IWalletAccount, IWalletContext, useWallet } from '../providers/Wallet'
import { Account } from '../services/Account'
import { Crypto } from '../services/Crypto'

const AccountPreview = () => {
  const wallet = useWallet()
  const [selectedAccountBalance, setSelectedAccountBalance] = React.useState('...')
  const [operatingNetwork, setOperatingNetwork] = React.useState(
    NETWORKS[(wallet as IWalletContext).state.operatingNetworkId],
  )

  const requestPrivateKeyReveal = () => {
    const password = prompt('Please enter account password.')
    const operatingAccount = wallet?.state.accounts.find(
      (account) => account.address === wallet?.state.operatingAccountAddress,
    ) as IWalletAccount

    if (password === null) {
      return
    }

    try {
      const clearTextPrivateKey = Crypto.decrypt(operatingAccount.cipherPrivateKey, password as string)

      if (!clearTextPrivateKey) {
        alert('Account password is incorrect.')
        return
      }

      alert(`Private key is: ${clearTextPrivateKey}`)
    } catch {
      alert('Account password is incorrect.')
    }
  }

  React.useEffect(() => {
    const run = async () => {
      setSelectedAccountBalance('...')
      const operatingNetworkId = (wallet as IWalletContext).state.operatingNetworkId
      const operatingAccountAddress = (wallet as IWalletContext).state.operatingAccountAddress as string
      const network = NETWORKS[operatingNetworkId]

      const balance = await Account.getBalance(operatingAccountAddress, operatingNetworkId)

      setSelectedAccountBalance(balance + ' ' + network.nativeCurrency.symbol)
      setOperatingNetwork(network)
    }

    run()
  }, [(wallet as IWalletContext).state.operatingNetworkId, (wallet as IWalletContext).state.operatingAccountAddress])

  return (
    <div className="pt-1">
      <p>
        Account: <strong>{(wallet as IWalletContext).state.operatingAccountAddress}</strong>
      </p>
      <p>
        Balance: <strong>{selectedAccountBalance}</strong>
      </p>
      <p>
        <a href={operatingNetwork.blockExplorerUrl + (wallet as IWalletContext).state.operatingAccountAddress}>
          Show on blockchain explorer
        </a>
      </p>
      <button onClick={requestPrivateKeyReveal}>Reveal Private Key</button>
    </div>
  )
}

export { AccountPreview }
