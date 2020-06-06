import React from 'react';
import Album from './Album';
import {FlatList} from 'react-native';

export default function AlbumList({list}) {
  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({item}) => (
    <Album
      title={item.title}
      list_uri={item.list_uri}
      onAlbum={item.onAlbum}
      album_id={item.album_id}
    />
  );

  return (
    <FlatList keyExtractor={keyExtractor} data={list} renderItem={renderItem} />
  );
}
