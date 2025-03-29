import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { getAppContext } from '@/view-model/context';

// Constants
const API_KEY = 'AlzaSyyvH1149qgeoo1Xyvr6B3uhES5cYbQWfPv';
const API_URL = 'https://maps.gomaps.pro/maps/api/place/queryautocomplete/json';

const DEFAULT_DEPARTURE = {
  id: 'ChIJnZ-oGhEpdTER8ycbqsCc8Ng',
  name: 'Tan Son Nhat International Airport, Truong Son Street, Tân Bình, Ho Chi Minh City, Vietnam'
};

const getLocationIcon = (type) => {
  const icons = {
    airport: 'local-airport',
    sports: 'sports',
    religion: 'church',
    default: 'location-on'
  };
  return icons[type] || icons.default;
};

const PlacePrediction = ({ item, onSelect }) => (
  <TouchableOpacity style={styles.predictionItem} onPress={() => onSelect(item)}>
    <MaterialIcons name="place" size={20} color="#666" style={styles.predictionIcon} />
    <View style={styles.predictionContent}>
      <Text style={styles.predictionMainText}>{item.description}</Text>
      <Text style={styles.predictionSubText}>
        {item.structured_formatting?.secondary_text}
      </Text>
    </View>
  </TouchableOpacity>
);

const NearbyLocation = ({ item }) => (
  <TouchableOpacity style={styles.nearbyItem}>
    <MaterialIcons 
      name={getLocationIcon(item.type)} 
      size={24} 
      color="#007AFF" 
      style={styles.nearbyIcon} 
    />
    <View style={styles.nearbyContent}>
      <Text style={styles.nearbyMainText}>{item.name}</Text>
      <Text style={styles.nearbySubText}>{item.distance}</Text>
    </View>
    <MaterialIcons name="chevron-right" size={24} color="#CCC" />
  </TouchableOpacity>
);

