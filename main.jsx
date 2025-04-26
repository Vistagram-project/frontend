import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import App from './App'
import { Provider } from 'react-redux'
import store, { persistor } from './src/redux/store'
import { PersistGate } from 'redux-persist/integration/react'


const main = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  )
}

export default main

const styles = StyleSheet.create({})