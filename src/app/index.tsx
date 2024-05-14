import {SafeAreaView, Text, TouchableOpacity} from "react-native";
import {useRouter} from "expo-router";
import {FetchTokensGateway} from "@/gateways/fetchTokens.gateway";
import {RegisterPushTokenUseCase} from "@/use-cases/tokens/registerPushTokenUseCase/registerPushTokenUseCase";
import {useMutation} from "@tanstack/react-query";
import {User} from "@/types/auth";
import {usePushNotifications} from "@/hooks/usePushNotifications";
import {useAuth, useUser} from "@clerk/clerk-expo";
import {useEffect} from "react";

export default function Home() {
  const router = useRouter();
  const {isSignedIn } = useAuth()

    useEffect(() => {
        if (isSignedIn) router.push('/(tabs)')
    }, [isSignedIn]);

  const {expoPushToken} = usePushNotifications()
    const registerPushToken = async ({ token, userId }) => {
        const tokensGateway = new FetchTokensGateway();
        const registerPushTokenUseCase = new RegisterPushTokenUseCase(tokensGateway);
        await registerPushTokenUseCase.execute(token, userId);
    };

    const addMutation = useMutation({
        mutationFn: ({ token, userId }: {token: string, userId: User['id']}) => registerPushToken({ token, userId }),
    })

  return (
      <SafeAreaView>
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text>sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text>sign up</Text>
        </TouchableOpacity>
          <TouchableOpacity onPress={() => addMutation.mutate({token: expoPushToken?.data, userId: 3})}><Text>Token</Text></TouchableOpacity>
      </SafeAreaView>
  )
}
