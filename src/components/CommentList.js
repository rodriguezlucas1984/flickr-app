import React from 'react';

import Comment from './Comment';
import {FlatList} from 'react-native';

export default function CommentList({list}) {
  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({item}) => (
    <Comment username={item.authorname} comment={item._content} />
  );

  return (
    <FlatList keyExtractor={keyExtractor} data={list} renderItem={renderItem} />
  );
}
