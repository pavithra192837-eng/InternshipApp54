import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Portfolio</Text>

      <View style={styles.card}>
        <Text style={styles.title}>👩‍💻 Pavithra Rajaraman</Text>
        <Text style={styles.subtitle}>ECE Student</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.text}>
          Exploring mobile app development through React Native and modern UI design.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Current Mission</Text>
        <Text style={styles.value}>
          Mobile Dev Setup & UI Fundamentals
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
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
  },

  title: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
  },

  subtitle: {
    color: '#94a3b8',
    marginTop: 5,
  },

  text: {
    color: 'white',
    fontSize: 16,
  },

  label: {
    color: '#94a3b8',
  },

  value: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
  },
});