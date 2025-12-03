import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

export default function useFetchData(): OpenMeteoResponse | undefined{
    const URL = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m";
    const [data, setData] = useState<OpenMeteoResponse | undefined>();

    useEffect(() => {
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
            }
        }
        fetchData();
    },[]);
    //useEffect(funcion a ejecutar, 
    // parámetros de control -> 1 sola vez ([]) o acción condicionada ([var1, var2]) o siempre (nada))
    return data;
}