import { Heading } from "@/components/ui/heading";
import { GlobalContext } from "@/context/globalContext";
import { useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const router = useRouter();
  const context = useContext(GlobalContext);
  const user = context?.user;

  // useEffect(() => {
  //   // Simulate auth check (replace this with actual logic)
  //   setTimeout(() => {
  //     setAuth(false); // or true
  //   }, 500); // small delay to simulate async check
  // }, []);

  useEffect(() => {
    console.log(user)
    if (user === undefined) return;
    const timeout = setTimeout(() => {

      if (user === null) {
        router.replace("/login")
      } // auth not checked yet
      else {
        router.replace("/home");
      }
    },0);
    return () => clearTimeout(timeout);
  }, [user]);

  if (user === undefined) {

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Heading className="text-orange text-5xl" >QuickPark</Heading>

      </View>
    );
  }

  return null;
}