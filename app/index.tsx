import React from "react";
import Gradient from "@/assets/Icons/Gradient";
import DocumentData from "@/assets/Icons/DocumentData";
import LightBulbPerson from "@/assets/Icons/LightbulbPerson";
import Rocket from "@/assets/Icons/Rocket";
import Logo from "@/assets/Icons/Logo";
import { Box } from "@/components/ui/box";
import { SafeAreaView, ScrollView } from "react-native";
import { Text } from "@/components/ui/text";

import { Link, useRouter } from "expo-router";
import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Divider } from "@/components/ui/divider";
export default function Home() {
  const router = useRouter();
  return (
    <Box className="bg-white p-5 h-full flex-1 justify-center items-center">
      <Text className="text-typography-0">This is the Box</Text>



      <Text style={{ color: "black", textAlign: "center", marginVertical: 20 }}>
        Welcome to the <Text>
          <Text className="font-semibold">QuickPark</Text>
        </Text> app! This is a sample application to demonstrate the use of Expo Router and various components.
      </Text>
      <Center>
        <Button size="md" variant="solid" action="primary" onPress={() => router.push("/login")}>
          <ButtonText>Login</ButtonText>
        </Button>
        <Divider className="my-0.5" />
        <Button size="md" variant="solid" action="primary" onPress={() => router.push("/register")}>
          <ButtonText>Register</ButtonText>
        </Button>
      </Center>
    </Box>
  );
}
