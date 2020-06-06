import React from 'react';
import {Card, Button, Image} from 'react-native-elements';
import {ActivityIndicator, View} from 'react-native';

export default function Album({title, list_uri, onAlbum, album_id}) {
  return (
    <Card title={title}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: 10,
        }}>
        {list_uri.map((uri, index) => (
          <Image
            key={index}
            source={{uri: uri}}
            style={{width: 100, height: 100, margin: 3, borderRadius: 10}}
            PlaceholderContent={<ActivityIndicator />}
          />
        ))}
      </View>
      <Button
        title="VER ÁLBUM"
        type="outline"
        buttonStyle={{marginBottom: 1}}
        onPress={() => onAlbum(album_id)}
      />
    </Card>
  );
}
