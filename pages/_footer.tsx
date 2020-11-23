import styles from "../styles/Home.module.css"

export function Footer() {
  return (
    <footer className={styles.footer}>
      <style jsx>{`
        .footertext {
          flex-basis: 90%;
          text-align: center;
          margin-bottom: 0.5rem;
        }
      `}</style>
      <div className="footertext">Videos by schlimmy @ Occasional Excellence</div>
      <Links />
    </footer>
  )
}

export function Links() {
  return (
    <>
      <style jsx>{`
        a {
          display: inline-block;
          margin: 0 1rem;
        }
      `}</style>
      <a
        href="https://docs.google.com/spreadsheets/d/e/2PACX-1vSbV1-T1yCHUIRFcpu-dui1ENcXlVV94C89hYOTIYd5t-l7inoOG67y372O6ZTqy4yG5pw2dzUPuyJT/pubhtml?gid=0&single=true"
        target="_blank"
        rel="noopener noreferrer"
      >
        Spreadsheet
      </a>{" "}
      |
      <a
        href="https://www.reddit.com/r/CompetitiveWoW/comments/jwtru9/castle_nathria_strat_gifs/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Reddit Thread
      </a>{" "}
      |
      <a href="https://twitch.tv/schlimmy" target="_blank" rel="noopener noreferrer">
        Twitch
      </a>{" "}
      |
      <a
        href="https://github.com/wkrueger/castle-narnia-gifs"
        target="_blank"
        rel="noopener noreferrer"
      >
        Website Source
      </a>{" "}
    </>
  )
}
