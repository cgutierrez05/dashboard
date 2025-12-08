// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Grid } from '@mui/material';
import './App.css'
import HeaderUI from './componentes/HeaderUI';
import AlertUI from './componentes/AlertUI';
import SelectorUI from './componentes/SelectorUI';
import IndicatorUI from './componentes/IndicatorUI';
import useFetchData from './functions/useFetchData';
import type { DataState } from './types/DashboardTypes';
import TableUI from './componentes/TableUI';
import ChartUI from './componentes/ChartUI';

function App() {
  const dataFetcherOutput: DataState = useFetchData();

  return (
      <Grid container spacing={5} justifyContent="center" alignItems="center">
        {/* Encabezado */}
         <Grid  size={{ xs: 12, md: 12 }}><HeaderUI/></Grid>

         {/* Alertas */}
         <Grid  size={{ xs: 12, md: 12 }} container justifyContent="right" alignItems="center"><AlertUI description="No se preveen lluvias"/></Grid>

         {/* Selector */}
         <Grid  size={{ xs: 12, md: 3 }}><SelectorUI/></Grid>

         {/* Indicadores */}
        <Grid  size={{ xs: 12, md: 9 }} container justifyContent="center" alignItems="center">
          {dataFetcherOutput.loading && <p>Cargando datos...</p>}
          {dataFetcherOutput.error && <p>Error: {dataFetcherOutput.error}</p>}
          {dataFetcherOutput.data && 
          <>
            <Grid size={{ xs: 12, md: 3 }}> <IndicatorUI title='Temperatura (2m)' 
            description={`${dataFetcherOutput?.data.current.temperature_2m} 
            ${dataFetcherOutput?.data.current_units.temperature_2m}`} />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI title='Temperatura Aparente' 
              description={`${dataFetcherOutput?.data.current.apparent_temperature} 
              ${dataFetcherOutput?.data.current_units.apparent_temperature}`} />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI title='Velocidad del viento' 
              description= {`${dataFetcherOutput?.data.current.wind_speed_10m} 
              ${dataFetcherOutput?.data.current_units.wind_speed_10m}`} />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI title='Humedad relativa' 
              description= {`${dataFetcherOutput?.data.current.relative_humidity_2m} 
              ${dataFetcherOutput?.data.current_units.relative_humidity_2m}`} />
            </Grid>
          </>
          }
        </Grid>

        {/* Gráfico */}
        <Grid  size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block"} }}>
          <ChartUI />
        </Grid>

        {/* Tabla */}
        <Grid  size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block"} }}>
          <TableUI />
        </Grid>

        {/* Información adicional */}
        <Grid  size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>

      </Grid>
  );
}

export default App;