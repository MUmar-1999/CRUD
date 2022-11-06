import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";
const firebaseConfig = {
  apiKey: "AIzaSyAkZnYIUElpBtTDfaU5Wlwk_d7cRSOXsnc",
  authDomain: "basic-crud-79c54.firebaseapp.com",
  projectId: "basic-crud-79c54",
  storageBucket: "basic-crud-79c54.appspot.com",
  messagingSenderId: "282169732169",
  appId: "1:282169732169:web:0871a6cf027e5379ee6398"
};
let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const db = app.firestore();


export default function App() {
  const [name, setName] = React.useState("");
  const [number, setNumber] = React.useState();
  const [state, setState] = React.useState([]);

  const view = () => {
    var newArray = [];
    firebase
      .firestore()
      .collection("student")
      .get()
      .then((querySnapshot) => {
        console.log("total user", querySnapshot.size);
        querySnapshot.forEach((documentSnapshot) => {
          newArray.push(documentSnapshot.data());
        });
      })
      .then((testing) => {
        console.log("new array", newArray);
        setState({ data: newArray });
      });
  };
  const update = () => {
    db.collection("student")
      .doc("bde2FTvotGophSOuq89u")
      .update({
        name: "asdhsadhsabashdsadsa",
        rollno: 23,
      })
      .then(() => {
        console.log("Document successfully updated!");
      });
  };
  const del = () => {
    db.collection("student")
      .doc("u9KEVJHViIg6foXOoOhA")

      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const Insert = () => {
    db.collection("student")

      .add({
        name: name,
        number: number,

        // number: setNumber.number,
      })
      .then(() => {
        console.log("User added!");
      });
  };
  useEffect(() => {
    console.log("useEffect");
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 90,
          backgroundColor: 'green',
        }}
      >
        <Text style={{ fontSize: 56, fontWeight: "bold", color:'white' }}>Crud App</Text>
      </View>
      <View style={{ marginHorizontal: 19 }}>
        <ScrollView>
          <TextInput
            style={styles.input}
            onChangeText={setName}
            value={name}
            placeholder="name"
          />
          <TextInput
            style={styles.input}
            onChangeText={setNumber}
            value={number}
            placeholder="Number"
          />
        </ScrollView>
      </View>
      <View style= {{justifyContent:"center", alignItems:"center"}}>
        <TouchableOpacity style={styles.button1} onPress={Insert}>
          <Text style ={{color: 'white'}}>Insert</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={update}>
          <Text>Updates</Text>
        </TouchableOpacity>

       

        <TouchableOpacity style={styles.button2} onPress={del}>
          <Text style={{color: 'white'}}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={view}>
          <Text>View</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={state.data}
        renderItem={({ item }) => (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 34, backgroundColor: "red", marginTop: 23 }}
            >
              {item.name}
            </Text>
            <Text
              style={{ fontSize: 34, backgroundColor: "yellow", marginTop: 23 }}
            >
              {item.number}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
 
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "yellow",
    padding: 10,
    borderRadius: 29,
    width: 150,
    margin: 2
  },
  button1: {
    alignItems: "center",
    backgroundColor: "green",
    padding: 10,
    borderRadius: 29,
    width: 150,
    margin: 2
  },
  button2: {
    alignItems: "center",
    backgroundColor: "red",
    padding: 10,
    borderRadius: 29,
    width: 150,
    margin: 2
  },
});
