import React from "react"
import { Platform } from "react-native"
import { StackNavigator, TabNavigator } from "react-navigation"

import Icon from "react-native-vector-icons/Ionicons"
import Styles, { Color } from "./styles"

import DiscoverView from "./views/discoverView"
import SessionsView from "./views/sessionsView"
import AddSessionView from "./views/addSessionView"
import SessionView from "./views/sessionView"
import SearchView from "./views/searchView"
import FavoritesView from "./views/favoritesView"
import ProfileView from "./views/profileView"
import ProfileEditView from "./views/profileEditView"
import EmptyView from "./views/emptyView"

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
  Modals: { screen: ModalsStack }
}, {
  initialRouteName: "Tabs",
  headerMode: "none",
  mode: "modal"
});