import React, { FunctionComponent } from "react";
import { Text, View, FlatList } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Option from "../components/Option";
import BackArrow from "../components/BackArrow";
import { connect } from "react-redux";
import { filtersActions } from "../ducks/filters/actions";
import { sortBySelector } from "../ducks/filters/selectors";
import Separator from "../components/Separator";
import RESOURCES from "../styles/resources";
import { SortBy } from "../ducks/filters/constants";
import { NavigationDrawerState } from "react-navigation-drawer";
import { NavigationScreenProp } from "react-navigation";
import { RootState } from "../state/reducer";

export type IconProp = {
  name: string;
  color: string;
  type: string;
};

export type FilterItem = {
  type: SortBy;
  label: string;
  icon: IconProp;
};

const FILTERS_DATA: FilterItem[] = [
  {
    type: SortBy.ALPHA,
    label: "Алфавиту",
    icon: {
      name: "format-letter-case",
      color: "#343434",
      type: "material-community",
    },
  },
  {
    type: SortBy.PLASTIC,
    label: "Пластику",
    icon: { ...RESOURCES.plastic.icon, color: RESOURCES.plastic.color },
  },
  {
    type: SortBy.GADGETS,
    label: "Технике",
    icon: { ...RESOURCES.gadgets.icon, color: RESOURCES.gadgets.color },
  },
  {
    type: SortBy.PAPER,
    label: "Бумаге",
    icon: { ...RESOURCES.paper.icon, color: RESOURCES.paper.color },
  },
];

export type DispatchProps = {
  changeSorting: typeof filtersActions.changeSorting;
};

export type OwnProps = {
  navigation: NavigationScreenProp<NavigationDrawerState>;
};

export type StateProps = {
  sortBy: SortBy;
};

export type Props = OwnProps & StateProps & DispatchProps;

const Filters: FunctionComponent<Props> = ({ changeSorting, navigation, sortBy }) => {
  const handlePress = (item: FilterItem) => {
    changeSorting({ sortBy: item.type });
  };

  return (
    <View style={styles.container}>
      <BackArrow onPress={() => navigation.closeDrawer()} style={styles.backArrow} />
      <Text style={styles.header}>СОРТИРОВАТЬ ПО</Text>
      <View
        style={{
          height: FILTERS_DATA.length * 40,
          ...styles.list,
        }}
      >
        <FlatList
          data={FILTERS_DATA}
          ItemSeparatorComponent={() => <Separator marginLeft={30} />}
          keyExtractor={item => item.type}
          extraData={sortBy}
          renderItem={({ item }) => {
            return (
              <Option
                onPress={() => handlePress(item)}
                label={item.label}
                selected={item.type == sortBy}
                icon={item.icon}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  backArrow: {
    position: "absolute",
    top: 30,
    padding: 20,
    left: 0,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 20,
  },
  header: {
    fontSize: 14,
    alignSelf: "flex-start",
    color: "$inputText",
    marginBottom: 10,
  },
  list: {
    width: "100%",
  },
});

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  state => ({
    sortBy: sortBySelector(state),
  }),
  { changeSorting: filtersActions.changeSorting }
)(Filters);
