import * as ethers from 'ethers'
import { NETWORKS } from '../constants/networks'

export class Account {
  static async getBalance(address: string, networkId: string) {
    const operatingNetwork = NETWORKS[networkId]
    const rpcURL = operatingNetwork.rpcUrls[0]

    const provider = new ethers.providers.JsonRpcProvider(rpcURL)

    const rawBalance = await provider.getBalance(address)
    const balance = ethers.utils.formatUnits(rawBalance, operatingNetwork.nativeCurrency.decimals)

    return balance
  }
}
