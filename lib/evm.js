/*
// thx for the example https://github.com/ava-labs/avalanche-wallet/blob/master/src/evm.ts
import Web3 from 'web3'

import ERC721Abi from '@openzeppelin/contracts/build/contracts/ERC721.json'
import ERC20Abi from '@openzeppelin/contracts/build/contracts/ERC20.json'

const abiDecoder = require('abi-decoder') // NodeJS

abiDecoder.addABI(ERC721Abi.abi)
abiDecoder.addABI(ERC20Abi.abi)

let rpcUrl = `https://api.avax.network/ext/bc/C/rpc`

let web3 = new Web3(rpcUrl)

export { web3, abiDecoder }
*/

export const CRYPTOSEALS = '0x0540E4EE0C5CdBA347C2f0E011ACF8651bB70Eb9'
export const ERC721 = '0x6b175474e89094c44da98b954eedeac495271d0f'
