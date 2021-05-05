import Head from 'next/head'
import { getUrl, getStringNoLocale } from '@inrupt/solid-client'

import NoteBody from '../components/NoteBody'
import { loadConcept, loadPublicGnomeConfig, UG } from '../gatekit'

export async function getStaticProps(context) {
  const gnomeConfigUrl = process.env.GNOME_CONFIG_URL
  const { config } = await loadPublicGnomeConfig(gnomeConfigUrl)
  const conceptPrefix = getStringNoLocale(config, UG.conceptPrefix)
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
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <main>
        <h1 className="title">
          {name}
        </h1>
        <div className="note-body">
          <NoteBody json={body} conceptPrefix={conceptPrefix} />
        </div>
      </main>
    </>
  )
}
