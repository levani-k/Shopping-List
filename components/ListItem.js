import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const ListItem = ({item: {id, text}, deleteItem}) => {
  return (
    <TouchableOpacity style={styles.listItem}>
      <View style={styles.listItemView}>
        <Text style={styles.listItemText}>{text}</Text>
        <Icon
          name="remove"
          size={30}
          color="firebrick"
          onPress={() => deleteItem(id)}
          style={styles.listItemIcon}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  listItemText: {
    fontSize: 18,
    color: '#333',
  },
  listItemIcon: {
    marginRight: 10,
  },
});

export default ListItem;
