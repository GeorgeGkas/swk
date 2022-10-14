import React from 'react'
import * as ethers from 'ethers'
import { IWalletContext, useWallet } from '../providers/Wallet'
import { Crypto } from '../services/Crypto'

const CreateAccount = () => {
  const wallet = useWallet()

  const [accountError, setAccountError] = React.useState<string | null>(null)

  const onCreate = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      password1: { value: string }
      password2: { value: string }
    }

    const password1 = target.password1.value
    const password2 = target.password2.value

    if (password1 !== password2) {
      setAccountError('Passwords do not match.')
      return
    }

    if (password1.length === 0) {
      setAccountError('Password should not be empty.')
      return
    }

    try {
      const password = password1
      const account = ethers.Wallet.createRandom()
      const cipherPrivateKey = Crypto.encrypt(account.privateKey, password)

      ;(wallet as IWalletContext).addAccount({
        address: account.address,
        cipherPrivateKey,
      })
      ;(wallet as IWalletContext).changeOperatingAccount(account.address)
    } catch (e) {
      console.error(e)
      setAccountError('Could not create account. Please try again.')
    }
  }

  return (
    <form className="flex flex-col h-full text-center" onSubmit={onCreate}>
      <h1>Create a new account</h1>
      <p>
        Please provide a password to protect your account. You will be asked to enter the password to gain access to
        accounts' private key.
      </p>
      <div className="flex flex-col py-1">
        <input type="password" name="password1" placeholder="password" />
        <input type="password" name="password2" placeholder="retype password" />
      </div>
      <input type="submit" value="Create a new account" />
      <p
        className="text-sm color-red"
        style={{
          display: accountError ? 'block' : 'none',
        }}
      >
        {accountError}
      </p>
    </form>
  )
}

export { CreateAccount }
