import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { setDestinaton, setOrigin } from "../slices/navSlice";
import { useDispatch } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";

const data = [
  {
    id: "123",
    icon: "home",
    locationName: "Home",
    description: "Łomiańska 16, Warsaw, Poland",
    location: { lat: 52.28115709999999, lng: 20.9693593 },
  },
  {
    id: "456",
    icon: "briefcase",
    locationName: "Work",
    description: "Tadeusza Rejtana 17, Warsaw, Poland",
    location: { lat: 52.207288, lng: 21.0174513 },
  },
];

const NavFavourites = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const handlePress = (location, description) => {
    const currentScreen = route.name;

    console.log(`screen ${currentScreen}`);

    if (currentScreen === "HomeScreen") {
      dispatch(
        setOrigin({
          location: location,
          description: description,
        })
      );
      navigation.navigate("MapScreen");
    }

    if (currentScreen === "NavigateCard") {
      dispatch(
        setDestinaton({
          location: location,
          description: description,
        })
      );
      navigation.navigate("RideOptionsCard");
    }
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View className="bg-gray-200 h-px" />}
      renderItem={({ item: { icon, locationName, description, location } }) => (
        <TouchableOpacity
          className="flex-row items-center m-5"
          onPress={() => handlePress(location, description)}
        >
          <Icon
            className="mr-4 rounded-full bg-gray-300 p-3"
            name={icon}
            type="ionicon"
            color="white"
            size={18}
          />
          <View>
            <Text className="font-semibold text-lg">{locationName}</Text>
            <Text className="text-gray-500">{description}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFavourites;
