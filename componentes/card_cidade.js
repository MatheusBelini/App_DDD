import { StyleSheet, Text, View, TouchableOpacity } from 'react-native-web';
import { Linking } from 'react-native';
import React, { useState } from 'react';
import { MaterialIcons } from 'react-native-vector-icons'; 

const CardCidade = ({ nome, uf }) => {
  const [isHovered, setIsHovered] = useState(false);


  const abrirPesquisaNoGoogle = () => {
    const url = `https://www.google.com/search?q=${encodeURIComponent(nome)}`;
    Linking.openURL(url).catch(err => console.error('Error opening URL', err));
  };

  return (
    <TouchableOpacity
      style={[styles.card, isHovered && styles.cardHovered]}  
      onPress={abrirPesquisaNoGoogle}
      onMouseEnter={() => setIsHovered(true)}  
      onMouseLeave={() => setIsHovered(false)}  
    >

      <MaterialIcons name="place" size={24} color="#cf0e0e" style={styles.icon} />  
      <Text style={styles.cidade}>{nome}</Text>
      <Text style={styles.separator}> - </Text>
      <Text style={styles.uf}>{uf}</Text>
    </TouchableOpacity>
  );
};

export default CardCidade;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    paddingVertical: 18, 
    paddingHorizontal: 18, 
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    flexDirection: 'row', 
    alignItems: 'center', 
    transition: 'transform 0.3s ease',
    overflow: 'hidden',
  },
  cardHovered: {
    transform: 'scale(1.05)', 
  },
  cidade: {
    fontSize: 20,
    color: '#333',
    fontWeight: '600',
    textTransform: 'capitalize',
    flex: 1, 
    marginLeft: 12, 
  },
  separator: {
    fontSize: 20,
    color: '#aaa',
    marginHorizontal: 8,
  },
  uf: {
    fontSize: 18,
    color: '#cf0e0e',
    fontWeight: '800',
  },
  icon: {
    marginRight: 12, 
  },
});
