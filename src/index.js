import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import WebFont from "webfontloader";
import App from "./App";

WebFont.load({
  google: {
    families: ["Roboto Mono", "monospace"]
  }
});

ReactDOM.render(<App />, document.getElementById("root"));
