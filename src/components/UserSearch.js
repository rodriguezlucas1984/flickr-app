import React, {useState} from 'react';
import {View, Text} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Input, Button, ListItem} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';

export default function UserSearch({navigation}) {
  const [input, setInput] = useState();
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState();
  const [users, setUsers] = useState([]);
  const api_key = '6e8a597cb502b7b95dbd46a46e25db8d';

  const getUser = username => {
    setFetching(true);
    setError(null);
    let new_user = {};
    axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.people.findByUsername&api_key=${api_key}&username=${username}&format=json&nojsoncallback=1exact=0`,
        {timeout: 5000},
      )
      .then(async response => {
        if (!response.data.user) setError(`No se encontró "${input}"`);
        else {
          new_user = {
            id: response.data.user.id,
            username: response.data.user.username._content,
          };
          try {
            const info = await getUserInfo(new_user.id);
            new_user = {...new_user, ...info};
          } catch (err) {}
          if (users && users.length > 0) {
            setUsers([new_user, ...users]);
          } else setUsers([new_user]);
        }
      })
      .catch(err => {
        console.log(err);
        setError('Error al conectar');
      })
      .then(() => {
        setFetching(false);
      });
  };

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

  const renderUsers = () => {
    if (users && users.length > 0) {
      return users.map((user, index) => (
        <ListItem
          key={index}
          leftAvatar={{source: {uri: user.img}}}
          title={user.username}
          subtitle={user.name}
          onPress={() => navigation.navigate('user-albums', {user_id: user.id})}
          chevron
        />
      ));
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={{margin: 10}}>
        <Input
          label="Nombre de usuario exacto:"
          placeholder="username"
          leftIcon={<Icon name="search" size={15} color="gray" />}
          errorMessage={error}
          errorStyle={{fontSize: 15}}
          onChangeText={text => setInput(text)}
        />
        <Button
          title="BUSCAR"
          loading={fetching}
          disabled={!input}
          onPress={() => getUser(input)}
        />
        <Text
          style={{
            marginLeft: 7,
            marginTop: 18,
            marginBottom: 7,
            fontSize: 16,
            fontWeight: 'bold',
            color: '#2089dc',
          }}>
          Búsquedas:
        </Text>
      </View>

      {/*único ScrollView - pocos elementos
      se agrega item solo cuando el usuario busca 
      y encuenta exactemente ese username */}
      <ScrollView>
        <View>{renderUsers()}</View>
      </ScrollView>
      {/*<View>
        <Text>{JSON.stringify(users)}</Text>
      </View>*/}
    </View>
  );
}
