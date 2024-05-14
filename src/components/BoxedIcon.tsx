import {Text, View} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {Ionicons, Entypo, MaterialCommunityIcons} from "@expo/vector-icons";

interface BoxedIconProps {
    title: string
    backgroundColor: string
    iconName: typeof Entypo.defaultProps |  typeof Ionicons.defaultProps
    iconLibrary: 'entypo' | 'ionicons' | 'materialCommunityIcons'
}

export default function BoxedIcon({title, backgroundColor, iconName, iconLibrary}: BoxedIconProps) {

    return (
        <View className={'flex flex-row items-center gap-4'}>
            <View className={`${backgroundColor} p-2 rounded-lg`}>
                {iconLibrary ===  'entypo' && <Entypo name={iconName} size={22} color="white"/>}
                {iconLibrary ===  'ionicons' &&  <Ionicons name={iconName} size={22} color="white" />}
                {iconLibrary ===  'materialCommunityIcons' &&  <MaterialCommunityIcons name={iconName} size={22} color="white" />}
            </View>
            <Text>{title}</Text>
        </View>
    )
}
