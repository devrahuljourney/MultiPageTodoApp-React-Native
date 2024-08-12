import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddTodo = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  const saveTodo = async () => {
    if (title.trim() === '' || description.trim() === '') {
      Alert.alert('Validation Error', 'Title and description are required.');
      return;
    }

    const newTodo = {
      id: Date.now().toString(),
      title,
      description,
      completed,
    };

    try {
      const existingTodos = await AsyncStorage.getItem('todos');
      const todos = existingTodos ? JSON.parse(existingTodos) : [];
      todos.push(newTodo);
      await AsyncStorage.setItem('todos', JSON.stringify(todos));
      Alert.alert('Success', 'To-do added successfully!');
      setTitle('');
      setDescription('');
      setCompleted(false);
      navigation.goBack(); 
    } catch (error) {
      Alert.alert('Error', 'Failed to save the to-do.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
      />

      <Button title="Save To-do" onPress={saveTodo} />
    </View>
  );
};

export default AddTodo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});
