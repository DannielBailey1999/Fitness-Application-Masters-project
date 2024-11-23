import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import { Avatar } from "react-native-elements";
import Styles from "./styles";
import colors from "@/constants/colors";
import MapView, { Circle } from "react-native-maps";
import { router } from "expo-router";
import useLocation from "@/Hooks/locationService";

const RunScreen = () => {
  // States
  const [metricValue, setMetricValue] = useState("1.0");
  const [toggle, setToggle] = useState("Distance");
  const [metricUnit, setMetricUnit] = useState("Miles");

  // Function to validate and handle input
  const changeMetricValueHandler = (input) => {
    if (toggle === "Distance") {
      if (/^([0-9]{0,2}(\.[0-9]{0,2})?)?$/.test(input)) {
        setMetricValue(input);
      }
    } else if (toggle === "Time") {
      if (/^([0-9]{0,2}:?[0-9]{0,2})?$/.test(input)) {
        setMetricValue(input);
      }
    }
  };

  const toggleHandler = () => {
    if (toggle === "Distance") {
      setToggle("Time");
      setMetricUnit("Hours : Minutes");
      setMetricValue("01:00");
    } else {
      setToggle("Distance");
      setMetricUnit("Miles");
      setMetricValue("1.0");
    }
  };

  // Geolocation import
  const { latitude, longitude } = useLocation();

  return (
    <View style={Styles.container}>
      {/* Google Maps API/Image */}
      <View style={Styles.container} pointerEvents="none">
        <MapView
          region={{
            latitude: latitude || 37.78825,
            longitude: longitude || -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={Styles.mapView}
          minZoomLevel={18}
        >
          <Circle
            center={{
              latitude: latitude || 37.78825,
              longitude: longitude || -122.4324,
            }}
            radius={4}
            fillColor="red"
          />
        </MapView>
      </View>

      <View style={{ position: "absolute", bottom: 0, right: 0, ...Styles.mainContainer }}>
        {/* Metric - Button to change the metric value */}
        <Pressable onPress={() => console.warn("Open modal and change value")}>
          {/* Pressable Button */}
          <TextInput
            style={Styles.metricValue}
            keyboardType="decimal-pad"
            value={metricValue}
            onChangeText={changeMetricValueHandler}
          />

          <Text style={Styles.metric}>{metricUnit}</Text>
        </Pressable>

        <View style={Styles.bottomContainer}>
          {/* Start Button */}
          <Avatar
            size={120}
            rounded
            title="START"
            activeOpacity={0.7}
            onPress={() =>
              router.push({
                pathname: "/screens/run",
                params: { targetValue: metricValue, metric: toggle },
              })
            }
            titleStyle={Styles.avatarTitle}
            containerStyle={Styles.avatarContainer}
          />

          {/* Toggle button to change the metric value */}
          <Pressable onPress={toggleHandler} style={Styles.toggleContainer}>
            <Text style={Styles.distance}>{toggle}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default RunScreen;
