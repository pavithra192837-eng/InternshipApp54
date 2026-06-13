import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profile</Text>

      <View style={styles.card}>
        <Text style={styles.item}>👤 Name: Pavithra Rajaraman</Text>
        <Text style={styles.item}>🎓 Department: ECE</Text>
        <Text style={styles.item}>📚 Learning: React Native</Text>
        <Text style={styles.item}>🚀 Goal: Mobile App Developer</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/contact')}
      >
        <Text style={styles.buttonText}>Contact Me</Text>
      </TouchableOpacity>

      <View style={styles.aboutCard}>
        <Text style={styles.aboutTitle}>About Me</Text>

        <Text style={styles.aboutText}>
          I am an Electronics and Communication Engineering student with a strong
          interest in mobile app development. Currently, I am learning React Native
          and building projects to improve my skills in creating modern and
          user-friendly mobile applications.
        </Text>
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
    fontSize: 18,
    marginBottom: 15,
  },

  button: {
    backgroundColor: '#6366f1',
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
  },

  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },

  aboutCard: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 16,
    marginTop: 20,
  },

  aboutTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  aboutText: {
    color: '#cbd5e1',
    fontSize: 15,
    lineHeight: 24,
  },
});
