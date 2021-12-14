import * as React from 'react';
import { useRef, Component, useState } from "react";
import { Alert, Button, useColorScheme, Platform, Text, SafeAreaView, View, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme, useTheme} from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import { faInfoCircle } from '@fortawesome/pro-duotone-svg-icons'
import { faNewspaper } from '@fortawesome/pro-duotone-svg-icons'
import { faUser } from '@fortawesome/pro-duotone-svg-icons'
import { faSlidersV } from '@fortawesome/pro-duotone-svg-icons'
import { faLifeRing } from '@fortawesome/pro-duotone-svg-icons'

import { faSpinner } from '@fortawesome/pro-duotone-svg-icons'
import { faArrowLeft } from '@fortawesome/pro-duotone-svg-icons'
import { faArrowRight } from '@fortawesome/pro-duotone-svg-icons'

StatusBar.setBarStyle('light-content', true);

if (Platform.OS === 'ios') {
  global.OSHeader = false
} else {
  global.OSHeader = true
}

function NewsScreen({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection:"row"}}>
          <FontAwesomeIcon onPress={() => Alert.alert('FalixNodes App v2 Alpha 4')} style={styles.headerButtons} icon={ faInfoCircle } />
        </View>
      ),
    });
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <WebView
          source={{ uri: 'https://client.falixnodes.net' }}
          javaScriptEnabled={true}
          style={styles.webView}
          scalesPageToFit={true}
          startInLoadingState={false}
        />
      </View>
    </SafeAreaView>
  );
}

function ClientScreen({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection:"row"}}>
          <FontAwesomeIcon onPress={reload} style={styles.headerButtons} icon={ faSpinner } />
          <FontAwesomeIcon onPress={goback} style={styles.headerButtons} icon={ faArrowLeft } />
          <FontAwesomeIcon onPress={goforward} style={styles.headerButtons} icon={ faArrowRight } />
        </View>
      ),
    });
  }, [navigation]);

  const clientWebview = useRef(null)
  const goback = () => {clientWebview.current.goBack();};
  const goforward = () => {clientWebview.current.goForward();};
  const reload = () => {clientWebview.current.reload();};
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <WebView
          ref={clientWebview}
          source={{ uri: 'https://client.falixnodes.net' }}
          javaScriptEnabled={true}
          style={styles.webView}
          scalesPageToFit={true}
          startInLoadingState={false}
        />
      </View>
    </SafeAreaView>
  );
}

function GameScreen({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection:"row"}}>
          <FontAwesomeIcon onPress={reload} style={styles.headerButtons} icon={ faSpinner } />
          <FontAwesomeIcon onPress={goback} style={styles.headerButtons} icon={ faArrowLeft } />
          <FontAwesomeIcon onPress={goforward} style={styles.headerButtons} icon={ faArrowRight } />
        </View>
      ),
    });
  }, [navigation]);

  const gameWebview = useRef(null)
  const goback = () => {gameWebview.current.goBack();};
  const goforward = () => {gameWebview.current.goForward();};
  const reload = () => {gameWebview.current.reload();};
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <WebView
          ref={gameWebview}
          source={{ uri: 'https://panel.falixnodes.net' }}
          javaScriptEnabled={true}
          style={styles.webView}
          scalesPageToFit={true}
          startInLoadingState={false}
        />
      </View>
    </SafeAreaView>
  );
}

function HelpScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <WebView
          source={{ uri: 'https://help.falixnodes.net' }}
          javaScriptEnabled={true}
          style={styles.webView}
          scalesPageToFit={true}
          startInLoadingState={false}
        />
      </View>
    </SafeAreaView>
  );
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  webView: {
    display: 'flex',
    minWidth: '100%'
  },
  headerButtons: {
    paddingHorizontal: 25,
    color: 'white'
  }
});

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="News" component={NewsScreen}
      options={{
        tabBarIcon: ({ tintColor }) => <FontAwesomeIcon style={styles.headerButtons} icon={ faNewspaper } />,
        headerShown: OSHeader
      }} />
      <Tab.Screen name="Client Area" component={ClientScreen}
      options={{
        tabBarIcon: ({ tintColor }) => <FontAwesomeIcon style={styles.headerButtons} icon={ faUser } />,
        headerShown: OSHeader
      }} />
      <Tab.Screen name="Game Panel" component={GameScreen}
      options={{
        tabBarIcon: ({ tintColor }) => <FontAwesomeIcon style={styles.headerButtons} icon={ faSlidersV } />,
        headerShown: OSHeader
      }} />
      <Tab.Screen name="Help Center" component={HelpScreen}
      options={{
        tabBarIcon: ({ tintColor }) => <FontAwesomeIcon style={styles.headerButtons} icon={ faLifeRing } />,
        headerShown: OSHeader
      }} />
    </Tab.Navigator>
  );
}

export default function App() {
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <MyTabs />
    </NavigationContainer>
  );
}