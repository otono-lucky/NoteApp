import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createNote, getCurrentUser } from '../../appwrite/services'; // Adjust path as needed

const CreateNoteScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateNote = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Error', 'Please enter both title and content.');
      return;
    }

    try {
      setLoading(true);
      const user = await getCurrentUser();

      await createNote(title, content, user.$id);
      Alert.alert('Success', 'Note created successfully!');

      // Navigate to Notes list or Home
      navigation.navigate('NotesList'); // or whatever screen you want
    } catch (error) {
      console.error('Note creation error:', error);
      Alert.alert('Error', 'Failed to create note.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create a New Note</Text>

      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        style={[styles.input, styles.multilineInput]}
        multiline
        numberOfLines={4}
      />

      <Button
        title={loading ? 'Creating...' : 'Create Note'}
        onPress={handleCreateNote}
        disabled={loading}
      />
    </View>
  );
};

export default CreateNoteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
});
