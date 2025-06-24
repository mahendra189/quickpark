import { View } from "@/components/Themed";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform, Text } from "react-native";

const Home = () => {
  const router = useRouter();
  return (
    <Box className=" flex flex-1 items-center justify-center">
      <Text className="text-xl font-bold">Home Page</Text>
      <Box className="my-[30px] h-1 w-[80%]" />
      <Button
        size="md"
        variant="solid"
        action="primary"
        onPress={() => router.push("/settings")}
      >
        <ButtonText>Settings Page</ButtonText>
      </Button>
      <Button size="md" variant="solid" action="primary" style={{marginTop: 10}} onPress={() => router.push("/register")}>
        <ButtonText>Registration Page</ButtonText>
      </Button>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </Box>
  );
};
export default Home;
