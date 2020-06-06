import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {View} from 'react-native';
import Loading from './Loading';
import Message from './Message';
import AlbumList from './AlbumList';

export default function Albums({route, navigation}) {
  const [albums, setAlbums] = useState();
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState();
  const api_key = '6e8a597cb502b7b95dbd46a46e25db8d';

  const {user_id} = route.params;

  useEffect(() => getAlbums(user_id), []);

  const handleOnAlbum = album_id => {
    const album = albums.find(a => a.id == album_id);
    navigation.navigate('album-photos', {photos: album.photos});
  };

  const getAlbums = user_id => {
    setFetching(true);
    setError(null);
    setAlbums(null);
    axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=${api_key}&user_id=${user_id}&format=json&nojsoncallback=1`,
        {timeout: 5000},
      )
      .then(response => {
        if (!response.data.photosets)
          setError('No se encontraron álbumes para el usuario');
        else {
          const set = response.data.photosets.photoset;
          setAlbums(set);
          set.forEach(a => loadPhotosToAlbum(a, set));
        }
      })
      .catch(err => {
        setError('Error al conectar');
      })
      .then(() => {
        setFetching(false);
      });
  };

  const loadPhotosToAlbum = (album, albums) => {
    setError(null);
    axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&photoset_id=${
          album.id
        }&api_key=${api_key}&user_id=${
          album.owner
        }&format=json&nojsoncallback=1`,
        {timeout: 5000},
      )
      .then(response => {
        if (!response.data.photoset)
          setError(`No se encontró álbum ${album.id}`);
        else {
          let photos = response.data.photoset.photo;
          photos = photos.map(p => {
            const new_photo = {
              ...p,
              uri: `https://farm${p.farm}.staticflickr.com/${p.server}/${
                p.id
              }_${p.secret}.jpg`,
            };
            // loadDateToPhoto(new_photo, album);
            return new_photo;
          });
          if (albums) {
            const index = albums.findIndex(a => a.id === album.id);
            let copy_albums = [...albums];
            copy_albums[index].photos = photos;
            setAlbums(copy_albums);
          }
        }
      })
      .catch(err => {
        console.log('err', err);
        setError('Error al conectar');
      })
      .then(() => {});
  };

  // no usado
  const getUserInfo = async user_id => {
    try {
      let response = await axios.get(
        `https://api.flickr.com/services/rest/?method=flickr.people.getInfo&api_key=${api_key}&user_id=${user_id}&format=json&nojsoncallback=1`,
        {timeout: 5000},
      );
      if (response.data.person) {
        const name = response.data.person.realname._content;
        const {nsid, iconserver, iconfarm} = response.data.person;
        let img = 'https://www.flickr.com/images/buddyicon.gif';
        if (iconserver > 0)
          img = `https://farm${iconfarm}.staticflickr.com/${iconserver}/buddyicons/${nsid}.jpg`;
        return {name: name, img: img};
      }
    } catch (error) {}
  };

  // no usado
  const getPhotoDate = async photo_id => {
    try {
      let response = await axios.get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${api_key}&photo_id=${photo_id}&format=json&nojsoncallback=1`,
        {timeout: 5000},
      );
      if (response.data.photo) {
        const date = response.data.photo.dateuploaded;
        return date;
      }
    } catch (error) {}
  };

  // no usado
  const loadDateToPhoto = async (photo, album) => {
    try {
      const date = await getPhotoDate(photo.id);
      if (date) {
        const c_albums = [...albums];
        const a_i = c_albums.findIndex(a => a.id == album.id);
        const p_i = c_albums[a_i].photos.findIndex(p => p.id == photo.id);
        c_albums[a_i].photos[p_i].date = date;
        setAlbums(c_albums);
      }
    } catch (err) {
      console.log('loadDateToPhoto err', err);
    }
  };

  const renderAlbums = () => {
    if (fetching) return <Loading />;

    if (!albums || albums.length === 0)
      return <Message text={'No hay álbumes'} />;

    let list = [];
    albums.forEach(a => {
      const title = a.title._content;
      let list_uri = [];
      if (a.photos.length > 0) list_uri = a.photos.map(p => p.uri);
      const onAlbum = handleOnAlbum;
      const album_id = a.id;
      const item = {title, list_uri, onAlbum, album_id};
      list.push(item);
    });
    return <AlbumList list={list} />;
  };

  return <View>{renderAlbums()}</View>;
}
