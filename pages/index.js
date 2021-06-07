import Head from 'next/head'
import { getUrl, getStringNoLocale } from '@inrupt/solid-client'

import NoteBody from '../components/NoteBody'
import { loadConcept, loadPublicGnomeConfig, UG } from 'gatekit'
import { getPaymentPointer } from '../monetization'

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
    props: { tagPrefix, conceptPrefix, name, body, customCSS, paymentPointer }, // will be passed to the page component as props
    revalidate: 10
  }
}

export default function Home({ tagPrefix, conceptPrefix, name, body, customCSS, paymentPointer }) {
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
        <section class="content">
          <h1 className="title">
            {name}
          </h1>
          <div className="note-body">
            <NoteBody json={body} conceptPrefix={conceptPrefix} tagPrefix={tagPrefix}/>
          </div>
        </section>
      </main>
    </>
  )
}
