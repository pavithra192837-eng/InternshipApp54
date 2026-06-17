import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 60;

const PROJECTS = [
  {
    id: '1',
    title: '📱 Portfolio App',
    desc: 'React Native internship project showcasing my skills in mobile development, UI design, and API integration.',
    tech: 'React Native · Expo · AsyncStorage',
    status: 'Live',
    statusColor: '#22c55e',
  },
  {
    id: '2',
    title: '🧮 Calculator App',
    desc: 'A clean and functional calculator app with basic arithmetic operations and a modern dark UI.',
    tech: 'React Native · JavaScript',
    status: 'Planned',
    statusColor: '#f59e0b',
  },
];

export default function ProjectsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Projects</Text>
      <Text style={styles.subtitle}>Swipe to explore →</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH + 16}
        snapToAlignment="start"
        contentContainerStyle={styles.carouselContent}
      >
        {PROJECTS.map((project) => (
          <View key={project.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.title}>{project.title}</Text>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: `${project.statusColor}22` },
                ]}
              >
                <Text style={[styles.statusText, { color: project.statusColor }]}>
                  {project.status}
                </Text>
              </View>
            </View>

            <Text style={styles.desc}>{project.desc}</Text>

            <View style={styles.techRow}>
              <Text style={styles.techLabel}>Tech:</Text>
              <Text style={styles.techText}>{project.tech}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    paddingTop: 80,
  },

  heading: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 6,
    paddingHorizontal: 20,
  },

  subtitle: {
    color: '#64748b',
    fontSize: 13,
    marginBottom: 20,
    paddingHorizontal: 20,
  },

  carouselContent: {
    paddingHorizontal: 20,
    gap: 16,
  },

  card: {
    width: CARD_WIDTH,
    backgroundColor: '#1e293b',
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 10,
  },

  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },

  desc: {
    color: '#94a3b8',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },

  techRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  techLabel: {
    color: '#64748b',
    fontSize: 13,
  },

  techText: {
    color: '#6366f1',
    fontSize: 13,
    fontWeight: '600',
  },
});
