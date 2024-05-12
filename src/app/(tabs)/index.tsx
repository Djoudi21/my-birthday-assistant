import {SafeAreaView, View} from "react-native";
import {Calendar} from "react-native-calendars";
import {useState} from "react";
import {useMarkedDates} from "@/hooks/useMarkedDates";
import {COLORS} from "@/utils/colors";
import {useContactsQuery} from "@/hooks/useContactsQuery";
import MainContainer from "@/components/MainContainer";

export default function CalendarTab() {
    const [selected, setSelected] = useState('');
    const {transformBirthdaysData} = useMarkedDates()
    const {data} = useContactsQuery()
    const birthdaysData = transformBirthdaysData(data);


    return (
        <MainContainer className={'flex justify-around h-screen overflow-y-scroll'}>
            <Calendar
                style={{
                    height: '80%',
                    width: '100%',
                }}
                onDayPress={day => {
                    setSelected(day.dateString);
                }}
                markedDates={{
                    ...birthdaysData,
                    [selected]: {selected: true, selectedColor: COLORS.secondary}
                }}
            />
        </MainContainer>
    )
}
