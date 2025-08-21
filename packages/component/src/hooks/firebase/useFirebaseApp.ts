import { initializeApp } from 'firebase/app'
import { deleteToken, getMessaging, getToken } from 'firebase/messaging'
import { useCallback, useMemo } from 'react'
import { useSaveFCMToken } from './useSaveFCMToken'

export const useFirebaseApp = () => {
    
    const firebaseConfig = useMemo(() => {
        return {
            apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
            authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
            projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
            storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
            messagingSenderId:
                process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.REACT_APP_FIREBASE_APP_ID,
            measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
        }
    }, [])

    const firebaseApp = useMemo(() => {
        return initializeApp(firebaseConfig)
    }, [firebaseConfig])

    const messaging = useMemo(() => {
        return getMessaging(firebaseApp)
    }, [firebaseApp])

    const getOrRegisterServiceWorker = useCallback(() => {
        if (
            'serviceWorker' in navigator &&
            typeof window.navigator.serviceWorker !== 'undefined'
        ) {
            return window.navigator.serviceWorker
                .getRegistration()
                .then((serviceWorker) => {
                    if (serviceWorker) return serviceWorker
                    return window.navigator.serviceWorker.register(
                        `/firebase-messaging-sw.js?${new URLSearchParams(
                            JSON.stringify(firebaseConfig)
                        )}`
                    )
                })
        }
        throw new Error('The browser doesn`t support service worker.')
    }, [])

    const unregisterServiceWorker = useCallback(() => {
        return window.navigator.serviceWorker.ready.then((serviceWorker) =>
            serviceWorker.unregister()
        )
    }, [])

    const getFirebaseToken = useCallback(async () => {
        try {
            const messagingResolve = await messaging
            if (messagingResolve) {
                return Promise.resolve(
                    getToken(messagingResolve, {
                        vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY
                    })
                )
            }
        } catch (error) {
            console.log('An error occurred while retrieving token. ', error)
        }
    }, [messaging, getOrRegisterServiceWorker])

    const { mutate } = useSaveFCMToken()

    const subscribeToPushNotification = () => {
        getFirebaseToken().then((firebaseToken) => {
            if (firebaseToken) {
                mutate(firebaseToken)
            }
        })
    }

    const unsubscribeToPushNotification = () => {
        return deleteToken(messaging)
    }

    return {
        firebaseApp,
        messaging,
        getOrRegisterServiceWorker,
        getFirebaseToken,
        unregisterServiceWorker,
        subscribeToPushNotification,
        unsubscribeToPushNotification
    }
}
