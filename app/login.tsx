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
import { Divider } from "@/components/ui/divider";
import { Eye, EyeOff, EyeOffIcon } from "lucide-react-native";
import { Icon } from "@/components/ui/icon";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Box className=" flex flex-1 items-center justify-center bg-background-0 px-4 py-3">
      <Box className=" mb-10">
        <Heading className="text-5xl mb-2">QuickPark</Heading>
        <Text className="text-[#787F86]">
          Welcome back! Please login to your account.
        </Text>

      </Box>
      <Input
        variant="outline"
        size="lg"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
        style={{ height: 46, marginBottom: 20 }}
        className="rounded-full p-2"
      >
        <InputField placeholder="Enter your Email address" type="text" />
      </Input>
      <Input
        variant="outline"
        size="lg"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
        style={{ height: 46, marginBottom: 20 }}
        className="rounded-full p-2"
      >
        <InputField placeholder="Enter your password" type={showPassword ? "text" : "password"} />
        <Pressable className="mx-2 my-2" onPress={() => setShowPassword(!showPassword)}>
          <Icon as={showPassword ? EyeOff : Eye} />

        </Pressable>
      </Input>
      <Button
        size="xl"
        variant="solid"
        action="primary"
        style={{ backgroundColor: "#FF7F40", borderRadius: 50, width: "100%",marginBottom: 20 }}
        onPress={() => router.replace("/home")}
      >
        <ButtonText>Login</ButtonText>
      </Button>
      <Button
        size="xl"
        variant="solid"
        action="primary"
        style={{ backgroundColor: "white", borderRadius: 50, width: "100%",borderColor: "#FF7F40", borderWidth: 1, marginBottom: 20 }}
        onPress={() => router.replace("/register")}
      >
        <ButtonText className="text-[#FF7F40]" >Not Registered? Sign Up</ButtonText>
      </Button>
      <Divider className="my-5" />
      <Pressable
        onPress={() => console.log("Hello")}
        className="p-5 w-1000 bg-white border-typography-200"
        style={{ borderWidth:1, borderRadius: 50, width: '100%' }}
      >
        <View className="flex flex-row items-center">
          <Image
            className="mr-2"
            source={{
              uri: "https://img.icons8.com/color/100/000000/google-logo.png",
            }}
            style={{ width: 20, height: 20 }}
          />
          <Text className="text-typography-500 ">
            Sign in with Google
          </Text>
        </View>
      </Pressable>


      <Text className="text-[#787F86]" style={{ marginRight: 20, marginTop: 20 }}>
        For more information, please see our{" "}
        <Text className="font-bold text-[#1E1B22]">Privacy Policy</Text>
      </Text>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </Box>
  );
};
export default Login;