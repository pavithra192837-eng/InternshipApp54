import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';

export default function ContactScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Contact</Text>

      <View style={styles.card}>
        <Text style={styles.item}>
          📧 Email: pavithra192837@gmail.com
        </Text>
        <Text style={styles.item}>
          📱 Phone: +91 90873 82165
        </Text>

        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://github.com/pavithra192837-eng')
          }
        >
          <Text style={styles.link}>💻 GitHub Profile</Text>
        </TouchableOpacity>
        

        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              'https://www.linkedin.com/in/pavithra-rajaraman-085b2b30a'
            )
          }
        >
          <Text style={styles.link}>💼 LinkedIn Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  heading: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 16,
  },
  item: {
    color: 'white',
    fontSize: 16,
    marginBottom: 15,
  },
  link: {
    color: '#60a5fa',
    fontSize: 16,
    marginBottom: 15,
    textDecorationLine: 'underline',
  },
});