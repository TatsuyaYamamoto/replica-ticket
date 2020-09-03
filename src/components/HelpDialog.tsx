import React, { FC } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { TwitterTweetEmbed } from "react-twitter-embed";

interface HelpDialogProps {
  open: boolean;
  handleClose: () => void;
}

const HelpDialog: FC<HelpDialogProps> = (props) => {
  const { open, handleClose } = props;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{`ラブライブ！レプリカチケット発券機`}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <p>
            ここは、ラブライブ！を応援するためにラブライバーが作成した、レプリカチケットの発行をサポートするウェブサイトです。
            ラブライブ公式とは一切関係がありません。
            <br />
            <br />
            レプリカチケットを発券して、「Aqours Back In 5th LoveLive! ～Next
            SPARKLING!!～」に備えましょう！
          </p>
          <TwitterTweetEmbed tweetId={"1301444948298887168"} />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HelpDialog;
