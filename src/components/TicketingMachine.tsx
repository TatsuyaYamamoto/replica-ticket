/** @jsx jsx */
import React, { ChangeEvent, FC, useMemo, useState } from "react";
import { css, jsx } from "@emotion/core";

import { TextField, Button } from "@material-ui/core";

interface TicketingMachineProps {
  onIssueTicket: (text: string) => void;
}

const TicketingMachine: FC<TicketingMachineProps> = (props) => {
  const { onIssueTicket } = props;
  const [inputValue, setInputValue] = useState("");
  const canIssue = useMemo(() => inputValue !== "", [inputValue]);

  const onClickButton = () => {
    if (!canIssue) {
      return;
    }

    onIssueTicket(inputValue);
  };

  const onChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div
      css={css`
        background-color: rgb(46, 154, 234);
        border-radius: 30px 30px 0 0;
        padding: 30px 30px 100px;
      `}
    >
      <div
        css={css`
          background-color: black;
          border-radius: 10px;
          padding: 30px;
        `}
      >
        <div
          css={css`
            width: 400px;
            height: 300px;

            display: flex;
            justify-content: center;
            align-items: center;

            background-color: #fafafa;
          `}
        >
          <div>
            <TextField value={inputValue} onChange={onChange} />
            <br />
            <br />
            <Button
              variant="outlined"
              fullWidth={true}
              disabled={!canIssue}
              onClick={onClickButton}
            >
              発券
            </Button>
          </div>
        </div>
      </div>
      <div
        css={css`
          margin-top: 10px;
          text-align: center;
        `}
      >
        <span
          css={css`
            color: white;
          `}
        >
          Aqouポート
        </span>
      </div>
    </div>
  );
};

export default TicketingMachine;
