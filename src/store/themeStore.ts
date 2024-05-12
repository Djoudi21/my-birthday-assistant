import { create } from 'zustand'

interface I18nState {
    lightTheme: {
        backgroundColor: string
        textColor: string
    }
    darkTheme: {
        backgroundColor: string
        textColor: string
    }
    isThemeDark: boolean
    toggleTheme: () => void
}

export const useThemeStore = create<I18nState>((set) => ({
    lightTheme: {
        backgroundColor: 'white',
        textColor: 'black',
    },
    darkTheme: {
        backgroundColor: 'black',
        textColor: 'white'
    },
    isThemeDark: false,
    toggleTheme: () => set((state) => {
        return {
            isThemeDark: !state.isThemeDark
        }
    })
}))
