import Head from 'next/head'
import '../styles/globals.css'

import { Web3ReactProvider, useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import ERC721Abi from '@openzeppelin/contracts/build/contracts/ERC721.json'
import CryptoSealsAbi from '../lib/cryptoseals.json'
import { CRYPTOSEALS, ERC721 } from '../lib/evm'
import { EthSWRConfig } from 'ether-swr'

function getLibrary(provider) {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

const ABIs = [
  [ERC721, ERC721Abi],
  [CRYPTOSEALS, CryptoSealsAbi]
]

function WalletProvider({ children }) {
  const { chainId, account, library, activate, active } = useWeb3React()

  return (
    <EthSWRConfig value={{ provider: library, ABIs: new Map(ABIs), refreshInterval: 30000 }}>
      {children}
    </EthSWRConfig>
  )
}

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <WalletProvider>
        <Head>
          <link rel="icon" href="/favicon.png" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@700&family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap" rel="stylesheet" />
        </Head>
        <Component {...pageProps} />
      </WalletProvider>
    </Web3ReactProvider>
  )
}

export default MyApp
