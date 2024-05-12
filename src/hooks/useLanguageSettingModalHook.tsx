import {useRouter} from "expo-router";
import {useI18nStore} from "@/store/i18nStore";
import {RadioButton} from "react-native-paper";
import LanguageSettingRadioButton from "@/components/LanguageSettingRadioButton";

export const useLanguageSettingModalHook = () => {
    const router = useRouter();
    const isPresented = router.canGoBack();
    const {locale} = useI18nStore((state) => state.locale)
    const setLocale = useI18nStore((state) => state.setLocale)

    const onSetLocale = (newLocale: string) => {
        setLocale(newLocale)
    }

    const data = [
        {
            countryFlag: 'us', countryLanguage: 'English', divider: true, cta: <LanguageSettingRadioButton
                locale={locale} onSetLocale={onSetLocale} value={'en'} />

        },
        {
            countryFlag: 'fr', countryLanguage: 'Français', divider: false, cta: <LanguageSettingRadioButton
                locale={locale} onSetLocale={onSetLocale} value={'fr'} />

        }
    ]
    return {
        isPresented,
        data
    }
}
