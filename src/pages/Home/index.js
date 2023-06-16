import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CardView from "../../../components/CardView";
import { styles } from "./style";
import api from "../../services/api";
import { ScrollView } from "react-native-gesture-handler";

export default function Home() {
  const [isMessage, setIsMessage] = useState();
  const [isData, setIsData] = useState([]);
  const [isDataJob, setIsDataJob] = useState([]);
  const [isVerificador, setIsVerificador] = useState(false);
  const navigation = useNavigation();

  async function verificarValorAsyncStorage() {
    try {
      const valorArmazenado = await AsyncStorage.getItem("message");
      setIsMessage(valorArmazenado);
      setIsVerificador(true);

      if (valorArmazenado === null) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
        setIsMessage();
        setIsVerificador(false);
      } else {
        const tipoValorArmazenado = typeof JSON.parse(valorArmazenado);
        if (tipoValorArmazenado !== "number") {
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
          setIsMessage();
          setIsVerificador(false);
        }
      }
    } catch (error) {
      console.log("Erro ao verificar valor do AsyncStorage:", error);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      verificarValorAsyncStorage();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (isVerificador) {
      searchUser();
    }
  }, [isVerificador]);

  async function searchUser() {
    try {
      const response = await api.get(`/user/${isMessage}`);
      const data = response.data.data;
      setIsData(data);
      searchJobs();
    } catch (error) {
      alert(`Error: ${error}, por favor tente novamente mais tarde!`);
    }
  }

  async function searchJobs() {
    try {
      const response = await api.get(`/userjob/`);
      const data = response.data.data;
      setIsDataJob(data);
    } catch (error) {
      alert(`Error: ${error}, nenhum serviço foi encontrado.`);
    }
  }

  return (
    <View style={styles.containerCentral}>
      <SafeAreaView style={styles.safeArea}>
        {isData.id ? (
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            Bem-vindo(a): {isData.firstName}
          </Text>
        ) : (
          <Text>Nenhum usuário encontrado.</Text>
        )}
      </SafeAreaView>

      <ScrollView style={styles.scroll}>
        <SafeAreaView style={styles.cardsHome}>
          {isDataJob && isDataJob.length > 0 ? (
            isDataJob.map((result) => {
              return (
                <CardView
                  key={result.id}
                  name={result.name}
                  description={result.description}
                  price={result.price}
                />
              );
            })
          ) : (
            <Text>Nenhum serviço encontrado.</Text>
          )}
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}
