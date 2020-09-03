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

  const onClickSaveImage = (e:string) => {};

  const onClickShare = (e:string) => {};

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
      <img
        src={`/images/ticket_base.jpg`}
        css={css`
          max-width: 90%;
        `}
      />
      <span
        css={css`
          position: absolute;
          top: 55%;
          left: 70%;
        `}
      >
        {text}
      </span>

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
