import React from 'react';
import { Config } from 'react-native-config';
import { Dialog, Portal, Text, useTheme } from 'react-native-paper';
import { Button } from '@serenity/components';
import _ from 'lodash';
import { FlatList } from 'react-native';

export interface DiagnoseDialogProps {
  visible: boolean;
  hideDialog: () => void;
}

export function DiagnoseDialog({ visible, hideDialog }: DiagnoseDialogProps) {
  const { colors } = useTheme();
  const [logs, setLogs] = React.useState([]);

  React.useEffect(() => {
    diagnose();
  }, []);

  function diagnose() {
    setLogs([{ message: `Version Code ${Config.VERSION_CODE}`, state: 'success' }, { message: `Version Name ${Config.VERSION_NAME}`, state: 'success' }])
    if (_.has(Config, 'SUPA_BASE')) {
      setLogs(logs => [...logs, { message: 'Supabase key is present in environment variable', state: 'success' }])
    }
    if (__DEV__) {
      setLogs(logs => [...logs, { message: 'Running in debug environment', state: 'error' }])
    }
  }
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Diagnose</Dialog.Title>
        <Dialog.Content>
          <FlatList 
          data={logs} 
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text style={{ color: item.state === "success" ? colors.primary : colors.error }}>{item.message}</Text>} />
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={hideDialog}
            style={{ width: 100, marginRight: 12 }}
          >
            Ok
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
