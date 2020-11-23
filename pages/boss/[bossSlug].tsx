import classnames from "classnames"
import Head from "next/head"
import Link from "next/link"
import React, { useState } from "react"
import { datocmsRequest } from "../../lib/datocmsRequest"
import homeStyles from "../../styles/Home.module.css"
import { Footer } from "../_footer"

// export async function getStaticPaths() {
//   const allbossesResp = await datocmsRequest({
//     query: `query Home {
//     allBosses {
//       slug
//     }
//   }`,
//   })
//   const paths = allbossesResp.allBosses.map((boss) => ({ params: { bossSlug: boss.slug } }))
//   return {
//     paths,
//     fallback: false,
//   }
// }

export async function getStaticPaths() {
  const { allBosses } = await import("../data/allBosses")
  const paths = allBosses.map((boss) => ({ params: { bossSlug: boss.slug } }))
  return { paths, fallback: false }
}

// export async function getStaticProps({ params }) {
//   const bossSlug = params.bossSlug
//   const { boss } = await datocmsRequest({
//     query: `query BossId($slug: String) {
//       boss(filter: {slug: {eq: $slug}}) {
//         id
//         name
//       }
//     }
//     `,
//     variables: { $slug: bossSlug },
//   })
//   // console.log("boss", boss)
//   if (!boss) {
//     return { notFound: true }
//   }
//   const { allMediaitems } = await datocmsRequest({
//     query: `query Mediaq($bossId: ItemId) {
//       allMediaitems(filter: {boss: {eq: $bossId}}) {
//         id
//         title
//         comment
//         videoLink
//       }
//     }`,
//     variables: { bossId: boss.id },
//   })
//   // console.log("items", allMediaitems)
//   const out: Response = { allMediaitems, boss }
//   return { props: out }
// }

export async function getStaticProps({ params }) {
  const { allBosses } = await import("../data/allBosses")
  const { allMediaitems: mediaitemsDb } = await import("../data/mediaItems")
  console.log({ mediaitemsDb })
  const bossSlug = params.bossSlug
  const boss = allBosses.find((boss) => boss.slug === bossSlug)
  if (!boss) return { notFound: true }
  const allMediaitems = mediaitemsDb.filter((item) => item.boss.slug == bossSlug)
  const out: Response = { allMediaitems, boss }
  return { props: out }
}

interface Response {
  allMediaitems: { title; comment; videoLink }[]
  boss: { name }
}

export default function BossDetail(i: Response) {
  const [selectedMedium, setSelectedMedium] = useState<Response["allMediaitems"][0] | null>(
    i.allMediaitems[0] || null
  )

  return (
    <div className={homeStyles.container}>
      <Head>
        <title>{i.boss.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <div className="title-row">
          <h1 className={classnames(homeStyles.title, "hgrow")}>{i.boss.name}</h1>
        </div>

        <ul className="items-list">
          <li>
            <Link href="/">
              <button>&larr; Back</button>
            </Link>
          </li>
          {i.allMediaitems.map((medium) => (
            <li key={medium.title}>
              <button
                onClick={() => setSelectedMedium(medium)}
                className={classnames(selectedMedium === medium && "selected")}
              >
                {medium.title}
              </button>
            </li>
          ))}
        </ul>

        {selectedMedium && (
          <>
            {(selectedMedium.comment && <p>{selectedMedium.comment}</p>) || null}
            {selectedMedium.videoLink && (
              <video src={selectedMedium.videoLink} playsInline controls autoPlay />
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}
