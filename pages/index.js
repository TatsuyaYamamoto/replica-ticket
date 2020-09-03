/** @jsx jsx */
import { useState } from "react";
import Head from "next/head";

import { jsx } from "@emotion/core";

import styles from "../styles/Home.module.css";
import TicketingMachine from "../src/components/TicketingMachine";
import ResultOverlay from "../src/components/ResultOverlay";

export default function Home() {
  const [inputText, setInputText] = useState(null);

  const handleResultOverlay = () => {
    setInputText(null);
  };

  const issueTicket = (text) => {
    setInputText(text);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Out Ticketing</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <TicketingMachine onIssueTicket={issueTicket} />

        <div className={styles.grid}>
          <a
            href="http://www.lovelive-anime.jp/uranohoshi/news.php?id=6728"
            target="_blank"
            className={styles.card}
          >
            <p>Aqours声援を</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <a href="http://www.sokontokoro-factory.net/" target="_blank">
            そこんところ工房
          </a>
        </a>
      </footer>

      <ResultOverlay text={inputText} handleClose={handleResultOverlay} />
    </div>
  );
}
