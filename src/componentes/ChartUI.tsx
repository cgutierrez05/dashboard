import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import type { GeneralProps } from '../types/DashboardTypes';
// const arrValues1 = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
// const arrValues2 = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
// const arrLabels = ['A','B','C','D','E','F','G'];


export default function ChartUI({ resultado }: GeneralProps ) {

    const horas = resultado.data?.hourly.time.map((time) => {
        let date = time.split('T')[1];
        return date
    }) ?? [];

    const temp = resultado.data?.hourly.temperature_2m.slice(0, 24) ?? [];

    const windsp = resultado.data?.hourly.wind_speed_10m.slice(0, 24) ?? [];

    
    return (
        <>
            <Typography variant="h5" component="div">
                Temperatura & Velocidad del Viento vs Horas
            </Typography>
            <LineChart
                height={300}
                series={[
                    { data: temp, label: 'Temperatura'},
                    { data: windsp, label: 'Velocidad del Viento'},
                ]}
                xAxis={[{ scaleType: 'point', data: horas }]}
            />
        </>
    );
}