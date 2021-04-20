import React, { useState, useEffect, HTMLAttributes } from "react";

import styles from "./SideBySideSelect.module.scss";

import SelectOption from "./SelectOption/SelectOption";
import SelectSide from "./SelectSide/SelectSide";
import SelectActionButton from "./SelectActionButton/SelectActionButton";
import {
  allItemsDefaultHeader,
  ALL_OPTIONS_SIDE,
  CHOSEN_OPTIONS_SIDE,
  selectedItemsDefaultHeader,
} from "./constants";

type ActiveSide = typeof ALL_OPTIONS_SIDE | typeof CHOSEN_OPTIONS_SIDE | "";
type SideBySideSelectTexts = {
  selectedItemsHeader: string;
  allItemsHeader: string;
};

export type Props<Type> = {
  label: string;
  allOptions: Type[];
  disabledOptions?: Type[];
  initialSelectedOptions?: Type[];
  errorOccurred?: boolean;
  rootElementProps?: HTMLAttributes<HTMLDivElement>;
  sortOptions?: boolean;
  texts: SideBySideSelectTexts;
  onChange(value: Type[]): void;
};

function SideBySideSelect<T>({
  label,
  allOptions,
  disabledOptions = [],
  initialSelectedOptions = [],
  errorOccurred = false,
  onChange,
  rootElementProps,
  sortOptions = false,
  texts: {
    selectedItemsHeader = selectedItemsDefaultHeader,
    allItemsHeader = allItemsDefaultHeader,
  },
}: Props<T>) {
  const [selectedItems, setSelectedItems] = useState<T[]>(initialSelectedOptions);
  const [markedItems, setMarkedItems] = useState<T[]>([]);
  const [activeSide, setActiveSide] = useState<ActiveSide>("");

  useEffect(() => {
    onChange(selectedItems);
  }, [selectedItems]);

  useEffect(() => {
    setMarkedItems([]);
  }, [activeSide]);

  function selectItems(items: T[]): void {
    const updatedSelectedItems = [...selectedItems, ...items];

    setSelectedItems(updatedSelectedItems);
    setMarkedItems([]);
  }

  function deselectItems(items: T[]) {
    const updatedSelectedItems =
      selectedItems && selectedItems.filter((el: T) => !items.includes(el));

    setSelectedItems(updatedSelectedItems);
    setMarkedItems([]);
  }

  function markItem(item: T): void {
    setMarkedItems([...markedItems, item]);
  }

  function unmarkItem(item: T): void {
    const updatedItems: T[] = markedItems.filter((el: T) => el !== item);

    setMarkedItems(updatedItems);
  }

  function renderAllItem(): JSX.Element {
    const itemsToShow = allOptions && allOptions.filter((item) => !selectedItems.includes(item));

    if (sortOptions && itemsToShow) {
      itemsToShow.sort();
    }

    return (
      <ul className={styles.List}>
        {itemsToShow &&
          itemsToShow.map((item: T, i) => {
            const isMarked: boolean = markedItems.includes(item);
            const isDisabled: boolean = disabledOptions.includes(item);

            return (
              <SelectOption
                key={`${item}_${i}`}
                onClick={(): void => {
                  if (isMarked) {
                    unmarkItem(item);
                  } else {
                    markItem(item);
                  }
                }}
                onDoubleClick={() => selectItems([item])}
                isMarked={isMarked}
                isDisabled={isDisabled}
              >
                {item}
              </SelectOption>
            );
          })}
      </ul>
    );
  }

  function renderSelectedItems(): JSX.Element {
    const itemsToShow = selectedItems;

    if (sortOptions && itemsToShow) {
      itemsToShow.sort();
    }

    return (
      <ul className={styles.List}>
        {selectedItems &&
          selectedItems.map((item: T, i) => {
            const isMarked = markedItems.includes(item);

            return (
              <SelectOption
                key={`${item}_${i}`}
                onClick={(): void => {
                  if (isMarked) {
                    unmarkItem(item);
                  } else {
                    markItem(item);
                  }
                }}
                onDoubleClick={() => deselectItems([item])}
                isMarked={isMarked}
              >
                {item}
              </SelectOption>
            );
          })}
      </ul>
    );
  }

  return (
    <div {...rootElementProps}>
      {label}
      <div className={styles.SideBySideSelect}>
        <SelectSide
          onClick={(): void => {
            setActiveSide(ALL_OPTIONS_SIDE);
          }}
          isActive={activeSide === ALL_OPTIONS_SIDE}
          header={allItemsHeader}
          errorOccurred={errorOccurred}
          testID="left-side"
        >
          {renderAllItem()}
        </SelectSide>
        <div className={styles.ButtonContainer}>
          <SelectActionButton
            onClick={(): void => {
              selectItems(markedItems);
            }}
            content=">"
            disabled={!!(markedItems.length === 0 || activeSide !== ALL_OPTIONS_SIDE)}
            testID="moveToRightButton"
          />
          <SelectActionButton
            onClick={(): void => {
              // select all items except disabled and already added ones
              const itemsToShow: T[] =
                allOptions &&
                allOptions.filter(
                  (item) => !disabledOptions.includes(item) && !selectedItems.includes(item)
                );

              selectItems(itemsToShow);
            }}
            content=">>"
            testID="moveAllToRightButton"
          />
          <SelectActionButton
            onClick={(): void => {
              deselectItems(markedItems);
            }}
            content="<"
            disabled={!!(markedItems.length === 0 || activeSide !== CHOSEN_OPTIONS_SIDE)}
            testID="moveToLeftButton"
          />
          <SelectActionButton
            onClick={(): void => {
              setSelectedItems([]);
            }}
            content="<<"
            testID="moveAllToLeftButton"
          />
        </div>
        <SelectSide
          onClick={(): void => {
            setActiveSide(CHOSEN_OPTIONS_SIDE);
          }}
          isActive={activeSide === CHOSEN_OPTIONS_SIDE}
          header={selectedItemsHeader}
          errorOccurred={errorOccurred}
          testID="right-side"
        >
          {renderSelectedItems()}
        </SelectSide>
      </div>
    </div>
  );
}

export default SideBySideSelect;
