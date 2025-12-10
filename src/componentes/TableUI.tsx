import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import useFetchData from '../functions/useFetchData';
import type { GeneralProps } from '../types/DashboardTypes';

function combineArrays(arrLabels: Array<string>, arrLabels2: Array<string>, arrValues1: Array<number>, arrValues2: Array<number>) {
    return arrLabels.map((date, index) => ({
        id: index,
        label: arrLabels2[index],
        date: date,
        value1: arrValues1[index],
        value2: arrValues2[index]
    }));
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'date',
        headerName: 'Date',
        width: 125,
    },
    {
        field: 'label',
        headerName: 'Hour',
        width: 125,
    }, 
    {
        field: 'value1',
        headerName: 'Temperature',
        width: 125,
    },
    {
        field: 'value2',
        headerName: 'Wind Speed',
        width: 125,
    },
    {
        field: 'resumen',
        headerName: 'Resume',
        description: 'No es posible ordenar u ocultar esta columna.',
        sortable: false,
        hideable: false,
        width: 100,
        valueGetter: (_, row) => `${row.label || ''} ${row.value1 || ''} ${row.value2 || ''}`,
    },
];

/*const arrValues1 = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const arrValues2 = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const arrLabels = ['A','B','C','D','E','F','G'];*/

export default function TableUI({resultado}: GeneralProps) {
    const fechas = resultado.data?.hourly.time.map((time) => {
        let date = time.split('T')[0];
        return date
    }) ?? [];
    
    const horas = resultado.data?.hourly.time.map((time) => {
        let date = time.split('T')[1];
        return date
    }) ?? [];

    const temp = resultado.data?.hourly.temperature_2m ?? [];

    const windsp = resultado.data?.hourly.wind_speed_10m ?? [];

    const rows = combineArrays(fechas, horas, temp, windsp);
    
    return (
        <Box sx={{ height: 350, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 5,
                    },
                },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
            />
        </Box>
    );
}