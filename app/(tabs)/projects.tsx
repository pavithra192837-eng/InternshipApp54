import { View, Text, StyleSheet } from 'react-native';

export default function ProjectsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Projects</Text>

      <View style={styles.card}>
        <Text style={styles.title}>📱 Portfolio App</Text>
        <Text style={styles.desc}>
          React Native internship project.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>🧮 Calculator App</Text>
        <Text style={styles.desc}>
          Planned future project.
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
    marginBottom: 15,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  desc: {
    color: '#94a3b8',
    marginTop: 8,
  },
});