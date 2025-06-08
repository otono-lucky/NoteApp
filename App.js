import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SignupScreen from './src/screens/SignupScreen';
import LoginScreen from './src/screens/LoginScreen';
import CreateNoteScreen from './src/screens/CreateNoteScreen';
import NotesListScreen from './src/screens/NotesListScreen';
import NoteDetailsScreen from './src/screens/NoteDetailsScreen';



const navigator = createStackNavigator(
  {
    Signup: SignupScreen,
    Login: LoginScreen,
    Create: CreateNoteScreen,
    NotesList: NotesListScreen,
    NoteDetails: NoteDetailsScreen,
  },
  {
    initialRouteName: 'Create',
    defaultNavigationOptions: {
      headerShown: true,
    },
  }
);

const AppContainer = createAppContainer(navigator);

export default function App() {
  return <AppContainer />;
}

