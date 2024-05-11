import "../global.css";
import {Stack} from "expo-router";
import { ClerkProvider } from "@clerk/clerk-expo";
import { PaperProvider } from 'react-native-paper';

import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

export default function RootLayout() {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <ClerkProvider publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
                <PaperProvider>
                    <Stack
                        screenOptions={{
                            headerShown: false,
                        }}>
                        <Stack.Screen name="login" options={{headerShown: true}} />
                        <Stack.Screen name="register" options={{headerShown: true}} />
                    </Stack>
                </PaperProvider>
            </ClerkProvider>
        </QueryClientProvider>
    )
}
