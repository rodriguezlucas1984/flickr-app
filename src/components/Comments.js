import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {View} from 'react-native';
import CommentList from './CommentList';
import Loading from './Loading';
import Message from './Message';

export default function Comments({route}) {
  const [comments, setComments] = useState();
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState();
  const api_key = '6e8a597cb502b7b95dbd46a46e25db8d';

  const {photo_id} = route.params;

  useEffect(() => getComments(photo_id), []);

  const getComments = photo_id => {
    setFetching(true);
    setError(null);
    setComments(null);
    axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.comments.getList&api_key=${api_key}&photo_id=${photo_id}&format=json&nojsoncallback=1`,
        {timeout: 5000},
      )
      .then(response => {
        if (!response.data.comments) setError('No se encontraron comments');
        else {
          const fetch_comments = response.data.comments.comment;
          setComments(fetch_comments);
          // fetch_comments.forEach(fc => loadPhotoToAlbum(fc, fetch_comments));
        }
      })
      .catch(err => {
        setError('Error al conectar');
      })
      .then(() => {
        setFetching(false);
      });
  };

  const renderAlbums = () => {
    if (fetching) return <Loading />;

    if (!comments || comments.length === 0)
      return <Message text={'No hay comentarios'} />;

    return <CommentList list={comments} />;
  };

  return <View>{renderAlbums()}</View>;
}
