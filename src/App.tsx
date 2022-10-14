import { WalletProvider } from './providers/Wallet'
import { Dashboard } from './dashboard/index'

const App = () => {
  return (
    <WalletProvider>
      <Dashboard />
    </WalletProvider>
  )
}

export {
  App
}
