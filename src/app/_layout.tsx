import "../global.css";
import {Stack} from "expo-router";
import {ClerkProvider} from "@clerk/clerk-expo";
import { PaperProvider } from 'react-native-paper';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import {COLORS} from "@/utils/colors";

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
                        <Stack.Screen
                            name="login"
                            options={{
                                headerShown: true,
                                headerStyle: {backgroundColor: 'white'},
                                headerBackTitleVisible: false,
                                headerTintColor: COLORS.primary
                            }}
                        />
                        <Stack.Screen
                            name="register"
                            options={{
                                headerShown: true,
                                headerStyle: {backgroundColor: 'white'},
                                headerBackTitleVisible: false,
                                headerTintColor: COLORS.primary
                            }}
                        />
                        <Stack.Screen
                            name="(modals)/index"
                            options={{ presentation: 'modal', gestureEnabled: true }}
                        />
                    </Stack>
                </PaperProvider>
            </ClerkProvider>
        </QueryClientProvider>
    )
}
