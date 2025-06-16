// // lib/notifications.ts
// import * as Notifications from 'expo-notifications';
// import * as Device from 'expo-device';
// import { Platform } from 'react-native';

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//     shouldShowBanner: false,
//     shouldShowList: false,
//   }),
// });

// export async function sendNotification() {
//   // 1. Request permission
//   if (Device.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;

//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }

//     if (finalStatus !== 'granted') {
//       console.warn('Permission for notifications not granted');
//       return;
//     }
//   } else {
//     console.warn('Notifications require a physical device');
//     return;
//   }

//   // 2. Schedule local notification
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: '📣 Notification Title',
//       body: 'This is the notification body text!',
//       data: { customData: 'value123' }, // Optional payload
//     },
//     // @ts-ignore
//     trigger: { seconds: 2 }, // Fire after 2 seconds
//   });
// }
