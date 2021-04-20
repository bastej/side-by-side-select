import React from "react";
import { create } from "react-test-renderer";
import { render } from "@testing-library/react";

import SelectSide from "../SelectSide";

jest.mock("../styles.module.scss", () => ({
  SideContainer: "side-container",
  SideHeader: "side-header",
  Error: "error",
}));

describe("<SelectSide />", () => {
  it("renders side", () => {
    const root = create(<SelectSide header="header" onClick={jest.fn()} />);

    expect(root).toMatchSnapshot();
  });

  it("renders side with error class if error occurred", () => {
    const root = render(
      <SelectSide header="header" onClick={jest.fn()} errorOccurred testID="side" />
    );

    const side = root.getByTestId("side");

    expect(side.classList.contains("error")).toBe(true);
  });

  it("renders side with bolder header if the side is active", () => {
    const root = render(<SelectSide header="header" onClick={jest.fn()} isActive />);

    const side = root.getByTestId("side-header");

    expect(side.style.fontWeight).toBe("bold");
  });
});
