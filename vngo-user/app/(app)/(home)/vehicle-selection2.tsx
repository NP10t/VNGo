import React, { useCallback, useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar, 
  FlatList,
  ActivityIndicator,
  Alert 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useRef } from 'react';
import gasaiGonDetails from '@/Constants/gaSaigonDetail';
import axios from 'axios';
import tanSonNhatDetail from '@/Constants/tanSonNhatDetail';
import distance_gaDaNang_TanSonNhat from '@/Constants/distance_gaDaNang_TanSonNhat';
import distance_gaSaiGon_TanSonNhat from '@/Constants/distance_gaSaiGon_TanSonNhat';
import gaDaNangDetails from '@/Constants/gaDaNangDetail';
import { memo as reactMemo } from 'react';
const memo = reactMemo;
import { GaDaNangID, GaSaiGonID, TanSonNhatID } from '@/Constants/place_id';
import { useAuth, API_URL } from "@/view-model/AuthContext";
const GOMAP_API_KEY = process.env.GOMAP_API_KEY;
import PolylineDecoder from '@mapbox/polyline';


// Types
interface Location {
    id: string;
    name: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  }
  
  interface RideOption {
    id: string;
    icon: any;
    title: string;
    description: string;
    price: string;
    originalPrice: string;
  }


  function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  }
  
  const RideOptionItem = memo(({ option, selected, onSelect, distance }) => (
    <TouchableOpacity 
      style={[styles.rideOption, selected && styles.rideOptionSelected]}
      onPress={() => onSelect(option)}
    >
      <Image source={option.icon} style={styles.rideIcon} />
      <View style={styles.rideInfo}>
        <Text style={styles.rideTitle}>{option.title}</Text>
        <View style={styles.rideDetails}>
          <Icon name="person" size={16} color="#666" />
          <Text style={styles.rideDescription}>{option.description}</Text>
        </View>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>
          {formatCurrency(option.price_per_km * (distance || 0))}
        </Text>
        <Text style={styles.originalPrice}>{option.originalPrice}đ</Text>
      </View>
    </TouchableOpacity>
  ));

  const API_SERVICE2 = {

    async fetchLocationDetails2(placeId: string) {
        console.log("placeId", placeId);
      if (placeId === GaSaiGonID) {
        console.log("GaSaiGonID", GaSaiGonID);
        return Promise.resolve(gasaiGonDetails);
      } else if (placeId === TanSonNhatID) {
        console.log("TanSonNhatID", TanSonNhatID);
        return Promise.resolve(tanSonNhatDetail);
      }
      else if (placeId === GaDaNangID) {
        console.log("GaDaNangID", GaDaNangID);
        return Promise.resolve(gaDaNangDetails);
      }
    },
    
    async fetchRouteInfo2(origin: Location, destination: Location) {
      if (origin.id === TanSonNhatID && destination.id === GaSaiGonID) {
        return Promise.resolve(distance_gaSaiGon_TanSonNhat.rows[0].elements[0]);
      }
      else if (origin.id === TanSonNhatID && destination.id === GaDaNangID) {
        return Promise.resolve(distance_gaDaNang_TanSonNhat.rows[0].elements[0]);
      }
    },
  
  };


  const Header = ({ departure, destination, onBack }) => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <View style={styles.locationContainer}>
        <View style={styles.locationItem}>
          <Icon name="location-on" size={20} color="#000" />
          <Text style={styles.locationText} numberOfLines={1}>
            {departure.name}
          </Text>
        </View>
        <View style={styles.locationItem}>
          <Icon name="place" size={20} color="#f4a460" />
          <Text style={styles.locationText} numberOfLines={1}>
            {destination.name}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Icon name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );

