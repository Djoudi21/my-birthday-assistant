import { create } from 'zustand'

interface I18nState {
    deviceLanguage: string;
    locale: {
        locale: string;
        checked: boolean
    }
    setLocale: (newLocale: string) => void
}

export const useI18nStore = create<I18nState>((set, get) => ({
    deviceLanguage: get()?.deviceLanguage ?? 'fr',
    locale: {
        locale: get()?.deviceLanguage ?? 'fr',
        checked: false
    },
    setLocale: (newLocale: string) => set(() => {
        return {
            locale: {
                locale: newLocale,
                checked: true
            },
        }
    }),
}))
