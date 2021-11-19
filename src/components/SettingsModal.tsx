import React, { useState } from "react";
import styled from "styled-components";

import { IGameSettings } from "../types";
import RadioGroup from "./RadioGroup";
import Button from "./Button";

export default function SettingsModal(props: {
  changeSettings: (settings: IGameSettings) => void;
  onClose: () => void;
}) {
  // TODO: move default settings somewhere else
  const [players, setPlayers] = useState(1);
  const [size, setSize] = useState(4);

  return (
    <ModalWrapper>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          props.changeSettings({ players, size });
          props.onClose();
        }}
      >
        <RadioGroup
          label={"Number of Players"}
          options={[
            { label: "1", value: 1 },
            { label: "2", value: 2 },
            { label: "3", value: 3 },
            { label: "4", value: 4 },
          ]}
          onChange={(value) => {
            setPlayers(value);
          }}
        />
        <RadioGroup
          label={"Grid Size"}
          options={[
            { label: "4x4", value: 4 },
            { label: "6x6", value: 6 },
          ]}
          onChange={(value) => {
            setSize(value);
          }}
        />
        <Button fullWidth>Start game</Button>
      </Form>
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div`
  position: absolute;
  z-index: 100;
  display: grid;
  place-items: center;
  background: #162938;
  height: 100vh;
  width: 100vw;
  padding: 1em;
  font-size: 1rem;
`;

const Form = styled.form`
  background: white;
  border-radius: 10px;
  padding: 1em;
  font-weight: bold;

  & > * + * {
    margin-top: 1em;
  }
`;
