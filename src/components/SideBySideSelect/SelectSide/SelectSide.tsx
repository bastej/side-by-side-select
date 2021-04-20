import React, { MouseEventHandler, ReactNode } from 'react';

import styles from './styles.module.scss';

type Props = {
  onClick: MouseEventHandler<HTMLDivElement>;
  isActive?: boolean;
  header: string;
  errorOccurred?: boolean;
  children?: ReactNode;
  testID?: string;
};

const SelectSide = ({
  onClick,
  isActive = false,
  header,
  children,
  errorOccurred = false,
  testID,
}: Props): JSX.Element => (
  <div
    className={`${styles.SideContainer} ${errorOccurred ? styles.Error : ''}`}
    onClick={onClick}
    data-testid={testID}
  >
    <div className={styles.SideHeader} style={isActive ? { fontWeight: 'bold' } : {}} data-testid="side-header">
      {header}
    </div>
    {children}
  </div>
);

export default SelectSide;
