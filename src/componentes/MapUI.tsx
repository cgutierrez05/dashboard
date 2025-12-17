import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Card, CardContent, Typography } from '@mui/material';
import type { LatLngExpression } from 'leaflet';

interface MapWithRainRiskProps {
  latitude: number | undefined;
  longitude: number | undefined;
  humidity: number | undefined;
}

const MapWithRainRisk: React.FC<MapWithRainRiskProps> = ({ latitude, longitude, humidity }) => {
    const humidityAct = humidity ?? 0;
    const rainRisk = humidityAct > 80 ? 'Riesgo alto de lluvia' : 'No se prevé lluvia';
    const position: LatLngExpression = [latitude ? latitude : -2.1962, longitude ? longitude : -79.8862];
    
    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
            <MapContainer center={position} zoom={13} style={{ width: '70%', height: '400px' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={position}>
                <Popup>
                    Ubicación seleccionada<br />
                    Lat: {latitude}, Lng: {longitude}
                </Popup>
                </Marker>
            </MapContainer>

            {/* Cuadro lateral con información del clima */}
            <Card sx={{ boxShadow: 3, padding: 2, borderRadius: 2, width: '28%', marginLeft: 2 }}>
                <CardContent>
                <Typography variant="h6" component="div">
                    Información del Clima:
                </Typography>
                <Typography variant="body1" component="p">
                    <strong>Riesgo de lluvia:</strong> {rainRisk}
                </Typography>
                </CardContent>
            </Card>
        </div>
  );
};

export default MapWithRainRisk;
