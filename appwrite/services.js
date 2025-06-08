import { account, databases, ID } from './config';
import { Permission, Role, Query } from 'appwrite';

// Database & Collection IDs
const DB_ID = '68447d340006b0f2c610';
const COLLECTION_ID = '68447d3f002491fa2911';

//////////////////////
// 🔐 Auth Services //
//////////////////////

// Register a new user
export const register = async (email, password, name) => {
  return await account.create(ID.unique(), email, password, name);
};

// Log in an existing user
export const login = async (email, password) => {
  return await account.createEmailSession(email, password);
};

// Log out current session
export const logout = async () => {
  return await account.deleteSession('current');
};

// Get the current logged-in user
export const getCurrentUser = async () => {
  return await account.get();
};

///////////////////////
// 📝 Notes Services //
///////////////////////

// Create a new note with document-level permissions
export const createNote = async (title, content, userId) => {
  return await databases.createDocument(
    DB_ID,
    COLLECTION_ID,
    ID.unique(),
    { title, content, userId },
    [
      Permission.read(Role.user(userId)),
      Permission.write(Role.user(userId)),
      Permission.update(Role.user(userId)),
      Permission.delete(Role.user(userId)),
    ]
  );
};

// Get all notes for a specific user
export const getNotes = async (userId) => {
  return await databases.listDocuments(DB_ID, COLLECTION_ID, [
    Query.equal('userId', userId),
  ]);
};

// Get a single note by its ID
export const getNote = async (noteId) => {
  return await databases.getDocument(DB_ID, COLLECTION_ID, noteId);
};

// Update a note (does not change permissions unless specified)
export const updateNote = async (noteId, data) => {
  return await databases.updateDocument(DB_ID, COLLECTION_ID, noteId, data);
};

// Delete a note
export const deleteNote = async (noteId) => {
  return await databases.deleteDocument(DB_ID, COLLECTION_ID, noteId);
};
