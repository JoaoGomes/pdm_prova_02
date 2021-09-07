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
    console.log(data);
    return (
        <View style={{flexDirection: 'column'}}>
            {
                data && data.length > 0 ? 
                <PrevisaoItem forecastItem={data}/>
                :
                <View>
                    <Text>Não deu certo {data.name}</Text>
                    <PrevisaoItem forecastItem={data}/>
                    </View>
            }

        </View>
    )
}

const PrevisaoItem = ({forecastItem}) => {
//    const img = {uri: "http://openweathermap.org/img/wn/"+forecastItem.weather[0].icon+"@2x.png"}
    console.log(forecastItem);
    return (
        <View  style={styles.futureForecastItemContainer}>
            <Text>Cidade: {forecastItem.name}</Text>
            <Text>Base: {forecastItem.name}</Text>
        </View>
    )
}

export default Previsao


const styles = StyleSheet.create({
    image: {
    }, 
    futureForecastItemContainer: {
    }, 
    day: {
    },   
    temp: {
    },
})