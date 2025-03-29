// import React from 'react';
// import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
// import { useRouter } from 'expo-router';
// import { getAppContext } from '@/view-model/context';

// const HomeScreen = () => {
//   const router = useRouter();

//   const { suggestions, vouchers } = getAppContext();


//   return (

//     <View style={styles.container}>
//       {/* Search Input */}
//       <View style={styles.greenRectangle}>
//         <View style={styles.searchContainer}>
//           <TouchableOpacity style={styles.searchButton}>
//             <Image source={require('@/assets/images/search-icon.png')} style={styles.icon} />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => router.push('/search')} style={styles.searchInput}>
//             <Text style={styles.footerText}>Tìm kiếm</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.searchButton}>
//             <Image source={require('@/assets/images/location-icon.png')} style={styles.icon} />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Suggestions */}
//       <Text style={styles.sectionTitle}>Gợi ý cho bạn</Text>
//       <FlatList
//         data={suggestions}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.suggestionItem}>
//             <View style={styles.suggestionText}>
//               <Text style={styles.boldText}>Từ: {item.from}</Text>
//               <Text style={styles.boldText}>Đến: {item.to}</Text>
//             </View>
//             <View style={styles.suggestionPrices}>
//               <Text style={styles.priceText}>Bike: {item.bikePrice}</Text>
//               {item.carPrice && <Text style={styles.priceText}>Car: {item.carPrice}</Text>}
//             </View>
//           </View>
//         )}
//       />

//       {/* Vouchers */}
//       <Text style={styles.sectionTitle}>Voucher hấp dẫn</Text>
//       <FlatList
//         data={vouchers}
//         showsVerticalScrollIndicator={true}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity style={styles.voucherItem}>
//             <Image source={item.image} style={styles.voucherImage} />
//             <Text style={styles.voucherText}>{item.description}</Text>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f9fa',
//     paddingTop: 16,
//   },
//   greenRectangle: {
//     width: Dimensions.get('window').width,
//     backgroundColor: 'green',
//     padding: 16,
//     paddingTop: 40, // Adjust this value if you need more space at the top
//     borderBottomLeftRadius: 8,
//     borderBottomRightRadius: 8,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     padding: 8,
//     marginBottom: 16,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 16,
//     paddingHorizontal: 8,
//   },
//   searchButton: {
//     padding: 8,
//   },
//   icon: {
//     width: 24,
//     height: 24,
//     resizeMode: 'contain',
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginVertical: 8,
//     marginBottom: 12,
//     alignSelf: 'center',
//   },
//   suggestionItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 12,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     marginVertical: 8,
//     paddingHorizontal: 16,
//   },
//   suggestionText: {
//     flex: 1,
//   },
//   boldText: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   suggestionPrices: {
//     alignItems: 'flex-end',
//   },
//   priceText: {
//     fontSize: 14,
//     color: 'green',
//   },
//   voucherItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   voucherImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 8,
//     marginRight: 16,
//     resizeMode: 'contain',
//   },
//   voucherText: {
//     fontSize: 12,
//     textAlign: 'center',
//     flex: 1,
//     //bold
//     fontWeight: 'bold',
//   },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 12,
//     borderTopWidth: 1,
//     borderTopColor: '#ddd',
//     marginTop: 16,
//     paddingHorizontal: 16,
//   },
//   footerText: {
//     fontSize: 16,
//     color: '#007bff',
//   },
// });

// export default HomeScreen;


import React from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { getAppContext } from '@/view-model/context';

const HomeScreen = () => {
  const router = useRouter();
  const { suggestions, vouchers } = getAppContext();

  return (
    <View style={styles.container}>
      {/* Search Section */}
      <View style={styles.blueRectangle}>
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.searchButton}>
            <Image source={require('@/assets/images/search-icon.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/search')} style={styles.searchInput}>
            <Text style={styles.placeholderText}>Tìm kiếm địa điểm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.searchButton}>
            <Image source={require('@/assets/images/location-icon.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Suggestions Section */}
      <Text style={styles.sectionTitle}>Gợi ý dành cho bạn</Text>
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.suggestionCard}>
            <View style={styles.suggestionInfo}>
              <Text style={styles.suggestionText}>Từ: <Text style={styles.boldText}>{item.from}</Text></Text>
              <Text style={styles.suggestionText}>Đến: <Text style={styles.boldText}>{item.to}</Text></Text>
            </View>
            <View style={styles.suggestionPrices}>
              <Text style={styles.priceText}>Bike: {item.bikePrice}</Text>
              {item.carPrice && <Text style={styles.priceText}>Car: {item.carPrice}</Text>}
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Hiện chưa có gợi ý nào cho bạn.</Text>
        }
        showsVerticalScrollIndicator={false}
      />

      {/* Vouchers Section */}
      <Text style={styles.sectionTitle}>Ưu đãi nổi bật</Text>
      <FlatList
        data={vouchers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.voucherCard}>
            <Image source={item.image} style={styles.voucherImage} />
            <Text style={styles.voucherDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Không có ưu đãi nào tại thời điểm này.</Text>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  blueRectangle: {
    width: Dimensions.get('window').width,
    backgroundColor: '#E6F4FF',
    padding: 16,
    paddingTop: 40,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 8,
  },
  placeholderText: {
    fontSize: 16,
    color: '#888',
  },
  searchButton: {
    padding: 8,
  },
  icon: {
    width: 24,
    height: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 12,
    color: '#333',
    textAlign: 'center',
  },
  suggestionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  suggestionInfo: {
    flex: 1,
  },
  suggestionText: {
    fontSize: 14,
    color: '#555',
  },
  boldText: {
    fontWeight: 'bold',
  },
  suggestionPrices: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 14,
    color: '#007BFF',
  },
  voucherCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  voucherImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  voucherDescription: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  emptyText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default HomeScreen;
