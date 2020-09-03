/** @jsx jsx */
import { useState } from "react";
import Head from "next/head";

import { jsx, css } from "@emotion/core";

import { IconButton } from "@material-ui/core";
import { HelpOutline as HelpIcon } from "@material-ui/icons";

import styles from "../styles/Home.module.css";
import TicketingMachine from "../src/components/TicketingMachine";
import ResultOverlay from "../src/components/ResultOverlay";
import HelpDialog from "../src/components/HelpDialog";

const title = "ラブライブ！レプリカチケット発券機";
const description = `レプリカチケットの発券をサポートするアプリです。Aqoursのライブに行こう！！`;
const keywords = "ラブライブ！,LoveLive！,Aqours";
const trackingCode = "UA-127664761-7";

export default function Home() {
  const [inputText, setInputText] = useState(null);
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);

  const handleHelpDialog = () => {
    // @ts-ignore
    window.gtag("event", "help");

    setHelpDialogOpen((prev) => !prev);
  };

  const handleResultOverlay = () => {
    setInputText(null);
  };

  const issueTicket = (text) => {
    setInputText(text);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />

        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width,initial-scale=1" />

        <meta property="og:title" content={title} />
        <meta property="og:site_name" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://replica-ticket.web.app/" />
        <meta
          property="og:image"
          content="https://replica-ticket.web.app/images/ogp.jpg"
        />
        <meta property="og:description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />

        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${trackingCode}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${trackingCode}');
          `,
          }}
        />
      </Head>

      <IconButton
        onClick={handleHelpDialog}
        css={css`
          position: fixed !important;
          top: 10px;
          right: 10px;
        `}
      >
        <HelpIcon />
      </IconButton>

      <main className={styles.main}>
        <TicketingMachine onIssueTicket={issueTicket} />

        <div className={styles.grid}>
          <a
            href="http://www.lovelive-anime.jp/uranohoshi/news.php?id=6728"
            target="_blank"
            className={styles.card}
          >
            <p>Aqoursへ声援を</p>
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
      <HelpDialog open={helpDialogOpen} handleClose={handleHelpDialog} />
    </div>
  );
}
