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
import { Check, Cross, Eye, EyeOff, EyeOffIcon, InfoIcon } from "lucide-react-native";
import { Icon } from "@/components/ui/icon";
import { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/auth/firebaseConfig";
import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";
import { GlobalContext} from "@/context/globalContext";

const Login = () => {
  const context = useContext(GlobalContext);
  const setUser = context?.setUser;
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState({
    msge: "AlertBox",
    icon: InfoIcon,
    type: 'success'
  })
  const [showAlert, setShowAlert] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAlert = (msg: string, type: string, icon: any) => {
    setAlert({
      msge: msg,
      icon: icon,
      type
    })
    setShowAlert(true)
    setTimeout(() => {
      setShowAlert(false)
    }, 2000)


  }

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      setUser && setUser(userCredential.user);
      handleAlert("User Logged In", "success", Check)
      router.replace("/home")
    }
    catch (err: any) {
      handleAlert(err, "error", Cross)
    }
  }

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
            <ButtonText>Login</ButtonText>
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
          <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
          {
            showAlert &&
            <Alert className="absolute bottom-10 left-0 right-0" action={alert.type as "muted" | "success" | "error" | "warning" | "info"} variant="solid">
              <AlertIcon as={alert.icon} />
              <AlertText>{alert.msge}</AlertText>
            </Alert>
          }

        </Box>
      </ScrollView>
    </SafeAreaView >

  );
};
export default Login;