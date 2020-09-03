/** @jsx jsx */
import React, { FC } from "react";
import { css, jsx } from "@emotion/core";

import { Backdrop, Button } from "@material-ui/core";

interface ResultOverlayProps {
  text: string;
  handleClose: () => void;
}
const ResultOverlay: FC<ResultOverlayProps> = (props) => {
  const { text, handleClose } = props;
  const open = !!text;

  const onClickSaveImage = (e: string) => {};

  const onClickShare = (e: string) => {};

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
        `}
      >
        {" "}
        <Button onClick={onClickSaveImage}>画像を保存</Button>
        <Button onClick={onClickShare}>Twitterでシェア</Button>
      </div>
    </Backdrop>
  );
};

export default ResultOverlay;