export default function BookingScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { authState } = useAuth();

    interface RouteInfo {
      duration: string;
      distance: number;
    }
    
    const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);

    const [locations, setLocations] = useState({
        departure: {
          id: null,
          name: '',
          coordinates: null
        },
        destination: {
          id: null,
          name: '',
          coordinates: null
        }
      });

    // const { locations, routeInfo, isLoading, error } = useLocationData(
    //     params.departure_id,
    //     params.destination_id
    // );

    const [region, setRegion] = useState(null);

    const [routeData, setRouteData] = useState(null);
    const [decodedPolyline, setDecodedPolyline] = useState([]);

    const [selectedRide, setSelectedRide] = useState(null);

    const [stillLoading, setStillLoading] = useState(true);

    const riderLocation = {
        latitude: 37.4176163,
        longitude: -122.0793858,
      };
    
      const driverLocation = {
        latitude: 37.4197341,
        longitude: -122.082921,
      };
    
      useEffect(() => {
        const fetchData = async () => {

        console.log("params.departure_id", params.departure_id);
        console.log("params.destination_id", params.destination_id);
          // Simulating API response
          const [departureDetails, destinationDetails] = await Promise.all([
              API_SERVICE2.fetchLocationDetails2(params.departure_id),
              API_SERVICE2.fetchLocationDetails2(params.destination_id),
            ]);
    
            const updatedLocations = {
              departure: {
                id: params.departure_id,
                coordinates: departureDetails.geometry.location
              },
              destination: {
                id: params.departure_id,
                coordinates: destinationDetails.geometry.location
              }
            };
    
            setLocations(updatedLocations);

            console.log("updatedLocations", updatedLocations);

            const route = await API_SERVICE2.fetchRouteInfo2(
                { id: params.departure_id },
                { id: params.destination_id }
              );
      
            setRouteInfo({
                duration: route.duration.text,
                distance: parseFloat(route.distance.text.match(/\d+(\.\d+)?/)[0])
            });

            console.log("route", route);
  
          const apiResponse = {
            routes: [
              {
                distanceMeters: 774,
                duration: '128s',
                polyline: {
                  encodedPolyline:
                    'ipkcFfichVd@?d@?vB?N?R?z@?L?t@?R?d@?`B@j@?\\?LBBe@D_B@_@Bo@CYBq@?_@@a@B_A@u@@ODoBBo@B}@K?qA?_B?_@?',
                },
              },
            ],
          };

          console.log("apiResponse.routes[0].polyline.encodedPolyline", apiResponse.routes[0].polyline.encodedPolyline);
      
          const decodedPolyline = PolylineDecoder.decode(
            apiResponse.routes[0].polyline.encodedPolyline
          ).map(([latitude, longitude]) => ({ latitude, longitude }));

          setDecodedPolyline(decodedPolyline);

          console.log("decodedPolyline", decodedPolyline);
      
          setRouteData({
            polyline: decodedPolyline,
            distance: apiResponse.routes[0].distanceMeters,
            duration: apiResponse.routes[0].duration,
          });

          console.log("locations 2", locations);
      
          setRegion({
            latitude: (locations.destination.coordinates.lat + locations.departure.coordinates.lat) / 2,
            longitude: (locations.destination.coordinates.lng + locations.departure.coordinates.lng) / 2,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });

            // if(region) {
            //     setStillLoading(false);
            // }
        };

        fetchData();

      }, [region, locations]);

      const MyMapView = ({region, locations, decodedPolyline }) => {
        const mapRef = useRef(null);

        console.log("region", region);
      
        useEffect(() => {
          if (mapRef.current && region) {
            mapRef.current.animateToRegion(region, 1000); // Cập nhật trong 1 giây
          }
        }, [region]);
      
        return (
          <MapView
            ref={mapRef}
            style={styles.map}
            region={region}
          >
                {/* Driver Marker */}
                <Marker coordinate={{"latitude": locations.destination.coordinates.lat, "longitude": locations.destination.coordinates.lng}} title="Driver" pinColor="blue" />

                {/* Rider Marker */}
                <Marker coordinate={{"latitude": locations.departure.coordinates.lat, "longitude": locations.departure.coordinates.lng}} title="Rider" pinColor="green" />

                {/* Polyline for route */}
                <Polyline coordinates={decodedPolyline} strokeColor="red" strokeWidth={3} />
        </MapView>
        );
      };
    
      if (!routeData) {
        return (
          <View style={styles.loadingContainer}>
            <Text>Loading route...</Text>
          </View>
        );
      }

    //   const handleBooking = useCallback(async () => {
    const handleBooking = async () => {
        if (!authState?.token) {
          Alert.alert("Lỗi", "Không tìm thấy token xác thực.");
          return;
        }
        
        try{
          const result = await axios.post(
            `${API_URL}/bookings`,
              {
                "pickupLocation": {
                    "id": locations.departure.id,
                    "latitude": locations.departure.coordinates.lat,
                    "longitude": locations.departure.coordinates.lng,
                    "address": params.departure_name,
                    "city": "",
                    "district": "",
                    "ward": ""
                },
                "destinationLocation": {
                    "id": locations.destination.id,
                    "latitude": locations.destination.coordinates.lat,
                    "longitude": locations.destination.coordinates.lng,
                    "address": params.destination_name,
                    "city": "",
                    "district": "",
                    "ward": ""
                },
                "estimatedPrice": selectedRide?.price_per_km * routeInfo.distance,
                "vehicleType": selectedRide?.type,
            },
            {
              headers: {
                Authorization: `bearer ${authState.token}`,
              },
            }
          );
    
          const userID_updated = result.data.result.userId;
        
          console.log(selectedRide);
    
          if (selectedRide) {
            router.push({
              pathname: '/finding_driver',
              params: {
                userId: userID_updated,
                bookingId: result.data.result.id,
                departure_id: params.departure_id,
                destination_id: params.destination_id,
                ride: selectedRide,
                departure_name: params.departure_name,
                destination_name: params.destination_name,
              }
            });
            console.log("da bam nut");
          }
        } catch (err: any) {
          if (err.response) {
            console.error("Server Response Error:", err.response.data);
            Alert.alert(
              "Lỗi",
              `Không thể xác nhận cuốc xe: ${
                err.response.data?.message || "Không xác định"
              }`
            );
          } else if (err.request) {
            console.error("No Response Error:", err.request);
            Alert.alert(
              "Lỗi",
              "Không nhận được phản hồi từ server. Vui lòng thử lại."
            );
          } else {
            console.error("Unknown Error:", err.message);
            Alert.alert("Lỗi", `Đã xảy ra lỗi: ${err.message}`);
          }
        }
    };

    const handleRideSelect = (ride) => {
        setSelectedRide(ride);
      };

    if(stillLoading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading route...</Text>
            </View>
            );
    }

    return (

        <SafeAreaView style={styles.container}>
        <View style={styles.container}>
  
        {/* <MapView style={styles.map} initialRegion={region}>
          <Marker coordinate={locations.destination} title="Driver" pinColor="blue" />
  
          <Marker coordinate={locations.departure} title="Rider" pinColor="green" />
  
          <Polyline coordinates={routeData.polyline} strokeColor="red" strokeWidth={3} />
        </MapView> */}

        {/* <MapView style={styles.map} initialRegion={region}>
            <Marker coordinate={{"latitude": locations.destination.coordinates.lat, "longitude": locations.destination.coordinates.lng}} title="Driver" pinColor="blue" />

            <Marker coordinate={{"latitude": locations.departure.coordinates.lat, "longitude": locations.departure.coordinates.lat}} title="Rider" pinColor="green" />

            <Polyline coordinates={[{"latitude": 37.41973, "longitude": -122.08292}, {"latitude": 37.41954, "longitude": -122.08292}, {"latitude": 37.41935, "longitude": -122.08292}, {"latitude": 37.41875, "longitude": -122.08292}, {"latitude": 37.41867, "longitude": -122.08292}, {"latitude": 37.41857, "longitude": -122.08292}, {"latitude": 37.41827, "longitude": -122.08292}, {"latitude": 37.4182, "longitude": -122.08292}, {"latitude": 37.41793, "longitude": -122.08292}, {"latitude": 37.41783, "longitude": -122.08292}, {"latitude": 37.41764, "longitude": -122.08292}, {"latitude": 37.41715, "longitude": -122.08293}, {"latitude": 37.41693, "longitude": -122.08293}, {"latitude": 37.41678, "longitude": -122.08293}, {"latitude": 37.41671, "longitude": -122.08295}, {"latitude": 37.41669, "longitude": -122.08276}, {"latitude": 37.41666, "longitude": -122.08228}, {"latitude": 37.41665, "longitude": -122.08212}, {"latitude": 37.41663, "longitude": -122.08188}, {"latitude": 37.41665, "longitude": -122.08175}, {"latitude": 37.41663, "longitude": -122.0815}, {"latitude": 37.41663, "longitude": -122.08134}, {"latitude": 37.41662, "longitude": -122.08117}, {"latitude": 37.4166, "longitude": -122.08085}, {"latitude": 37.41659, "longitude": -122.08058}, {"latitude": 37.41658, "longitude": -122.0805}, {"latitude": 37.41655, "longitude": -122.07994}, {"latitude": 37.41653, "longitude": -122.0797}, {"latitude": 37.41651, "longitude": -122.07939}, {"latitude": 37.41657, "longitude": -122.07939}, {"latitude": 37.41698, "longitude": -122.07939}, {"latitude": 37.41746, "longitude": -122.07939}, {"latitude": 37.41762, "longitude": -122.07939}]} strokeColor="red" strokeWidth={3} />
      </MapView> */}

      <MyMapView region={region} locations={locations} decodedPolyline={decodedPolyline} />
  
      </View>
        
      </SafeAreaView>
        
  );
}

