import {Link} from "expo-router";
import {Text, View} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {LANGUAGES} from "@/hooks/useI18n";

export default function LanguageSettingCallToAction({i18n}) {
    return (
        <Link href={'/(modals)'}>
            <View className={'flex flex-row gap-4 items-center'}>
                <Text>{LANGUAGES[i18n.locale]}</Text>
                <FontAwesome name={'plus'} />
            </View>
        </Link>
    )
}
