import React, { FunctionComponent } from "react";
import store from "./src/state/store";
import { Provider } from "react-redux";
import "./src/styles/theme";
import Root from "./src/components/Root";

export type OwnProps = {
  children?: never;
};

export type Props = OwnProps;

const App: FunctionComponent<Props> = () => {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
};

export default App;
