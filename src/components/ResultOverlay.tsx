/** @jsx jsx */
import React, { FC, MouseEvent, useRef, useState } from "react";
import { css, jsx } from "@emotion/core";

import { Backdrop, Button, CircularProgress } from "@material-ui/core";

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
    const name = `ticket_${text}_${Date.now()}.jpeg`;
    const url = `https://us-central1-replica-ticket.cloudfunctions.net/createImage?text=${text}`;

    const request = new XMLHttpRequest();
    request.responseType = "blob";
    request.open("GET", url);
    request.addEventListener("load", function () {
      const file = request.response;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(file);
      a.download = name;
      a.click();
      setDownloading(false);
    });
    request.addEventListener("error", function (e) {
      console.error(e);
      setDownloading(false);
    });
    request.send();
  };

  const onClickShare = (e: MouseEvent) => {
    // @ts-ignore
    window.gtag("event", "share", {
      label: text,
    });

    e.stopPropagation();
    const baseUrl = `https://twitter.com/intent/tweet`;
    const t = encodeURIComponent(
      `座席「${text}」のチケットを発券しました！
      
「Aqours Back In 5th LoveLive! ～Next SPARKLING!!～」に向けて、レプリカチケットの発券しよう！

`
    );
    const hashtags = [
      "lovelive",
      "そこんところ工房",
      "レプリカチケット発券機",
    ].join(",");
    const url = encodeURIComponent(`https://replica-ticket.web.app/`);

    window.open(`${baseUrl}?text=${t}&hashtags=${hashtags}&url=${url}`);
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
            justify-content: space-around;
          `}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={onClickSaveImage}
          >
            画像を保存
          </Button>
          <Button
            variant="contained"
            color="primary"
            css={css`
              text-transform: none !important;
            `}
            onClick={onClickShare}
          >
            Twitterでシェア
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
