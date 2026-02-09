import * as Location from 'expo-location';
import {LocationObject} from "expo-location";

export async function getCurrentLocation(setLocation: (value: (((prevState: (LocationObject | null)) => (LocationObject | null)) | LocationObject | null)) => void, setErrorMsg: (value: (((prevState: (string | null)) => (string | null)) | string | null)) => void) {
    let {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        setErrorMsg("Permission to access location was denied");
        return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
}