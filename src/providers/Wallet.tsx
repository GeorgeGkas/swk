import React from 'react'
import { NETWORKS } from '../constants/networks'
import { LocalStorage } from '../services/LocalStorage'

export const enum WALLET_REDUCER_TYPES {
  ADD_ACCOUNT,
  CHANGE_OPERATING_ACCOUNT,
  CHANGE_OPERATING_NETWORK,
}

export interface IWalletAccount {
  address: string
  cipherPrivateKey: string
}

interface IWalletState {
  accounts: IWalletAccount[]
  operatingNetworkId: string
  operatingAccountAddress: string | null
}

interface IWalletAction {
  type: WALLET_REDUCER_TYPES
  payload: any
}

export const getInitialWalletState = (): IWalletState => {
  const accounts = LocalStorage.get('accounts')

  if (accounts) {
    return {
      accounts,
      operatingNetworkId: Object.values(NETWORKS)[0].chainId,
      operatingAccountAddress: accounts[0].address,
    }
  }

  return {
    accounts: [],
    operatingNetworkId: Object.values(NETWORKS)[0].chainId,
    operatingAccountAddress: null,
  }
}

export const walletReducer = (state: IWalletState, action: IWalletAction): IWalletState => {
  switch (action.type) {
    case WALLET_REDUCER_TYPES.ADD_ACCOUNT:
      return {
        ...state,
        accounts: [...state.accounts, action.payload],
      }
    case WALLET_REDUCER_TYPES.CHANGE_OPERATING_ACCOUNT:
      return {
        ...state,
        operatingAccountAddress: action.payload,
      }
    case WALLET_REDUCER_TYPES.CHANGE_OPERATING_NETWORK:
      return {
        ...state,
        operatingNetworkId: action.payload,
      }
    default:
      return state
  }
}

export interface IWalletContext {
  state: IWalletState
  addAccount: (account: IWalletAccount) => void
  changeOperatingAccount: (accountAddress: IWalletState['operatingAccountAddress']) => void
  changeOperatingNetwork: (networkId: IWalletState['operatingNetworkId']) => void
}

const WalletContext = React.createContext<IWalletContext | null>(null)

const WalletProvider = ({ children }: { children: JSX.Element }) => {
  const [walletState, dispatchWalletAction] = React.useReducer(walletReducer, {}, getInitialWalletState)

  const addAccount = (account: IWalletAccount) => {
    dispatchWalletAction({
      type: WALLET_REDUCER_TYPES.ADD_ACCOUNT,
      payload: account,
    })
    LocalStorage.set('accounts', [...walletState.accounts, account])
  }

  const changeOperatingAccount = (accountAddress: IWalletState['operatingAccountAddress']) => {
    dispatchWalletAction({
      type: WALLET_REDUCER_TYPES.CHANGE_OPERATING_ACCOUNT,
      payload: accountAddress,
    })
  }

  const changeOperatingNetwork = (networkId: IWalletState['operatingNetworkId']) => {
    dispatchWalletAction({
      type: WALLET_REDUCER_TYPES.CHANGE_OPERATING_NETWORK,
      payload: networkId,
    })
  }

  return (
    <WalletContext.Provider
      value={{
        state: walletState,
        addAccount,
        changeOperatingAccount,
        changeOperatingNetwork,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

const useWallet = () => React.useContext(WalletContext)

export { WalletProvider, useWallet }
