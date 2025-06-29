import React, { useEffect, useState, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Pressable, ScrollView, StyleSheet, View, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
import { ArrowLeft, ArrowRight, Backpack, CheckCircle, LocateFixed, LocateFixedIcon, LocationEdit, Search, Star, StarHalf } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Input, InputField } from '@/components/ui/input';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import * as Location from 'expo-location';
import { Image } from '@/components/ui/image';
import { useLocalSearchParams } from 'expo-router';
const durationOptions = ["Hour", "Day", "Month"];
const vehicleOptions = ["car", "bike", "truck", "van", "auto"];
const vehicleImages: { [key: number]: any } = {
  0: require("../assets/images/vehicles/car.png"),
  1: require("../assets/images/vehicles/bike.png"),
  2: require("../assets/images/vehicles/truck.png"),
  3: require("../assets/images/vehicles/van.png"),
  4: require("../assets/images/vehicles/auto.png"),
};

interface space {
  id: number,
  "vehicle": number,
  "price": number,
  "per": number,
  "rating": string,
  "slots": number,
  "latitude": number,
  "longitude": number,
  "distance": number
  "coords": Map<string, number>
}
const Space = () => {
  const [alert, setAlert] = useState({
    show: false,
    icon: CheckCircle,
    type: "success",
    message: "Space created successfully",
  });

  const router = useRouter();
  const [showActionsheet, setShowActionsheet] = React.useState(false)
  const [selectedSpace, setSelectedSpace] = useState<space>();
  const handleClose = () => setShowActionsheet(false)
  const [location, setLocation] = React.useState({ latitude: 18.5204, longitude: 73.8567 });
  const mapRef = useRef<MapView>(null);
  const markerRefs = useRef<{ [key: number]: React.RefObject<typeof Marker> | any }>({});

  // const getRandomRating = () => (Math.round((Math.random() * 2 + 3) * 10) / 10); // 3.0 - 5.0
  // const getRandomPrice = () => Math.floor(Math.random() * 91) + 30; // 30 - 120
  // const getRandomPer = () => (Math.random() > 0.5 ? 'hour' : 'day');

  const [availableSpaces, setAvailableSpaces] = useState<space[]>([]);


  const fetchNearbySpaces = async (latitude: number, longitude: number, vehicle: number) => {
    console.log("Fetching nearby spaces for coordinates:", latitude, longitude, vehicle);
    const response = await fetch(`http://localhost:3000/find-nearby-spaces?lat=${latitude}&lon=${longitude}&vehicle=${vehicle}`)
    if (response.status === 404) {
      console.log("No Spaces")
      return

    }
    const data = await response.json()
    setAvailableSpaces(data)




  };

  const fetchSpaces = async () => {
    const response = await fetch("http://localhost:3000/spaces");
    const data = await response.json();
    console.log("Fetched spaces:", data);
    setAvailableSpaces(data);
  }

  const params = useLocalSearchParams();

  useEffect(() => {
    if (params && params.vehicle && params.location) {
      let vehicle: any;
      if (typeof params.vehicle === 'string') {
        vehicle = JSON.parse(params.vehicle);
      } else if (Array.isArray(params.vehicle)) {
        vehicle = JSON.parse(params.vehicle[0]);
      }

      let locationObj: { latitude: number; longitude: number };
      if (typeof params.location === 'string') {
        locationObj = JSON.parse(params.location);
      } else if (Array.isArray(params.location)) {
        locationObj = JSON.parse(params.location[0]);
      } else {
        locationObj = { latitude: 0, longitude: 0 };
      }
      const { latitude, longitude } = locationObj;
      console.log("Vehicle from params:", vehicle);
      console.log("Location from params:", locationObj);
      (async () => {
        await fetchNearbySpaces(latitude, longitude, vehicle.type);
      })();
    }
  }, []);


  const [showSpaces, setShowSpaces] = useState(false);

  const handleSpace = (space: any) => {
    setShowSpaces(true);
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: space.latitude,
        longitude: space.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);
    }
    setTimeout(() => {
      markerRefs.current[space.id]?.showCallout();
    }, 1000);
  }

  const getCurrentLocation = async () => {
    try {

      // console.log("Requesting location permission...");
      const { status } = await Location.requestForegroundPermissionsAsync();
      // console.log("Permission status:", status);
      if (status !== 'granted') {
        // console.log('Permission to access location was denied');
        return;
      }
      // console.log("Getting current position...");
      const location = await Location.getCurrentPositionAsync({});
      // console.log('Current location:', location);
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }, 1000);
      }
    } catch (error) {
      console.error("Error getting location:", error);
    }
  }

  useEffect(() => {
    getCurrentLocation();
  }, []);



  const handlePark = (id: number) => {
    setShowActionsheet(false)
    setAlert({
      show: true,
      icon: CheckCircle,
      type: "success",
      message: "Parking Booked"
    })
    setAvailableSpaces(availableSpaces.filter((sp) => sp.id != id))
    setTimeout(() => setAlert({ ...alert, show: false }), 3000)
  }



  return (
    <SafeAreaView className="flex-1 bg-background-0">
      <StatusBar style={Platform.OS === "ios" ? "dark" : "auto"} backgroundColor="#1E1B22" />

      <MapView ref={mapRef} style={{ flex: 1 }} initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
        onPanDrag={() => setShowSpaces(false)}
      >
        <Marker
          style={{ width: 30, height: 30 }}
          coordinate={{ latitude: location.latitude, longitude: location.longitude }}
          title="Your Location"
          pinColor="green"
        />
        {availableSpaces.map(space => (
          <Marker
            ref={ref => { markerRefs.current[space.id] = ref; }}
            key={space.id}
            coordinate={{ latitude: space.latitude, longitude: space.longitude }}
            title={`Space ${space.id}`}
            description={vehicleOptions[space.vehicle]}
            pinColor='#FF7F40'
          />
        ))}
      </MapView>
      <Box
        className={'absolute flex-row items-center justify-between p-4 gap-2'}
        style={{ top: Platform.OS === 'ios' ? 40 : 1 }}
      >
        <Box className=' flex-row rounded-full'>
          <Pressable
            onPress={() => {
              router.back();
            }} className='bg-background-0 border border-typography-500 rounded-full p-4'
            style={{ backgroundColor: 'white' }}
          >

            <Icon as={ArrowLeft} color="black" size='xl' />
          </Pressable>
        </Box>
        {/* <Box className='flex-row items-center w-[85%] bg-background-0 border border-typography-500 rounded-full'>
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
        </Box> */}
      </Box>
      <Box className='absolute bottom-10 right-0 flex-row items-center justify-between p-4 gap-y-2'>
        <Pressable
          onPress={() => {
            getCurrentLocation();

          }}
          className='bg-background-0 border border-typography-500 rounded-full p-4'>
          <Icon as={LocateFixedIcon} color="black" size='xl' />
        </Pressable>
      </Box>
      {!showSpaces &&

        <Pressable onPress={() => {
          setShowSpaces(true)
        }} className='absolute bottom-36 left-0 right-0 gap-y-2 p-2 h-12 mx-3 flex-1  rounded-2xl overflow-hidden border border-typography-400 bg-background-0 flex-row items-center justify-center'>
          <Box className='items-center justify-center flex-1'>
            <Text className='text-typography-500 text-center'>
              Show Available Spaces
            </Text>
          </Box>
        </Pressable>
      }
      {
        showSpaces && (
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
                    <Pressable onPress={() => {
                      handleSpace(space)
                    }} key={space.id} className='w-64 h-72 rounded-2xl overflow-hidden border border-typography-400 bg-background-0 flex-col'>
                      <Box className='flex-1 w-full flex items-center justify-center overflow-hidden bg-background-400 '>
                        <Image
                          className='w-full h-full'
                          source={{ uri: 'https://img.freepik.com/premium-vector/drawing-forest-with-trees-sun-background_905719-6825.jpg?semt=ais_hybrid&w=740' }}
                          resizeMode="cover"
                          alt="space"
                        />
                      </Box>
                      <Box className='p-4 overflow-hidden flex-1 flex-col justify-between'>
                        {/* <Heading numberOfLines={1} ellipsizeMode="tail" className="text-sm w-full">
                          {space.latitude},
                        </Heading>
                        <Heading numberOfLines={1} ellipsizeMode="tail" className="text-sm w-full">
                          {space.longitude}
                        </Heading> */}
                        {/* <Text className='text-typography-500 w-full' numberOfLines={1} ellipsizeMode="tail"> */}
                        {/* {space.address} */}
                        {/* </Text> */}
                        {/* <Text className='text-typography-500 w-full' numberOfLines={1} ellipsizeMode="tail"> */}
                        {/* {space.distance} */}
                        {/* </Text> */}
                        <Text className='text-typography-500 w-full' numberOfLines={1} ellipsizeMode="tail">
                          {vehicleOptions[space.vehicle].toUpperCase()}
                        </Text>
                        <Text className='text-typography-500 w-full' numberOfLines={1} ellipsizeMode="tail">

                          {space.distance.toFixed(2)} meters away
                        </Text>

                        <Box className="flex-row items-center mt-1 mb-1">
                          {(() => {
                            const stars = [];
                            const fullStars = Math.floor(parseFloat(space.rating));
                            const hasHalfStar = parseFloat(space.rating) - fullStars >= 0.25 && parseFloat(space.rating) - fullStars < 0.75;
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
                            {space.price} / {durationOptions[space.per]}
                          </Text>
                          <Pressable
                            className='my-1 w-10 h-10 flex-row items-center justify-center border border-typography-0 rounded-full p-4 bg-orange'
                            onPress={() => {
                              setSelectedSpace(space)
                              setShowActionsheet(true)
                            }}
                          >
                            <Icon as={ArrowRight} color="white" size='md' />
                          </Pressable>
                        </Box>
                      </Box>
                    </Pressable>
                  ))
                }
              </HStack>
            </ScrollView>
          ))
      }


      <Actionsheet isOpen={showActionsheet} onClose={handleClose}  >
        <ActionsheetBackdrop />
        <ActionsheetContent style={{ height: '50%', padding: 0, margin: 0 }}>
          {/* <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper> */}
          {selectedSpace &&
            <ScrollView key={selectedSpace.id} className='h-[50%] rounded-3xl overflow-hidden bg-background-0 w-full'>
              <Box className='overflow-hidden h-full'>
                <Box className='w-full h-[40%]'>
                  <Image
                    className='w-full h-full'
                    source={{ uri: 'https://img.freepik.com/premium-vector/drawing-forest-with-trees-sun-background_905719-6825.jpg?semt=ais_hybrid&w=740' }}
                    resizeMode="cover"
                    alt="space"
                  />
                </Box>
                <Box className='p-4' >
                  <Text className="text-typography-500 text-sm">
                    {vehicleOptions[selectedSpace.vehicle]}
                  </Text>
                  <Box className="flex-row items-center mt-1 mb-1">
                    {(() => {
                      const stars = [];
                      const fullStars = Math.floor(parseFloat(selectedSpace.rating));
                      const hasHalfStar = parseFloat(selectedSpace.rating) - fullStars >= 0.25 && parseFloat(selectedSpace.rating) - fullStars < 0.75;
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
                    <Text className="ml-2 text-typography-500">{selectedSpace.rating}</Text>
                  </Box>
                  <Box className="flex-row items-center justify-between mb-1">
                    <Text className="bg-orange text-typography-0 px-2 py-1 rounded-md font-bold mr-2">
                      {selectedSpace.price} / {durationOptions[typeof selectedSpace.per === 'number' ? selectedSpace.per : Number(selectedSpace.per)]}
                    </Text>
                    <Pressable
                      className='my-1 h-10 flex-row items-center justify-center border border-typography-0 rounded-full px-4 py-1 bg-orange'
                      onPress={() => handlePark(selectedSpace.id)}
                    >
                      <Text className='text-typography-0' >Park</Text>
                      <Icon as={ArrowRight} color="white" size='md' />
                    </Pressable>
                  </Box>
                </Box>
              </Box>
            </ScrollView>
          }
        </ActionsheetContent>
      </Actionsheet>
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
        </Box>}


    </SafeAreaView >
  );
}
export default Space;
