import React, {useState} from 'react';
import {Text} from 'react-native-elements';
import {View} from 'react-native';
import PhotoList from './PhotoList';
import KeyPad from './KeyPad';

export default function Photos({route, navigation}) {
  const [error, setError] = useState();
  const api_key = '6e8a597cb502b7b95dbd46a46e25db8d';

  const {photos} = route.params;

  const handleOrder = order => {
    console.log('handleOrder!');
  };

  const handleOnComments = photo_id => {
    const photo = photos.find(p => p.id == photo_id);
    navigation.navigate('photo-comments', {photo_id});
  };

  // el fetch de fotos se realizó en el componente Albums
  // (por la vista previa miniatura requerida de c/foto)

  const preparePhotos = photos => {
    if (!photos || photos.length === 0) {
      setError('No hay fotos');
      return null;
    } else {
      const list = photos.map(p => {
        return {
          title: p.title,
          uri: `https://farm${p.farm}.staticflickr.com/${p.server}/${p.id}_${
            p.secret
          }.jpg`,
          photo_id: p.id,
          //date: p.date,
          onComments: handleOnComments,
        };
      });
      return list;
    }
  };

  // no usado
  const convertDate = ts => {
    const ts_ms = ts * 1000;
    var date_ob = new Date(ts_ms);
    var year = date_ob.getFullYear();
    var month = ('0' + (date_ob.getMonth() + 1)).slice(-2);
    var date = ('0' + date_ob.getDate()).slice(-2);
    var hours = ('0' + date_ob.getHours()).slice(-2);
    var minutes = ('0' + date_ob.getMinutes()).slice(-2);
    var seconds = ('0' + date_ob.getSeconds()).slice(-2);
    return year + '-' + month + '-' + date;
  };

  const renderPhotos = () => {
    const list = preparePhotos(photos);
    if (!list || list.length === 0) return <Text>No hay fotos</Text>;
    return (
      <View style={{flex: 1}}>
        <KeyPad labels={['nombre', '▲', '▼']} onOrder={handleOrder} />
        <PhotoList list={list} />
      </View>
    );
  };

  return renderPhotos();
}
