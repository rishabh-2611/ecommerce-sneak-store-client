import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { Router } from './Router';
import { theme } from './theme';
import store from './store';

export default function App() {
  return (
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <Router />
        <Notifications position="top-right" />
      </MantineProvider>
    </Provider>
  );
}
