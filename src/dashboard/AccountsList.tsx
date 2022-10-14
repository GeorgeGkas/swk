import { IWalletContext, useWallet } from '../providers/Wallet'

const AccountsList = ({ onSelect }: { onSelect: (accountAddress: string) => void }) => {
  const wallet = useWallet()

  if ((wallet as IWalletContext).state.accounts.length === 0) {
    return <p className="text-center">No accounts exist.</p>
  }

  return (
    <ul className="flex flex-col p-0">
      {(wallet as IWalletContext).state.accounts.map((account, i) => (
        <button key={i} onClick={() => onSelect(account.address)}>
          {account.address}
        </button>
      ))}
    </ul>
  )
}

export { AccountsList }
