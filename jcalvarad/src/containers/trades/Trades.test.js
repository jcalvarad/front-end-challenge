import React from "react";
import ReactDOM from "react-dom";
import Trades from "./Layout";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Trades />, div);
  ReactDOM.unmountComponentAtNode(div);
});
