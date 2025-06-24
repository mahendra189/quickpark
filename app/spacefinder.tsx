import React from 'react';
import MapView from 'react-native-maps';
import { Platform, Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
} from "@/components/ui/actionsheet"
import { Button, ButtonText } from '@/components/ui/button';
import { StatusBar } from 'expo-status-bar';
import { Icon } from '@/components/ui/icon';
import { ArrowLeft, Backpack } from 'lucide-react-native';
import { useRouter } from 'expo-router';
const Space = () => {
  const router = useRouter();
  const [showActionsheet, setShowActionsheet] = React.useState(false)
  const handleClose = () => setShowActionsheet(false)

  return (
    <SafeAreaView className="flex-1 bg-background-100">
      <StatusBar style={Platform.OS === "ios" ? "dark" : "auto"} backgroundColor="#1E1B22" />

      <MapView style={{ flex: 1 }} initialRegion={{
        latitude: 18.5204,
        longitude: 73.8567,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}>

      </MapView>
      <Box className='absolute top-14 left-0 flex-row right-0 rounded-md p-4'>
        <Pressable onPress={() => {
          router.back();
        }} className='bg-background-0 border border-typography-500 rounded-full p-2'>

          <Icon as={ArrowLeft} color="black" size='xl' />
        </Pressable>
      </Box>
      <Button className='absolute bottom-10 left-0 right-0 mx-4' onPress={() => setShowActionsheet(true)}>
        <ButtonText>Find Spaces</ButtonText>
      </Button>
      <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <ActionsheetItem onPress={handleClose}>
            <ActionsheetItemText>Edit Message</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={handleClose}>
            <ActionsheetItemText>Mark Unread</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={handleClose}>
            <ActionsheetItemText>Remind Me</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={handleClose}>
            <ActionsheetItemText>Add to Saved Items</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem isDisabled onPress={handleClose}>
            <ActionsheetItemText>Delete</ActionsheetItemText>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet>


    </SafeAreaView>
  );
}
export default Space;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
