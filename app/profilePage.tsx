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
import { Platform, SafeAreaView } from "react-native";
import { Input, InputField } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import { Icon } from "@/components/ui/icon";
import { ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useContext, useState } from 'react';
import { updateEmail, updateProfile } from "firebase/auth";
import { GlobalContext } from "@/context/globalContext";
import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";

const ProfilePage = () => {
  const router = useRouter();
  const context = useContext(GlobalContext);
  const user = context?.user;
  const [email, setEmail] = useState<string>(user.email || "");
  const [name, setName] = useState<string>(user.displayName || "");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alert, setAlert] = useState({
    msge: "AlertBox",
    icon: AlertIcon,
    type: 'success'
  });

  const handleUpdate = async () => {
    if (email !== user.email || name !== user.displayName) {
      await updateEmail(user, email);
      await updateProfile(user, {
        displayName: name,
      })
      setAlert({
        msge: "Profile Updated Successfully",
        icon: AlertIcon,
        type: 'success'
      });
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    } 
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
        <Avatar size="xl" className="mt-4">
          <AvatarFallbackText></AvatarFallbackText>
          <AvatarImage
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
          />
          <AvatarBadge />
        </Avatar>
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
          {/* <Text className="mb-3 ml-1">Mobile No.</Text>
          <Input
            variant="outline"
            size="lg"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            style={{ height: 46, marginBottom: 20 }}
            className="rounded-full p-2"
          >
            <InputField placeholder="Enter your mobile number" value="7387341368" />
          </Input> */}
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
            onPress={handleUpdate}
          >
            <ButtonText>Save</ButtonText>
          </Button>
        </Box>
      </Center>
      {
        showAlert &&
        <Alert className="absolute bottom-1 left-0 right-0" action={alert.type as "muted" | "success" | "error" | "warning" | "info"} variant="solid">
          <AlertIcon as={alert.icon} />
          <AlertText>{alert.msge}</AlertText>
        </Alert>
      }
    </SafeAreaView>
  );
};

export default ProfilePage;
