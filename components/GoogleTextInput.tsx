import React from "react";
import { View, TextInput, Image } from "react-native";
import { icons } from "@/constants";
import { GoogleInputProps } from "@/types/type";

const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => {
  const [inputValue, setInputValue] = React.useState(initialLocation || "");

  const handleChange = (text: string) => {
    setInputValue(text);
  };

  const handleSubmit = () => {
    if (inputValue.trim() !== "") {
      handlePress({
        latitude: 0, // Placeholder for latitude
        longitude: 0, // Placeholder for longitude
        address: inputValue, // Send the input as the address
      });
    }
  };

  return (
    <View
      className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-xl border border-neutral-100 focus:border-primary-500 ${containerStyle}`}
    >
      {icon && (
        // <View className="absolute left-3 top-1/2 transform -translate-y-1/2">
        <Image
          source={icon || icons.search}
          className="w-6 h-6 ml-4"
          resizeMode="contain"
        />
        // </View>
      )}
      <TextInput
        className={`rounded-full flex-1 text-left`}
        value={inputValue}
        onChangeText={handleChange}
        onSubmitEditing={handleSubmit} // Handle submit when pressing "Enter"
        placeholder={initialLocation ?? "Where do you want to go?"}
        placeholderTextColor="gray"
        style={{
          backgroundColor: textInputBackgroundColor ?? "white",
          fontSize: 16,
          width: "100%",
          borderRadius: 200,
          paddingHorizontal: 10,
          alignItems: "center",
        }}
      />
    </View>
  );
};

export default GoogleTextInput;
