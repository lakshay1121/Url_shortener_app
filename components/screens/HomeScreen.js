import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import axios from "axios";
import { auth } from "../../config/firebase";
import { POST_URL, GET_URL } from "@env";

const InputField = ({ value, placeholder, onChangeText }) => (
  <TextInput
    style={styles.inputField}
    value={value}
    placeholder={placeholder}
    onChangeText={onChangeText}
  />
);

const Button = ({ onPress, text }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState({});
  const [fullUrl, setFullUrl] = useState("");

  const postUrl = () => {
    axios
      .post(`${POST_URL}`, { fullUrl })
      .then((response) => setData([response.data]))
      .catch((error) => console.error(error));
  };

  const handleShortUrlClick = (url) => {
    axios
      .get(`${GET_URL}${url}`)
      .then((response) => {
        setData([response?.data]);
        Linking.openURL(response?.data?.full);
      })
      .catch((error) =>
        console.error("Error handling short URL click:", error)
      );
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => navigation.replace("Login"))
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Url Shortener</Text>
      <View style={styles.urlShortnerContainer}>
        <InputField
          value={fullUrl}
          placeholder="Enter URL"
          onChangeText={(val) => setFullUrl(val)}
        />
        <Button onPress={postUrl} text="Submit" />
      </View>

      {data.length > 0 && (
        <View style={styles.showData}>
          <TouchableOpacity onPress={() => handleShortUrlClick(data[0]?.short)}>
            <Text style={styles.dataText}>
              Short url : <Text style={styles.link}> {data[0]?.short}</Text>
            </Text>
          </TouchableOpacity>
          <Text style={styles.dataText}>Clicks: {data[0]?.clicks} </Text>
        </View>
      )}

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign out</Text>
      </TouchableOpacity>
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
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 40,
  },
  urlShortnerContainer: {
    alignItems: "center",
  },
  inputField: {
    width: 300,
    height: 50,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: "black",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "400",
  },
  showData: {
    marginTop: 50,
    width: "80%",
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  dataText: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 5,
  },
  link: {
    color: "blue",
  },
  signOutButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  signOutText: {
    color: "blue",
    fontSize: 18,
  },
});
