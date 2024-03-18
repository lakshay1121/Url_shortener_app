import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../../config/firebase";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Home");
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with ", user.email);
      })
      .catch((error) => alert(error.message));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <View style={styles.urlShortnerContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Email"
          onChangeText={(val) => setEmail(val)}
        ></TextInput>
        <TextInput
          style={styles.textInput}
          placeholder="Enter password"
          secureTextEntry={true}
          onChangeText={(val) => setPassword(val)}
        ></TextInput>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.submitText}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.registerContainer}>
        <Text>Create account. {""}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

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
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    width: 300,
    height: 50,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 8,
    padding: 12,
  },
  button: {
    marginTop: 50,
    width: 200,
    backgroundColor: "black",
    height: 50,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  submitText: {
    color: "white",
    fontSize: 16,
    fontWeight: "400",
  },
  dataText: {
    fontSize: 16,
    fontWeight: "600",
    margin: 5,
  },
  showData: {
    alignSelf: "flex-start",
    marginTop: 50,
  },
  registerContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 30,
  },
  registerText: {
    color: "blue",
  },
});
