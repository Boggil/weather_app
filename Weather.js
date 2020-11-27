import React from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { weatherOptions } from './WeatherOptions';


export default function Weather({ weatherObj }) {
  const { temp, condition, description, city } = weatherObj;

  return (
    <LinearGradient
      colors={weatherOptions[condition].gradient}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.halfContainer}>
        <MaterialCommunityIcons
          size={100}
          name={weatherOptions[condition].iconName}
          color="white"
        />
        <Text style={styles.temp}>{temp}℃</Text>
        <Text style={styles.city}>City: {city}</Text>
      </View>
      <View style={{ ...styles.halfContainer, ...styles.textContainer }}>
        <Text style={styles.title}>{condition}</Text>
        <Text style={styles.subtitle}>{description}</Text>
      </View>
    </LinearGradient >
  );
};

Weather.propTypes = {
  weatherObj: PropTypes.shape({
    temp: PropTypes.number,
    condition: PropTypes.oneOf([
      "Thunderstorm",
      "Drizzle",
      "Rain",
      "Snow",
      "Atomsphere",
      "Clear",
      "Clouds",
      "Mist",
      "Smoke",
      "Haze",
      "Dust",
      "Fog",
      "Sand",
      "Ash",
      "Squall",
      "Torando"
    ]),
    description: PropTypes.string,
    city: PropTypes.string
  }).isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  temp: {
    fontSize: 42,
    color: "white"
  },
  city: {
    fontSize: 24,
    color: "white"
  },
  halfContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: "white",
    fontSize: 48,
    marginBottom: 10
  },
  subtitle: {
    color: "white",
    fontSize: 24,
  },
  textContainer: {
    paddingHorizontal: 42,
  }
});