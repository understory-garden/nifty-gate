import Head from 'next/head'

import NoteBody from '../components/NoteBody'
import { loadNote } from '../gatekit'

export async function getStaticProps(context) {
  const conceptPrefix = "https://understory.garden/u/understory.myunderstory.com/default/"
  const noteUri = "https://understory.myunderstory.com/public/apps/understory/garden/workspace/default/notes/YsaqBTypPYnvPocUmsTQbCHLLMZogx.ttl#concept"
  const { name, body } = await loadNote(noteUri)
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
