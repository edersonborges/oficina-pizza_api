import axios from 'axios';
import { GOOGLE_API_KEY } from '../configs/config';


interface GeoLocation {
    latitude: string;
    longitude: string;
}

export const pesquisaGeoLoc = async (endereco: string): Promise<GeoLocation | null> => {
    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: endereco,
                key: GOOGLE_API_KEY,
            },
        });
        const data = response.data;
        console.log('data', data)

        if (data.results && data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry.location;
            return {
                latitude: lat.toString(),
                longitude: lng.toString(),
            };
        }

        return null;
    } catch (error) {
        console.error('Error in pesquisaGeoLoc:', error);
        return null;
    }
};
