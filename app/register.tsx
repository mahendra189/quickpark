import { View } from "@/components/Themed";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform, Text } from "react-native";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import { Image } from "react-native";
const Register = () => {
  const router = useRouter();
  return (
    <Box className=" flex flex-1 items-center justify-center bg-gray-190">
      <Box className="absolute top-14 left-5 ">
        <Heading className="text-5xl mb-2">Register</Heading>
        <Text className="text-[#787F86]">
          By registering you agree to our{" "}
          <Text className="font-bold text-[#1E1B22]">Terms of Use</Text>
        </Text>
      </Box>
      <Input
        variant="outline"
        size="md"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
        style={{ width: 370, marginBottom: 20 }}
      >
        <InputField placeholder="Enter you name" />
      </Input>
      <Input
        variant="outline"
        size="md"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
        style={{ width: 370, marginBottom: 20 }}
      >
        <InputField placeholder="Enter you email address" />
      </Input>
      <Input
        variant="outline"
        size="md"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
        style={{ width: 370, marginBottom: 20 }}
      >
        <InputField placeholder="Enter you Mobile Number" />
      </Input>
      <Input
        variant="outline"
        size="md"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
        style={{ width: 370, marginBottom: 20 }}
      >
        <InputField placeholder="Enter your password" />
      </Input>
      <Button
        size="md"
        variant="solid"
        action="primary"
        style={{ backgroundColor: "#FF7F40" }}
      >
        <ButtonText>Register</ButtonText>
      </Button>
      <Text className="my-5">
        --------------------------------------------or--------------------------------------------
      </Text>
      <Pressable
        onPress={() => console.log("Hello")}
        className="p-5 w-1000 bg-white"
        style={{ borderColor: 'solid-black', borderRadius: 8, width: 360}}
      >
        <View className="flex flex-row items-center">
          <Image
            className="mr-2"
            source={{
              uri: "https://img.icons8.com/color/100/000000/google-logo.png",
            }}
            style={{ width: 20, height: 20 }}
          />
          <Text className="text-typography-500 text-black">
            Sign up with Google
          </Text>
        </View>
      </Pressable>

      <Pressable
        onPress={() => console.log("Hello")}
        className="p-5 w-1000 bg-white m-5 "
        style={{ borderColor: 'solid-black', borderRadius: 8,  width: 360, marginBottom:59}}
      >
        <View className="flex flex-row items-center">
          <Image
            className="mr-2"
            source={{
              uri: "https://img.icons8.com/?size=100&id=118497&format=png&color=000000",
            }}
            style={{ width: 20, height: 20 }}
          />
          <Text className="text-typography-500 text-black">
            Sign up with Facebook
          </Text>
        </View>
      </Pressable>
       <Text className="text-[#787F86]" style={{ marginTop: -45, marginRight: 29}}>
  For more information, please see our{" "}
  <Text className="font-bold text-[#1E1B22]">Privacy Policy</Text>
</Text>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </Box>
  );
};
export default Register;
