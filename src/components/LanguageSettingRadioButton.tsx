import {RadioButton} from "react-native-paper";

export default function LanguageSettingRadioButton({locale, onSetLocale, value}) {
    return (
        <RadioButton
            value={value}
            status={ locale === value ? 'checked' : 'unchecked' }
            onPress={() => onSetLocale(value)}
        />
    )
}
