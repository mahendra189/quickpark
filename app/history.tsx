import { Badge, BadgeIcon, BadgeText } from "@/components/ui/badge";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Icon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar"
import { ArrowLeft, ArrowRight, Star, StarHalf, StarIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, SafeAreaView, ScrollView } from "react-native"
import { Platform } from "react-native"
const data = [
    {
        id: 1,
        name: 'Grünerløkka',
        address: '14 Thorvald Meyers Gate',
        distance: '1.2 km away',
        status: 'active',
        type: 'truck',
        price: 80,
        per: 'hour',
        rating: 4.5,
        image: 'https://hips.hearstapps.com/hmg-prod/images/hardangerfjord-in-south-western-norway-in-the-royalty-free-image-1620377261.'
    },
    {
        id: 2,
        name: 'Bryggen',
        address: '22 Bryggen Street',
        distance: '3.4 km away',
        status: 'active',
        type: 'bike',
        price: 60,
        per: 'hour',
        rating: 4.5,
        image: 'https://media.istockphoto.com/id/1500420309/photo/perfect-reflection-of-the-reine-village-on-the-water-of-the-fjord-in-the-lofoten-islands.jpg?s=612x612&w=0&k=20&c=4FMvHEkG3FH6fpaE355CnUSdXtV4LlqCBF9etWbNR6o='
    },
    {
        id: 3,
        name: 'Tromsøya',
        address: '9 Langnesvegen, Tromsø',
        distance: '4.8 km away',
        status: 'completed',
        type: 'auto',
        price: 50,
        per: 'hour',
        rating: 4.5,
        image: 'https://media.istockphoto.com/id/1500420309/photo/perfect-reflection-of-the-reine-village-on-the-water-of-the-fjord-in-the-lofoten-islands.jpg?s=612x612&w=0&k=20&c=4FMvHEkG3FH6fpaE355CnUSdXtV4LlqCBF9etWbNR6o='
    },
    {
        id: 4,
        name: 'Trondheim Sentrum',
        address: '67 Olav Tryggvasons Gate, Trondheim',
        distance: '2.9 km away',
        status: 'active',
        type: 'car',
        price: 100,
        per: 'hour',
        rating: 4.5,
        image: 'https://media.istockphoto.com/id/1500420309/photo/perfect-reflection-of-the-reine-village-on-the-water-of-the-fjord-in-the-lofoten-islands.jpg?s=612x612&w=0&k=20&c=4FMvHEkG3FH6fpaE355CnUSdXtV4LlqCBF9etWbNR6o='

    },
    {
        id: 5,
        name: 'Aker Brygge',
        address: '3 Stranden, Oslo',
        distance: '2.1 km away',
        status: 'active',
        type: 'car',
        price: 70,
        per: 'hour',
        rating: 4.5,
        image: 'https://media.istockphoto.com/id/1500420309/photo/perfect-reflection-of-the-reine-village-on-the-water-of-the-fjord-in-the-lofoten-islands.jpg?s=612x612&w=0&k=20&c=4FMvHEkG3FH6fpaE355CnUSdXtV4LlqCBF9etWbNR6o='

    },
    {
        id: 6,
        name: 'Geiranger',
        address: '11 Fjordgata, Geiranger',
        distance: '8.5 km away',
        status: 'active',
        type: 'car',
        price: 50,
        per: 'hour',
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1572635196237-6efb894d6075'
    },
    {
        id: 7,
        name: 'Svolvær',
        address: '39 Havnveien, Lofoten',
        distance: '6.4 km away',
        status: 'active',
        type: 'car',
        price: 60,
        per: 'hour',
        rating: 4.2,
        image: 'https://images.unsplash.com/photo-1523544261120-22c97f86e8f3'
    },
    {
        id: 8,
        name: 'Tjuvholmen',
        address: '5 Tjuvholmen allé, Oslo',
        distance: '0.7 km away',
        status: 'active',
        type: 'car',
        price: 70,
        per: 'hour',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1637067315179-c3fbe03a70e3'
    },
    {
        id: 9,
        name: 'Stavanger',
        address: '10 Kirkegata, Stavanger',
        distance: '3.0 km away',
        status: 'active',
        type: 'car',
        price: 55,
        per: 'hour',
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1586297135537-94bc9ba8f2ef'
    },
    {
        id: 10,
        name: 'Ålesund',
        address: '20 Apotekergata, Ålesund',
        distance: '2.2 km away',
        status: 'active',
        type: 'car',
        price: 65,
        per: 'hour',
        rating: 4.3,
        image: 'https://images.unsplash.com/photo-1611600749571-cdfbb502ec43'
    }]
