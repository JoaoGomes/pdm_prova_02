/*
Insituto Federal de Educação, Ciência e Tecnologia do Rio Grande do Sul
Campus Bento Gonçalves
Programação de Dispositivos Móveis - 2021/01
Aluno: João Eduardo Costa Gomes
Matrícula: 20191130081
Data: 13/09/2021

Prova 02 - Aplicativo de previsão de tempo - 
Scroll
*/

import React from 'react'
import {View, ScrollView, Image, Text, StyleSheet} from 'react-native'
import moment from 'moment-timezone'
import Previsao from './Previsao'

const Scroll = ({weatherData}) => {
    //console.log(weatherData);
    return (
        <ScrollView vertical={true} style={styles.scrollView}>
            <Previsao data={weatherData}/>
        </ScrollView>
    )
}

const CurrentTempEl = ({data}) => {

    if(data && data.weather){
        const img = {uri: 'http://openweathermap.org/img/wn/'+ data.weather[0].icon +'@4x.png'}
        return(
            <View style={styles.currentTempContainer}>
                <Image source={img} style={styles.image} />
                <View  style={styles.otherContainer}>
                    <Text>Cidade: {data.name}</Text>
                    <Text  style={styles.day}>{moment(data.dt * 1000).locale('pt-br').format('dddd')}</Text>
                    <Text  style={styles.temp}>Noite: {data.temp.night}&#176;C</Text>
                    <Text  style={styles.temp}>Dia: {data.temp.day}&#176;C</Text>
                </View>
            </View>
        )
    }else{
        return( 
            <View/>
        )   
    }
}

const styles = StyleSheet.create({
    scrollView: {
    },
    image: {
    },
    currentTempContainer: {
    },
    day: {
    },
    temp: {
    },
    otherContainer: {
    }
})

export default Scroll