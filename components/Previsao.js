/*
Insituto Federal de Educação, Ciência e Tecnologia do Rio Grande do Sul
Campus Bento Gonçalves
Programação de Dispositivos Móveis - 2021/01
Aluno: João Eduardo Costa Gomes
Matrícula: 20191130081
Data: 13/09/2021

Prova 02 - Aplicativo de previsão de tempo - 
Previsões futuras
*/
import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import moment from 'moment-timezone'

const Previsao = ({data}) => {
    return (
        <View style={{flexDirection: 'row'}}>

            {
                data && data.length > 0 ? 

                data.map((data, idx) => (

                    idx !== 0 &&  <PrevisaoItem key={idx} forecastItem={data}/>
                ))

                :

                <View/>
            }
          
            

        </View>
    )
}

const PrevisaoItem = ({forecastItem}) => {
    const img = {uri: "http://openweathermap.org/img/wn/"+forecastItem.weather[0].icon+"@2x.png"}
    return (
        <View  style={styles.futureForecastItemContainer}>
            <Text  style={styles.day}>{moment(forecastItem.dt * 1000).locale('pt-br').format('ddd')}</Text>
            <Image source={img} style={styles.image} />
            <Text  style={styles.temp}>Noite: {forecastItem.temp.night}&#176;C</Text>
            <Text  style={styles.temp}>Dia: {forecastItem.temp.day}&#176;C</Text>

        </View>
    )
}

export default Previsao


const styles = StyleSheet.create({
    image: {
        width: 100,
        height:100
    }, 
    futureForecastItemContainer: {
        flex:1,
        justifyContent: 'center',
        backgroundColor: '#00000033',
        borderRadius:10,
        borderColor:"#eee",
        borderWidth:1,
        padding: 20,
        marginLeft: 10
    }, 
    day: {
        fontSize: 20,
        color:"white",
        backgroundColor: "#3c3c44",
        padding: 10,
        textAlign:"center",
        borderRadius: 50,
        fontWeight: "200",
        marginBottom: 15
    },   
    temp: {
        fontSize: 14,
        color:"white",
        fontWeight:"100",
        textAlign:"center"
    },
})