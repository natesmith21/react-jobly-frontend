import React from "react";
import { render } from "@testing-library/react";
import JobsList from "./JobsList";

it("renders without crashing", function() {
  render(<JobsList />);
});

it("matches snapshot with no jobs", function() {
  const { asFragment } = render(<JobsList />);
  expect(asFragment()).toMatchSnapshot();
});