const History = () => {
    const router = useRouter();
    const [historyData, setHistoryData] = useState(data);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        if (filter === 'all') {
            setHistoryData(data);
        } else {
            const filteredData = data.filter(item => item.status === filter);
            setHistoryData(filteredData);
        }

    }, [filter]);
    return (
        <SafeAreaView className="flex-1 bg-background-0">
            <StatusBar style={Platform.OS === "ios" ? "dark" : "auto"} backgroundColor="#1E1B22" />
            <Box className="flex-1 items-center justify-start px-4 py-3 w-full">
                <Box className="flex-row items-center justify-between w-full mb-4">
                    <Box className=' flex-row rounded-full'>
                        <Pressable
                            android_ripple={{ color: 'black', borderless: true }}
                            onPress={() => {
                                router.back();
                            }} className='bg-background-0 border border-typography-500 rounded-full p-4'>

                            <Icon as={ArrowLeft} color="black" size='xl' />
                        </Pressable>
                    </Box>
                    <Heading>History</Heading>
                    <Box className='w-12 h-12' />
                </Box>
                <Box className="w-full rounded-2xl bg-background-100 p-2 pb-2">
                    <Box className="flex-row items-center justify-between gap-2">
                        <Pressable className={`flex-1 mx-1 flex-row items-center justify-center p-2 rounded-xl ${filter === 'all' ? 'bg-orange' : ''}`} onPress={() => setFilter('all')}>
                            <Text className={filter == "all" ? `font-bold text-typography-0` : `text-typography-500`}>All</Text>
                        </Pressable>
                        <Pressable className={`flex-1 mx-1 flex-row items-center justify-center p-2 rounded-xl ${filter === 'active' ? 'bg-orange' : ''}`} onPress={() => setFilter('active')}>
                            <Text className={filter == "active" ? `font-bold text-typography-0` : `text-typography-500`}>Active</Text>
                        </Pressable>
                        <Pressable className={`flex-1 mx-1 flex-row items-center justify-center p-2 rounded-xl ${filter === 'completed' ? 'bg-orange' : ''}`} onPress={() => setFilter('completed')}>
                            <Text className={filter == "completed" ? `font-bold text-typography-0` : `text-typography-500`}>Completed</Text>
                        </Pressable>
                    </Box>
                </Box>


                <ScrollView className="w-full mt-4" showsVerticalScrollIndicator={false}>
                    <VStack className="items-center justify-center w-full rounded-lg">

                        {
                            historyData.length === 0 ? (
                                <Box>
                                    <Text>No History Available</Text>
                                </Box>
                            ) : (
                                historyData.map((item) => (
                                    <Pressable
                                        key={item.id}
                                        className="w-full mb-4 border border-typography-100 rounded-2xl "
                                        onPress={() => router.push(`/history`)}
                                    >
                                        <Box className="px-2 py-2 flex-row items-center justify-center bg-background-0 w-full rounded-2xl h-52 overflow-hidden">
                                            <Box className="w-[30%] h-full rounded-lg overflow-hidden">
                                                <Image className="w-full h-full" source={{ uri: item.image }} alt={item.name} />
                                            </Box>

                                            <Box className="h-full w-[70%] flex-1 items-start justify-start p-2">
                                                <Heading className="text-2xl mb-2">{item.name}</Heading>
                                                <Text className="text-ellipsis w-full" numberOfLines={1} ellipsizeMode="tail">{item.address}</Text>
                                                <Text>{item.distance}</Text>
                                                <Box className="flex-row gap-2" >

                                                    <Badge size="md" variant="outline" action="info" className="mt-1 rounded-md" >
                                                        <BadgeText>{item.type}</BadgeText>
                                                    </Badge>
                                                    <Badge size="md" variant="outline" action={item.status === "active" ? "success" : "muted"} className="mt-1 rounded-md" >
                                                        <BadgeText>{item.status === "active" ? "Active" : "Inactive"}</BadgeText>
                                                    </Badge>
                                                </Box>
                                                <Badge size="md" variant="outline" action="warning" className="mt-1 rounded-md" >
                                                    <BadgeText>{item.price} / {item.per}</BadgeText>
                                                </Badge>
                                                <Box className="flex-row items-center justify-start mt-2">
                                                    {(() => {
                                                        const stars = [];
                                                        const fullStars = Math.floor(item.rating);
                                                        const hasHalfStar = item.rating - fullStars >= 0.25 && item.rating - fullStars < 0.75;
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
                                                </Box>
                                            </Box>

                                            <Pressable
                                                className='self-end w-10 h-10 flex-row items-center justify-center border border-typography-0 rounded-full p-4 bg-orange'
                                                onPress={() => console.log("Navigate to details")}
                                            >
                                                <Icon as={ArrowRight} color="white" size='md' />
                                            </Pressable>
                                        </Box>
                                    </Pressable>
                                ))
                            )
                        }

                    </VStack>
                </ScrollView>


            </Box>
        </SafeAreaView>
    );
}
export default History;