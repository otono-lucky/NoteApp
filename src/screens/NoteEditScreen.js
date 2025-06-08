import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { getNote, updateNote } from '../../appwrite/services'; 

const NoteEditScreen = ({ navigation }) => {
  const noteId = navigation.getParam('noteId');

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchNote = async () => {
    try {
      const note = await getNote(noteId);
      setTitle(note.title);
      setContent(note.content);
    } catch (error) {
      console.error('Failed to load note:', error);
      Alert.alert('Error', 'Could not load note.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Validation', 'Both fields are required.');
      return;
    }

    try {
      setLoading(true);
      await updateNote(noteId, { title, content });
      Alert.alert('Success', 'Note updated successfully!');
      navigation.goBack(); // Or navigate to NoteDetails if you prefer
    } catch (error) {
      console.error('Update error:', error);
      Alert.alert('Error', 'Could not update note.');
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

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Note</Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Content"
        multiline
        numberOfLines={4}
        value={content}
        onChangeText={setContent}
      />

      <Button title="Save Changes" onPress={handleSave} />
    </View>
  );
};

export default NoteEditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  multilineInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
