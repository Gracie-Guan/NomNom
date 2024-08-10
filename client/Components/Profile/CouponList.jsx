// Highlight start
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CouponList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Redeem Your Coupons</Text>
      <Coupon
        title="Purty Kitchen"
        description="Free meal tasting event"
        points={1000}
        expiry="4d9(20h29m)"
      />
      <Coupon
        title="Bear Market"
        description="10% off on all coffee"
        points={200}
      />
    </View>
  );
};

const Coupon = ({ title, description, points, expiry }) => (
  <View style={styles.coupon}>
    <View style={styles.couponInfo}>
      <Text style={styles.couponTitle}>{title}</Text>
      <Text style={styles.couponDescription}>{description}</Text>
      {expiry && <Text style={styles.couponExpiry}>{expiry}</Text>}
    </View>
    <View style={styles.couponPoints}>
      <Text style={styles.pointsValue}>{points}</Text>
      <Text style={styles.pointsLabel}>points</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  coupon: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  couponInfo: {
    flex: 1,
  },
  couponTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  couponDescription: {
    fontSize: 14,
    color: '#888',
  },
  couponExpiry: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  couponPoints: {
    backgroundColor: '#ffa500',
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointsValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pointsLabel: {
    color: '#fff',
    fontSize: 12,
  },
});

export default CouponList;
// Highlight end