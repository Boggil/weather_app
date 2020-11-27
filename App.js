import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import Loading from './Loading';
import Weather from './Weather';
import { API_KEY } from './config/config.json';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [weatherObj, setWeatherObj] = useState({});
  const [temp, setTemp] = useState(0);
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");

  async function getWeather(latitude, longitude) {
    /* 
    api url에 &units=metric을 붙이면 화씨가 아닌 섭씨로 온도를 가져온다.
    &lang=kr을 붙이면 city name과 description을 해당 언어로 번역해 가져온다. (※ 근데 도시이름은 번역이 안되네?)
    참고 사이트: https://openweathermap.org/current#multi
     */
    const {
      data: {
        main: { temp },
        weather,
        name
      },
    } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    setTemp(temp);
    setCity(name);
    setWeatherObj({
      temp: Math.round(temp),
      condition: weather[0].main,
      description: weather[0].description,
      city: name
    });
    setCondition(weather[0].main);
    setIsLoading(false);
  };

  async function getLocation() {
    try {
      await Location.requestPermissionsAsync();

      const {
        coords: {
          latitude,
          longitude
        }
      } = await Location.getCurrentPositionAsync();

      getWeather(latitude, longitude);
    } catch (error) {
      Alert.alert("Can't find you.", "So Sad");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <>
      {
        isLoading ? <Loading />
          :
          <Weather
            temp={Math.round(temp)}
            condition={condition}
            weatherObj={weatherObj}
          />
      }
    </>
  );
}
