import {View} from "react-native";

export default function AuthContentContainer({children}) {
    return (
        <View className={'flex-1 flex-col gap-5 p-4'}>{children}</View>
    )
}
