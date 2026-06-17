import React, { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  Animated,
  RefreshControl,
} from 'react-native';

type CommunityMember = {
  id: number;
  name: string;
  title: string;
  organization: string;
  email?: string;
  avatarUrl?: string;
  bio?: string;
};

const API_URL = 'https://jsonplaceholder.typicode.com/users?_limit=3';
const CACHE_KEY = 'community_members';

const PROFILE_DETAILS = [
  '🎓 ECE Student',
  '📚 Learning React Native',
  '🚀 Future Mobile App Developer',
  '💻 Passionate About UI Design',
];

const QUICK_HIGHLIGHTS = [
  '🎓 ECE student passionate about mobile apps',
  '📱 Building this portfolio with React Native & Expo',
  '🌐 Learning APIs, state management & local storage',
  '🎯 Goal: Full-time mobile app developer',
];

export default function HomeScreen() {
  const [showDetails, setShowDetails] = useState(false);
  const [members, setMembers] = useState<CommunityMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [detailsHeight, setDetailsHeight] = useState(0);

  const expandAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    Animated.timing(expandAnim, {
      toValue: showDetails ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [showDetails, expandAnim]);

  const fetchMembers = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError('');

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error('Failed to fetch community members');
      }

      const data: CommunityMember[] = await response.json();
      setMembers(data);
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch {
      const cached = await AsyncStorage.getItem(CACHE_KEY);

      if (cached) {
        setMembers(JSON.parse(cached));
        setError('Showing cached data. Could not reach the server.');
      } else {
        setError('Unable to load community members. Please check your connection.');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => fetchMembers(true);

  const animatedHeight = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, detailsHeight],
  });

  const animatedOpacity = expandAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.5, 1],
  });

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#6366f1"
          colors={['#6366f1']}
        />
      }
    >
      <View style={styles.heroSection}>
        <Text style={styles.greeting}>Hi, I'm Pavithra 👋</Text>
        <Text style={styles.tagline}>
          ECE Student · Aspiring Mobile App Developer
        </Text>
      </View>

      <Image
        source={require('../../assets/images/Banner.png')}
        style={styles.banner}
      />

      <Image
        source={require('../../assets/images/profile.jpeg')}
        style={styles.profileImage}
      />

      <TouchableOpacity
        style={styles.profileCard}
        onPress={() => setShowDetails(!showDetails)}
        activeOpacity={0.85}
      >
        <Text style={styles.name}>👩‍💻 Pavithra Rajaraman</Text>

        <Text style={styles.tapText}>
          {showDetails
            ? '▲ Tap to Hide Details'
            : '▼ Tap to View Details'}
        </Text>

        <View
          style={styles.measureContainer}
          onLayout={(e) => setDetailsHeight(e.nativeEvent.layout.height)}
        >
          <View style={styles.detailsContainer}>
            {PROFILE_DETAILS.map((detail) => (
              <Text key={detail} style={styles.detail}>{detail}</Text>
            ))}
          </View>
        </View>

        <Animated.View
          style={{
            height: animatedHeight,
            opacity: animatedOpacity,
            overflow: 'hidden',
          }}
        >
          <View style={styles.detailsContainer}>
            {PROFILE_DETAILS.map((detail) => (
              <Text key={detail} style={styles.detail}>{detail}</Text>
            ))}
          </View>
        </Animated.View>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>⚡ Quick Highlights</Text>

        {QUICK_HIGHLIGHTS.map((highlight) => (
          <View key={highlight} style={styles.highlightRow}>
            <Text style={styles.highlightText}>{highlight}</Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🌟 Developer Community Members</Text>
        <Text style={styles.pullHint}>Pull down to refresh</Text>

        {loading && !refreshing ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#6366f1" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : error && members.length === 0 ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={() => fetchMembers()}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {error ? (
              <Text style={styles.warningText}>{error}</Text>
            ) : null}
            {members.map((user) => (
              <View key={user.id} style={styles.updateCard}>
                <Text style={styles.updateTitle}>👤 {user.name}</Text>
                <Text style={styles.updateEmail}>📧 {user.email}</Text>
              </View>
            ))}
          </>
        )}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    paddingHorizontal: 20,
  },

  heroSection: {
    marginTop: 70,
    marginBottom: 20,
  },

  greeting: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },

  tagline: {
    color: '#94a3b8',
    fontSize: 15,
    marginTop: 6,
  },

  banner: {
    width: '100%',
    height: 220,
    borderRadius: 25,
    marginBottom: 20,
  },

  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    alignSelf: 'center',
    marginTop: -85,
    marginBottom: 20,
    borderWidth: 4,
    borderColor: '#0f172a',
  },

  profileCard: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },

  name: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  tapText: {
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 8,
  },

  measureContainer: {
    position: 'absolute',
    opacity: 0,
    zIndex: -1,
    left: 20,
    right: 20,
  },

  detailsContainer: {
    marginTop: 15,
  },

  detail: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },

  card: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },

  cardTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  pullHint: {
    color: '#64748b',
    fontSize: 12,
    marginBottom: 12,
  },

  highlightRow: {
    backgroundColor: '#334155',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },

  highlightText: {
    color: '#e2e8f0',
    fontSize: 15,
    lineHeight: 22,
  },

  loadingBox: {
    alignItems: 'center',
    paddingVertical: 20,
  },

  loadingText: {
    color: 'white',
    marginTop: 10,
  },

  errorBox: {
    alignItems: 'center',
    paddingVertical: 10,
  },

  errorText: {
    color: '#ef4444',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 12,
  },

  warningText: {
    color: '#f59e0b',
    fontSize: 14,
    marginBottom: 12,
  },

  retryButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 10,
  },

  retryText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },

  updateCard: {
    backgroundColor: '#334155',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },

  updateTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  updateEmail: {
    color: '#cbd5e1',
    marginTop: 5,
  },
});
