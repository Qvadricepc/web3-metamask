Ethereum Crypto Wallet Interface
This repository contains a web-based interface for an Ethereum-based cryptocurrency wallet. The wallet allows users to oversee and manage their crypto assets.

Features
1. Authentication & Connection with Blockchain Networks
   Compatibility with Metamask.
   Support for both the Ethereum mainnet and Binance Smart Chain testnet.
   Handle cases when a user switches to an unsupported network.
2. Display User's Crypto Assets
   The interface showcases the authenticated user's cryptocurrency portfolio:

Major cryptocurrencies like ETH.
CHR token (available on both BSC Testnet and ETH Mainnet).
3. Sending Cryptocurrencies
   Allows authenticated users to send cryptocurrencies to other wallets.

Project Structure
bash
Copy code
/src
/components
Auth.tsx           # Component for authentication
Portfolio.tsx      # Component to display user's assets
SendCrypto.tsx     # Component to send cryptocurrencies
Available Scripts
To set up and run the project:

Install dependencies:
bash
Copy code
npm install
Start the development server:
bash
Copy code
npm run dev
Build the application for production:
bash
Copy code
npm run build
Check code formatting and issues:
bash
Copy code
npm run lint
Note for Testers
If testing the CHR token functionality is necessary, please provide your wallet address to receive dummy CHR tokens on the Binance Smart Chain testnet.
