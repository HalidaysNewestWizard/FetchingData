import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

function GetDemo(): React.JSX.Element {
  const [PostData, setPostData] = useState(new Array<Post>());

  useEffect(
    () => {
      // Effect function
      // Do the Get request and update PostData state variable

      /**
       * Fetch api returns a Promise.
       * we are using 'then' and 'catch' methods to handle the promise.
       */

      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
          // promise is resolved

          if (response.status == 200) {
            // success response
            return response.json(); // returns a Promise
          } else {
            console.log('Get Request Server error ' + response.status);
            return null;
          }
        })
        .then(json => {
          if (json === undefined || json === null) {
            console.log('error !!');
          } else {
            console.log('Success Get Request, Post Count : ' + json.length);
            setPostData(json);
          }
        })
        .catch(err => {
          // promise is rejected
          console.log(`Error in GetRequest : ${err}`);
        });
    },
    [
      /* Dependency Array */
    ],
  );

  return (
    <View>
      <Text>Get Demo</Text>
      <FlatList
        data={PostData}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View>
            <Text>{item.id}</Text>
            <Text>{item.title}</Text>
            <Text>{item.body}</Text>
          </View>
        )}
      />
    </View>
  );
}

export default GetDemo;
