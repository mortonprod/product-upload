/**
 * This file will be placed in the dist folder.
 * It can get the only the default views or it can call the node server to get more fake data.
 * It will only render the object when the data has been recieved.
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
// import {InputBuilder} from "./inputBuilder";

const inputs = [{
    props: {
      defaultName: "",
      name: "default name",
      placeHolder: "place holder",
    },
    type: "string",
}];

// ReactDOM.render(
//    <InputBuilder title={"test"} inputs={inputs} />,
//    document.getElementById("root"),
// );
