import { View } from "@/components/Themed";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform, ScrollView, Text } from "react-native";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import { Image } from "react-native";
import { Divider } from "@/components/ui/divider";
import { Icon } from "@/components/ui/icon";
import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native";
const Register = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    return (
        <SafeAreaView className="flex-1 bg-background-0">
            <StatusBar  style={"dark"} />
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false} >


                <Box className=" flex flex-1 items-center justify-center px-4 py-3 mt-10 ">
                    <Box className="mb-10">
                        <Heading className="text-5xl mb-2">QuickPark</Heading>
                        <Text className="text-[#787F86]">
                            Create your account to get started.
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
                        <InputField placeholder="Enter your name" />
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
                        <InputField placeholder="Enter your email address" />
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
                        <InputField placeholder="Enter your Mobile Number" />
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
                        style={{ backgroundColor: "#FF7F40", borderRadius: 50, width: "100%", marginBottom: 20 }}

                    >
                        <ButtonText>Register</ButtonText>
                    </Button>
                    <Button
                        size="xl"
                        variant="solid"
                        action="primary"
                        style={{ backgroundColor: "white", borderRadius: 50, width: "100%", borderColor: "#FF7F40", borderWidth: 1, marginBottom: 20 }}
                        onPress={() => router.replace("/login")}

                    >
                        <ButtonText className="text-[#FF7F40]" >Already have an account? Login</ButtonText>
                    </Button>
                    <Divider className="my-5" />
                    <Pressable
                        onPress={() => console.log("Hello")}
                        className="p-5 bg-white border border-gray-400"
                        style={{ borderRadius: 50, width: '100%' }}
                    >
                        <View className="flex flex-row items-center">
                            <Image
                                className="mr-2"
                                source={{
                                    uri: "https://img.icons8.com/color/100/000000/google-logo.png",
                                }}
                                style={{ width: 20, height: 20 }}
                            />
                            <Text className="text-typography-500">
                                Sign up with Google
                            </Text>
                        </View>
                    </Pressable>


                    <Text className="text-[#787F86]" style={{ marginTop: 5, marginRight: 29 }}>
                        For more information, please see our{" "}
                        <Text className="font-bold text-[#1E1B22]">Privacy Policy</Text>
                    </Text>
                    <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
                </Box>
            </ScrollView>

        </SafeAreaView>
    );
};
export default Register;
