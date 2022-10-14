import { getInitialWalletState, walletReducer, WALLET_REDUCER_TYPES } from '../Wallet'
import { LocalStorage } from '../../services/LocalStorage'
import { NETWORKS } from '../../constants/networks'

describe('getInitialWalletState()', () => {
  it('should return initial state if no accounts exist', () => {
    const localStorageGet = jest.spyOn(LocalStorage, 'get').mockReturnValueOnce(null)

    const initialState = getInitialWalletState()

    expect(initialState).toEqual({
      accounts: [],
      operatingNetworkId: Object.values(NETWORKS)[0].chainId,
      operatingAccountAddress: null,
    })

    expect(localStorageGet).toHaveBeenCalledTimes(1)
    expect(localStorageGet).toHaveBeenCalledWith('accounts')
    localStorageGet.mockRestore()
  })

  it('should return initial state if accounts exist', () => {
    const localStorageGet = jest.spyOn(LocalStorage, 'get').mockReturnValueOnce([
      {
        address: '0x0',
        cipherPrivateKey: 'abc',
      },
    ])

    const initialState = getInitialWalletState()

    expect(initialState).toEqual({
      accounts: [
        {
          address: '0x0',
          cipherPrivateKey: 'abc',
        },
      ],
      operatingNetworkId: Object.values(NETWORKS)[0].chainId,
      operatingAccountAddress: '0x0',
    })

    expect(localStorageGet).toHaveBeenCalledTimes(1)
    expect(localStorageGet).toHaveBeenCalledWith('accounts')
    localStorageGet.mockRestore()
  })
})

describe('walletReducer', () => {
  it('should add new account object', () => {
    const state = {
      accounts: [],
      operatingNetworkId: Object.values(NETWORKS)[0].chainId,
      operatingAccountAddress: null,
    }

    const payload = {
      address: '0x0',
      cipherPrivateKey: '0x1',
    }

    const action = {
      type: WALLET_REDUCER_TYPES.ADD_ACCOUNT,
      payload,
    }

    expect(walletReducer(state, action)).toEqual({
      ...state,
      accounts: [payload],
    })
  })

  it('should change operating account', () => {
    const state = {
      accounts: [
        {
          address: '0x0',
          cipherPrivateKey: '0x1',
        },
      ],
      operatingNetworkId: Object.values(NETWORKS)[0].chainId,
      operatingAccountAddress: null,
    }

    const payload = '0x0'

    const action = {
      type: WALLET_REDUCER_TYPES.CHANGE_OPERATING_ACCOUNT,
      payload,
    }

    expect(walletReducer(state, action)).toEqual({
      ...state,
      operatingAccountAddress: payload,
    })
  })

  it('should change operating network', () => {
    const state = {
      accounts: [
        {
          address: '0x0',
          cipherPrivateKey: '0x1',
        },
      ],
      operatingNetworkId: Object.values(NETWORKS)[0].chainId,
      operatingAccountAddress: null,
    }

    const payload = '0x0'

    const action = {
      type: WALLET_REDUCER_TYPES.CHANGE_OPERATING_ACCOUNT,
      payload,
    }

    expect(walletReducer(state, action)).toEqual({
      ...state,
      operatingAccountAddress: payload,
    })
  })

  it('should return the same state if action type does not exist', () => {
    const state = {
      accounts: [],
      operatingNetworkId: Object.values(NETWORKS)[0].chainId,
      operatingAccountAddress: null,
    }

    const payload = null

    const action = {
      type: 'uknown',
      payload,
    }

    expect(walletReducer(state, action as any)).toEqual(state)
  })
})
