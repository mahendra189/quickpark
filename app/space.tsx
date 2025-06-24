import { View } from "@/components/Themed"
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform, Text } from "react-native"

const Space = () => {
    const router = useRouter();
    return (
        <Box className=" flex flex-1 items-center justify-center">

            <Text className="text-xl font-bold">Space Page</Text>

            <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
        </Box>
    )
}
export default Space;