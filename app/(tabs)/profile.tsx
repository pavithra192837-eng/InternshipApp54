import React, { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Animated,
} from 'react-native';
import { router } from 'expo-router';

const SKILLS = [
  { name: 'React Native', color: '#6366f1' },
  { name: 'JavaScript', color: '#f59e0b' },
  { name: 'Git & GitHub', color: '#22c55e' },
  { name: 'Mobile UI Design', color: '#ec4899' },
];

const EDUCATION = [
  {
    level: '10th (SSLC)',
    school: "St. Theresa's Girls Higher Secondary School, Thiruthuraipoondi",
    details: 'State Board · 2022 · 92%',
  },
  {
    level: '12th (HSC)',
    school: "St. Theresa's Girls Higher Secondary School, Thiruthuraipoondi",
    details: 'Bio-Maths · State Board · 2024 · 92%',
  },
  {
    level: 'BE — ECE (3rd Year)',
    school: 'Government College of Engineering, Tirunelveli',
    details: '2024 – 2028',
  },
];

const PRESENTATION = {
  title: 'Merit Prize - National Level Technical Symposium',
  event: "TELETEC'26 · Thiagarajar College of Engineering, Madurai",
  description:
    'Presented a research paper titled "AgroBloom Rover" at the national-level technical symposium TELETEC\'26. The project demonstrates an intelligent agricultural rover for real-time soil nutrient analysis and automated fertilizer spraying using ESP32, NPK sensors, LoRa communication, and a Rocker-Bogie mobility mechanism. It was recognized with a Merit Prize for its innovation and practical application in smart agriculture.',
};

