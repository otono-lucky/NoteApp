import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import { getNotes, getCurrentUser } from '../../appwrite/services'; // Adjust path if needed

const NotesListScreen = ({ navigation }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const user = await getCurrentUser();
      const response = await getNotes(user.$id);
      setNotes(response.documents);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
      Alert.alert('Error', 'Could not load notes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchNotes);
    return unsubscribe;
  }, [navigation]);

  const renderNote = ({ item }) => (
    <TouchableOpacity
      style={styles.noteCard}
      onPress={() => {
        // Later: navigate to note detail/edit screen
        Alert.alert(item.title, item.content);
      }}
    >
      <Text style={styles.noteTitle}>{item.title}</Text>
      <Text style={styles.noteContent} numberOfLines={2}>
        {item.content}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Notes</Text>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.$id}
        renderItem={renderNote}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text>No notes found.</Text>}
      />

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('CreateNote')}
      >
        <Text style={styles.createButtonText}>+ New Note</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotesListScreen;

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
  list: {
    paddingBottom: 100,
  },
  noteCard: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  noteContent: {
    marginTop: 4,
    color: '#555',
  },
  createButton: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    backgroundColor: '#1e90ff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
