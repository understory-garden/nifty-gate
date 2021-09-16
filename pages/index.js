import { useMemo } from 'react'
import Head from 'next/head'
import { getUrl, getStringNoLocale } from '@inrupt/solid-client'

import NoteBody from '../components/NoteBody'
import { loadConcept, loadPublicGnomeConfig, UG } from 'gatekit'
import { getPaymentPointer } from '../monetization'
import useEtherSWR from 'ether-swr'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { formatEther, formatUnits } from '@ethersproject/units'
import useSWR from 'swr'
import { CRYPTOSEALS } from '../lib/evm'

export const Networks = {
  MainNet: 1,
  Ropsten: 3,
  Rinkeby: 4,
  Goerli: 5,
  Kovan: 42,
  Avalanche: 43114
}

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    Networks.MainNet, // Mainet
    Networks.Ropsten, // Ropsten
    Networks.Rinkeby, // Rinkeby
    Networks.Goerli, // Goerli
    Networks.Kovan, // Kovan,
    Networks.Avalanche // Avalanche
  ]
})

export async function getStaticProps(context) {
  const gnomeConfigUrl = process.env.GNOME_CONFIG_URL
  console.log(`building single page gate with ${gnomeConfigUrl}`)
  const { config } = await loadPublicGnomeConfig(gnomeConfigUrl)
  console.log(`using config ${config}`)
  const conceptPrefix = getStringNoLocale(config, UG.conceptPrefix)
  const tagPrefix = getStringNoLocale(config, UG.tagPrefix)
  const conceptUrl = getUrl(config, UG.usesConcept)
  const conceptIndexUrl = getUrl(config, UG.usesConceptIndex)
  const { name, body } = await loadConcept(conceptIndexUrl, conceptUrl)
  const customCSS = getStringNoLocale(config, UG.usesCSS)
  const webId = getUrl(config, UG.monetizedFor)
  const paymentPointer = webId && await getPaymentPointer(webId)
  return {
    props: {}, // will be passed to the page component as props
    revalidate: 10
  }
}
//balance && parseFloat(formatUnits(balance, 18)).toPrecision(4)

function NFT({uri}){
  const { data: json } = useSWR(uri)
  return (
    <div>
      {json && <img src={json.image}/>}
    </div>
  )
}

function NFTs() {
  const { account } = useWeb3React()
  const owner = account
  const { data: balance, ...rest } = useEtherSWR([CRYPTOSEALS, 'balanceOf', owner])

  const n = balance ? balance.toNumber() : 0
  const calls = useMemo(() => [...Array(n).keys()].map(
    (_, i) => [CRYPTOSEALS, 'tokenOfOwnerByIndex', owner, i]
  ), [n])

  const { data: nftsIds } = useEtherSWR(calls || [])

  const uriCalls = useMemo(() => nftsIds && nftsIds.map(
    (id) => [CRYPTOSEALS, 'tokenURI', id]
  ), [nftsIds])

  const { data: nftURIs } = useEtherSWR(uriCalls || [])

  return (
    <div>
      <ul>
      {nftURIs && (nftURIs.map(
        uri => (<li key={uri}><NFT uri={uri} /></li>)
      ))}
      </ul>
    </div>
  )
}

export default function Home({ tagPrefix, conceptPrefix, name, body, customCSS, paymentPointer }) {
  const { activate, active } = useWeb3React()

  return (
    <>
      <Head>
        <title>{name}</title>
        {paymentPointer && (
          <meta name="monetization" content={paymentPointer} />
        )}
        {customCSS && (
          <style>{customCSS}</style>
        )}
      </Head>
      <main className="min-h-screen">
        <section className="content">
          <button onClick={() => activate(injectedConnector)}>connect wallet</button>
          <h1 className="title">
            {name}
          </h1>
          {active && <NFTs />}
          <div className="note-body">
            {/*<NoteBody json={body} conceptPrefix={conceptPrefix} tagPrefix={tagPrefix}/>*/}
          </div>
        </section>
      </main>
    </>
  )
}
