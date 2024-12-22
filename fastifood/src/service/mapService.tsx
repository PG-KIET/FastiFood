import axios from "axios";
import { GOONG_MAP_API } from "./config";
import { updateUserLocation } from "./authService";

export const reverseGeocode = async (latitude: number, longitude: number, setUser: any) => {
    try {
        const response = await axios.get(
            `https://rsapi.goong.io/Geocode?latlng=${latitude},${longitude}&api_key=${GOONG_MAP_API}`
        );
        if(response.data.status == 'OK') {
            const address = response.data.results[0].formatted_address;
            updateUserLocation({liveLocation: {latitude,longitude}, address}, setUser);
        }
        else{
            console.error("Geo code Failed", response.data)
        }
        return response.data;
    } catch (error) {
        console.error("Geo code Failed", error)
    }
};