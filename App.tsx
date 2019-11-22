import React from "react";
import store from "./src/state/store";
import { Provider } from "react-redux";
import "./src/styles/theme";

export default function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}
