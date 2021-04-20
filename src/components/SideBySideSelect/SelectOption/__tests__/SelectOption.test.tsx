import React from "react";
import { render } from "@testing-library/react";
import rerender from "react-test-renderer";

import { disabledItemDefaultTitle } from "../constants";
import SelectOption from "../SelectOption";

jest.mock("../styles.module.scss", () => ({
  Disabled: "disabled",
}));

describe("<SelectOption />", () => {
  it("renders option with ", () => {
    const tree = rerender.create(
      <SelectOption onClick={jest.fn()} onDoubleClick={jest.fn()}>
        option1
      </SelectOption>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
  it("renders option without click events if options is disabled", () => {
    const tree = rerender.create(
      <SelectOption onClick={jest.fn()} onDoubleClick={jest.fn()} isDisabled>
        option1
      </SelectOption>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("should set specific styles and title if options is disabled", () => {
    const root = render(
      <SelectOption onClick={jest.fn()} onDoubleClick={jest.fn()} isDisabled>
        option1
      </SelectOption>
    );

    const option = root.getByText("option1");

    expect(option.classList.contains("disabled")).toBe(true);
    expect(option.getAttribute("title")).toBe(disabledItemDefaultTitle);
  });
});
