import createContextHook from '@nkzw/create-context-hook';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface StorageProvider {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
}

interface UserProfile {
  email?: string;
  studentNumber?: string;
  name?: string;
  profileImage?: string;
}

interface UserState {
  profile: UserProfile | null;
  classroom: string;
  isLoading: boolean;
  setProfile: (profile: UserProfile | null) => void;
  setClassroom: (room: string) => void;
}

const createStorage = (): StorageProvider => {
  if (typeof window !== 'undefined' && window.localStorage) {
    return {
      getItem: async (key: string) => localStorage.getItem(key),
      setItem: async (key: string, value: string) => localStorage.setItem(key, value),
    };
  }
  const AsyncStorage = require('@react-native-async-storage/async-storage').default;
  return {
    getItem: AsyncStorage.getItem,
    setItem: AsyncStorage.setItem,
  };
};

const [UserStoreProvider, useUserStore] = createContextHook<UserState>(() => {
  const storage = createStorage();
  const [profile, setProfileState] = useState<UserProfile | null>(null);
  const [classroom, setClassroomState] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      try {
        const p = await storage.getItem('user_profile');
        const r = await storage.getItem('user_classroom');
        if (p) setProfileState(JSON.parse(p));
        if (r) setClassroomState(r);
      } catch (e) {
        console.log('UserStore load error', e);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const setProfile = useCallback((p: UserProfile | null) => {
    setProfileState(p);
    storage.setItem('user_profile', p ? JSON.stringify(p) : '');
  }, [storage]);

  const setClassroom = useCallback((room: string) => {
    const value = room ?? '';
    setClassroomState(value);
    storage.setItem('user_classroom', value);
  }, [storage]);

  return useMemo(() => ({ profile, classroom, isLoading, setProfile, setClassroom }), [profile, classroom, isLoading, setProfile, setClassroom]);
});

export { UserStoreProvider, useUserStore };