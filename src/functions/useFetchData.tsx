import { useEffect, useState } from 'react';
import {type DataState, type OpenMeteoResponse } from '../types/DashboardTypes';

export default function useFetchData(selectedOption: string | null): DataState {
    const CITY_COORDS: Record<string, { latitude: number; longitude: number }> = {
        'guayaquil': { latitude: -2.1962, longitude: -79.8862 },
        'quito': { latitude: -0.1807, longitude:-78.4678 },
        'manta': { latitude: -0.9470, longitude: -80.7080 },
        'cuenca': { latitude: -2.9006, longitude: -79.0045 },
    };
    const cityConfig = selectedOption != null? CITY_COORDS[selectedOption] : CITY_COORDS["guayaquil"];
    const URL = `https://api.open-meteo.com/v1/forecast?latitude=${cityConfig.latitude}&longitude=${cityConfig.longitude}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m`;
    const [data, setData] = useState<OpenMeteoResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setData(null);
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await fetch(URL);
                if(!response.ok) {
                    throw new Error(`Error HTTPS: ${response.status}`);
                }
                const responsejson: OpenMeteoResponse = await response.json();
                setData(responsejson);

            } catch (error) {
                console.error(error);

                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError(String(error));
                }

            } finally {
                setLoading(false);
            }
        }
        fetchData();
    },[selectedOption]);

    //useEffect(funcion a ejecutar, 
    // parámetros de control -> 1 sola vez ([]) o acción condicionada ([var1, var2]) o siempre (nada))

    return { data, loading, error};
}