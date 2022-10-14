export interface INetworkNativeCurrency {
  name: string
  symbol: string
  decimals: number
}

export interface INetwork {
  chainId: string
  chainName: string
  nativeCurrency: INetworkNativeCurrency
  rpcUrls: string[]
  blockExplorerUrl: string
}

export const NETWORKS: Record<string, INetwork> = {
  '0x5': {
    chainId: '0x5',
    chainName: 'Goerli Test Network',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
    blockExplorerUrl: 'https://goerli.etherscan.io/address/',
  },
  '0x61': {
    chainId: '0x61',
    chainName: 'Binance Smart Chain Test Network',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 8,
    },
    rpcUrls: ['https://data-seed-prebsc-1-s3.binance.org:8545	'],
    blockExplorerUrl: 'https://testnet.bscscan.com/address/',
  },
  '0xa869': {
    chainId: '0xa869',
    chainName: 'Avalanche FUJI C-Chain',
    nativeCurrency: {
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18,
    },
    rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc', 'https://rpc.ankr.com/avalanche_fuji'],
    blockExplorerUrl: 'https://testnet.snowtrace.io/address/',
  },
}