export default function DestinationScreen() {

  const {nearbyLocations} = getAppContext();

  const router = useRouter();
  
  // Separate state for input text and selected locations
  const [inputText, setInputText] = useState({
    departure: DEFAULT_DEPARTURE.name,
    destination: ''
  });

  const [locations, setLocations] = useState({
    departure: DEFAULT_DEPARTURE,
    destination: {
      id: '',
      name: ''
    }
  });
  
  const [activeInput, setActiveInput] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState('');

  // Navigation handler
  const handleNavigation = useCallback(() => {
    if (locations.departure.id && locations.destination.id) {
      router.push({
        pathname: '/vehicle-selection',
        params: {
          departure_id: locations.departure.id,
          destination_id: locations.destination.id,
          departure_name: locations.departure.name,
          destination_name: locations.destination.name,
        },
      });
    }
  }, [locations, router]);

  // const handleNavigation = () => {
  //   // Kiểm tra đầy đủ dữ liệu
  //   if (locations?.departure?.id && locations?.departure?.name && 
  //       locations?.destination?.id && locations?.destination?.name) {
  //     router.push({
  //       pathname: '/vehicle-selection',
  //       params: {
  //         departure_id: locations.departure.id,
  //         destination_id: locations.destination.id,
  //         departure_name: locations.departure.name,
  //         destination_name: locations.destination.name,
  //       },
  //     });
  //   } else {
  //     // Có thể thêm thông báo lỗi hoặc xử lý khác ở đây
  //     console.warn('Location data is not fully loaded yet');
  //   }
  // };

  // Auto-navigate when both locations are selected
  useEffect(() => {
    if (locations.departure.id && locations.destination.id) {
      try {
        handleNavigation();
      } catch (error) {
        console.error('Navigation error:', error);
        // Hiển thị thông báo lỗi cho người dùng
        Alert.alert(
          'Error',
          'Unable to proceed to vehicle selection. Please try again.'
        );
      }
    }
  }, [locations, handleNavigation]);

  // API calls
  const fetchPredictions = useCallback(async (text) => {
    if (!text.trim()) {
      setPredictions([]);
      return;
    }

    try {
      const response = await axios.get(API_URL, {
        params: {
          input: text,
          key: API_KEY,
        },
      });
      setPredictions(response.data.predictions || []);
      setError('');
    } catch (err) {
      setError('Không thể lấy gợi ý, vui lòng thử lại sau.');
      console.error('Error fetching predictions:', err);
    }
  }, []);

  // Handle location selection from predictions
  const handleLocationSelect = useCallback((item) => {
    if (activeInput === 'departure') {
      // If changing departure, reset destination
      setLocations({
        departure: {
          id: item.place_id,
          name: item.description
        },
        destination: {
          id: locations.destination.id,
          name: locations.destination.name
        }
      });
      setInputText(prev => ({
        departure: item.description,
        destination: inputText.destination
      }));
      setActiveInput('destination');
    } else {
      // If selecting destination
      setLocations(prev => ({
        ...prev,
        destination: {
          id: item.place_id,
          name: item.description
        }
      }));
      setInputText(prev => ({
        ...prev,
        destination: item.description
      }));
    }
    setPredictions([]);
  }, [activeInput]);

  // Handle input text changes
  const handleInputChange = useCallback((text, inputType) => {
    setInputText(prev => ({
      ...prev,
      [inputType]: text
    }));
    fetchPredictions(text);
  }, [fetchPredictions]);

  // UI Components
  const SearchResults = () => {
    if (predictions.length > 0) {
      return (
        <FlatList
          data={predictions}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <PlacePrediction item={item} onSelect={handleLocationSelect} />
          )}
          style={styles.predictionsList}
        />
      );
    }

    return (
      <View style={styles.nearbySection}>
        <Text style={styles.sectionTitle}>Địa điểm gần đây</Text>
        <FlatList
          data={nearbyLocations}
          keyExtractor={(item) => item.place_id}
          // renderItem={({ item }) => <NearbyLocation item={item} />}
          // scrollEnabled={false}
          renderItem={({ item }) => (
            <PlacePrediction item={item} onSelect={handleLocationSelect} />
          )}
          style={styles.predictionsList}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* {error && <Text style={styles.errorText}>{error}</Text>} */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 10.737606,
          longitude: 106.677125,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{ latitude: 10.737606, longitude: 106.677125 }}
          title="Tòa C - Chung Cư Green River"
        />
      </MapView>

    <View style={styles.destinationContainer}>
        <View style={styles.inputWrapper}>
          <Text style={[styles.dot, { color: 'orange' }]}>●</Text>
          <View style={styles.inputContainer}>
          <TextInput
            value={inputText.departure}
            onFocus={() => setActiveInput('departure')}
            onChangeText={(text) => handleInputChange(text, 'departure')}
            placeholder="Điểm đi"
          />
            
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputWrapper}>
          <Text style={[styles.dot, { color: 'green' }]}>●</Text>
          <View style={styles.inputContainer}>
          <TextInput
            value={inputText.destination}
            onFocus={() => setActiveInput('destination')}
            onChangeText={(text) => handleInputChange(text, 'destination')}
            placeholder="Điểm đến"
          />
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Hiển thị lỗi nếu có */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Quick Add Options */}
        <View style={styles.quickAddContainer}>
          <TouchableOpacity style={styles.quickAddButton}>
            <Text style={styles.quickAddText}>Thêm Nhà</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAddButton}>
            <Text style={styles.quickAddText}>Thêm Công Ty</Text>
          </TouchableOpacity>
        </View>
        <SearchResults />
        <TouchableOpacity style={styles.mapSearchButton}>
          <Text style={styles.mapSearchText}>Tìm trên bản đồ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


// Styles
const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  destinationContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dot: { fontSize: 24, marginRight: 8 },
  inputContainer: { flex: 1 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
  },
  addButton: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    padding: 8,
    marginLeft: 8,
  },
  addButtonText: { color: '#fff', fontSize: 16 },
  quickAddContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  quickAddButton: {
    backgroundColor: '#F0F0F0',
    padding: 8,
    borderRadius: 8,
  },
  quickAddText: { fontSize: 14, color: '#333' },
  locationText: { fontSize: 14, marginBottom: 8 },
  mapSearchButton: {
    marginTop: 12,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  mapSearchText: { color: '#fff', fontSize: 16 },
  mainText: { fontSize: 14, color: '#333' },
  emptyText: { color: '#999', fontSize: 14 },
  errorText: { color: 'red', marginVertical: 8 },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  predictionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  predictionContent: {
    flex: 1,
  },
  predictionMainText: {
    fontSize: 15,
    color: '#000',
  },
  predictionSubText: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  predictionsList: {
    marginTop: 4,
    maxHeight: 160,
  },
  nearbySection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 12,
    color: '#000',
  },
  nearbyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  nearbyIcon: {
    marginRight: 12,
  },
  nearbyContent: {
    flex: 1,
  },
  nearbyMainText: {
    fontSize: 15,
    color: '#000',
  },
  nearbySubText: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  predictionIcon: {
    marginRight: 12,
  },
});