const RIDE_OPTIONS = [
  {
    id: 0,
    icon: require('@/assets/images/taxi.png'),
    title: 'Xe 4 chỗ',
    description: 'Tối đa 4 hành khách',
    price_per_km: 20000,
    originalPrice: 22000,
    type: 'CAR'
  },
  {
    id: 1,
    icon: require('@/assets/images/lux_car.png'),
    title: 'Xe 7 chỗ',
    description: 'Tối đa 7 hành khách',
    price_per_km: 40000,
    originalPrice: 45000,
    type: 'CAR'
  },
  {
    id: 2,
    icon: require('@/assets/images/bike.png'),
    title: 'Xe máy',
    description: 'Tối đa 2 hành khách',
    price_per_km: 10000,
    originalPrice: 14000,
    type: 'BIKE'
  }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
  },
  locationContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  locationText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#40e0d0',
    padding: 8,
    borderRadius: 20,
  },
  mapContainer: {
    height: 200,
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  timeChip: {
    position: 'absolute',
    top: '70%',
    left: '15%',
    transform: [{ translateX: -40 }, { translateY: -20 }],
    backgroundColor: '#40e0d0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  distanceChip: {
    position: 'absolute',
    top: '90%',
    left: '15%',
    transform: [{ translateX: -40 }, { translateY: -20 }],
    backgroundColor: '#40e0d0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  timeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  rideOptionsContainer: {
    maxHeight: 300,
    flex: 1,
    padding: 16,
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginBottom: 16,
  },
  warningText: {
    flex: 1,
    marginLeft: 8,
    color: '#666',
  },
  rideOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
  },
  rideOptionSelected: {
    borderColor: '#40e0d0',
    backgroundColor: '#f0ffff',
  },
  rideIcon: {
    width: 48,
    height: 48,
  },
  rideInfo: {
    flex: 1,
    marginLeft: 12,
  },
  rideTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  rideDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  rideDescription: {
    marginLeft: 4,
    color: '#666',
    fontSize: 14,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  paymentText: {
    marginLeft: 8,
    flex: 1,
    color: '#333',
  },
  discountChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0ffff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 12,
  },
  discountText: {
    marginLeft: 4,
    color: '#40e0d0',
    fontSize: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  xanhNowButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#40e0d0',
    alignItems: 'center',
  },
  xanhNowText: {
    color: '#40e0d0',
    fontWeight: 'bold',
  },
  bookButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#40e0d0',
    alignItems: 'center',
  },
  bookButtonDisabled: {
    backgroundColor: '#ccc',
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  rideList: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});













// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Dimensions } from 'react-native';
// import MapView, { Marker, Polyline } from 'react-native-maps';
// import PolylineDecoder from '@mapbox/polyline';

// const DriverToRiderScreen = () => {
//   const [routeData, setRouteData] = useState(null);
//   const [region, setRegion] = useState({
//     latitude: 37.4197341, // Default center point
//     longitude: -122.082921,
//     latitudeDelta: 0.01,
//     longitudeDelta: 0.01,
//   });

//   const riderLocation = {
//     latitude: 37.4176163,
//     longitude: -122.0793858,
//   };

//   const driverLocation = {
//     latitude: 37.4197341,
//     longitude: -122.082921,
//   };

//   useEffect(() => {
//     // Simulating API response
      

//     const apiResponse = {
//       routes: [
//         {
//           distanceMeters: 774,
//           duration: '128s',
//           polyline: {
//             encodedPolyline:
//               'ipkcFfichVd@?d@?vB?N?R?z@?L?t@?R?d@?`B@j@?\\?LBBe@D_B@_@Bo@CYBq@?_@@a@B_A@u@@ODoBBo@B}@K?qA?_B?_@?',
//           },
//         },
//       ],
//     };

//     const decodedPolyline = PolylineDecoder.decode(
//       apiResponse.routes[0].polyline.encodedPolyline
//     ).map(([latitude, longitude]) => ({ latitude, longitude }));

//     setRouteData({
//       polyline: decodedPolyline,
//       distance: apiResponse.routes[0].distanceMeters,
//       duration: apiResponse.routes[0].duration,
//     });

//     // Adjust map region to center around driver and rider
//     setRegion({
//       ...region,
//       latitude: (driverLocation.latitude + riderLocation.latitude) / 2,
//       longitude: (driverLocation.longitude + riderLocation.longitude) / 2,
//     });
//   }, []);

//   if (!routeData) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Text>Loading route...</Text>
//       </View>
//     );
//   }

//   console.log("routeData.polyline", routeData.polyline); 
  
//   console.log("driverLocation", driverLocation);

//   console.log("riderLocation", riderLocation);

//   return (
//     <View style={styles.container}>
//       <MapView style={styles.map} initialRegion={region}>
//         {/* Driver Marker */}
//         <Marker coordinate={driverLocation} title="Driver" pinColor="blue" />

//         {/* Rider Marker */}
//         <Marker coordinate={riderLocation} title="Rider" pinColor="green" />

//         {/* Polyline for route */}
//         <Polyline coordinates={routeData.polyline} strokeColor="red" strokeWidth={3} />
//       </MapView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height * 0.8,
//   },
//   infoContainer: {
//     padding: 10,
//     backgroundColor: 'white',
//   },
//   infoText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default DriverToRiderScreen;
