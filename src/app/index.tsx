import {SafeAreaView, Text, TouchableOpacity} from "react-native";
import {useRouter} from "expo-router";

export default function Index() {
  const router = useRouter();
  return (
      <SafeAreaView>
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text>sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text>sign up</Text>
        </TouchableOpacity>
      </SafeAreaView>
  )
}
