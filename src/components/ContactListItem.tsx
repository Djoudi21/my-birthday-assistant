import {View} from "react-native";
import {useAssets} from "expo-asset";
import { Avatar, Card, Text } from 'react-native-paper';
import { AvatarImageSource } from "react-native-paper/lib/typescript/components/Avatar/AvatarImage";

interface Props {
    name: string
    birthday: string
    avatar?: HTMLImageElement
}
export default function ContactListItem({name, birthday}: Props) {
    const [assets] = useAssets([require('@/assets/images/avatar-svgrepo-com.svg')]);

    return (
        <Card className={'px-4'}>
            <Card.Content className={'flex flex-row justify-between'}>
                {assets && <Avatar.Image source={assets[0].uri as AvatarImageSource} />}
                <View className={'flex flex-col justify-between w-2/3 items-end'}>
                    <Text className={'text-2xl font-semibold text-white uppercase'}>{name}</Text>
                    <Text className={'text-2xl font-semibold text-white uppercase'}>{birthday}</Text>
                </View>
            </Card.Content>
        </Card>
    )
}
