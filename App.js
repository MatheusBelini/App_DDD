import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import * as obj_DDD from './services/ddd.js';
import CardCidade from './componentes/card_cidade.js';
import { FlashList } from '@shopify/flash-list';
import React, { useEffect, useState } from 'react';

export default function App() {
  const [ddd, setDDD] = useState('');
  const [uf, setUf] = useState('');
  const [cities, setCities] = useState([]);
  const [emFoco, setEmFoco] = useState(false);

  useEffect(() => {
    if (ddd.length === 2) {
      obj_DDD.buscarDDDCallBack(ddd, dados => {
        console.log(dados);
        setUf(dados.state);
        const sortedCities = dados.cities.sort((a, b) => a.localeCompare(b));
        setCities(sortedCities);
      });
    }
  }, [ddd]);

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { borderColor: emFoco ? '#FF8C00' : '#4B9DFE' }]}
        placeholder="Digite o DDD"
        keyboardType="numeric"
        maxLength={2}
        value={ddd}
        onChangeText={text => setDDD(text.replace(/[^0-9]/g, ''))}
        onFocus={() => setEmFoco(true)}
        onBlur={() => setEmFoco(false)}
      />

      <View style={styles.view_lista}>
        <FlashList
          data={cities}
          renderItem={({ item, index }) => (
            <CardCidade
              nome={item}
              uf={uf}
              key={index}
            />
          )}
          estimatedItemSize={200}
        />
      </View>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#494c4e', 
    height: '100%',
    borderRadius: 15,
  },
  input: {
    width: '90%',
    padding: 18,
    borderWidth: 2,
    borderRadius: 50,
    marginVertical: 25,
    fontSize: 18,
    backgroundColor: '#fff',
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  view_lista: {
    flex: 1,
    width: '100%',
    paddingBottom: 20,
  },
  card: {
    width: '100%',
    padding: 18,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 20, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5, 
  },
  cidade: {
    fontSize: 20,
    color: '#2c3e50',
    fontWeight: '600',
    marginBottom: 5,
    textTransform: 'capitalize',  
    textShadowColor: '#fff', 
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  uf: {
    fontSize: 18,
    color: '#FF8C00', 
    fontWeight: '900',
    textShadowColor: '#fff',  
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});
