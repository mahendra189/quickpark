import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, View, Image } from 'react-native';
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
import { ArrowLeft, ArrowRight, Backpack, LocateFixed, LocateFixedIcon, LocationEdit, Search, Star, StarHalf } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Input, InputField } from '@/components/ui/input';
import Location from 'expo-location';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
const Space = () => {
  const router = useRouter();
  const [showActionsheet, setShowActionsheet] = React.useState(false)
  const handleClose = () => setShowActionsheet(false)
  const [location, setLocation] = React.useState({ latitude: 18.5204, longitude: 73.8567 });

  const getRandomRating = () => (Math.round((Math.random() * 2 + 3) * 10) / 10); // 3.0 - 5.0
  const getRandomPrice = () => Math.floor(Math.random() * 91) + 30; // 30 - 120
  const getRandomPer = () => (Math.random() > 0.5 ? 'hour' : 'day');

  const [availableSpaces, setAvailableSpaces] = useState([
    {
      id: 1,
      name: 'Grünerløkka',
      address: '14 Thorvald Meyers Gate',
      distance: '1.2 km away',
      rating: getRandomRating(),
      price: getRandomPrice(),
      per: getRandomPer(),
      image: 'https://hips.hearstapps.com/hmg-prod/images/hardangerfjord-in-south-western-norway-in-the-royalty-free-image-1620377261.'
    },
    {
      id: 2,
      name: 'Bryggen',
      address: '22 Bryggen Street',
      distance: '3.4 km away',
      rating: getRandomRating(),
      price: getRandomPrice(),
      per: getRandomPer(),
      image: 'https://media.istockphoto.com/id/1500420309/photo/perfect-reflection-of-the-reine-village-on-the-water-of-the-fjord-in-the-lofoten-islands.jpg?s=612x612&w=0&k=20&c=4FMvHEkG3FH6fpaE355CnUSdXtV4LlqCBF9etWbNR6o='
    },
    {
      id: 3,
      name: 'Tromsøya',
      address: '9 Langnesvegen, Tromsø',
      distance: '4.8 km away',
      rating: getRandomRating(),
      price: getRandomPrice(),
      per: getRandomPer(),
      image: 'https://media.istockphoto.com/id/1500420309/photo/perfect-reflection-of-the-reine-village-on-the-water-of-the-fjord-in-the-lofoten-islands.jpg?s=612x612&w=0&k=20&c=4FMvHEkG3FH6fpaE355CnUSdXtV4LlqCBF9etWbNR6o='
    },
    {
      id: 4,
      name: 'Trondheim Sentrum',
      address: '67 Olav Tryggvasons Gate, Trondheim',
      distance: '2.9 km away',
      rating: getRandomRating(),
      price: getRandomPrice(),
      per: getRandomPer(),
      image: 'https://images.unsplash.com/photo-1576420801685-e9d3fd6c6b5c'
    },
    {
      id: 5,
      name: 'Aker Brygge',
      address: '3 Stranden, Oslo',
      distance: '2.1 km away',
      rating: getRandomRating(),
      price: getRandomPrice(),
      per: getRandomPer(),
      image: 'https://images.unsplash.com/photo-1561489424-b51c2b3b6ad4'
    },
    {
      id: 6,
      name: 'Geiranger',
      address: '11 Fjordgata, Geiranger',
      distance: '8.5 km away',
      rating: getRandomRating(),
      price: getRandomPrice(),
      per: getRandomPer(),
      image: 'https://images.unsplash.com/photo-1572635196237-6efb894d6075'
    },
    {
      id: 7,
      name: 'Svolvær',
      address: '39 Havnveien, Lofoten',
      distance: '6.4 km away',
      rating: getRandomRating(),
      price: getRandomPrice(),
      per: getRandomPer(),
      image: 'https://images.unsplash.com/photo-1523544261120-22c97f86e8f3'
    },
    {
      id: 8,
      name: 'Tjuvholmen',
      address: '5 Tjuvholmen allé, Oslo',
      distance: '0.7 km away',
      rating: getRandomRating(),
      price: getRandomPrice(),
      per: getRandomPer(),
      image: 'https://images.unsplash.com/photo-1637067315179-c3fbe03a70e3'
    },
    {
      id: 9,
      name: 'Stavanger',
      address: '10 Kirkegata, Stavanger',
      distance: '3.0 km away',
      rating: getRandomRating(),
      price: getRandomPrice(),
      per: getRandomPer(),
      image: 'https://images.unsplash.com/photo-1586297135537-94bc9ba8f2ef'
    },
    {
      id: 10,
      name: 'Ålesund',
      address: '20 Apotekergata, Ålesund',
      distance: '2.2 km away',
      rating: getRandomRating(),
      price: getRandomPrice(),
      per: getRandomPer(),
      image: 'https://images.unsplash.com/photo-1611600749571-cdfbb502ec43'
    }
  ]);

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    console.log('Current location:', location);
  }

  useEffect(() => {
    (async () => {
      getCurrentLocation();
    })();
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-background-100">
      <StatusBar style={Platform.OS === "ios" ? "dark" : "auto"} backgroundColor="#1E1B22" />

      <MapView style={{ flex: 1 }} initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}>
        <Marker style={{ width: 30, height: 30 }} coordinate={{ latitude: location.latitude, longitude: location.longitude }} title="Pune" description="Sample Marker for App." />

      </MapView>
      <Box className='absolute top-12 flex-row items-center justify-between p-4 gap-2'>

        <Box className=' flex-row rounded-full'>
          <Pressable
            android_ripple={{ color: 'black', borderless: true }}
            onPress={() => {
              router.back();
            }} className='bg-background-0 border border-typography-500 rounded-full p-4'>

            <Icon as={ArrowLeft} color="black" size='xl' />
          </Pressable>
        </Box>
        <Box className='flex-row items-center w-[85%] bg-background-0 border border-typography-500 rounded-full'>
          <Pressable
            android_ripple={{ color: 'black', borderless: true }}
            onPress={() => {
              console.log("Backpack Pressed");

            }} className='flex-row bg-background-0 border-0 border-typography-500 rounded-full p-4'>

            <Icon as={Search} color="black" size='xl' />
          </Pressable>
          <Input className="flex-1 border-0 focus:border-0 focus:ring-0 text-white" >
            <InputField placeholder="Search..." />
          </Input>
        </Box>
      </Box>
      <Box className='absolute bottom-10 right-0 flex-row items-center justify-between p-4 gap-y-2'>
        <Pressable
          android_ripple={{ color: 'black', borderless: true }}
          onPress={getCurrentLocation}
          className='bg-background-0 border border-typography-500 rounded-full p-4'>
          <Icon as={LocateFixedIcon} color="black" size='xl' />
        </Pressable>
      </Box>
      {
        availableSpaces.length === 0 ? (
          <Box className='absolute bottom-36 left-0 right-0 gap-y-2 p-2 h-64 mx-3 flex-1  rounded-2xl overflow-hidden border border-typography-400 bg-background-0 flex-row items-center justify-center'>
            <Box className='items-center justify-center flex-1'>
              <Image
                source={require('../assets/images/noparking.png')}
                style={{ width: 120, height: 120 }}
                resizeMode="contain"
              />
              <Text className='text-typography-500 text-center mt-4'>
                No parking spaces found nearby.
              </Text>
            </Box>
          </Box>
        ) : (
          <ScrollView className='absolute bottom-0 left-0 right-0 gap-y-2 p-2' contentContainerStyle={{ paddingBottom: 100 }} showsHorizontalScrollIndicator={false} horizontal={true}>
            <HStack space='sm'>
              {

                availableSpaces.map((space) => (
                  <Box key={space.id} className='w-64 h-72 rounded-2xl overflow-hidden border border-typography-400 bg-background-0'>
                    <Box className='h-[40%] bg-gradient-to-b from-background-0 to-background-100 flex-row items-center justify-between'>
                      <Image source={{ uri: space.image }} style={{ width: "100%", height: '100%' }} alt={space.name} />
                    </Box>
                    <Box className='p-4 overflow-hidden h-[60%]'>
                      <Heading numberOfLines={1} ellipsizeMode="tail" className="w-full">
                        {space.name}
                      </Heading>
                      <Text className='text-typography-500 w-full' numberOfLines={1} ellipsizeMode="tail">
                        {space.address}
                      </Text>
                      <Text className='text-typography-500 w-full' numberOfLines={1} ellipsizeMode="tail">
                        {space.distance}
                      </Text>
                      <Box className="flex-row items-center mt-1 mb-1">
                        {(() => {
                          const stars = [];
                          const fullStars = Math.floor(space.rating);
                          const hasHalfStar = space.rating - fullStars >= 0.25 && space.rating - fullStars < 0.75;
                          const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
                          for (let i = 0; i < fullStars; i++) {
                            stars.push(<Icon key={`star-full-${i}`} as={Star} color="orange" size='md' />);
                          }
                          if (hasHalfStar) {
                            stars.push(<Icon key="star-half" as={StarHalf} color="orange" size='md' />);
                          }
                          for (let i = 0; i < emptyStars; i++) {
                            stars.push(<Icon key={`star-empty-${i}`} as={Star} color="lightgray" size='md' />);
                          }
                          return stars;
                        })()}
                        <Text className="ml-2 text-typography-500">{space.rating}</Text>
                      </Box>
                      <Box className="flex-row items-center justify-between mb-1">
                        <Text className="bg-orange text-typography-0 px-2 py-1 rounded-md font-bold mr-2">
                          {space.price} / {space.per}
                        </Text>
                        <Pressable
                          className='my-1 w-10 h-10 flex-row items-center justify-center border border-typography-0 rounded-full p-4 bg-orange'
                          onPress={() => setShowActionsheet(true)}
                        >
                          <Icon as={ArrowRight} color="white" size='md' />
                        </Pressable>
                      </Box>
                    </Box>
                  </Box>
                ))
              }
            </HStack>
          </ScrollView>
        )
      }

      {/* <Button className='absolute bottom-10 left-0 right-0 mx-4' onPress={() => setShowActionsheet(true)}>
        <ButtonText>Find Spaces</ButtonText>
      </Button> */}
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
