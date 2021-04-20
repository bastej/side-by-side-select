/**
 * '>' - select marked item (move to selected item list)
 * '>>' - select all items (move to selected item list)
 * '<' - unselect marked item (move to items to select list)
 * '<<' - unselect all items (move to items to select item list)
 */

import React from "react";
import { fireEvent, render } from "@testing-library/react";

import SideBySideSelect, { Props } from "../SideBySideSelect";

jest.mock("../../SelectOption/styles.module.scss", () => ({
  Marked: "marked",
}));

describe("<SideBySideSelect />", () => {
  const commonProps: Props = {
    texts: {
      allItemsHeader: "all",
      selectedItemsHeader: "selected",
    },
    label: "Field label",
    onChange: jest.fn(),
    allOptions: ["option1", "option2", "option3", "option4"],
  };

  it("should move option from left to right by double click", () => {
    const root = render(<SideBySideSelect {...commonProps} />);

    const leftSide = root.getByTestId("left-side");
    const rightSide = root.getByTestId("right-side");

    const option1 = root.getByText("option1");

    fireEvent.doubleClick(option1);

    expect(leftSide.contains(root.getByText("option1"))).toBe(false);
    expect(rightSide.contains(root.getByText("option1"))).toBe(true);
  });

  it("should move option from right to left by double click", () => {
    const root = render(<SideBySideSelect {...commonProps} initialSelectedOptions={["option1"]} />);

    const leftSide = root.getByTestId("left-side");
    const rightSide = root.getByTestId("right-side");

    const option1 = root.getByText("option1");

    fireEvent.doubleClick(option1);

    expect(leftSide.contains(root.getByText("option1"))).toBe(true);
    expect(rightSide.contains(root.getByText("option1"))).toBe(false);
  });

  it("should move selected item from left to right by use '>' button", () => {
    const root = render(<SideBySideSelect {...commonProps} />);

    const leftSide = root.getByTestId("left-side");
    const rightSide = root.getByTestId("right-side");

    const option1 = root.getByText("option1");
    const moveRightButton = root.getByTestId("moveToRightButton");

    // activating side
    fireEvent.click(leftSide);

    // marking option
    fireEvent.click(option1);

    fireEvent.click(moveRightButton);

    expect(leftSide.contains(root.getByText("option1"))).toBe(false);
    expect(rightSide.contains(root.getByText("option1"))).toBe(true);
  });

  it("should move selected item from right to left by use '<' button", () => {
    const root = render(<SideBySideSelect {...commonProps} initialSelectedOptions={["option1"]} />);

    const leftSide = root.getByTestId("left-side");
    const rightSide = root.getByTestId("right-side");

    const option1 = root.getByText("option1");
    const moveLeftButton = root.getByTestId("moveToLeftButton");

    // activating side
    fireEvent.click(rightSide);

    // marking option
    fireEvent.click(option1);

    fireEvent.click(moveLeftButton);

    expect(leftSide.contains(root.getByText("option1"))).toBe(true);
    expect(rightSide.contains(root.getByText("option1"))).toBe(false);
  });

  it("should move all items from left to right by use '>>' button", () => {
    const root = render(<SideBySideSelect {...commonProps} />);

    const leftSide = root.getByTestId("left-side");
    const rightSide = root.getByTestId("right-side");

    const moveAllRightButton = root.getByTestId("moveAllToRightButton");

    fireEvent.click(moveAllRightButton);

    expect(leftSide.querySelectorAll("li").length).toBe(0);

    expect(rightSide.contains(root.getByText("option1"))).toBe(true);
    expect(rightSide.contains(root.getByText("option2"))).toBe(true);
    expect(rightSide.contains(root.getByText("option3"))).toBe(true);
    expect(rightSide.contains(root.getByText("option4"))).toBe(true);
  });

  it("should move all items from right to left by use '<<' button", () => {
    const root = render(
      <SideBySideSelect
        {...commonProps}
        initialSelectedOptions={["option1", "option2", "option3", "option4"]}
      />
    );

    const leftSide = root.getByTestId("left-side");
    const rightSide = root.getByTestId("right-side");

    const moveAllLeftButton = root.getByTestId("moveAllToLeftButton");

    fireEvent.click(moveAllLeftButton);

    expect(rightSide.querySelectorAll("li").length).toBe(0);

    expect(leftSide.contains(root.getByText("option1"))).toBe(true);
    expect(leftSide.contains(root.getByText("option2"))).toBe(true);
    expect(leftSide.contains(root.getByText("option3"))).toBe(true);
    expect(leftSide.contains(root.getByText("option4"))).toBe(true);
  });

  it("should not move disabled options when selecting all by '>>' button", () => {
    const root = render(<SideBySideSelect {...commonProps} disabledOptions={["option1"]} />);

    const leftSide = root.getByTestId("left-side");
    const rightSide = root.getByTestId("right-side");

    const moveAllRightButton = root.getByTestId("moveAllToRightButton");

    fireEvent.click(moveAllRightButton);

    expect(leftSide.contains(root.getByText("option1"))).toBe(true);
    expect(rightSide.contains(root.getByText("option1"))).toBe(false);
  });

  it("should not allow to select disabled options", () => {
    const root = render(<SideBySideSelect {...commonProps} disabledOptions={["option1"]} />);

    const leftSide = root.getByTestId("left-side");
    const rightSide = root.getByTestId("right-side");

    const option1 = root.getByText("option1");

    // activating side
    fireEvent.click(leftSide);

    // trying to mark option
    fireEvent.click(option1);

    expect(option1.classList.contains("marked")).toBe(false);
  });
});
