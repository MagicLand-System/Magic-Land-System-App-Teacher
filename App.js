import { StyleSheet, SafeAreaView, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './store/store';
import StackNavigator from './navigation/StackNavigator';
import { ToastProvider } from 'react-native-toast-notifications'
import { TimePovider } from './context/TimeContext';
import { NotificatePovider } from './context/NotificateContext';
import { LogBox } from 'react-native';

import 'react-native-gesture-handler';
import 'react-native-svg';
import 'react-native-safe-area-context';
import 'react-native-screens';

export default function App() {
  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      <ToastProvider>
        <TimePovider>
          <NotificatePovider>
            <SafeAreaView style={styles.unsafe} />
            <View style={styles.container}>
              <NavigationContainer>
                <StackNavigator />
              </NavigationContainer>
            </View >
          </NotificatePovider>
        </TimePovider>
      </ToastProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  unsafe: {
    flex: 0,
    backgroundColor: '#000000'
  }
});
