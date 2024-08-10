// Highlight start
import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import UserHeader from '../../Components/Profile/UserHeader';
import UserStats from '../../Components/Profile/UserStats';
import Badge from '../../Components/Profile/Badge';
import CouponList from '../../Components/Profile/CouponList';
import ReviewsList from '../../Components/Profile/ReviewsList';

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState('Achievements');

  const renderContent = () => {
    if (activeTab === 'Achievements') {
      return (
        <>
          <UserStats />
          <Badge />
          <CouponList />
        </>
      );
    } else {
      return <ReviewsList />;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <UserHeader />
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Achievements' && styles.activeTab]}
          onPress={() => setActiveTab('Achievements')}
        >
          <Text style={[styles.tabText, activeTab === 'Achievements' && styles.activeTabText]}>
            Achievements
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Reviews' && styles.activeTab]}
          onPress={() => setActiveTab('Reviews')}
        >
          <Text style={[styles.tabText, activeTab === 'Reviews' && styles.activeTabText]}>
            Reviews
          </Text>
        </TouchableOpacity>
      </View>
      {renderContent()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  tabText: {
    fontSize: 16,
    color: '#888',
  },
  activeTabText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;