import React from 'react';
import {Card, Button} from 'react-native-elements';
import {Linking} from 'react-native';

export default function Photo({title, uri, photo_id, onComments}) {
  return (
    <Card
      title={title}
      image={
        uri && {
          uri: uri,
        }
      }
      containerStyle={{borderRadius: 15}}>
      <Button
        title="WEB"
        type="outline"
        buttonStyle={{marginBottom: 1}}
        onPress={() => Linking.openURL(uri)}
      />
      <Button
        title="COMENTARIOS"
        type="outline"
        onPress={() => onComments(photo_id)}
      />
    </Card>
  );
}
