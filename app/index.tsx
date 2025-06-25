import { Heading } from "@/components/ui/heading";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";

export default function Home() {
  const router = useRouter();
  const [auth, setAuth] = useState<boolean | null>(null);

  useEffect(() => {
    // Simulate auth check (replace this with actual logic)
    setTimeout(() => {
      setAuth(false); // or true
    }, 500); // small delay to simulate async check
  }, []);

  useEffect(() => {
    if (auth === null) return; // auth not checked yet
    router.replace(auth ? "/home" : "/login");
  }, [auth]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
      {/* add a splash screen */}
      <Heading className="text-orange text-5xl" >QuickPark</Heading>
      
    </View>
  );
}