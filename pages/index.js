import Head from 'next/head'
import { getUrl } from '@inrupt/solid-client'

import NoteBody from '../components/NoteBody'
import { loadConcept, loadPublicGnomeConfig, UG } from '../gatekit'

export async function getStaticProps(context) {
  const gnomeConfigUrl = process.env.GNOME_CONFIG_URL
  const { config } = await loadPublicGnomeConfig(gnomeConfigUrl)
  const conceptPrefix = getUrl(config, UG.conceptPrefix)
  const conceptUrl = getUrl(config, UG.usesConcept)
  const conceptIndexUrl = getUrl(config, UG.usesConceptIndex)
  const { name, body } = await loadConcept(conceptIndexUrl, conceptUrl)
  return {
    props: { conceptPrefix, name, body }, // will be passed to the page component as props
    revalidate: 10
  }
}

export default function Home({ conceptPrefix, name, body }) {
  return (
    <div className="">
      <Head>
        <title>{name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="px-20 mt-12 min-h-screen">
        <h1 className="text-6xl font-bold font-serif mb-12">
          {name}
        </h1>
        <NoteBody json={body} conceptPrefix={conceptPrefix} />
      </main>
    </div>
  )
}
