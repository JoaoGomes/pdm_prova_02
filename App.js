/*
Insituto Federal de Educação, Ciência e Tecnologia do Rio Grande do Sul
Campus Bento Gonçalves
Programação de Dispositivos Móveis - 2021/01
Aluno: João Eduardo Costa Gomes
Matrícula: 20191130081
Data: 13/09/2021

Prova 02 - Aplicativo de previsão de tempo
Chave API Tempo - 49cc8c821cd2aff9af04c9f98c36eb74
*/

import React, { useState, useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native';
import Constants from 'expo-constants';
import * as SQLite from 'expo-sqlite';
import axios from 'axios';

const API_KEY ='49cc8c821cd2aff9af04c9f98c36eb74';
const db = SQLite.openDatabase("db.db");
const img = require('./assets/fundo.jpg');

function Items({ done: doneHeading, onPressItem, onLongPressItem }) {
    const [items, setItems] = useState(null);
    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(`select * from items where done = ? order by id desc;`,[doneHeading ? 1 : 0],
                (_, { rows: { _array } }) => setItems(_array)
            );
        });
    }, []);

    const heading = doneHeading ? "Cidades selecionadas" : "Cidades";
    
    if (items === null || items.length === 0) {
        return null;
    }
    
    //const img_weather = {uri: "http://openweathermap.org/img/wn/"+ Items.figure + "@2x.png"}

    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeading}>{heading}</Text>
            {items.map(({ id, done, nome, temp, tempmin, tempmax, status, figure }) => (
            <TouchableOpacity
                key={id}
                onPress={() => onPressItem && onPressItem(id)}
                onLongPress={() => onLongPressItem && onLongPressItem(id)}
                style={{
                    backgroundColor: done ? "#8b0000" : "#fff",
                    borderColor: "#000",
                    borderWidth: 1,
                    padding: 8
                }}>
                                    <View>
                    <Image source={{uri: "http://openweathermap.org/img/wn/"+ figure + "@2x.png"}} style={styles.weatherImage}/> 
                </View>

                <Text style={{ color: done ? "#fff" : "#000"}}>{nome}</Text>
                <Text style={{ color: done ? "#fff" : "#000"}}>Temp. atual: {temp}&#176;C</Text>
                <Text style={{ color: done ? "#fff" : "#000"}}>Temp. mín.: {tempmin}&#176;C</Text>
                <Text style={{ color: done ? "#fff" : "#000"}}>Temp. máx.: {tempmax}&#176;C</Text>
                <Text style={{ color: done ? "#fff" : "#000"}}>Status: {status}</Text>

                <View>  
                    {done === 0 ? null : <Text>Segure para apagar</Text>}
                </View>

            </TouchableOpacity>
            ))}
        </View>
    );
}

export default function App() {

    const [text, setText] = React.useState(null)
    const [forceUpdate, forceUpdateId] = useForceUpdate();
    const [error, setError] = useState(false);
    const [temp, setTemp] = useState(null);
    const [tempmin, setTempMin] = useState(null);
    const [tempmax, setTempMax] = useState(null);
    const [status, setStatus] = useState(null);
    const [figure, setFigure] = useState(null);

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql("create table if not exists items (id integer primary key not null, done int, nome text, temp int, tempmin int, tempmax int, status text, figure text);");
        });
    }, []);

    /* Esta função deve receber os valores de temperatura e gravar no banco */
    const add = (text) => {

        // is text empty?
        if (text === null || text === "") {
            return false;
        }
        
        dataFromApi(text);

        db.transaction(
            tx => {
                tx.executeSql("insert into items (done, nome, temp, tempmin, tempmax, status, figure) values (0, ?, ?, ?, ?, ?, ?)", [text, temp, tempmin, tempmax, status, figure]);
                tx.executeSql("select * from items", [], (_, { rows }) =>
                    console.log(JSON.stringify(rows))
                );
            },
            null,
            forceUpdate
        );
    }


    async function dataFromApi(cidade){
        try{
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&exclude=hourly,minutely&units=metric&lang=pt-br&appid=${API_KEY}`);
            if(response.data.id>1){
                setTemp(response.data.main.temp);
                setTempMax(response.data.main.temp_max);
                setTempMin(response.data.main.temp_min);
                setStatus(response.data.weather[0].main);
                setFigure(response.data.weather[0].icon);            
            }else{
                const arrayResponse = [];
                arrayResponse.push(response.data);
                setTemp(arrayResponse);
                setTempMin(arrayResponse);
                setTempMax(arrayResponse);
                setStatus(arrayResponse);
                setFigure(arrayResponse);
            }
        }
        catch(err){
            setError(true);
            console.log(err);
        }
    }



    return (
        <ImageBackground source={img} style={styles.image}>
            <View style={styles.container}>
                <Text style={styles.heading}>Previsões</Text>
                <View style={styles.flexRow}>
                <TextInput
                    onChangeText={text => setText(text)}
                    onSubmitEditing={() => {
                        add(text);
                        setText(null);
                    }}
                    placeholder="Digite uma cidade"
                    style={styles.input}
                    nome={text}
                    />
                </View>
                <ScrollView style={styles.listArea}>
                    <Items
                        key={`forceupdate-todo-${forceUpdateId}`}
                        done={false}
                        onPressItem={id =>
                            db.transaction(
                                tx => {
                                    tx.executeSql(`update items set done = 1 where id = ?;`, [ id ]);
                                },
                                null,
                                forceUpdate
                            )
                        }/>
                    <Items
                        done
                        key={`forceupdate-done-${forceUpdateId}`}
                        onPressItem={id =>
                            db.transaction(
                                tx => {
                                    //trecho modificado
                                    tx.executeSql(`update items set done = 0 where id = ?;`, [ id ]);
                                },
                                null,
                                forceUpdate
                            )
                        }
                        onLongPressItem={id =>
                        db.transaction(
                            tx => {
                                tx.executeSql(`delete from items where id = ?;`,[id]);
                            },
                            null,
                            forceUpdate
                        )
                    }/>
                </ScrollView>
            </View>
        </ImageBackground>
    );
}

    function useForceUpdate() {
        const [value, setValue] = useState(0);
        return [() => setValue(value + 1), value];
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight
    },
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
    },
    flexRow: {
        flexDirection: "row"
    },
    input: {
        borderColor: "#4630eb",
        borderRadius: 4,
        borderWidth: 1,
        flex: 1,
        height: 48,
        margin: 16,
        padding: 8
    },
    listArea: {
        flex: 1,
        paddingTop: 16
    },
    sectionContainer: {
        marginBottom: 16,
        marginHorizontal: 16
    },
    sectionHeading: {
        fontSize: 18,
        marginBottom: 8
    },
    image: {
        flex:1, 
        resizeMode:"cover", 
        width: '100%',
        height: '100%',
        justifyContent:"center"        
    },
    weatherImage: {
        width: 50,
        height: 50
    }
});