/**
 * '>' - select marked item (move to selected item list)
 * '>>' - select all items (move to selected item list)
 * '<' - unselect marked item (move to items to select list)
 * '<<' - unselect all items (move to items to select item list)
 */

import React from "react";
import { create } from "react-test-renderer";
import { render } from "@testing-library/react";
import { disabledItemDefaultTitle } from "../SelectOption/constants";

import SideBySideSelect, { Props } from "../SideBySideSelect";

jest.mock("../../SelectOption/styles.module.scss", () => ({
  Disabled: "disabled",
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

  it("renders and match snapshot", () => {
    const tree = create(<SideBySideSelect {...commonProps} />);

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("renders options with specific class and title for disabled", () => {
    const disabledOptions = ["option1"];
    const root = render(<SideBySideSelect {...commonProps} disabledOptions={disabledOptions} />);

    const option = root.getByText("option1");

    expect(option.classList.contains("disabled")).toBe(true);
    expect(option.getAttribute("title")).toBe(disabledItemDefaultTitle);
  });

  it("renders select with initially selected item", () => {
    const root = render(<SideBySideSelect {...commonProps} initialSelectedOptions={["option1"]} />);

    const leftSide = root.getByTestId("left-side");
    const rightSide = root.getByTestId("right-side");

    expect(leftSide.contains(root.getByText("option1"))).toBe(false);
    expect(rightSide.contains(root.getByText("option1"))).toBe(true);
  });
});
