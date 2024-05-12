import {View, Text, SafeAreaView, TouchableOpacity} from "react-native";
import {Link} from "expo-router";
import {Divider} from "react-native-paper";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {FlashList} from "@shopify/flash-list";
import CountryFlag from "react-native-country-flag";
import {useLanguageSettingModalHook} from "@/hooks/useLanguageSettingModalHook";

export default function LanguageSettingModal() {
    const {isPresented, data} = useLanguageSettingModalHook()

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
            {!isPresented && (
                <Link className={'absolute right-0 top-0 m-4'} href="../">
                    <TouchableOpacity >
                        <FontAwesome size={50} name={'globe'} />
                    </TouchableOpacity>
                </Link>
            )}
            <Text>Select Language</Text>
            <Divider />
            <View className="flex-1 w-full h-full pt-4">
                <FlashList
                    contentContainerStyle={{padding: 4}}
                    data={data}
                    renderItem={({ item }) => (
                        <View className={'m-4'}>
                            <View className={'flex flex-row items-center justify-between gap-4 mb-4'}>
                                <View className={'flex flex-row gap-4 items-center'}>
                                    <CountryFlag isoCode={item.countryFlag} size={25} />
                                    <Text>{item.countryLanguage}</Text>
                                </View>
                                <View>{item.cta}</View>
                            </View>
                            {item.divider && <Divider/>}
                        </View>
                    )}
                    estimatedItemSize={1}
                />
            </View>
        </SafeAreaView>
    )
}
