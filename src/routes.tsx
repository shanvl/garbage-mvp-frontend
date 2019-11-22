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

const PupilsClassesStack = createBottomTabNavigator(
  {
    Pupils: Pupils,
    Classes: Classes,
  },
  {
    initialRouteName: "Pupils",
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
        const name = routeName === "Classes" ? "ios-list-box" : "ios-people";
        const size = routeName === "Classes" ? 26 : 34;
        return <Icon name={name} type="ionicon" size={size} color={tintColor} />;
      },
    }),
  }
);

const SearchStack = createStackNavigator(
  {
    PupilsClasses: PupilsClassesStack,
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

const SearchFilterStack = createDrawerNavigator(
  {
    Search: SearchStack,
  },
  {
    contentComponent: Filters,
  }
);

const MainStack = createStackNavigator(
  {
    SearchFilter: SearchFilterStack,
    Pupil: Pupil,
    ChangeResource: ChangeResource,
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      if (navigation.state.routeName == "SearchFilter") {
        return {
          header: null,
        };
      } else {
        return {
          title: null,
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
