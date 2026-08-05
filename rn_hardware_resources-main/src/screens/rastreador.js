import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
 
// Precisao e intervalo de leitura do GPS
const LOCATION_OPTIONS = {
  accuracy: Location.Accuracy.BestForNavigation,
  timeInterval: 2000, // a cada 2s tenta uma nova leitura
  distanceInterval: 3, // ou a cada 5m percorridos, o que vier primeiro
};
 
// Raio medio da Terra em metros, usado na formula de Haversine
const EARTH_RADIUS_M = 6371000;
 
export default function GpsTrackerScreen() {
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [tracking, setTracking] = useState(false);
  const [points, setPoints] = useState([]);
  const [distance, setDistance] = useState(0);
  const watchRef = useRef(null);
 
  useEffect(() => {
    // Pede permissao de localizacao assim que a tela monta
    Location.requestForegroundPermissionsAsync().then(({ status }) => {
      setPermissionStatus(status);
    });
    return () => watchRef.current?.remove();
  }, []);
 
  async function start() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setPermissionStatus(status);
    if (status !== "granted") return;
 
    setPoints([]);
    setDistance(0);
    setTracking(true);
 
    // watchPositionAsync chama o callback a cada nova posicao capturada
    watchRef.current = await Location.watchPositionAsync(
      LOCATION_OPTIONS,
      (location) => {
        const { latitude, longitude } = location.coords;
        const newPoint = {
          latitude,
          longitude,
          timestamp: location.timestamp,
        };
 
        setPoints((prev) => {
          if (prev.length > 0) {
            const last = prev[prev.length - 1];
            const segment = haversineDistance(last, newPoint);
            setDistance((d) => d + segment);
          }
          return [...prev, newPoint];
        });
      }
    );
  }
 
  function stop() {
    watchRef.current?.remove();
    watchRef.current = null;
    setTracking(false);
  }
 
  const lastPoint = points[points.length - 1];
  const initialRegion = lastPoint
    ? {
        latitude: lastPoint.latitude,
        longitude: lastPoint.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }
    : {
        // Regiao inicial generica ate a primeira leitura chegar
        latitude: -23.5505,
        longitude: -46.6333,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };
 
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Section title="Permissao">
        <InfoRow
          label="Status"
          value={permissionStatus ?? "Verificando..."}
          highlight={
            permissionStatus == null ? null : permissionStatus === "granted"
          }
        />
      </Section>
 
      <Section title="Mapa do percurso">
        <View style={styles.mapWrapper}>
          <MapView
            style={styles.map}
            region={initialRegion}
            showsUserLocation
          >
            {points.length > 1 && (
              <Polyline
                coordinates={points}
                strokeColor="#1a73e8"
                strokeWidth={4}
              />
            )}
            {points.length > 0 && (
              <>
                <Marker
                  coordinate={points[0]}
                  title="Inicio"
                  pinColor="#0f9d58"
                />
                <Marker
                  coordinate={lastPoint}
                  title="Posicao atual"
                  pinColor="#db4437"
                />
              </>
            )}
          </MapView>
        </View>
      </Section>
 
      <Section title="Resumo">
        <InfoRow label="Pontos capturados" value={points.length} />
        <InfoRow
          label="Distancia total"
          value={formatDistance(distance)}
        />
      </Section>
 
      <Section title="Coordenadas capturadas">
        {points.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum ponto capturado ainda.</Text>
        ) : (
          points
            .slice()
            .reverse()
            .map((p, i) => (
              <View key={p.timestamp ?? i} style={styles.row}>
                <Text style={styles.label}>#{points.length - i}</Text>
                <Text style={styles.value}>
                  {p.latitude.toFixed(5)}, {p.longitude.toFixed(5)}
                </Text>
              </View>
            ))
        )}
      </Section>
 
      {tracking ? (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#db4437" }]}
          onPress={stop}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Parar rastreamento</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                permissionStatus === "denied" ? "#ccc" : "#f4b400",
            },
          ]}
          onPress={start}
          disabled={permissionStatus === "denied"}
          activeOpacity={0.8}
        >
          <Text style={[styles.buttonText, { color: "#333" }]}>
            Iniciar rastreamento
          </Text>
        </TouchableOpacity>
      )}
 
      <Text style={styles.hint}>
        A distancia e calculada somando a distancia em linha reta entre cada
        par de pontos consecutivos (formula de Haversine).
      </Text>
    </ScrollView>
  );
}
 
// Calcula a distancia em metros entre dois pontos (lat/lon) usando Haversine
function haversineDistance(a, b) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(b.latitude - a.latitude);
  const dLon = toRad(b.longitude - a.longitude);
  const lat1 = toRad(a.latitude);
  const lat2 = toRad(b.latitude);
 
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
 
  return EARTH_RADIUS_M * c;
}
 
function formatDistance(meters) {
  if (meters < 1000) return `${meters.toFixed(1)} m`;
  return `${(meters / 1000).toFixed(2)} km`;
}
 
function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}
 
function InfoRow({ label, value, highlight }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text
        style={[
          styles.value,
          highlight === true && styles.valueGreen,
          highlight === false && styles.valueRed,
        ]}
      >
        {String(value)}
      </Text>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#f5f5f5", flexGrow: 1 },
  section: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 14,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  mapWrapper: {
    height: 260,
    borderRadius: 8,
    overflow: "hidden",
  },
  map: { flex: 1 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  label: { fontSize: 14, color: "#666" },
  value: { fontSize: 14, color: "#202124", fontWeight: "500" },
  valueGreen: { color: "#0f9d58" },
  valueRed: { color: "#db4437" },
  emptyText: { fontSize: 13, color: "#999", fontStyle: "italic" },
  button: {
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 14,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 14 },
  hint: { fontSize: 12, color: "#999", textAlign: "center" },
});