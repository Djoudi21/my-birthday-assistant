import {FlashList} from "@shopify/flash-list";
import {View, Text} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {Divider} from "react-native-paper";
import {Link} from "expo-router";

export default function GroupedFlashList() {
    const data = [{
            title: 'Preferences', type: 0
        },
        {
            title: 'Language', divider: true,  iconName: 'globe', type: 1, cta: (
                <Link href={'/modal'}>
                    <View className={'flex flex-row gap-4 items-center'}>
                        <Text>English</Text>
                        <FontAwesome name={'globe'} />
                    </View>
                </Link>)
        },
        {
            title: 'Dark mode', divider: false,  iconName: 'globe', type: 1
        },
        {
            title: 'title 2', type: 0
        },
        {
            firstName: 'f', type: 1,  divider: false
        }]
    return (
        <FlashList
            data={data}
            renderItem={({ item }) => {
                if (item.type === 0) {
                    // Rendering header
                    return (
                        <View className={`bg-[#512da8] items-start justify-end my-4 h-12`}>
                            <Text className={'text-white ml-2 mb-1 text-2xl'}>{item.title}</Text>
                        </View>
                    );
                } else {
                    // Render item
                    return (
                        <View className={'flex flex-col mx-2'}>
                            <View className={'flex flex-row justify-between my-4'}>
                                <View className={'flex flex-row items-center gap-4'}>
                                    <FontAwesome size={30} name={item.iconName} />
                                    <Text>{item.title}</Text>
                                </View>
                                <View className={'flex flex-row gap-2 items-center'}>
                                    {item.cta}
                                </View>
                            </View>
                            {item.divider && <Divider style={{color: 'black'}}/>}
                        </View>

                    );
                }
            }}
            getItemType={(item) => {
                // To achieve better performance, specify the type based on the item
                return item.type === 0 ? "sectionHeader": "row";
            }}
            estimatedItemSize={100}
        />
    )
}
