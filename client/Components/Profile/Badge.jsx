// Highlight start
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Badge = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Badges</Text>
      <View style={styles.badgeContainer}>
        <BadgeItem title="Food Critic" value="100" color="#536DFE" />
        <BadgeItem title="Sushi Expert" value="10" color="#7B61FF" />
        <BadgeItem title="Speak 4 all" value="?" color="#EEEEEE" />
        <BadgeItem title="Pause and Ponder" value="?" color="#EEEEEE" />
        <BadgeItem title="Menu Collector" value="?" color="#EEEEEE" />
        <BadgeItem title="You're on Fire" value="?" color="#EEEEEE" />
      </View>
    </View>
  );
};

const BadgeItem = ({ title, value, color }) => (
  <View style={[styles.badge, { backgroundColor: color }]}>
    <Text style={styles.badgeValue}>{value}</Text>
    <Text style={styles.badgeTitle}>{title}</Text>
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
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  badge: {
    width: '30%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  badgeValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  badgeTitle: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
});

export default Badge;
// Highlight end