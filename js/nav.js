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
import SpeakersView from "./views/speakersView"
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

const ModalsStack = StackNavigator({
  AddSession: { screen: AddSessionView }
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

const Tabs = TabNavigator({
  DiscoverTab: {
    screen: DiscoverTab,
    navigationOptions: {
      tabBar: () => ({
        label: "Discover",
        icon: ({ tintColor, focused }) => (
          <Icon name={focused ? 'ios-analytics' : 'ios-analytics-outline'} size={26} style={{ color: Color.tint }}
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
          <Icon name={focused ? 'ios-calendar' : 'ios-calendar-outline'} size={26} style={{ color: Color.tint }}
          />
        ),
      }),
    },
  },
  SpeakersTab: {
    screen: SpeakersView,
    navigationOptions: {
      tabBar: () => ({
        label: "Speakers",
        icon: ({ tintColor, focused }) => (
          <Icon name={focused ? 'ios-body' : 'ios-body-outline'} size={26} style={{ color: Color.tint }}
          />
        ),
      }),
    },
  },
  SearchTab: {
    screen: SearchView,
    navigationOptions: {
      tabBar: () => ({
        label: "Search",
        icon: ({ tintColor, focused }) => (
          <Icon name={focused ? "ios-search" : "ios-search-outline"} size={26} style={{ color: Color.tint }}
          />
        ),
      }),
    },
  },
}, {
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