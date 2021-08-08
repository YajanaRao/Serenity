import * as React from 'react';
import { Snackbar } from 'react-native-paper';
import { updateNotification, useAppDispatch, useAppSelector } from '@serenity/core';


const NotificationBar = () => {
  const [visible, setVisible] = React.useState(false);
  const { notify } = useAppSelector(state => state.ui);
  const dispatch = useAppDispatch();
  function clearNotification() {
    dispatch(updateNotification(""));
    setVisible(false);
  }

  React.useEffect(() => {
    if (notify) {
      setVisible(true);
    }
    return () => setVisible(false);
  }, [notify])

  return (
    <Snackbar
      style={{ marginBottom: 120, zIndex: 10 }}
      visible={visible}
      onDismiss={clearNotification}
      // duration={1000}
      action={{
        label: 'Dismiss',
        onPress: () => {
          clearNotification();
        },
      }}
    >
      {notify}
    </Snackbar>
  );
}

export default NotificationBar;