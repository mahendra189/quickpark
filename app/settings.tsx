import { View } from "@/components/Themed"
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Icon, SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ArrowLeft, Heading } from "lucide-react-native";
import { Platform, Pressable, SafeAreaView, Text } from "react-native"
import colors from "tailwindcss/colors"
const Settings = () => {
    const router = useRouter();
    return (
        <SafeAreaView className="flex-1 bg-background-0">
            <StatusBar style={Platform.OS === "ios" ? "dark" : "auto"} backgroundColor="#1E1B22" />
            <Box className="flex-1 items-center justify-start px-4 py-3 w-full">
                <Box className="flex-row items-center justify-between w-full mb-4">
                    <Box className=' flex-row rounded-full'>
                        <Pressable
                            android_ripple={{ color: 'black', borderless: true }}
                            onPress={() => {
                                router.back();
                            }} className='bg-background-0 border border-typography-500 rounded-full p-4'>

                            <Icon as={ArrowLeft} color="black" size='xl' />
                        </Pressable>
                    </Box>
                    <Text className="text-xl font-bold" >Settings</Text>


                    <Box className='w-12 h-12' />

                </Box>
                <Box className="w-full" >
                    <Box className="flex-row justify-between align-center" >

                        <Text className="text-lg font-bold" >Theme</Text>
                        <Switch
                            size="md"
                            isDisabled={false}
                            trackColor={{ false: colors.neutral[300], true: colors.neutral[600] }}
                            thumbColor={colors.neutral[50]}
                            // activeThumbColor={colors.neutral[50]}
                            ios_backgroundColor={colors.neutral[300]}
                        />
                    </Box>
                </Box>

            </Box>
        </SafeAreaView>
    )
}
export default Settings;