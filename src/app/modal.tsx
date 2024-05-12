import {View, Text, SafeAreaView, StatusBar, TouchableOpacity} from "react-native";
import {useRouter, Link} from "expo-router";
import {Divider, RadioButton} from "react-native-paper";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {FlashList} from "@shopify/flash-list";
import ContactListItem from "@/components/ContactListItem";
import CountryFlag from "react-native-country-flag";
import {useState} from "react";

export default function Modal() {
    const router = useRouter();
    const isPresented = router.canGoBack();
    const [checked, setChecked] = useState('USA');

    const data = [
        {
            countryFlag: 'us', countryLanguage: 'English', divider: true, cta: (
                <RadioButton
                    value="USA"
                    status={ checked === 'USA' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('USA')}
                />
            )

        },
        {
            countryFlag: 'fr', countryLanguage: 'Français', divider: false, cta: (
                <RadioButton
                    value="France"
                    uncheckedColor={'black'}
                    status={ checked === 'France' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('France')}
                />
            )

        }
    ]
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
