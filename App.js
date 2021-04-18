import React from 'react';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);
import Navigation from './navigation/Navigation';
import { LogBox } from 'react-native'

LogBox.ignoreAllLogs()
LogBox.ignoreLogs(['Setting a timer'])

export default function App() {
  return (
    <Navigation/>
  )
}

