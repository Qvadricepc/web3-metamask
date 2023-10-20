# Frontend Developer Technical Task

## Implement an Ethereum based crypto wallet interface

The objective of this task is to create a web-based interface for a cryptocurrency wallet that allows users to oversee and manage their crypto assets. The interface is anticipated to enable the following features:

### Feature 1: Authentication & Connection with Blockchain Networks
The interface should offer a way of authenticating users via a crypto wallet. The minimum requirements are:
- Compatibility with Metamask.
- Support for both the Ethereum mainnet and Binance Smart Chain testnet.
- Handle cases when a user switches to an unsupported network.

### Feature 2: Display user's crypto assets
The interface should be able to display the current authenticated user's cryptocurrency portfolio, including:
- ETH, or any other major cryptocurrencies.
- CHR token (CHR tokens are valid on both BSC Testnet and ETH Mainnet, with a token contract address of `0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2`)

> **Note**: If necessary, please provide us with your wallet address so that we can transfer some dummy CHR to you on the Binance Smart Chain testnet for your implementation.

### Feature 3: Sending cryptocurrencies
The interface should allow an authenticated user to send cryptocurrencies to another wallet.

## Available Scripts

In the project directory, you can run the following scripts:

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run lint`: Runs eslint.
