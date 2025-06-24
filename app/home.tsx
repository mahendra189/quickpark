import { View } from "@/components/Themed"
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform, Pressable, SafeAreaView, ScrollView, Text } from "react-native"
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Icon, SearchIcon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import { DrawerBackdrop, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, Drawer } from "@/components/ui/drawer";
import { Heading } from "@/components/ui/heading";
import { useState } from "react";
import { Avatar, AvatarBadge, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";
import { Divider } from "@/components/ui/divider";
import { User, ShoppingCart, Wallet, LogOut, Settings, LineChart, Menu, Search, Map } from "lucide-react-native"
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "@/components/ui/slider";
// import car image using require for React Native compatibility
const car = require("../assets/images/vehicles/car.png");
const Home = () => {
    const router = useRouter();
    const [showDrawer, setShowDrawer] = useState(false);
    const [category, setCategory] = useState("car");
    const [duration, setDuration] = useState({
        type:"hour",
        value:1
    });
    const [vehicleCount,setVehicleCount] = useState(1);
    return (
        <SafeAreaView className="flex-1 bg-background-100">

            <StatusBar style={Platform.OS === "ios" ? "dark" : "auto"} backgroundColor="#1E1B22" />
            <Box className="justify-center flex-1">
                <Box className="flex-col items-center justify-start px-4 pt-2 bg-raisin border-b border-typography-100">

                    <Box className="flex-row mt-4 items-center justify-between">
                        <Avatar size="md" className="mr-2">
                            <AvatarFallbackText>Mahendra Suthar</AvatarFallbackText>
                            <AvatarImage
                                source={{
                                    uri: "https://media.istockphoto.com/id/1477793885/vector/beautiful-pastel-colored-abstract-landscape-geometric-vector-illustration.jpg?s=612x612&w=0&k=20&c=-CuSPe8hfQTM3Zscl6Ebbq43XwvpqzKRZLZO7CJPzT8=",
                                }}
                            />
                        </Avatar>
                        <Box className="flex-1 ml-2">
                            <Text className="text-typography-600">Welcome</Text>
                            <Text className="text-typography-100">Mahendrakumar</Text>
                        </Box>
                        <Button
                            onPress={() => {
                                setShowDrawer(true)
                            }}
                            variant="outline"
                            action="primary"
                            className="z-50 rounded-full py-2 px-2 border-[1px] border-typography-700 color-typography-0 hover:bg-primary-500 hover:color-typography-0"

                        >
                            <Icon as={Menu} color="white" />
                        </Button>


                    </Box>
                    <Heading className="text-typography-50 text-lg font-semibold mt-4">QuickPark</Heading>
                    <Text className="text-typography-500 text-sm">Find the best parking spots near you</Text>
                    <Box className="w-full flex-col items-center justify-between mt-4 mb-4 gap-2">
                        <Box className="w-full flex-row items-center border border-typography-800 rounded-full px-4 py-1">
                            <Icon as={Search} color="white" />
                            <Input className="ml-2 flex-1 border-0 focus:border-0 focus:ring-0 text-white" >
                                <InputField className=" text-white" placeholder="Search..." />
                            </Input>
                        </Box>


                        {/* <Box className="w-full flex-col items-start justify-between mt-4 gap-1">
                            <Text>
                                <Text className="text-xs text-typography-600">Your Favourite Spots</Text>
                            </Text>
                            <Box className="w-full">
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    <HStack space={"md"} className="px-2">
                                        <Box className="w-24 h-10 bg-gray-200 rounded-lg" />
                                        <Box className="w-24 h-10 bg-gray-200 rounded-lg" />
                                        <Box className="w-24 h-10 bg-gray-200 rounded-lg" />
                                        <Box className="w-24 h-10 bg-gray-200 rounded-lg" />
                                    </HStack>
                                </ScrollView>
                            </Box>
                        </Box> */}

                    </Box>
                </Box>
                <Box className="flex-1 px-6 pt-4 bg-background-0">
                    <VStack space="md" className="flex-1">
                        <Text className="text-typography-800 text-lg font-bold mb-2">Vehicle Category</Text>
                        <Box>

                            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} className="">
                                <HStack space="sm">
                                    <Pressable className={"w-36 h-36 bg-background-0  rounded-lg items-center justify-center " + `${category == "car" ? "border-2 border-orange" : "border border-typography-100"}`} onPress={() => setCategory("car")}>
                                        <Image source={require("../assets/images/vehicles/car.png")} className="w-28 h-28" />
                                        <Text className="text-typography-500 text-sm">Car</Text>
                                    </Pressable>
                                    <Pressable className={"w-36 h-36 bg-background-0  rounded-lg items-center justify-center " + `${category == "bike" ? "border-2 border-orange" : "border border-typography-100"}`} onPress={() => setCategory("bike")}>
                                        <Image source={require("../assets/images/vehicles/bike.png")} className="w-28 h-28" />
                                        <Text className="text-typography-500 text-sm">Bike</Text>
                                    </Pressable>
                                    <Pressable className={"w-36 h-36 bg-background-0  rounded-lg items-center justify-center " + `${category == "truck" ? "border-2 border-orange" : "border border-typography-100"}`} onPress={() => setCategory("truck")}>
                                        <Image source={require("../assets/images/vehicles/truck.png")} className="w-28 h-28" />
                                        <Text className="text-typography-500 text-sm">Truck</Text>
                                    </Pressable>
                                    <Pressable className={"w-36 h-36 bg-background-0  rounded-lg items-center justify-center " + `${category == "van" ? "border-2 border-orange" : "border border-typography-100"}`} onPress={() => setCategory("van")}>
                                        <Image source={require("../assets/images/vehicles/van.png")} className="w-28 h-28" />
                                        <Text className="text-typography-500 text-sm">Van</Text>
                                    </Pressable>
                                    <Pressable className={"w-36 h-36 bg-background-0  rounded-lg items-center justify-center " + `${category == "auto" ? "border-2 border-orange" : "border border-typography-100"}`} onPress={() => setCategory("auto")}>
                                        <Image source={require("../assets/images/vehicles/auto.png")} className="w-28 h-28" />
                                        <Text className="text-typography-500 text-sm">Auto</Text>
                                    </Pressable>
                                </HStack>
                            </ScrollView>
                        </Box>

                        <Text className="text-typography-800 text-lg font-bold mb-2 mt-4">How many?</Text>
                        <Box className="gap-4">
                            {/* dropdown for duration selection */}
                            <Box className="flex-row gap-2" >

                                <Pressable className={"p-2 px-4 bg-background-0  rounded-lg items-center justify-center " + `${vehicleCount == 1 ? "border-2 border-orange" : "border border-typography-100"}`} onPress={() => setVehicleCount(1)}>
                                    <Text className="text-typography-800 text-sm">1</Text>
                                </Pressable>
                                <Pressable className={"p-2 px-4 bg-background-0  rounded-lg items-center justify-center " + `${vehicleCount == 2 ? "border-2 border-orange" : "border border-typography-100"}`} onPress={() => setVehicleCount(2)}>
                                    <Text className="text-typography-800 text-sm">2</Text>
                                </Pressable>
                                <Pressable className={"p-2 px-4 bg-background-0  rounded-lg items-center justify-center " + `${vehicleCount == 3 ? "border-2 border-orange" : "border border-typography-100"}`} onPress={() => setVehicleCount(3)}>
                                    <Text className="text-typography-800 text-sm">3</Text>
                                </Pressable>
                                <Pressable className={"p-2 px-4 bg-background-0  rounded-lg items-center justify-center " + `${vehicleCount == 4 ? "border-2 border-orange" : "border border-typography-100"}`} onPress={() => setVehicleCount(4)}>
                                    <Text className="text-typography-800 text-sm">4</Text>
                                </Pressable>
                                <Pressable className={"p-2 px-4 bg-background-0  rounded-lg items-center justify-center " + `${vehicleCount == 5 ? "border-2 border-orange" : "border border-typography-100"}`} onPress={() => setVehicleCount(5)}>
                                    <Text className="text-typography-800 text-sm">5</Text>
                                </Pressable>
                            </Box>
                        </Box>
                        <Text className="text-typography-800 text-lg font-bold mb-2 mt-4">Duration</Text>
                        <Box className="gap-4">
                            {/* dropdown for duration selection */}
                            <Box className="flex-row gap-2" >

                                <Pressable className={"p-2 bg-background-0  rounded-lg items-center justify-center " + `${duration.type == "hour" ? "border-2 border-orange" : "border border-typography-100"}`} onPress={() => setDuration({...duration,type:"hour"})}>
                                    <Text className="text-typography-800 text-sm">Hour</Text>
                                </Pressable>
                                <Pressable className={"p-2 bg-background-0  rounded-lg items-center justify-center " + `${duration.type == "month" ? "border-2 border-orange" : "border border-typography-100"}`} onPress={() => setDuration({...duration,type:"month"})}>
                                    <Text className="text-typography-800 text-sm">Month</Text>
                                </Pressable>
                            </Box>
                            <Slider
                                defaultValue={10}
                                onChange={(value: number) => setDuration({
...duration,value:value
                                })}
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
                            <Text>{duration.value} {duration.type}</Text>

                        </Box>
                        <Button className="bg-orange rounded-full" onPress={() => {
                            router.push("/space")
                        }}>
                            <ButtonText>
                                Find Space
                            </ButtonText>
                            <Icon as={Map} color="white" />
                        </Button>

                    </VStack>

                </Box>

                <Drawer
                    isOpen={showDrawer}
                    onClose={() => {
                        setShowDrawer(false)
                    }}
                    size="lg"
                    anchor="left"
                >
                    <DrawerBackdrop />
                    <DrawerContent>
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
                                <Text className="text-typography-800">Mahendrakumar</Text>
                                <Text className="text-typography-600">mahendrakumar@google.com</Text>
                            </VStack>
                        </DrawerHeader>
                        <Divider className="my-2" />
                        <DrawerBody contentContainerClassName="gap-2" >
                            <Pressable className="gap-3 flex-row items-center hover:bg-background-50 p-2 rounded-md">
                                <Icon as={User} size="lg" className="text-typography-600" />
                                <Text>My Profile</Text>
                            </Pressable>
                            <Pressable className="gap-3 flex-row items-center hover:bg-background-50 p-2 rounded-md">
                                <Icon as={Wallet} size="lg" className="text-typography-600" />
                                <Text>History</Text>
                            </Pressable>
                            <Pressable onPress={() => {
                                router.push("/settings")
                                setShowDrawer(false)
                            }} className="gap-3 flex-row items-center hover:bg-background-50 p-2 rounded-md">
                                <Icon as={Settings} size="lg" className="text-typography-600" />
                                <Text>Settings</Text>
                            </Pressable>


                        </DrawerBody>
                        <DrawerFooter>
                            <Button
                                onPress={() => {
                                    router.push("/login");
                                    setShowDrawer(false);
                                }}
                                className="flex-1"
                            >
                                <ButtonText>Log Out</ButtonText>
                            </Button>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </Box>
        </SafeAreaView>
    )
}
export default Home;