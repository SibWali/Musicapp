import { playbackService } from '@/constants/playbackService';
import { useLogTrackPlayerState } from '@/hooks/useLogTrackPlayerState';
import { useSetupTrackPlayer } from '@/hooks/useSetupTrackPlayer';
import { Image } from 'expo-image'; // Import Image from expo-image
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback } from 'react';
import { Platform, Text } from 'react-native'; // Only import Text and Platform from react-native
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TrackPlayer from 'react-native-track-player';

// Explicitly define the type for FastImage
let FastImage: any;
if (Platform.OS !== 'web') {
  FastImage = require('react-native-fast-image');
}

SplashScreen.preventAutoHideAsync();

const MyImageComponent = () => {
  if (Platform.OS === 'web') {
    return <Image source={{ uri: 'your-image-url' }} style={{ width: 100, height: 100 }} />;
  } else {
    return <Image source={{ uri: 'your-image-url' }} style={{ width: 100, height: 100 }} />;
  }
};

if (Platform.OS !== 'web') {
  TrackPlayer.registerPlaybackService(() => playbackService);
}

const App = () => {
  const handleTrackPlayerLoaded = useCallback(() => {
    SplashScreen.hideAsync();
  }, []);

  useSetupTrackPlayer({
    onLoad: handleTrackPlayerLoaded,
  });

  useLogTrackPlayerState();

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {Platform.OS === 'web' ? (
          <Text>Web version of the music player is under construction</Text>
        ) : (
          <RootNavigation />
        )}
        <StatusBar style="auto" />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

const RootNavigation = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="player"
        options={{
          presentation: 'card',
          gestureEnabled: true,
          gestureDirection: 'vertical',
          animationDuration: 400,
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default App;
