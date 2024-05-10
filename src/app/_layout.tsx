import "../global.css";
import {Slot, Stack} from "expo-router";
import { ClerkProvider } from "@clerk/clerk-expo";
import { PaperProvider } from 'react-native-paper';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import React from "react";

export default function RootLayout() {
    const queryClient = new QueryClient()
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
