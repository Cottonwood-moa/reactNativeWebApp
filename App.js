import React, { Component } from 'react';
import { BackHandler, ToastAndroid, Linking, NavState} from 'react-native';
import { WebView } from 'react-native-webview';

// ...
class MyWebComponent extends Component {
  webView = {
    canGoBack: false,
    ref: null,
  }

  onAndroidBackPress = () => {
    if (this.webView.canGoBack && this.webView.ref) {
      this.webView.ref.goBack();
      return true;
    }
    return false;
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPress);
		
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress');
    }
  }

  render() {
    return (
      <WebView
        source={{ uri: "https://your.site/"}}
        ref={(webView) => { this.webView.ref = webView; }}
         onNavigationStateChange={(navState) => {
        this.webView.canGoBack = navState.canGoBack;
        if (!navState.url.includes('your.site')) {
          Linking.openURL(navState.url);
          return false;
        }
      }}
      onShouldStartLoadWithRequest={(event) => {
        if (!event.url.includes('your.site')) {
          Linking.openURL(event.url);
          return false;
        }
        return true;
      }}
      />
    );
  }
}

export default MyWebComponent
