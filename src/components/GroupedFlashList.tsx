import {FlashList} from "@shopify/flash-list";
import {View, Text} from "react-native";
import {Switch} from "react-native-paper";
import {useI18n} from "@/hooks/useI18n";
import LanguageSettingCallToAction from "@/components/LanguageSettingCallToAction";
import {useThemeStore} from "@/store/themeStore";
import BoxedIcon from "@/components/BoxedIcon";
import {COLORS} from "@/utils/colors";
import LogOutButton from "@/components/LogOutButton";
import {Entypo, Ionicons} from "@expo/vector-icons";
import {ReactNode} from "react";

export type SettingsList = {title: string, iconName: typeof Entypo.defaultProps |  typeof Ionicons.defaultProps, iconLibrary: 'entypo' | 'ionicons', cta: ReactNode, iconBgColor: string}[][]

export default function GroupedFlashList() {
    const {i18n} = useI18n()
    const isThemeDark = useThemeStore((state) => state.isThemeDark)
    const onToggleTheme = useThemeStore((state) => state.toggleTheme)
    const data: SettingsList = [
        [
            {title: `${i18n.t('language')}`,  iconName: 'globe', iconLibrary: 'entypo', cta: (<LanguageSettingCallToAction i18n={i18n} />), iconBgColor: `bg-[${COLORS.secondary}]`},
            {title: `${i18n.t('darkMode')}`,  iconName: 'color-palette', iconLibrary:'ionicons',  cta: (<Switch value={isThemeDark} onValueChange={onToggleTheme} />), iconBgColor: `bg-[${COLORS.primary}]`}
        ],
        [
            {title: ``,  iconName: 'log-out', iconLibrary: 'entypo', iconBgColor: `bg-[black]`, cta: (<LogOutButton />)},
        ]
    ]
    return (
        <View className={'h-full px-2'}>
            <FlashList
                data={data}
                renderItem={({ item }) => {
                    return (
                        <FlashList
                            ItemSeparatorComponent={() => <Text style={{backgroundColor: 'grey', height: 1, width: '85%', alignSelf: 'center'}} />}
                            data={item}
                            className={'h-full bg-white rounded-2xl mb-4'}
                            estimatedItemSize={3}
                            scrollEnabled={false}
                            renderItem={(item) => {
                                return (
                                    <View className={'flex w-full flex-col px-4'}>
                                        <View className={'flex flex-row justify-between items-center my-4'}>
                                            <BoxedIcon iconLibrary={item.item.iconLibrary} iconName={item.item.iconName} title={item.item.title} backgroundColor={item.item.iconBgColor} />
                                            {item.item.cta}
                                        </View>
                                    </View>
                                )
                            }}
                        />
                    );
                }}
                estimatedItemSize={100}
            />
        </View>
    )
}
