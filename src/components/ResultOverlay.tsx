/** @jsx jsx */
import React, { FC, MouseEvent, useRef } from "react";
import { css, jsx } from "@emotion/core";

import { Backdrop, Button } from "@material-ui/core";
import domtoimage from "dom-to-image";

interface ResultOverlayProps {
  text: string;
  handleClose: () => void;
}
const ResultOverlay: FC<ResultOverlayProps> = (props) => {
  const { text, handleClose } = props;
  const open = !!text;
  const ticketRef = useRef(null);

  const onClickSaveImage = (e: MouseEvent) => {
    e.stopPropagation();

    domtoimage
      .toJpeg(ticketRef.current, { quality: 0.95 })
      .then(function (dataUrl) {
        const link = document.createElement("a");
        link.download = "my-image-name.jpeg";
        link.href = dataUrl;
        link.click();
      });
  };

  const onClickShare = (e: MouseEvent) => {
    e.stopPropagation();
    const baseUrl = `https://twitter.com/intent/tweet`;
    const text = encodeURIComponent(
      `「Aqours Back In 5th LoveLive! ～Next SPARKLING!!～」に向けて、レプリカチケットの発券しよう！`
    );
    const hashtags = ["lovelive", "そこんところ工房"].join(",");
    const url = encodeURIComponent(``);

    window.open(`${baseUrl}?text=${text}&hashtags=${hashtags}&url=${url}`);
  };

  return (
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
        <Button variant="contained" onClick={onClickSaveImage}>
          画像を保存
        </Button>
        <Button variant="contained" onClick={onClickShare}>
          Twitterでシェア
        </Button>
      </div>
    </Backdrop>
  );
};

export default ResultOverlay;
