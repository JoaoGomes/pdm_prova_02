/*
Insituto Federal de Educação, Ciência e Tecnologia do Rio Grande do Sul
Campus Bento Gonçalves
Programação de Dispositivos Móveis - 2021/01
Aluno: João Eduardo Costa Gomes
Matrícula: 20191130081
Data: 13/09/2021

Prova 02 - Aplicativo de previsão de tempo - 
Condições metereológicas locais
*/

import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet} from 'react-native';
import moment from 'moment-timezone'

const dias = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Aug', 'Set', 'Out', 'Nov', 'Dez'];

const WeatherItem = ({title, value, unit}) => {
    return(
        <View style={styles.weatherItem}>
            <Text style={styles.weatherItemTitle}>{title}</Text>
            <Text style={styles.weatherItemTitle}>{value}{unit}</Text>
        </View>
    )
}

const DateTime = ({current, lat, lon, timezone}) => {
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

    useEffect (() => {
        setInterval(() => {
            const time = new Date();
            const mes = time.getMonth();
            const date = time.getDate();
            const dia = time.getDay();
            const hora = time.getHours();
            const hoursIn12HrFormat = hora >= 13 ? hora %12: hora
            const minutos = time.getMinutes();
            const ampm = hora >=12 ? 'pm' : 'am'
        
            setTime((hoursIn12HrFormat < 10? '0'+ hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutos < 10? '0'+minutos: minutos) +ampm) 
        
            setDate(dias[dia] + ', ' + date+ ' ' + meses[mes]) 
        
        }, 1000);
    }, [])
    return (
        <View style={styles.container}>  
           <View>
               <View>
                   <Text style={styles.heading}>{time}</Text>
               </View>
               <View>
                   <Text style={styles.subheading}>{date}</Text>
               </View>
               <View style={styles.weatherItemContainer}>
                    <WeatherItem title="Humidade" value={current? current.humidity : ""} unit="%"/>
                    <WeatherItem title="Pressão" value={current? current.pressure : ""} unit="hPA"/>
                    <WeatherItem title="Nascer do sol" value={current? moment.tz(current.sunrise * 1000, timezone ).format('HH:mm'): ""}/>
                    <WeatherItem title="Por do sol" value={current? moment.tz(current.sunset * 1000, timezone ).format('HH:mm') : ""}/>
                    <WeatherItem title="Temperatura atual" value={current? current.temp : ""} unit="&#176;C" />
               </View>
           </View>
           <View style={styles.rightAlign}>
               <Text style={styles.timezone}>{timezone}</Text>
               <Text style={styles.latlong}>{lat}N {lon}E</Text>
           </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    heading: {
    },
    subheading: {
    },
    rightAlign: {
    },
    timezone: {
    },
    latlong:{
    },
    weatherItemContainer: {
    }, 
    weatherItem: {
    },
    weatherItemTitle: {
    }
})

export default DateTime