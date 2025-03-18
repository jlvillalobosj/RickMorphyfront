import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Personajes',
          tabBarIcon: ({ color }) => <Icon size={28} name="users" color={color} />,
        }}
      />
      <Tabs.Screen
        name="location"
        options={{
          title: 'Ubicación',
          tabBarIcon: ({ color }) => <Icon size={28} name="map-marker" color={color} />,
        }}
      />
      <Tabs.Screen
        name="episode"
        options={{
          title: 'Episodios',
          tabBarIcon: ({ color }) => <Icon size={28} name="film" color={color} />,
        }}
      />
    </Tabs>
  );
}
