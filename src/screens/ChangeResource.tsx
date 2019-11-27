import React, { FunctionComponent, useState, useRef, useEffect } from "react";
import { TextInput, View, Keyboard, ActivityIndicator, Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import RESOURCES from "../styles/resources";
import HollowButton from "../components/HollowButton";
import { connect } from "react-redux";
import { pupilsActions } from "../ducks/pupils/actions";
import { loadingSelector } from "../ducks/pupils/selectors";
import round from "../utils/round";
import { RootState } from "../state/reducer";
import { NavigationStackProp } from "react-navigation-stack";
import { Resource } from "../ducks/pupils/reducer";
import usePrevious from "../utils/usePrevious";

export type DispatchProps = {
  addResource: typeof pupilsActions.addResourceRequest;
  subtractResource: typeof pupilsActions.subtractResourceRequest;
};

export type StateProps = {
  loading: boolean;
};

export type OwnProps = {
  navigation: NavigationStackProp<any, { action: "add" | "subtract"; amount: number; id: string; type: Resource }>;
};

export type Props = DispatchProps & OwnProps & StateProps;

const ChangeResource: FunctionComponent<Props> = ({ navigation, addResource, subtractResource, loading }) => {
  let [deltaString, setDeltaString] = useState<string>("");
  const prevLoading = usePrevious(loading);

  useEffect(() => {
    if (prevLoading && !loading) {
      navigation.goBack();
    }
  },        [loading, prevLoading, navigation]);

  const action = navigation.getParam("action");
  const id = navigation.getParam("id");
  const type = navigation.getParam("type");
  const amount = navigation.getParam("amount");

  const onSubmit = (action: "add" | "subtract", type: Resource, amount: number, id: string) => () => {
    // there might be a problem with the number string on a russian keyboard which puts
    // "," instead of "."  as a digits delimiter
    deltaString = deltaString.replace(",", ".");
    const delta = Number(deltaString) || 0;

    if (action === "add") {
      amount = round(amount + delta);
      addResource({ type, id, amount });
    } else {
      amount = round(amount - delta);
      subtractResource({
        type,
        id,
        amount: amount < 0 ? 0 : amount,
      });
    }
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setDeltaString}
        value={deltaString}
        placeholder="00.00"
        autoCorrect={false}
        autoFocus={true}
        keyboardType="numeric"
        editable={!loading}
      />
      {loading ? (
        <ActivityIndicator animating size="large" style={styles.loadingIndicatior} />
      ) : (
        <HollowButton onPress={onSubmit(action, type, amount, id)} style={styles.button}>
          <Text style={styles.buttonText}>{action === "add" ? "Добавить" : "Вычесть"}</Text>
        </HollowButton>
      )}
    </View>
  );
};

(ChangeResource as any).navigationOptions = ({
  navigation,
}: {
  navigation: NavigationStackProp<any, { action: "add" | "subtract"; amount: number; id: string; type: Resource }>;
}) => {
  const type = navigation.getParam("type");
  const title = RESOURCES[type].name;
  return {
    title,
  };
};

const styles = EStyleSheet.create({
  button: {
    marginTop: 25,
  },
  buttonText: {
    fontSize: 25,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    top: "10%",
  },
  input: {
    color: "$darkText",
    fontSize: 80,
  },
  loadingIndicatior: {
    marginTop: 20,
  },
});

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  state => ({
    loading: loadingSelector(state),
  }),
  {
    addResource: pupilsActions.addResourceRequest,
    subtractResource: pupilsActions.subtractResourceRequest,
  }
)(ChangeResource);

function replaceComma(numStr: string): string {
  return numStr.replace(",", ".");
}
