import {Contact} from "@/types";
import {format} from "date-fns";
import {COLORS} from "@/utils/colors";

export const useMarkedDates = () => {
    const transformBirthdaysData = (data: Contact[]) => {
        const birthdays = {};
        if(!data) return
        data.forEach((item) => {
            const formattedDate = format(new Date(item.birthday), 'yyyy-MM-dd');
            birthdays[formattedDate] = { selected: true, selectedColor: COLORS.primary };
        })

        return birthdays;
    }
    return {
        transformBirthdaysData
    }
}
