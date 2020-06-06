import React from 'react';
import {ListItem} from 'react-native-elements';

export default function Comment({username, comment}) {
  return (
    <ListItem
      title={username}
      subtitle={comment}
      //leftAvatar={{source: {uri: item.avatar_url}}}
      bottomDivider
    />
  );
}
