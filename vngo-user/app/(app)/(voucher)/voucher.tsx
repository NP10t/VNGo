// import React from 'react';
// import { View, Text, StyleSheet, FlatList, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native';
// import { getAppContext } from '@/view-model/context';
// import { Ionicons } from '@expo/vector-icons';

// const { width } = Dimensions.get('window');

// const YourVouchersScreen = () => {
//   const { vouchers } = getAppContext(); // Lấy dữ liệu vouchers từ context

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Giỏ Voucher của bạn</Text>
//       <View style={styles.separator} />
//       <View style={styles.giftCodeContainer}>
//         <TextInput style={styles.giftCodeInput} placeholder="Nhập mã gift code" />
//         <TouchableOpacity style={styles.addButton}>
//           <Ionicons name="add-circle-outline" size={24} color="gray" />
//         </TouchableOpacity>
//       </View>
//       <FlatList
//         data={vouchers}
//         keyExtractor={(item) => item.id} // Sử dụng id làm key
//         renderItem={({ item }) => (
//           <View style={styles.voucherCard}>
//             <Image source={item.image} style={styles.voucherImage} />
//             <View style={styles.voucherInfo}>
//               <Text style={styles.voucherDescription}>{item.description}</Text>
//             </View>
//           </View>
//         )}
//         showsVerticalScrollIndicator={false} // Ẩn thanh cuộn
//         ListEmptyComponent={
//           <>
//             <View style={styles.separator} />
//             <Text style={styles.footerText}>Những mã giảm giá hấp dẫn đang chờ bạn trên những cuốc xe mới...</Text>
//           </>
//         }
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     color: '#333',
//     textAlign: 'center',
//   },
//   separator: {
//     height: 1,
//     backgroundColor: '#ccc',
//     marginVertical: 16,
//   },
//   giftCodeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   giftCodeInput: {
//     flex: 1,
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 8,
//   },
//   addButton: {
//     marginLeft: 8,
//   },
//   voucherCard: {
//     flexDirection: 'row',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 8,
//     marginBottom: 16,
//     padding: 12,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   voucherImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 8,
//     marginRight: 12,
//   },
//   voucherInfo: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   voucherDescription: {
//     fontSize: 16,
//     color: '#555',
//   },
//   footerText: {
//     fontSize: 14,
//     color: '#888',
//     textAlign: 'center',
//     marginTop: 16,
//   },
// });

// export default YourVouchersScreen;

import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { getAppContext } from '@/view-model/context';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const YourVouchersScreen = () => {
  const { vouchers } = getAppContext(); // Lấy dữ liệu vouchers từ context

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ví Voucher</Text>
      <Text style={styles.subtitle}>Tận hưởng các ưu đãi độc quyền</Text>
      <View style={styles.giftCodeContainer}>
        <TextInput style={styles.giftCodeInput} placeholder="Nhập mã gift code của bạn" placeholderTextColor="#aaa" />
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle" size={28} color="#007BFF" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={vouchers}
        keyExtractor={(item) => item.id} // Sử dụng id làm key
        renderItem={({ item }) => (
          <View style={styles.voucherCard}>
            <Image source={item.image} style={styles.voucherImage} />
            <View style={styles.voucherInfo}>
              <Text style={styles.voucherTitle}>{item.title}</Text>
              <Text style={styles.voucherDescription} numberOfLines={2}>
                {item.description}
              </Text>
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false} // Ẩn thanh cuộn
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Bạn chưa có voucher nào.</Text>
            <Text style={styles.emptySubtext}>Khám phá và nhận voucher trong chuyến đi tiếp theo!</Text>
          </View>
        }
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
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 20,
  },
  giftCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  giftCodeInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    fontSize: 16,
  },
  addButton: {
    marginLeft: 8,
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 10,
    elevation: 2,
  },
  voucherCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  voucherImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 12,
  },
  voucherInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  voucherTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  voucherDescription: {
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#888',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default YourVouchersScreen;
