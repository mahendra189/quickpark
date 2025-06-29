import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  ScrollView,
  Text,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { AddIcon, Icon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import {
  DrawerBackdrop,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Drawer,
} from "@/components/ui/drawer";
import { Heading } from "@/components/ui/heading";
import { useContext, useEffect, useRef, useState } from "react";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Divider } from "@/components/ui/divider";
import {
  User,
  Wallet,
  LogOut,
  Settings,
  Menu,
  Map,
  CheckCircle,
  CircleX,
  LocateFixed,
} from "lucide-react-native";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@/components/ui/slider";
import { GlobalContext } from "@/context/globalContext";
import MapView from "react-native-maps/lib/MapView";
import { MapPressEvent, Marker } from "react-native-maps";

const durationOptions = ["Hour", "Day", "Month"];
const Home = () => {


  const mapRef = useRef<MapView>(null);

  const [selectedLocation, setSelectedLocation] = useState<{ latitude: number, longitude: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [showDrawer, setShowDrawer] = useState(false);
  const [vehicle, setVehicle] = useState({
    type: 0,
    count: 1,
    duration: {
      type: 0,
      value: 1,
    },
    // only for create space
    charge: {
      type: 0,
      value: 10,
    },
  });

  const [alert, setAlert] = useState({
    show: false,
    icon: CheckCircle,
    type: "success",
    message: "Space created successfully",
  });

  const context = useContext(GlobalContext);
  const user = context?.user;
  const logOut = context?.handleLogOut;
  const [filter, setFilter] = useState("find");
  const [coords, setCoords] = useState<{ latitude: number, longitude: number } | null>(null);

  const handleLogOut = () => {
    if (logOut) {
      logOut();
      router.replace("/login");
    }
  };

  // Update getCurrentLocation to also set selectedLocation
  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLoading(false);
        setAlert({
          show: true,
          icon: CircleX,
          type: "error",
          message: "Permission to access location was denied",
        });
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setCoords({ latitude, longitude });
      setSelectedLocation({ latitude, longitude });
      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: selectedLocation?.latitude ?? 18.4334,
          longitude: selectedLocation?.longitude ?? 73.84455,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,

        }, 1000)
      }
      setVehicle((prev) => ({
        ...prev,
        location: [latitude, longitude],
      }));
    } catch (error) {
      console.error(error);
      setAlert({
        show: true,
        icon: CircleX,
        type: "error",
        message: "Error getting location",
      });
    }
  };

  // Call getCurrentLocation on mount for create mode
  useEffect(() => {
    getCurrentLocation();
  }, []);

  //   car:500 -> 0,
  //   bike:200 -> 1,
  //   truck:1000 -> 2,
  //   van:800 -> 3,
  //   auto:300 -> 4,


  //duration
  //   hour:10 -> 0,
  //   day:100 -> 1,
  //   month:1000 -> 2,

  const handleSubmit = async (type: string) => {
    setLoading(true);
    if (type === "find") {
      router.push({
        pathname: "/spacefinder",
        params: {
          vehicle: JSON.stringify(vehicle),
          location: selectedLocation ? JSON.stringify(selectedLocation) : "",
        },
      });
    } else if (type === "create") {
      await fetch("http://localhost:3000/create-space", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            "vehicle": vehicle.type,
            "price": vehicle.charge.value,
            "per": vehicle.charge.type,
            "rating": 5,
            "slots": vehicle.count,
            "createdId": 0,
            "location": [selectedLocation?.latitude || 0, selectedLocation?.longitude || 0],
          }

        )
      }).then((res) => res.json())
        .then((data) => {
          console.log("Space created successfully:", data);
          setAlert({
            show: true,
            icon: CheckCircle,
            type: "success",
            message: "Space created successfully",
          });
        })
        .catch((error) => {
          console.error("Error creating space:", error);
          setAlert({
            show: true,
            icon: CircleX,
            type: "error",
            message: "Error creating space",
          });
        });
      setTimeout(() => {
        setAlert({
          show: false,
          icon: CheckCircle,
          type: "success",
          message: "Space created successfully",
        });
      }, 3000);
    }
    setLoading(false);
  };
  return (
    <SafeAreaView className="flex-1 bg-background-0">
      <StatusBar
        backgroundColor="#1E1B22"
        style={Platform.OS === "ios" ? "dark" : "light"}
      />
      <Box className="justify-center flex-1">
        <Box className="flex-col items-center justify-start px-4 pt-4 bg-raisin border-b border-typography-100">
          <Box className="flex-row mt-4 items-center justify-between">
            <Avatar size="md" className="mr-2">
              <AvatarFallbackText>{user && user.email}</AvatarFallbackText>
              <AvatarImage
                source={{
                  uri: "https://media.istockphoto.com/id/1477793885/vector/beautiful-pastel-colored-abstract-landscape-geometric-vector-illustration.jpg?s=612x612&w=0&k=20&c=-CuSPe8hfQTM3Zscl6Ebbq43XwvpqzKRZLZO7CJPzT8=",
                }}
                alt="User Avatar"
              />
            </Avatar>
            <Box className="flex-1 ml-2">
              <Text className="text-typography-600">Welcome</Text>
              <Text className="text-typography-100">
                {user?.displayName || "User"}
              </Text>
            </Box>
            <Button
              onPress={() => {
                setShowDrawer(true);
              }}
              variant="outline"
              action="primary"
              className="z-50 rounded-full px-3 py-3  border-[1px] border-typography-700 color-typography-0 hover:bg-primary-500 hover:color-typography-0"
            >
              <Icon as={Menu} color="white" size="xl" />
            </Button>
          </Box>

          <Heading className="text-typography-50 text-lg font-semibold mt">
            QuickPark
          </Heading>
          <Text className="text-typography-500 text-sm">
            Find the best parking spots near you
          </Text>
          <Box className="w-full flex-col items-center justify-between mt mb-4 gap-2">
            <Box className="w-full rounded-2xl bg-background-100 p-2 pb-2 mt-5 mb-2">
              <Box className="flex-row items-center justify-between gap-1">
                <Pressable
                  className={`h-full w-1/2 flex-1 flex-row items-center justify-center p-2 rounded-xl ${filter === "find" ? "bg-orange" : ""
                    }`}
                  onPress={() => setFilter("find")}
                >
                  <Text
                    className={
                      filter == "find"
                        ? `font-bold text-typography-0`
                        : `text-typography-500`
                    }
                  >
                    Find a parking space
                  </Text>
                </Pressable>
                <Pressable
                  className={`h-full w-1/2 flex-row items-center justify-center p-2 rounded-xl ${filter === "create" ? "bg-orange" : ""
                    }`}
                  onPress={() => setFilter("create")}
                >
                  <Text
                    className={
                      filter == "create"
                        ? ` font-bold text-typography-0`
                        : `text-typography-500`
                    }
                  >
                    Create a parking space
                  </Text>
                </Pressable>
              </Box>
            </Box>
          </Box>
        </Box>
        <ScrollView className="flex-1">
          <Box className="flex-1 px-6 pt-4 bg-background-0">
            <VStack space="md" className="flex-1">

              <Text className="text-typography-800 text-lg font-bold">
                Location
              </Text>
              <MapView
                ref={mapRef}
                initialRegion={{
                  latitude: selectedLocation?.latitude || 18.4334,
                  longitude: selectedLocation?.longitude || 73.84455,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}

                region={
                  selectedLocation
                    ? {
                      latitude: selectedLocation.latitude,
                      longitude: selectedLocation.longitude,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    }
                    : undefined
                }
                style={{ width: "100%", height: 250 }}
                onPress={(e: MapPressEvent) => {
                  const { latitude, longitude } = e.nativeEvent.coordinate;
                  setSelectedLocation({ latitude, longitude });
                  setVehicle((prev) => ({
                    ...prev,
                    location: [latitude, longitude],
                  }));
                }}
              >
                {selectedLocation && (
                  <Marker coordinate={selectedLocation} />
                )} </MapView>
              <Box className="flex-row items-center justify-between">
                <Text className="text-typography-500 text-xs">
                  Tap on the map to select your parking location.
                </Text>
                {/* current location button  */}
                <Pressable className="self-end w-10 h-10 rounded-full flex items-center justify-center border"
                  onPress={() => {
                    getCurrentLocation();
                  }}
                >
                  <Icon as={LocateFixed} size="md" />
                </Pressable>

              </Box>

              <Text className="text-typography-800 text-lg font-bold mb-2">
                Vehicle Category
              </Text>
              <Box>
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  className=""
                >
                  <HStack space="sm">
                    <Pressable
                      className={
                        "w-36 h-36 bg-background-0  rounded-lg items-center justify-center " +
                        `${vehicle.type == 0
                          ? "border-2 border-orange"
                          : "border border-typography-100"
                        }`
                      }
                      onPress={() =>
                        setVehicle({ ...vehicle, type: 0 })
                      }
                    >
                      <Image
                        source={require("../assets/images/vehicles/car.png")}
                        className="w-28 h-28"
                        alt="Car"
                      />
                      <Text className="text-typography-500 text-sm">
                        Car
                      </Text>
                    </Pressable>
                    <Pressable
                      className={
                        "w-36 h-36 bg-background-0  rounded-lg items-center justify-center " +
                        `${vehicle.type == 1
                          ? "border-2 border-orange"
                          : "border border-typography-100"
                        }`
                      }
                      onPress={() =>
                        setVehicle({ ...vehicle, type: 1 })
                      }
                    >
                      <Image
                        source={require("../assets/images/vehicles/bike.png")}
                        className="w-28 h-28"
                        alt="Bike"
                      />
                      <Text className="text-typography-500 text-sm">
                        Bike
                      </Text>
                    </Pressable>
                    <Pressable
                      className={
                        "w-36 h-36 bg-background-0  rounded-lg items-center justify-center " +
                        `${vehicle.type == 2
                          ? "border-2 border-orange"
                          : "border border-typography-100"
                        }`
                      }
                      onPress={() =>
                        setVehicle({ ...vehicle, type: 2 })
                      }
                    >
                      <Image
                        source={require("../assets/images/vehicles/truck.png")}
                        className="w-28 h-28"
                        alt="Truck"
                      />
                      <Text className="text-typography-500 text-sm">
                        Truck
                      </Text>
                    </Pressable>
                    <Pressable
                      className={
                        "w-36 h-36 bg-background-0  rounded-lg items-center justify-center " +
                        `${vehicle.type == 3
                          ? "border-2 border-orange"
                          : "border border-typography-100"
                        }`
                      }
                      onPress={() =>
                        setVehicle({ ...vehicle, type: 3 })
                      }
                    >
                      <Image
                        source={require("../assets/images/vehicles/van.png")}
                        className="w-28 h-28"
                        alt="Van"
                      />
                      <Text className="text-typography-500 text-sm">
                        Van
                      </Text>
                    </Pressable>
                    <Pressable
                      className={
                        "w-36 h-36 bg-background-0  rounded-lg items-center justify-center " +
                        `${vehicle.type == 4
                          ? "border-2 border-orange"
                          : "border border-typography-100"
                        }`
                      }
                      onPress={() =>
                        setVehicle({ ...vehicle, type: 4 })
                      }
                    >
                      <Image
                        source={require("../assets/images/vehicles/auto.png")}
                        className="w-28 h-28"
                        alt="Auto"
                      />
                      <Text className="text-typography-500 text-sm">
                        Auto
                      </Text>
                    </Pressable>
                  </HStack>
                </ScrollView>
              </Box>
              <Text className="text-typography-800 text-lg font-bold mb-2 mt-4">
                How many?
              </Text>
              <Box className="gap-4">
                <Box className="flex-row gap-2">
                  <Pressable
                    className={
                      "p-2 px-4 bg-background-0  rounded-lg items-center justify-center " +
                      `${vehicle.count == 1
                        ? "border-2 border-orange"
                        : "border border-typography-100"
                      }`
                    }
                    onPress={() => setVehicle({ ...vehicle, count: 1 })}
                  >
                    <Text className="text-typography-800 text-sm">1</Text>
                  </Pressable>
                  <Pressable
                    className={
                      "p-2 px-4 bg-background-0  rounded-lg items-center justify-center " +
                      `${vehicle.count == 2
                        ? "border-2 border-orange"
                        : "border border-typography-100"
                      }`
                    }
                    onPress={() => setVehicle({ ...vehicle, count: 2 })}
                  >
                    <Text className="text-typography-800 text-sm">2</Text>
                  </Pressable>
                  <Pressable
                    className={
                      "p-2 px-4 bg-background-0  rounded-lg items-center justify-center " +
                      `${vehicle.count == 3
                        ? "border-2 border-orange"
                        : "border border-typography-100"
                      }`
                    }
                    onPress={() => setVehicle({ ...vehicle, count: 3 })}
                  >
                    <Text className="text-typography-800 text-sm">3</Text>
                  </Pressable>
                  <Pressable
                    className={
                      "p-2 px-4 bg-background-0  rounded-lg items-center justify-center " +
                      `${vehicle.count == 4
                        ? "border-2 border-orange"
                        : "border border-typography-100"
                      }`
                    }
                    onPress={() => setVehicle({ ...vehicle, count: 4 })}
                  >
                    <Text className="text-typography-800 text-sm">4</Text>
                  </Pressable>
                  <Pressable
                    className={
                      "p-2 px-4 bg-background-0  rounded-lg items-center justify-center " +
                      `${vehicle.count == 5
                        ? "border-2 border-orange"
                        : "border border-typography-100"
                      }`
                    }
                    onPress={() => setVehicle({ ...vehicle, count: 5 })}
                  >
                    <Text className="text-typography-800 text-sm">5</Text>
                  </Pressable>
                </Box>
              </Box>


              {filter === "find" ? (
                <>




                  <Text className="text-typography-800 text-lg font-bold mb-2 mt-4">
                    Duration
                  </Text>
                  <Box className="gap-4">
                    {/* dropdown for duration selection */}
                    <Box className="flex-row gap-2">
                      <Pressable
                        className={
                          "p-2 bg-background-0  rounded-lg items-center justify-center " +
                          `${vehicle.duration.type == 0
                            ? "border-2 border-orange"
                            : "border border-typography-100"
                          }`
                        }
                        onPress={() =>
                          setVehicle({
                            ...vehicle,
                            duration: { ...vehicle.duration, type: 0 },
                          })
                        }
                      >
                        <Text className="text-typography-800 text-sm">
                          Hour
                        </Text>
                      </Pressable>
                      <Pressable
                        className={
                          "p-2 bg-background-0  rounded-lg items-center justify-center " +
                          `${vehicle.duration.type == 1
                            ? "border-2 border-orange"
                            : "border border-typography-100"
                          }`
                        }
                        onPress={() =>
                          setVehicle({
                            ...vehicle,
                            duration: { ...vehicle.duration, type: 1 },
                          })
                        }
                      >
                        <Text className="text-typography-800 text-sm">Day</Text>
                      </Pressable>
                      <Pressable
                        className={
                          "p-2 bg-background-0  rounded-lg items-center justify-center " +
                          `${vehicle.duration.type == 2
                            ? "border-2 border-orange"
                            : "border border-typography-100"
                          }`
                        }
                        onPress={() =>
                          setVehicle({
                            ...vehicle,
                            duration: { ...vehicle.duration, type: 2 },
                          })
                        }
                      >
                        <Text className="text-typography-800 text-sm">
                          Month
                        </Text>
                      </Pressable>
                    </Box>
                    <Slider
                      defaultValue={10}
                      onChange={(value: number) =>
                        setVehicle({
                          ...vehicle,
                          duration: { ...vehicle.duration, value: value },
                        })
                      }
                      size="lg"
                      orientation="horizontal"
                      isDisabled={false}
                      isReversed={false}
                      minValue={1}
                      maxValue={100}
                    >
                      <SliderTrack>
                        <SliderFilledTrack className="bg-orange" />
                      </SliderTrack>
                      <SliderThumb className="bg-orange" />
                    </Slider>
                    <Text>
                      {vehicle.duration.value} {durationOptions[vehicle.duration.type]}
                    </Text>
                  </Box>
                  <Button
                    className="bg-orange rounded-full"
                    onPress={() => {
                      handleSubmit("find");
                    }}
                  >
                    <ButtonText>Find Space</ButtonText>
                    <Icon as={Map} color="white" />
                  </Button>

                  <Box className="h-10" />
                </>
              ) : (
                <>
                  {/* <Text className="text-typography-800 text-lg font-bold">
                    Create Spaces
                  </Text> */}



                  <Text className="text-typography-800 text-lg font-bold mb-2 mt-4">
                    Charges
                  </Text>
                  <Box className="gap-4">
                    {/* dropdown for duration selection */}
                    <Box className="flex-row gap-2">
                      <Pressable
                        className={
                          "p-2 bg-background-0  rounded-lg items-center justify-center " +
                          `${vehicle.duration.type == 0
                            ? "border-2 border-orange"
                            : "border border-typography-100"
                          }`
                        }
                        onPress={() =>
                          setVehicle({
                            ...vehicle,
                            duration: { ...vehicle.duration, type: 0 },
                          })
                        }
                      >
                        <Text className="text-typography-800 text-sm">
                          Hour
                        </Text>
                      </Pressable>
                      <Pressable
                        className={
                          "p-2 bg-background-0  rounded-lg items-center justify-center " +
                          `${vehicle.duration.type == 1
                            ? "border-2 border-orange"
                            : "border border-typography-100"
                          }`
                        }
                        onPress={() =>
                          setVehicle({
                            ...vehicle,
                            duration: { ...vehicle.duration, type: 1 },
                          })
                        }
                      >
                        <Text className="text-typography-800 text-sm">Day</Text>
                      </Pressable>
                      <Pressable
                        className={
                          "p-2 bg-background-0  rounded-lg items-center justify-center " +
                          `${vehicle.duration.type === 2
                            ? "border-2 border-orange"
                            : "border border-typography-100"
                          }`
                        }
                        onPress={() =>
                          setVehicle({
                            ...vehicle,
                            duration: { ...vehicle.duration, type: 2 },
                          })
                        }
                      >
                        <Text className="text-typography-800 text-sm">
                          Month
                        </Text>
                      </Pressable>
                    </Box>
                    <Slider
                      defaultValue={10}
                      onChange={(value: number) =>
                        setVehicle({
                          ...vehicle,
                          charge: { ...vehicle.charge, value: value },
                        })
                      }
                      size="lg"
                      orientation="horizontal"
                      isDisabled={false}
                      isReversed={false}
                      minValue={1}
                      maxValue={100}
                    >
                      <SliderTrack>
                        <SliderFilledTrack className="bg-orange" />
                      </SliderTrack>
                      <SliderThumb className="bg-orange" />
                    </Slider>
                    <Text>
                      {vehicle.charge.value} Rupees / {durationOptions[vehicle.duration.type]}
                    </Text>
                  </Box>
                  <Button
                    disabled={loading}
                    className="bg-orange rounded-full"
                    onPress={() => {
                      handleSubmit("create");
                    }}
                  >
                    {
                      loading ? (
                        <ActivityIndicator size="small" color="white" />
                      ) : (
                        <>
                          <ButtonText>Create Space</ButtonText>
                          <Icon as={AddIcon} color="white" />
                        </>
                      )}
                  </Button>

                  <Box className="h-10" />
                </>
              )}
            </VStack>
          </Box>
        </ScrollView>

        <Drawer
          isOpen={showDrawer}
          onClose={() => {
            setShowDrawer(false);
          }}
          size="lg"
          anchor="left"
        >
          <DrawerBackdrop />
          <DrawerContent>
            <SafeAreaView>
              <DrawerHeader className="flex-col items-center justify-center gap-2">
                <Avatar size="2xl">
                  <AvatarFallbackText>User Image</AvatarFallbackText>
                  <AvatarImage
                    source={{
                      uri: "https://thumbs.dreamstime.com/b/anime-nature-tree-river-aesthetic-cartoon-illustration-ai-generated-beautiful-vibe-363870502.jpg",
                    }}
                  />
                </Avatar>
                <VStack space="xs" className="items-center mt-4">
                  <Text className="text-typography-800">
                    {user?.displayName || "user"}
                  </Text>
                  <Text className="text-typography-600">{user?.email}</Text>
                </VStack>
              </DrawerHeader>
              <Divider className="my-2" />
              <DrawerBody contentContainerClassName="gap-2">
                <Pressable
                  className="gap-3 flex-row items-center hover:bg-background-50 p-2 rounded-md"
                  onPress={() => {
                    router.push("/profilePage");
                    setShowDrawer(false);
                  }}
                >
                  <Icon as={User} size="lg" className="text-typography-600" />
                  <Text>My Profile</Text>
                </Pressable>
                <Pressable
                  className="gap-3 flex-row items-center hover:bg-background-50 p-2 rounded-md"
                  onPress={() => {
                    router.push("/history");
                    setShowDrawer(false);
                  }}
                >
                  <Icon as={Wallet} size="lg" className="text-typography-600" />
                  <Text>History</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    router.push("/settings");
                    setShowDrawer(false);
                  }}
                  className="gap-3 flex-row items-center hover:bg-background-50 p-2 rounded-md"
                >
                  <Icon as={Settings} size="lg" className="text-typography-600" />
                  <Text>Settings</Text>
                </Pressable>
              </DrawerBody>
              <DrawerFooter>
                <Button
                  onPress={handleLogOut}
                  className="flex-1 rounded-full bg-red-500 hover:bg-red-600"
                >
                  <ButtonText>Log Out</ButtonText>
                  <Icon as={LogOut} color="white" />
                </Button>
              </DrawerFooter>
            </SafeAreaView>
          </DrawerContent>
        </Drawer>
      </Box>
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
    </SafeAreaView>
  );
};
export default Home;
