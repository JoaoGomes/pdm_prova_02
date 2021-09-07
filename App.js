/*
Insituto Federal de Educação, Ciência e Tecnologia do Rio Grande do Sul
Campus Bento Gonçalves
Programação de Dispositivos Móveis - 2021/01
Aluno: João Eduardo Costa Gomes
Matrícula: 20191130081
Data: 13/09/2021

Prova 02 - Aplicativo de previsão de tempo
Chave API cotações - 52a061d2fc4c4bae7b73756b5f58d706
Chave API Tempo - 
*/

import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState}from 'react';
import { StyleSheet, Text, View, ImageBackground, Button } from 'react-native';
import * as Location from 'expo-location';

import Local from './components/Local'
import Scroll from './components/Scroll'
const API_KEY ='49cc8c821cd2aff9af04c9f98c36eb74';
const img = require('./assets/fundo.jpg')
export default function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        fetchDataFromApi("40.7128", "-74.0060")
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      fetchDataFromApi(location.coords.latitude, location.coords.longitude);
    })();
  }, [])

  const fetchDataFromApi = (latitude, longitude) => {
    if(latitude && longitude) {
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&lang=pt&appid=${API_KEY}`).then(res => res.json()).then(data => {

      console.log(data)
      setData(data)
      })
    }
    
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={img} style={styles.image} >
        <Button style={styles.botao} title="Nova cidade" />
        <Local current={data.current} timezone={data.timezone} lat={data.lat} lon={data.lon}/>
        <Scroll weatherData={data.daily}/>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image:{
    flex:1, 
    resizeMode:"cover", 
    justifyContent:"center"
  },
  botao: {
    fontSize: 25,
    color: "#841584"
  }
});