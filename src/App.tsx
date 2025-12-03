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

function App() {
  const dataFetcherOutput = useFetchData();

  return (
      <Grid container spacing={5} justifyContent="center" alignItems="center">
        {/* Encabezado */}
         <Grid  size={{ xs: 12, md: 12 }}><HeaderUI/></Grid>

         {/* Alertas */}
         <Grid  size={{ xs: 12, md: 12 }} container justifyContent="right" alignItems="center"><AlertUI description="No se preveen lluvias"/></Grid>

         {/* Selector */}
         <Grid  size={{ xs: 12, md: 3 }}><SelectorUI/></Grid>

         {/* Indicadores */}
        <Grid  size={{ xs: 12, md: 9 }} container>
          <Grid size={{ xs: 12, md: 3 }}>
            <IndicatorUI title='Temperatura (2m)' 
            description={`${dataFetcherOutput?.current.temperature_2m} 
            ${dataFetcherOutput?.current_units.temperature_2m}`} />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <IndicatorUI title='Temperatura Aparente' 
            description={`${dataFetcherOutput?.current.apparent_temperature} 
            ${dataFetcherOutput?.current_units.apparent_temperature}`} />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <IndicatorUI title='Velocidad del viento' 
            description= {`${dataFetcherOutput?.current.wind_speed_10m} 
            ${dataFetcherOutput?.current_units.wind_speed_10m}`} />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <IndicatorUI title='Humedad relativa' 
            description= {`${dataFetcherOutput?.current.relative_humidity_2m} 
            ${dataFetcherOutput?.current_units.relative_humidity_2m}`} />
          </Grid>
        </Grid>

        {/* Gráfico */}
        <Grid  size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block"} }}>Elemento: Gráfico</Grid>

        {/* Tabla */}
        <Grid  size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block"} }}>Elemento: Tabla</Grid>

        {/* Información adicional */}
        <Grid  size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>

      </Grid>
  );
}

export default App;