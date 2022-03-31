import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-uuid';
import Header from './components/Header';
import ListItem from './components/ListItem';
import AddItem from './components/AddItem';

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem(
          'ShoppingList',
          (err, result) => {
            if (err) {
              console.log(err);
            }
          },
        );
        if (value !== null) {
          // We have data!!
          setItems(JSON.parse(value));
        }
      } catch (error) {
        // Error retrieving data
      }
    };
    _retrieveData();
  }, []);

  useEffect(() => {
    const _storeData = async () => {
      try {
        await AsyncStorage.setItem(
          'ShoppingList',
          JSON.stringify(items),
          error => {
            if (error) {
              console.log(error);
            }
          },
        );
      } catch (error) {
        // Error saving data
      }
    };
    _storeData();
  }, [items]);

  const deleteItem = id => {
    setItems(prevItems => {
      return prevItems.filter(item => item.id != id);
    });
  };

  const additem = text => {
    // check  if input is empty
    if (!text) {
      Alert.alert('Error', 'Please enter an item', [{text: 'Ok'}]);
      return;
    }

    // check if item already exists
    const itemExists = items.find(item => item.text === text);
    if (itemExists) {
      Alert.alert('Error', 'Item already exists', [{text: 'Ok'}]);
      return;
    }

    // add new item
    setItems(prevItems => {
      return [
        {
          id: uuid(),
          text,
        },
        ...prevItems,
      ];
    });
  };

  return (
    <View style={styles.container}>
      <Header title="Shopping List" />
      <AddItem additem={additem} />
      <FlatList
        data={items}
        renderItem={({item}) => (
          <ListItem item={item} deleteItem={deleteItem} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
