import React from "react";
import { fireEvent, render } from "@testing-library/react";
import CompaniesList from "./CompaniesList";

it("renders without crashing", function() {
    render(<CompaniesList />);
  });

  it("matches snapshot", function () {
    const { asFragment } = render(<CompaniesList />);
    expect(asFragment()).toMatchSnapshot();
  });