import React from "react";
import { render } from "@testing-library/react";
import Register from "./Register";
import { UserProvider } from "../../testUtils";


it("matches snapshot", function () {
  const { asFragment } = render(
      <UserProvider>
        <Register />
      </UserProvider>,
  );
  expect(asFragment()).toMatchSnapshot();
});