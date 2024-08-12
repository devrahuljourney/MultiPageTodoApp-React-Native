import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          source={require('../assets/todo_hand.jpg')} 
          style={styles.image} 
        />
      </View>
      <View style={styles.para}>
        <Text style={styles.heading}>
          Start where you are. Use what you have. Do what you can. Every small step counts towards a bigger goal.
        </Text>
        <Text style={styles.line}>
          Welcome! This app helps you stay on top of your tasks, no matter how big or small. Break your goals into simple steps, complete them one by one, and see how much you can achieve. Every task you finish gets you closer to your goals!
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate("All Todo")}}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  imageContainer: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  para: {
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  line: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default HomeScreen;
