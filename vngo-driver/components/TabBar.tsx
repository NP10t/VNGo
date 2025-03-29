import { View, TouchableOpacity, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import { FontAwesome, FontAwesome6, Ionicons } from "@expo/vector-icons";

import "../global.css";

const TabBar = (props) => {
  const { colors } = useTheme();
  const { state, descriptors, navigation } = props;

  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const primaryColor = "#0891b2";
  const greyColor = "#737373";

  const icons = {
    "(booking)": (color) => (
      <FontAwesome6 name="motorcycle" size={24} color={color} />
    ),
    wallet: (color) => <FontAwesome6 name="wallet" size={24} color={color} />,
    profile: (color) => <FontAwesome6 name="user" size={24} color={color} />,
  };

  return (
    <View className="bg-white absolute bottom-10 flex-row py-3 mx-6 items-center rounded-2xl self-center">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        if (["_sitemap", "+not-found"].includes(route.name)) return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            className="flex-1 items-center justify-center"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            {icons[route.name]?.(isFocused ? primaryColor : greyColor)}
            <Text
              className="text-sm"
              style={{ color: isFocused ? primaryColor : greyColor }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;
