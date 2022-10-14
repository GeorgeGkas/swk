# Simple Wallet Keeper

## Features

- Create multiple EVM-compatible accounts.
- A user-provided password secures each account.
- Account private keys are stored securely using AES-GCM encryption.
- Supported networks: `Goerli (Ethereum Testnet)`, `BSC Tesnet`, `Fuji (Avalanche Testnet)`.
- Account preview includes the current balance of the account. The balance updates automatically when users change the operating network.
- Account preview includes the option to retrieve the private key in plaintext by entering the same password used when creating the account.
- Account preview includes viewing the account in the corresponding blockchain explorer.

## Third-party Dependencies

The only third party dependency (other than React) is [crypto-js](https://github.com/brix/crypto-js).

## Tests

Due to the time limitation of this task, only some simple test cases were implemented that concern the global state. You can find the corresponding tests under `src/providers/__tests__/Wallet.test.tsx`.
