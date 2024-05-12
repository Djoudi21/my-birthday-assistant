import {RadioButton} from "react-native-paper";

export default function LanguageSettingRadioButton({locale, onSetLocale}) {
    return (
        <RadioButton
            value="en"
            status={ locale === 'en' ? 'checked' : 'unchecked' }
            onPress={() => onSetLocale('en')}
        />
    )
}
