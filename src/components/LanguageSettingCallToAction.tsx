import {Link} from "expo-router";
import {Text, View} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {LANGUAGES} from "@/hooks/useI18n";
import Entypo from '@expo/vector-icons/Entypo';

export default function LanguageSettingCallToAction({i18n}) {
    return (
        <Link href={'/(modals)'}>
            <View className={'flex flex-row gap-4 items-center'}>
                <Text>{LANGUAGES[i18n.locale]}</Text>
                <Entypo name="chevron-thin-right" size={20} color="black" />
            </View>
        </Link>
    )
}
