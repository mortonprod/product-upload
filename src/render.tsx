/**
 * This is used in development to test the component.
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {InputBuilder} from "./inputBuilder";

const inputs = [{
  props: {
    defaultName: "",
    name: "default name",
    placeHolder: "place holder",
  },
  type: "string",
}];

ReactDOM.render(
  <InputBuilder inputs={inputs}/>,
  document.getElementById("root"),
);
