import {useRef, useState} from 'react';
import {ActivityIndicator, Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {WebView} from 'react-native-webview';

const APP_URL = process.env.EXPO_PUBLIC_NIVOSTUDY_URL || 'https://nivostudy-dnmtfe3-cpus-projects.vercel.app';

export default function App() {
  const web = useRef<WebView>(null);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <SafeAreaView style={styles.root}>
        <StatusBar style="light" backgroundColor="#101110" />
        <View style={styles.errorWrap}>
          <Text style={styles.brand}>NivoStudy</Text>
          <Text style={styles.message}>Não foi possível abrir o app agora.</Text>
          <Pressable style={styles.button} onPress={() => setFailed(false)}>
            <Text style={styles.buttonText}>Tentar novamente</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar style="light" backgroundColor="#101110" />
      <WebView
        ref={web}
        source={{uri: APP_URL}}
        style={styles.web}
        sharedCookiesEnabled
        thirdPartyCookiesEnabled
        javaScriptEnabled
        domStorageEnabled
        allowsBackForwardNavigationGestures
        pullToRefreshEnabled
        startInLoadingState
        setSupportMultipleWindows={false}
        renderLoading={() => (
          <View style={styles.loading}>
            <ActivityIndicator size="small" color="#C4F568" />
            <Text style={styles.loadingText}>NivoStudy</Text>
          </View>
        )}
        onError={() => setFailed(true)}
        onHttpError={(event) => {
          if (event.nativeEvent.statusCode >= 500) setFailed(true);
        }}
        onShouldStartLoadWithRequest={(request) => {
          const url = request.url;
          return url === 'about:blank' || url.startsWith('https://');
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: '#101110'},
  web: {flex: 1, backgroundColor: '#101110'},
  loading: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#101110',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: {color: '#F2F4F0', fontSize: 16, fontWeight: '600'},
  errorWrap: {flex: 1, alignItems: 'center', justifyContent: 'center', padding: 28, gap: 12},
  brand: {color: '#C4F568', fontSize: 24, fontWeight: '800'},
  message: {color: '#A5ADA5', fontSize: 15, textAlign: 'center'},
  button: {marginTop: 6, backgroundColor: '#C4F568', borderRadius: 14, paddingHorizontal: 20, paddingVertical: 12},
  buttonText: {color: '#101110', fontSize: 14, fontWeight: '700'},
});
