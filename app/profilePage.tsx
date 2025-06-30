import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";
import { Center } from "@/components/ui/center";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Platform } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input, InputField } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import { Icon } from "@/components/ui/icon";
import { ArrowLeft, CheckCircle } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from 'react';
import { updateEmail, updateProfile } from "firebase/auth";
import { GlobalContext } from "@/context/globalContext";
import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";
import { P } from "@expo/html-elements";

const ProfilePage = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter();
  const context = useContext(GlobalContext);
  const user = context?.user;
  const setUser = context?.setUser
  const [email, setEmail] = useState<string>(user.email || "");
  const [name, setName] = useState<string>(user.name || "");
  const [mobile, setMobile] = useState<string>(user.mobile || "");

  const [alert, setAlert] = useState({
    show: false,
    icon: CheckCircle,
    type: "success",
    message: "Space created successfully",
  });

  const handleUpdate = async () => {
    console.log(user)
    if (email !== user.email || name !== user.name) {
      setLoading(true)
      // await updateEmail(user, email);
      // await updateProfile(user, {
      //   displayName: name,
      // })
      await fetch("http://localhost:3000/update-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: user.id,
          name: name,
          email: email,
          mobile: mobile
        })
      }).then((res) => res.json()).then((data) => {
        setLoading(false)
        setUser && setUser(data[0])
        console.log(data)

      }

      ).catch((err) => {

        console.log("Error updating profile: ", err)


      })
      setLoading(false)
    }
    setAlert({
      message: "Profile Updated Successfully",
      icon: CheckCircle,
      type: 'success',
      show: true
    });
    setTimeout(() => {
      setAlert({ ...alert, show: false })
    }, 2000)
  }
  return (
    <SafeAreaView className="flex-1 bg-background-0">
      <StatusBar backgroundColor="#1E1B22" style={Platform.OS === "ios" ? "dark" : "light"} />
      <Box className="flex-row items-center justify-between w-full px-4 mt-4 mb-4">
        <Box className="flex-row rounded-full">
          <Pressable
            android_ripple={{ color: 'black', borderless: true }}
            onPress={() => {
              router.back();
            }}
            className="bg-background-0 border border-typography-500 rounded-full p-4"
          >
            <Icon as={ArrowLeft} color="black" size="xl" />
          </Pressable>
        </Box>
        <Text className="text-xl font-bold">Profile</Text>
        <Box className="w-12 h-12" />
      </Box>
      <Center>
        {/* <Avatar size="xl" className="mt-4">
          <AvatarFallbackText></AvatarFallbackText>
          <AvatarImage
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
          />
          <AvatarBadge />
        </Avatar> */}
        <Box className="mt-3 w-full max-w-md px-4">
          <Text className="mb-3 ml-1">Name</Text>
          <Input
            variant="outline"
            size="lg"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            style={{ height: 46, marginBottom: 20 }}
            className="rounded-full p-2"
          >
            <InputField value={name} onChangeText={(e) => {
              setName(e)
            }} placeholder="Enter your name" />
          </Input>
          <Text className="mb-3 ml-1">Email</Text>
          <Input
            variant="outline"
            size="lg"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            style={{ height: 46, marginBottom: 20 }}
            className="rounded-full p-2"
          >
            <InputField value={email} onChangeText={(value) => {
              setEmail(value)
            }} placeholder="Enter your email address" />
          </Input>
          <Text className="mb-3 ml-1">Mobile No.</Text>
          <Input
            variant="outline"
            size="lg"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            style={{ height: 46, marginBottom: 20 }}
            className="rounded-full p-2"
          >
            <InputField onChangeText={(value) => setMobile(value)} placeholder="Enter your mobile number" value={mobile} />
          </Input>
          {/* <Text className="mb-3 ml-1">Date of birth</Text> */}
          {/* <Pressable
            className="rounded-full p-2 border border-typography-200 bg-white mb-5"
            style={{ height: 46, justifyContent: 'center', marginBottom: 20 }}
          >
            <Text style={{ color: '#787F86' }}></Text>
          </Pressable> */}


          <Button
            size="xl"
            variant="solid"
            action="primary"
            style={{ backgroundColor: "#FF7F40", borderRadius: 50, width: "100%", marginTop: 20 }}
            onPress={async () => {
              setLoading(true)
              await handleUpdate()
              setLoading(false)
            }}
            android_ripple={{ color: '#ffb184', borderless: false }}
          >
            {loading ?
              <ActivityIndicator size="small" color="white" /> :
              <ButtonText>Save</ButtonText>}
          </Button>
        </Box>
      </Center>
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
    </SafeAreaView>
  );
};

export default ProfilePage;
