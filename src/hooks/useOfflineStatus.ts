import NetInfo from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';

export interface OfflineStatus {
  isOffline: boolean;
  isConnected: boolean | null;
  connectionType: string | null;
}

export const useOfflineStatus = (): OfflineStatus => {
  const [offlineStatus, setOfflineStatus] = useState<OfflineStatus>({
    isOffline: false,
    isConnected: null,
    connectionType: null,
  });

  useEffect(() => {
    const getInitialState = async () => {
      try {
        const state = await NetInfo.fetch();
        setOfflineStatus({
          isOffline: !state.isConnected,
          isConnected: state.isConnected,
          connectionType: state.type,
        });
      } catch {
        setOfflineStatus({
          isOffline: true,
          isConnected: false,
          connectionType: null,
        });
      }
    };

    void getInitialState();

    const unsubscribe = NetInfo.addEventListener((state) => {
      setOfflineStatus({
        isOffline: !state.isConnected,
        isConnected: state.isConnected,
        connectionType: state.type,
      });
    });

    return () => unsubscribe();
  }, []);

  return offlineStatus;
};
