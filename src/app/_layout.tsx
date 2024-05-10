import "../global.css";
import {Slot, Stack, useRouter} from "expo-router";
import { ClerkProvider } from "@clerk/clerk-expo";
import { PaperProvider } from 'react-native-paper';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import React from "react";
import {usePushNotifications} from "@/hooks/usePushNotifications";

export default function RootLayout() {
    const queryClient = new QueryClient()
    const {notification, expoPushToken} = usePushNotifications()
    const data = JSON.stringify(notification, undefined, 2)
    console.log(expoPushToken?.data)
    return (
        <QueryClientProvider client={queryClient}>
                <PaperProvider>
                  <Stack
                      screenOptions={{
                        headerShown: false,
                      }}>
                    <Stack.Screen name="login" options={{headerShown: true}} />
                    <Stack.Screen name="register" options={{headerShown: true}} />
                  </Stack>
                </PaperProvider>
        </QueryClientProvider>
    )
}
