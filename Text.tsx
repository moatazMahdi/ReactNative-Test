import React, {useReducer, useEffect} from 'react';
import {View, Button, Text, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Reducer function
const CountReducer = (state, action) => {
  switch (action.type) {
    case 'PERSIST':
      return action.payload;
    case 'INCREMENT':
      return {count: state.count + 1};
    case 'DECREMENT':
      return {count: state.count - 1};
    default:
      return state;
  }
};

const Counter = () => {
  useEffect(() => {
    const loadInitialState = async () => {
      try {
        const data = await AsyncStorage.getItem('counterState');
        if (data) {
          dispatch({type: 'PERSIST', payload: JSON.parse(data)});
        }
      } catch (error) {
        console.error('Error loading initial state:', error);
      }
    };

    loadInitialState();
  }, []);

  // Initial state and dispatch function returned by useReducer
  const [state, dispatch] = useReducer(CountReducer, {count: 0});

  // Update AsyncStorage whenever the state changes
  useEffect(() => {
    AsyncStorage.setItem('counterState', JSON.stringify(state));
  }, [state]);

  return (
    <SafeAreaView>
      <Text>Count: {state.count}</Text>
      <Button title="Increment" onPress={() => dispatch({type: 'INCREMENT'})} />
      <Button title="Decrement" onPress={() => dispatch({type: 'DECREMENT'})} />
    </SafeAreaView>
  );
};

export default Counter;
