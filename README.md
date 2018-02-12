# QtumJS Wallet

This is a client-side wallet library that can generate private keys from a mnemonic, or import private keys from other QTUM wallets.

It can sign transactions locally, and submit the raw transaction data to a remote qtum node. The blockchain data is provided by the Insight API (which powers https://explorer.qtum.org/), rather than the raw qtumd RPC calls.

This library makes it possible to run DApp without the users having to run a full qtumd node.

> This library is extracted from the official [QTUM web wallet](https://github.com/qtumproject/qtum-web-wallet).

## Install

```
yarn add qtumjs-wallet
```

## Implementation Notes

There are some differences from the original web wallet repo.

* Removed VUE specific code.
* Removed reactive data setters that are intended to trigger view updates, to make this a plain-old JavaScript module.
* Each wallet instance is instantiated with a network explicitly. This allows simultaneous use of different networks.
* TypeScript for type hinting.

# Example

This example restores a wallet from a private key (in [WIF](https://en.bitcoin.it/wiki/Wallet_import_format) format), then sending value to another address.

The transaction is signed locally, and the transaction submitted to a remote API.

```js
import { networks } from "qtumjs-wallet"

async function main() {
  // Use the test network. Or `networks.mainnet`
  const network = networks.testnet

  const wif = "cU4ficvRNvR7jnbtczCWo5s9rB9Tdg1U4LkArVpGU6cKnDq7LFoP"
  const wallet = network.fromWIF(wif)

  console.log(wallet.address)

  const toAddr = "qS3ThpDn4HRH9we2hZUdF3F3uR7TTvpZ9v"
  const sendtx = await wallet.send(toAddr, 1, 0.01)
  console.log("sendtx", sendtx)
}

main().catch((err) => console.log(err))
```

# Networks

Two networks are predefined:

```js
import { networks } from "qtumjs-wallet"

// Main Network
networks.mainnet

// Test Network
networks.testnet
```

## fromWIF

`fromWIF` restores a wallet from private key (in [WIF](https://en.bitcoin.it/wiki/Wallet_import_format) format).

Suppose you want to import the public address `qg3HYD8c4bAVLeEzA9t3Ken3Y3Mni1HZSS`. Use `qtum-cli` to dump the private key from wallet:

```
qcli dumpprivkey qg3HYD8c4bAVLeEzA9t3Ken3Y3Mni1HZSS

cVHzWuEKUxoRKba9ySZFqUKZ9G5W8NkzthRcPaB65amUJs95RM3d
```

```js
const wallet = network.fromWIF(wif)
```