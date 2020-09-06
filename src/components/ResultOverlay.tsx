/** @jsx jsx */
import React, { FC, MouseEvent, useRef, useState } from "react";
import { css, jsx } from "@emotion/core";

import { Backdrop, Button, CircularProgress } from "@material-ui/core";
import {
  createTicketImage,
  downloadFileWithDom,
  issueTwitterIntent,
  uploadMedia,
} from "../utils/networks";
import { imageToBase64 } from "../utils/io";

interface ResultOverlayProps {
  text: string;
  handleClose: () => void;
}
const ResultOverlay: FC<ResultOverlayProps> = (props) => {
  const { text, handleClose } = props;
  const open = !!text;
  const ticketRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  const onClickSaveImage = (e: MouseEvent) => {
    // @ts-ignore
    window.gtag("event", "save", {
      label: text,
    });

    e.stopPropagation();

    setDownloading(true);

    createTicketImage(text)
      .then((file) => {
        const name = `ticket_${text}_${Date.now()}.jpeg`;
        downloadFileWithDom(file, name);
        setDownloading(false);
      })
      .catch((e) => {
        console.error(e);
        setDownloading(false);
      });
  };

  const onClickShare = (e: MouseEvent) => {
    // @ts-ignore
    window.gtag("event", "share", {
      label: text,
    });

    e.stopPropagation();
    issueTwitterIntent(text);
  };

  const onClickShareWithImage = () => {
    // @ts-ignore
    window.gtag("event", "share-with-image", {
      label: text,
    });

    setDownloading(true);

    createTicketImage(text)
      .then((file) => imageToBase64(file))
      .then((mediaData) => uploadMedia(mediaData))
      .then((res) => res.json())
      .then(({ mediaUrl }) => {
        issueTwitterIntent(text, mediaUrl);
        setDownloading(false);
      })
      .catch((e) => {
        console.error(e);
        setDownloading(false);
      });
  };

  return (
    <>
      <Backdrop
        open={open}
        onClick={handleClose}
        css={css`
          z-index: 100 !important;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <div
          css={css`
            position: fixed;
            top: 10px;
            color: white;
            text-align: center;
          `}
        >
          <div
            css={css`
              font-size: 30px;
            `}
          >
            発券完了！
          </div>
          <div
            css={css`
              font-size: 16px;
            `}
          >
            レプリカチケットを保存して、Twitterでシェアしよう！
          </div>
        </div>
        <div
          ref={ticketRef}
          css={css`
            position: relative;
            width: 90%;
          `}
        >
          <img
            src={`/images/ticket_base.jpg`}
            css={css`
              width: 100%;
            `}
          />
          <span
            css={css`
              position: absolute;
              font-size: 1.5vw;
              top: 83%;
              left: 66%;
              white-space: nowrap;
            `}
          >
            {text}
          </span>
          <span
            css={css`
              position: absolute;
              font-size: 1.5vw;
              top: 85%;
              left: 85%;
              white-space: nowrap;
            `}
          >
            {text}
          </span>
        </div>
        <div
          css={css`
            position: fixed;
            bottom: 0;
            margin: 20px 0;
            width: 100%;

            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
          `}
        >
          <Button
            variant="contained"
            color="primary"
            css={css`
              margin: 10px;
            `}
            onClick={onClickSaveImage}
          >
            画像を保存
          </Button>
          <Button
            variant="contained"
            color="primary"
            css={css`
              margin: 10px;
              text-transform: none !important;
            `}
            onClick={onClickShare}
          >
            Twitterでシェア
          </Button>
          <Button
            variant="contained"
            color="primary"
            css={css`
              margin: 10px;
              text-transform: none !important;
            `}
            onClick={onClickShareWithImage}
          >
            画像つきでTwitterでシェア
          </Button>
        </div>
      </Backdrop>
      <Backdrop
        open={downloading}
        css={css`
          z-index: 200 !important;
        `}
      >
        <CircularProgress
          css={css`
            color: white;
          `}
        />
      </Backdrop>
    </>
  );
};

export default ResultOverlay;
