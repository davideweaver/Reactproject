import React from "react"
import { Platform } from "react-native"
import { StackNavigator, TabNavigator } from "react-navigation"

import Icon from "react-native-vector-icons/Ionicons"
import Styles, { Color } from "./styles"

import DiscoverView from "./views/DiscoverView"
import SessionsView from "./views/SessionsView"
import AddSessionView from "./views/AddSessionView"
import SessionView from "./views/SessionView"
import SearchView from "./views/SearchView"
import FavoritesView from "./views/FavoritesView"
import ProfileView from "./views/ProfileView"
import ProfileEditView from "./views/ProfileEditView"
import { LoginView } from "./modules/auth"
import EmptyView from "./views/EmptyView"

let initialRoute = "Tabs";

const FiltersStack = StackNavigator({
  FirstFilter: { screen: EmptyView },
  SecondFilter: { screen: EmptyView }
}, {
    headerMode: "float",
});

const DiscoverTab = StackNavigator({
  Discover: { screen: DiscoverView },
  FiltersStack: { screen: FiltersStack }
}, {
  headerMode: "none",
});

const ProfileStack = StackNavigator({
  ProfileEdit: { screen: ProfileEditView }
}, {
  headerMode: "none",
});

const ModalsStack = StackNavigator({
  AddSession: { screen: AddSessionView },
  Profile: { screen: ProfileView },
  ProfileStack: { screen: ProfileStack }
}, {
});

const SessionStack = StackNavigator({
  Session: { screen: SessionView }
}, {
  headerMode: "float",
});

const SessionsTab = StackNavigator({
  Sessions: { screen: SessionsView },
  SessionStack: { screen: SessionStack }
}, {
  headerMode: "none"
});

const FavoritesTab = StackNavigator({
  Sessions: { screen: FavoritesView },
  SessionStack: { screen: SessionStack }
}, {
  headerMode: "none"
});

const SearchTab = StackNavigator({
  SearchView: { screen: SearchView },
  SessionStack: { screen: SessionStack }
}, {
  headerMode: "none"
});

const Tabs = TabNavigator({
  DiscoverTab: {
    screen: DiscoverTab,
    navigationOptions: {
      tabBar: () => ({
        label: "Discover",
        icon: ({ tintColor, focused }) => (
          <Icon name={focused ? 'ios-analytics' : 'ios-analytics-outline'} size={26} style={focused ? {color: Color.tint} : {color: "#999"}}
          />
        ),
      }),
    },
  },
  SessionsTab: {
    screen: SessionsTab,
    navigationOptions: {
      tabBar: () => ({
        label: "Sessions",
        icon: ({ tintColor, focused }) => (
          <Icon name={focused ? 'ios-calendar' : 'ios-calendar-outline'} size={26} style={focused ? {color: Color.tint} : {color: "#999"}}
          />
        ),
      }),
    },
  },
  FavoritesTab: {
    screen: FavoritesTab,
    navigationOptions: {
      tabBar: () => ({
        label: "Favorites",
        icon: ({ tintColor, focused }) => (
          <Icon name={focused ? 'ios-heart' : 'ios-heart-outline'} size={26} style={focused ? {color: Color.tint} : {color: "#999"}}
          />
        ),
      }),
    },
  },
  SearchTab: {
    screen: SearchTab,
    navigationOptions: {
      tabBar: () => ({
        label: "Search",
        icon: ({ tintColor, focused }) => (
          <Icon name={focused ? "ios-search" : "ios-search-outline"} size={26} style={focused ? {color: Color.tint} : {color: "#999"}}
          />
        ),
      }),
    },
  },
}, {
  initialRouteName: "DiscoverTab",
  tabBarPosition: "bottom",
  tabBarOptions: {
      activeTintColor: Color.tint
  },
  animationEnabled: false,
  swipeEnabled: false,
});

export default Nav = StackNavigator({
  Tabs: { screen: Tabs },
  Modals: { screen: ModalsStack },
  Login: { screen: LoginView }
}, {
  initialRouteName: initialRoute,
  headerMode: "none",
  mode: "modal"
});