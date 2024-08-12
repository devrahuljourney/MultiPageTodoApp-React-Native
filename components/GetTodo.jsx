import { StyleSheet, Text, View, TouchableOpacity, Alert, FlatList, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const generateColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const GetTodo = ({ navigation }) => {
  const [data, setData] = useState([]);

  const fetchTodo = async () => {
    try {
      const todo = await AsyncStorage.getItem('todos');
      if (todo) {
        setData(JSON.parse(todo));
      } else {
        setData([]);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  useEffect(() => {
    fetchTodo();
    const unsubscribe = navigation.addListener('focus', fetchTodo);

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  const markCompleted = async (id) => {
    try {
      const updatedTodos = data.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
      setData(updatedTodos);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const updatedTodos = data.filter(todo => todo.id !== id);
      await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
      setData(updatedTodos);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.todoItem, { backgroundColor: generateColor() }]}>
      <Text style={styles.todoTitle}>{item.title}</Text>
      <Text style={styles.todoDescription}>{item.description}</Text>
      <View style={styles.buttonsContainer}>
        <Button
          title={item.completed ? 'Mark Incomplete' : 'Mark Completed'}
          onPress={() => markCompleted(item.id)}
        />
        <Button
          title="Delete"
          color="red"
          onPress={() => deleteTodo(item.id)}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Add Todo')}>
          <Text style={styles.text}>Add Todo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default GetTodo;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  todoItem: {
    padding: 16,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  todoDescription: {
    fontSize: 16,
    color: '#333',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  text: {
    fontSize: 20,
    color: '#007bff',
    marginTop: 20,
  },
});
