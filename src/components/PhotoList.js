import React from 'react';
import Photo from './Photo';
import {FlatList} from 'react-native';

export default function PhotoList({list}) {
  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({item}) => (
    <Photo
      title={item.title}
      uri={item.uri}
      photo_id={item.photo_id}
      onComments={item.onComments}
    />
  );

  return (
    <FlatList keyExtractor={keyExtractor} data={list} renderItem={renderItem} />
  );
}