export default function ProfileScreen() {
  const [feedback, setFeedback] = useState('');
  const [savedFeedback, setSavedFeedback] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [showPresentationDetails, setShowPresentationDetails] = useState(false);

  const toastAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadFeedback();
  }, []);

  const showSuccessToast = () => {
    setShowToast(true);
    Animated.sequence([
      Animated.timing(toastAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(toastAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => setShowToast(false));
  };

  const loadFeedback = async () => {
    try {
      const data = await AsyncStorage.getItem('feedback');

      if (data !== null) {
        setSavedFeedback(data);
      }
    } catch {
      console.log('Error loading feedback');
    }
  };

  const handleSubmitFeedback = async () => {
    if (feedback.trim() === '') return;

    try {
      await AsyncStorage.setItem('feedback', feedback);
      setSavedFeedback(feedback);
      setFeedback('');
      showSuccessToast();
    } catch {
      console.log('Error saving feedback');
    }
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
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
            I am Pavithra Rajaraman, a 3rd-year ECE student at Government
            College of Engineering, Tirunelveli, with a strong interest in
            full-stack and mobile app development. After completing a one-month
            full-stack development course, I am now learning React Native and
            building projects to create modern, user-friendly applications. I
            enjoy problem-solving, exploring new technologies, and turning
            ideas into practical solutions. My goal is to grow as a developer
            and contribute to meaningful tech innovations.
          </Text>
        </View>

        <View style={styles.educationCard}>
          <Text style={styles.educationTitle}>🎓 Education</Text>

          {EDUCATION.map((entry, index) => (
            <View
              key={entry.level}
              style={[
                styles.educationEntry,
                index < EDUCATION.length - 1 && styles.educationEntryBorder,
              ]}
            >
              <Text style={styles.educationLevel}>{entry.level}</Text>
              <Text style={styles.educationSchool}>{entry.school}</Text>
              <Text style={styles.educationDetails}>{entry.details}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.presentationCard}
          onPress={() => setShowPresentationDetails((current) => !current)}
          activeOpacity={0.85}
        >
          <View style={styles.presentationHeader}>
            <Text style={styles.presentationTitle}>{PRESENTATION.title}</Text>
            <Text style={styles.presentationEvent}>{PRESENTATION.event}</Text>
          </View>
          <Text style={styles.presentationTapText}>
            {showPresentationDetails ? '▲ Tap to hide details' : '▼ Tap to view details'}
          </Text>
          {showPresentationDetails ? (
            <View style={styles.presentationDetails}>
              <Text style={styles.presentationDescription}>
                {PRESENTATION.description}
              </Text>
            </View>
          ) : null}
        </TouchableOpacity>

        <View style={styles.skillsCard}>
          <Text style={styles.skillsTitle}>🛠 Technical Skills</Text>

          <View style={styles.chipsContainer}>
            {SKILLS.map((skill) => (
              <View
                key={skill.name}
                style={[
                  styles.chip,
                  {
                    backgroundColor: `${skill.color}22`,
                    borderColor: skill.color,
                  },
                ]}
              >
                <Text style={[styles.chipText, { color: skill.color }]}>
                  {skill.name}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.feedbackCard}>
          <Text style={styles.feedbackTitle}>💬 Feedback & Suggestions</Text>

          <Text style={styles.feedbackSubtitle}>
            Share your thoughts about my portfolio app.
          </Text>

          <TextInput
            style={styles.input}
            value={feedback}
            onChangeText={setFeedback}
            placeholder="Enter your feedback..."
            placeholderTextColor="#94a3b8"
            multiline
          />

          <TouchableOpacity
            style={styles.feedbackButton}
            onPress={handleSubmitFeedback}
          >
            <Text style={styles.buttonText}>Submit Feedback</Text>
          </TouchableOpacity>

          {savedFeedback ? (
            <View style={styles.savedFeedbackCard}>
              <Text style={styles.savedTitle}>Latest Feedback</Text>
              <Text style={styles.savedText}>💬 {savedFeedback}</Text>
            </View>
          ) : null}
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>

      {showToast ? (
        <Animated.View
          style={[
            styles.toast,
            {
              opacity: toastAnim,
              transform: [
                {
                  translateY: toastAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.toastText}>✓ Feedback saved!</Text>
        </Animated.View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#0f172a',
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  heading: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 80,
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

  educationCard: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 16,
    marginTop: 20,
  },

  educationTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  educationEntry: {
    paddingVertical: 12,
  },

  educationEntryBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },

  educationLevel: {
    color: '#6366f1',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  educationSchool: {
    color: 'white',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 4,
  },

  educationDetails: {
    color: '#94a3b8',
    fontSize: 14,
  },

  skillsCard: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 16,
    marginTop: 20,
  },

  skillsTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },

  chipText: {
    fontSize: 14,
    fontWeight: '600',
  },

  feedbackCard: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 16,
    marginTop: 20,
  },

  feedbackTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

  feedbackSubtitle: {
    color: '#94a3b8',
    marginTop: 8,
    marginBottom: 15,
  },

  input: {
    backgroundColor: '#334155',
    color: 'white',
    minHeight: 100,
    padding: 15,
    borderRadius: 12,
    textAlignVertical: 'top',
  },

  feedbackButton: {
    backgroundColor: '#22c55e',
    padding: 14,
    borderRadius: 12,
    marginTop: 15,
  },

  savedFeedbackCard: {
    backgroundColor: '#334155',
    padding: 15,
    borderRadius: 12,
    marginTop: 15,
  },

  savedTitle: {
    color: '#22c55e',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  savedText: {
    color: 'white',
    lineHeight: 22,
  },

  presentationCard: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 16,
    marginTop: 20,
  },

  presentationHeader: {
    marginBottom: 10,
  },

  presentationTitle: {
    color: '#6366f1',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  presentationEvent: {
    color: '#cbd5e1',
    fontSize: 15,
  },

  presentationTapText: {
    color: '#94a3b8',
    marginTop: 10,
    fontSize: 14,
  },

  presentationDetails: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#0f172a',
    borderRadius: 12,
  },

  presentationDescription: {
    color: '#cbd5e1',
    lineHeight: 22,
    fontSize: 14,
  },

  toast: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#22c55e',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  toastText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
