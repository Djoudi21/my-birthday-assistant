import {Animated, View} from "react-native";
import {useUser} from "@clerk/clerk-expo";
import GroupedFlashList from "@/components/GroupedFlashList";
import {useAssets} from "expo-asset";
import {Avatar, Text} from 'react-native-paper'
import {AvatarImageSource} from "react-native-paper/lib/typescript/components/Avatar/AvatarImage";
import MainContainer from "@/components/MainContainer";
import ScrollView = Animated.ScrollView;

export default function Index() {
    const [assets] = useAssets([require('@/assets/images/avatar-svgrepo-com.svg')]);
    const {user} = useUser();

    return (
        <MainContainer>
            <ScrollView contentInsetAdjustmentBehavior={'automatic'}>
                <View className={'flex flex-col justify-center rounded-2xl gap-2 p-4 mx-2 mt-4 items-center'}>
                    {assets && <Avatar.Image style={{width: 50, height: 50}} source={assets[0].uri as AvatarImageSource} />}
                    <Text>{`${user?.fullName}`}</Text>
                    <Text>{`${user?.emailAddresses[0]}`}</Text>
                </View>
                <View className={'h-full'}>
                    <GroupedFlashList />
                </View>
            </ScrollView>
        </MainContainer>
    )
}
