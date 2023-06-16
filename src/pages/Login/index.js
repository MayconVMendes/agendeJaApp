import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MyTextInput from "../../../components/TextInput/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./style";
import api from "../../services/api";

export default function Login() {
  const [isEmail, setIsEmail] = useState("");
  const [isEmailAsync, setIsEmailAsync] = useState("");
  const [isSenha, setIsSenha] = useState("");
  const [isSenhaAsync, setIsSenhaAsync] = useState("");
  const [isVerificador, setIsVerificador] = useState(false);
  const [isViewPass, setIsViewPass] = useState(true);
  const navigation = useNavigation();

  const recuperarNome = async () => {
    const emailUsuario = await AsyncStorage.getItem("email");
    const senhaUsuario = await AsyncStorage.getItem("senha");
    setIsEmailAsync(emailUsuario);
    setIsSenhaAsync(senhaUsuario);
  };

  useEffect(() => {
    if (!isEmail && !isSenha) {
      recuperarNome();
    }
  });

  useEffect(() => {
    if (!isVerificador) {
      if (isEmailAsync && isSenhaAsync) {
        setIsEmail(isEmailAsync);
        setIsSenha(isSenhaAsync);
        setIsVerificador(true);
        isHome();
      }
    }
  });

  function login() {
    if (isEmail == "" && isSenha == "") {
      alert("É obrigatório digitar os dados!");
    } else {
      if (isEmail == "") {
        alert("É obrigatório digitar o e-mail!");
      } else if (isSenha == "") {
        alert("É obrigatório digitar a senha!");
      } else {
        searchUser();
      }
    }
  }

  function isHome() {
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  }

  async function searchUser() {
    await api
      .post("/login", {
        email: isEmail,
        password: isSenha,
      })
      .then(async (data) => {
        if (data) {
          gravaNome();
          await AsyncStorage.setItem("message", data.data.message);
        }
      })
      .catch((error) => {
        alert(`Error: ${error}, por favor tente novamente mais tarde!`);
      });
  }

  const gravaNome = async () => {
    await AsyncStorage.setItem("email", isEmail);
    await AsyncStorage.setItem("senha", isSenha);
    isHome();
  };

  return (
    <View style={styles.containerCentral}>
      <Text style={styles.titleLogin}>AgendeJá</Text>
      <Text style={styles.titleTela}>Tela de Login</Text>

      <SafeAreaView style={styles.centerViewEmail}>
        <MyTextInput
          placeholder="Digite seu e-maiil"
          value={isEmail}
          inputType="email-address"
          onChangeText={(email) => {
            setIsEmail(email);
          }}
        />
      </SafeAreaView>

      <SafeAreaView style={styles.centerViewSenha}>
        <MyTextInput
          placeholder="Digite sua senha"
          value={isSenha}
          secureText={isViewPass}
          onChangeText={(senha) => {
            setIsSenha(senha);
          }}
        />
      </SafeAreaView>

      <SafeAreaView style={styles.centerViewBtn}>
        <Pressable style={styles.btn} onPress={()=> {
          setIsViewPass(!isViewPass)
        }}>
          <Text style={styles.textBtn}>{isViewPass ? "Mostrar senha" : "Ocultar senha"}</Text>
        </Pressable>
      </SafeAreaView>
      <SafeAreaView style={styles.centerViewBtn}>
        <Pressable style={styles.btn} onPress={login}>
          <Text style={styles.textBtn}>Logar</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}
