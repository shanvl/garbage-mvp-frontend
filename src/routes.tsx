import React from "react";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { Icon } from "react-native-elements";
import ChangeResource from "./screens/ChangeResource";
import Classes from "./screens/Classes";
import Filters from "./screens/Filters";
import Pupil from "./screens/Pupil";
import Pupils from "./screens/Pupils";
import SearchInput from "./components/SearchInput";
import BackArrow from "./components/BackArrow";

export enum Routes {
  CHANGE_RESOURCE = "changeResource",
  CLASSES = "classes",
  LISTS = "lists",
  LISTS_WITH_SEARCH = "listsWithSearch",
  LISTS_WITH_SEARCH_AND_FILTERS = "listsWithSearchAndFilters",
  PUPIL = "pupil",
  PUPILS = "pupils",
}

const ListsStack = createBottomTabNavigator(
  {
    [Routes.PUPILS]: Pupils,
    [Routes.CLASSES]: Classes,
  },
  {
    initialRouteName: Routes.PUPILS,
    tabBarOptions: {
      labelStyle: {
        fontSize: 15,
        fontWeight: "500",
      },
      style: {
        height: 55,
      },
      activeTintColor: "rgba(0, 122, 255, 0.9)",
    },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        const name = routeName === Routes.CLASSES ? "ios-list-box" : "ios-people";
        const size = routeName === Routes.CLASSES ? 26 : 34;
        return <Icon name={name} type="ionicon" size={size} color={tintColor} />;
      },
    }),
  }
);

const ListsWithSearchStack = createStackNavigator(
  {
    [Routes.LISTS]: ListsStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerTitle: <SearchInput navigation={navigation} />,
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        height: 100,
        paddingBottom: 20,
      },
    }),
  }
);

const ListsWithSearchAndFiltersStack = createDrawerNavigator(
  {
    [Routes.LISTS_WITH_SEARCH]: ListsWithSearchStack,
  },
  {
    contentComponent: Filters,
  }
);

const MainStack = createStackNavigator(
  {
    [Routes.LISTS_WITH_SEARCH_AND_FILTERS]: ListsWithSearchAndFiltersStack,
    [Routes.PUPIL]: Pupil,
    [Routes.CHANGE_RESOURCE]: ChangeResource,
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      if (navigation.state.routeName == Routes.LISTS_WITH_SEARCH_AND_FILTERS) {
        return {
          header: null,
        };
      } else {
        return {
          title: undefined,
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerLeft: <BackArrow onPress={() => navigation.goBack()} style={{ paddingHorizontal: 20 }} />,
        };
      }
    },
  }
);

const Navigator = createAppContainer(MainStack);

export default Navigator;
