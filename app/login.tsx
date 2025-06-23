import { View } from "@/components/Themed"
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform, Text } from "react-native"

const Login = () => {
    const router = useRouter();
    return (
        <Box className=" flex flex-1 items-center justify-center">
            <Text className="text-xl font-bold">Login Page</Text>
            <Box className="my-[30px] h-1 w-[80%]" />
            <Button size="md" variant="solid" action="primary" onPress={() => router.push("/home")}>
                <ButtonText>Home Page</ButtonText>
            </Button>
            <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
        </Box>
    )
}
export default Login;