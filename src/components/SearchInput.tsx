import React, { FunctionComponent } from "react";
import { TextInput, View, TouchableOpacity, Keyboard } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Icon } from "react-native-elements";
import { filtersActions } from "../ducks/filters/actions";
import { connect } from "react-redux";
import { querySelector } from "../ducks/filters/selectors";
import { NavigationDrawerProp } from "react-navigation-drawer";
import { RootState } from "../state/reducer";

export type DispatchProps = {
  changeQuery: typeof filtersActions.changeQuery;
};

export type StateProps = {
  query: string;
  children?: never;
};

export type OwnProps = {
  navigation: NavigationDrawerProp;
};

export type Props = DispatchProps & OwnProps & StateProps;

const SearchInput: FunctionComponent<Props> = ({ query, navigation, changeQuery }) => {
  const onQueryChange = (query: string) => {
    changeQuery({ query });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        autoCorrect={false}
        autoFocus={true}
        autoCapitalize="words"
        placeholder="ФИО или класc"
        value={query}
        onChangeText={onQueryChange}
      />
      <TouchableOpacity
        onPress={() => {
          Keyboard.dismiss();
          navigation.openDrawer();
        }}
        style={styles.button}
      >
        <Icon name="ios-options" type="ionicon" color="rgba(0, 122, 255, 0.9)" size={30} />
      </TouchableOpacity>
    </View>
  );
};

const styles = EStyleSheet.create({
  button: {
    position: "absolute",
    right: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    top: -10,
  },
  container: {
    flex: 1,
    height: 40,
    alignSelf: "flex-end",
  },
  input: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 12,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 22,
    backgroundColor: "$search",
    color: "$darkText",
  },
});

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  state => ({
    query: querySelector(state),
  }),
  { changeQuery: filtersActions.changeQuery }
)(SearchInput);
