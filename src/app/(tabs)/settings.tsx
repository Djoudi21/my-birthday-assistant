import {View, Button} from "react-native";
import {SignedOut, useAuth, useUser} from "@clerk/clerk-expo";
import {router} from "expo-router";
import GroupedFlashList from "@/components/GroupedFlashList";
import {useAssets} from "expo-asset";
import {Avatar, Text} from 'react-native-paper'
import {AvatarImageSource} from "react-native-paper/lib/typescript/components/Avatar/AvatarImage";
import MainContainer from "@/components/MainContainer";

export default function Settings() {
    const [assets] = useAssets([require('@/assets/images/avatar-svgrepo-com.svg')]);
    const {user} = useUser();
    const SignOut = () => {
        const { isLoaded,signOut } = useAuth();
        if (!isLoaded) {
            return null;
        }
        return (
            <View>
                <Button
                    title="Sign Out"
                    onPress={async () => {
                        await signOut();
                        router.replace('/');
                    }}
                />
            </View>
        );
    };

    return (
        <MainContainer>
            <View className={'flex-1 flex-col gap-4 justify-between'}>
                <View className={'flex flex-col justify-center rounded-2xl gap-2 bg-white p-4 mx-2 mt-4 shadow-sm items-center'}>
                    {assets && <Avatar.Image style={{width: 50, height: 50}} source={assets[0].uri as AvatarImageSource} />}
                    <Text>{`${user.fullName}`}</Text>
                    <Text>{`${user.emailAddresses[0]}`}</Text>
                </View>
                <View className={'h-4/5'}>
                    <GroupedFlashList />
                </View>
                <View className={'h-1/5'}>
                    <SignedOut></SignedOut>
                </View>
            </View>
        </MainContainer>
    )
}
