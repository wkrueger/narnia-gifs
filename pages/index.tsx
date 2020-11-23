import Head from "next/head"
import Link from "next/link"
import React from "react"
import styles from "../styles/Home.module.css"
import { Footer } from "./_footer"

// export async function getStaticProps() {
//   const response = await datocmsRequest({
//     query: `query Home {
//     allBosses {
//       name
//       slug
//     }
//   }`,
//   })
//   return { props: { data: response } }
// }

export async function getStaticProps() {
  const { allBosses } = await import("./data/allBosses")
  return { props: { data: { allBosses } } }
}

interface Response {
  allBosses: { name: string; slug: string }[]
}

export default function Home({ data }: { data: Response }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Castle Narnia GIFs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1>Castle Nathria GIFs</h1>

        <div className="grid">
          {data.allBosses.map((boss) => (
            <Link href={`/boss/${boss.slug}`} key={boss.name}>
              <a className="card">
                <h3>{boss.name} &rarr;</h3>
              </a>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
