import React, { MouseEventHandler, ReactNode } from "react";
// import { Button } from 'react-bootstrap';

import styles from "./styles.module.scss";

type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  content: ReactNode;
  disabled?: boolean;
  testID: string;
};

const SelectActionButton = ({ onClick, content, disabled = false, testID }: Props): JSX.Element => (
  <button
    className={`${styles.Button} ${disabled ? styles.Disabled : ""}`}
    onClick={onClick}
    // size="sm"
    // variant="light"
    disabled={disabled}
    data-testid={testID}
  >
    {content}
  </button>
);

export default SelectActionButton;
