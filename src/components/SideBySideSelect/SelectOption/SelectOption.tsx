import React, { MouseEventHandler, ReactNode } from 'react';
import { disabledItemDefaultTitle } from './constants';

import styles from './styles.module.scss';

export type Props = {
  onClick: MouseEventHandler<HTMLLIElement>;
  onDoubleClick: MouseEventHandler<HTMLLIElement>;
  isMarked?: boolean;
  isDisabled?: boolean;
  disabledItemTitle?: string;
  children: ReactNode;
};

const SelectOption = ({
  onClick,
  onDoubleClick,
  isMarked = false,
  isDisabled = false,
  disabledItemTitle = disabledItemDefaultTitle,
  children,
}: Props): JSX.Element => {
  const dependentProps = {
    onClick,
    onDoubleClick,
  };

  return (
    <li
      className={`${styles.SelectOption} ${isMarked ? styles.Marked : ''} ${isDisabled ? styles.Disabled : ''}`}
      {...(isDisabled ? { title: disabledItemTitle } : { ...dependentProps })}
    >
      {children}
    </li>
  );
};

export default SelectOption;
