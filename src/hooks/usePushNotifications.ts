import {useRef, useEffect, useState} from "react"
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'
import {Platform} from "react-native"

export interface PushNotificationState {
    notification?: Notifications.Notification
    expoPushToken?: Notifications.ExpoPushToken
}
export const usePushNotifications = (): PushNotificationState => {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldPlaySound: true,
            shouldShowAlert: true,
            shouldSetBadge: false
        })
    })

    const [notification, setNotification] = useState<Notifications.Notification | undefined>()
    const [expoPushToken, setExpoPushToken] = useState<Notifications.ExpoPushToken | undefined>()
    const notificationListener = useRef<Notifications.Subscription>()
    const responseListener = useRef<Notifications.Subscription>()

    const registerForPushNotificationsAsync = async () => {
        let token: Notifications.ExpoPushToken
        if(Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync()
            let finalStatus = existingStatus

            if(existingStatus !== 'granted') {
                const {status} = await Notifications.requestPermissionsAsync()
                finalStatus = status
            }

            if(finalStatus !== 'granted') {
                alert('failed to get the pushed token')
            }

            token = await Notifications.getExpoPushTokenAsync({
                projectId: Constants.expoConfig?.extra?.eas?.projectId
            })

            if(Platform.OS === 'android') {
                await Notifications.setNotificationChannelAsync("default", {
                    name: "default",
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: "#ff231f7c"
                })
            }

            return token

        } else {
            console.log('ERRROR')
        }
    }

    useEffect(() => {
        registerForPushNotificationsAsync().then((token) => {
            setExpoPushToken(token)
        })

        notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
            setNotification(notification)
        })

        responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
            console.log(response)
        })

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current!)

            Notifications.removeNotificationSubscription(responseListener.current!)
        }
    }, []);

    return {
        expoPushToken, notification,
    }
}
