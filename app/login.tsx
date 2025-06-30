import { View } from "@/components/Themed";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Platform, ScrollView, Text } from "react-native";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import { Image } from "react-native";
import { Divider } from "@/components/ui/divider";
import { Check, CheckCircle, Cross, Eye, EyeOff, EyeOffIcon, InfoIcon, X } from "lucide-react-native";
import { Icon } from "@/components/ui/icon";
import { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/auth/firebaseConfig";
import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";
import { GlobalContext } from "@/context/globalContext";

const Login = () => {
  const [loading, setLoading] = useState(false)
  const context = useContext(GlobalContext);
  const setUser = context?.setUser;
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({
    show: false,
    icon: CheckCircle,
    type: "success",
    message: "Space created successfully",
  });

  const handleAlert = (msg: string, type: string, icon: any) => {
    setAlert({
      message: msg,
      icon: icon,
      type,
      show: true
    })
    setTimeout(() => {
      setAlert({ ...alert, show: false })
    }, 3500)


  }

  const handleLogin = async () => {
    setLoading(true)
    if (!email.trim() || !password.trim()) {
      handleAlert("Please enter both email and password.", "error", X);
      setLoading(false)
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Fetch user data from backend
      const response = await fetch(`http://localhost:3000/get-user?email=${encodeURIComponent(email)}`);
      if (!response.ok) {
        setLoading(false)
        throw new Error("Failed to fetch user data.");
      }
      const data = await response.json();
      setUser && setUser(data[0]);

      handleAlert("Logged in successfully!", "success", Check);
      setLoading(false)
      router.replace("/home");
    } catch (err: any) {
      let message = "Login failed. Please check your credentials.";
      if (err && err.message) {
        message = err.message;
      }
      setLoading(false)
      handleAlert(message, "error", X);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background-0">
      <StatusBar style={"dark"} />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} >
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
            <InputField value={email} onChangeText={(value) => setEmail(value)} placeholder="Enter your Email address" type="text" />
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
            <InputField value={password} onChangeText={(value) => setPassword(value)} placeholder="Enter your password" type={showPassword ? "text" : "password"} />
            <Pressable className="mx-2 my-2" onPress={() => setShowPassword(!showPassword)}>
              <Icon as={showPassword ? EyeOff : Eye} />

            </Pressable>
          </Input>
          <Button
            size="xl"
            variant="solid"
            action="primary"
            style={{ backgroundColor: "#FF7F40", borderRadius: 50, width: "100%", marginBottom: 20 }}
            onPress={handleLogin}
          >
            {loading ?
              <ActivityIndicator size="small" color="white" /> :
              <ButtonText>Login</ButtonText>}
          </Button>
          <Button
            size="xl"
            variant="solid"
            action="primary"
            style={{ backgroundColor: "white", borderRadius: 50, width: "100%", borderColor: "#FF7F40", borderWidth: 1, marginBottom: 20 }}
            onPress={() => router.replace("/register")}
          >
            <ButtonText className="text-[#FF7F40]" >Not Registered? Sign Up</ButtonText>
          </Button>
          <Divider className="my-5" />
          <Pressable
            onPress={() => console.log("Hello")}
            className="p-5 w-1000 bg-white border-typography-200"
            style={{ borderWidth: 1, borderRadius: 50, width: '100%' }}
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
        </Box>
      </ScrollView>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      {
        alert.show &&
        <Box className="absolute bottom-10 w-full px-2 py-3">

          <Box className="border-2 border-red-500 w-full flex bg-red-400 px-3 py-4 rounded-lg flex-row gap-2 items-center shadow-md"
            style={{
              backgroundColor: alert.type === "success" ? "#86efac" : "#f87171",
              borderColor: alert.type === "success" ? "#4ade80" : "#ef4444",
              borderWidth: 2
            }}
          >
            <Icon as={alert.icon} color={alert.type === "success" ? "green" : "darkred"} size="md" />
            <Text className="text-red-900 text-lg font-bold"
              style={{ color: alert.type === "success" ? "#064e3b" : "#7f1d1d" }}

            >
              {alert.message}
            </Text>

          </Box>
        </Box>
      }


    </SafeAreaView >

  );
};
export default Login;