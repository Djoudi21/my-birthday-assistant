import {getLocales} from "expo-localization";
import {I18n} from "i18n-js";
import {en} from "@/I18n/en";
import {fr} from "@/I18n/fr";
import {useI18nStore} from "@/store/i18nStore";

const i18n = new I18n({
    en: en,
    fr: fr,
});

export const LANGUAGES = {
    'en': 'English',
    'fr': 'Français'
}
export const deviceLanguage = getLocales()[0].languageCode;


export const useI18n = () => {
    const {locale} = useI18nStore((state) => state.locale)
    i18n.locale = locale;
    i18n.enableFallback = true;

    return {
        deviceLanguage,
        i18n
    }
}
