import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Button,
} from 'react-native';
import { getNote } from '../../appwrite/services'; // Adjust the path

const NoteDetailsScreen = ({ navigation }) => {
  const noteId = navigation.getParam('noteId');
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchNote = async () => {
    try {
      setLoading(true);
      const fetchedNote = await getNote(noteId);
      setNote(fetchedNote);
    } catch (error) {
      console.error('Failed to fetch note:', error);
      Alert.alert('Error', 'Could not load note details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNote();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!note) {
    return (
      <View style={styles.center}>
        <Text>Note not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.content}>{note.content}</Text>

      {/* Placeholder for future edit/delete buttons */}
      <View style={styles.buttonGroup}>
        <Button title="Edit Note" onPress={() => {
          // navigation.navigate('EditNote', { noteId }); // (if you implement editing)
          Alert.alert('Edit coming soon...');
        }} />
        <Button title="Delete Note" color="red" onPress={() => {
          Alert.alert('Delete coming soon...');
        }} />
      </View>
    </View>
  );
};

export default NoteDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
  },
  content: {
    fontSize: 16,
    color: '#333',
  },
  buttonGroup: {
    marginTop: 32,
    gap: 12,
  },
});
