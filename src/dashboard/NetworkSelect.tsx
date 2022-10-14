import React from 'react'
import { NETWORKS } from '../constants/networks'
import { IWalletContext, useWallet } from '../providers/Wallet'

const NetworkSelect = () => {
  const wallet = useWallet()

  const onNetworkChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const chainId = e.currentTarget.value
    ;(wallet as IWalletContext).changeOperatingNetwork(chainId)
  }

  return (
    <select value={(wallet as IWalletContext).state.operatingNetworkId} onChange={onNetworkChange}>
      {Object.values(NETWORKS).map((network, i) => (
        <option key={i} value={network.chainId}>
          {network.chainName}
        </option>
      ))}
    </select>
  )
}

export { NetworkSelect }
