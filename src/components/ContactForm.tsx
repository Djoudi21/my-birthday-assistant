import { Text, View } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { TextInput, Surface, Button } from 'react-native-paper';
import RNDateTimePicker from "@react-native-community/datetimepicker";

type FormData = {
    name: string
    birthday: Date
    description: string
}

export default function ContactForm({onSubmit}) {

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            name: "",
            birthday: new Date(),
            description: ''
        },
    })

    return  (
        <View className={'m-4 flex flex-col gap-4'}>
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        mode="outlined"
                        placeholder="Nom"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="name"
            />
            {errors.name && <Text>This is required.</Text>}

            <Controller
                control={control}
                rules={{
                    maxLength: 100,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Surface className={''} elevation={4}>
                        <RNDateTimePicker
                            onChange={(event, selectedDate) => {
                                onChange(selectedDate);
                            }}
                            display={'spinner'}
                            value={value}
                        />
                    </Surface>
                )}
                name="birthday"
            />

            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        maxLength={10}
                        mode="outlined"
                        placeholder="Description"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        multiline = {true}
                    />
                )}
                name="description"
            />
            {errors.name && <Text>This is required.</Text>}

            <Button mode={'contained'} onPress={handleSubmit(onSubmit)}>Valider</Button>
        </View>
    )
}
