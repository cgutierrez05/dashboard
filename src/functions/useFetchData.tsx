import { useEffect, useState } from 'react';
import {type DataState, type OpenMeteoResponse } from '../types/DashboardTypes';

export default function useFetchData(): DataState {
    const URL = "https://api.open-meteo.com/v1/forecast?latitude=-2.1962&longitude=-79.8862&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m";
    const [data, setData] = useState<OpenMeteoResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
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
    },[]);

    //useEffect(funcion a ejecutar, 
    // parámetros de control -> 1 sola vez ([]) o acción condicionada ([var1, var2]) o siempre (nada))

    return { data, loading, error};
}