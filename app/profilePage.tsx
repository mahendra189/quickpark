import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";
import { Center } from "@/components/ui/center";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
} from "@/components/ui/select";
import { ChevronDownIcon } from "@/components/ui/icon";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { StatusBar } from "expo-status-bar";
import { Platform, SafeAreaView } from "react-native";
import { Input, InputField } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import { Icon } from "@/components/ui/icon";
import { ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';

const ProfilePage = () => {
  const router = useRouter();
  const [dob, setDob] = useState(new Date(2022, 11, 12)); // 12/12/2022
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

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
          <AvatarFallbackText>Jane Doe</AvatarFallbackText>
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
            <InputField placeholder="Enter your name" value="Jane Doe" />
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
            <InputField placeholder="Enter your email address" value="janedoe@gmail.com" />
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
            <InputField placeholder="Enter your mobile number" value="7387341368" />
          </Input>
          <Text className="mb-3 ml-1">Date of birth</Text>
          <Pressable
            onPress={() => setShowDatePicker(true)}
            className="rounded-full p-2 border border-typography-200 bg-white mb-5"
            style={{ height: 46, justifyContent: 'center', marginBottom: 20 }}
          >
            <Text style={{ color: '#787F86' }}>{formatDate(dob)}</Text>
          </Pressable>
          {showDatePicker && (
            <DateTimePicker
              value={dob}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setDob(selectedDate);
              }}
              maximumDate={new Date()}
            />
          )}

          <Button
            size="xl"
            variant="solid"
            action="primary"
            style={{ backgroundColor: "#FF7F40", borderRadius: 50, width: "100%", marginTop: 20 }}
          >
            <ButtonText>Save</ButtonText>
          </Button>
        </Box>
      </Center>
    </SafeAreaView>
  );
};

export default ProfilePage;
