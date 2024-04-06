import {View, Image, Text} from "react-native"
import {FontAwesome6, MaterialIcons} from "@expo/vector-icons"
import {Link} from "expo-router"

import {colors} from "@/styles/colors";


import {Button} from "@/components/button";
import {Input} from "@/components/input";
import {StatusBar} from "react-native";

export default function Register() {
    return (
        <View className="flex-1 bg-green-500 items-center justify-center p-8">
            <StatusBar barStyle="light-content"/>
            <Image source={require("@/assets/logo.png")} className="h-16" resizeMode="contain"/>
            <View className="w-full mt-12 gap-3">
                <Input>
                    <FontAwesome6 name="user-circle" size={20} color={colors.green[200]}/>
                    <Input.Field placeholder="Nome completo"/>
                </Input>
                <Input>
                    <MaterialIcons name="alternate-email" size={20} color={colors.green[200]}/>
                    <Input.Field placeholder="E-mail" keyboardType="email-address"/>
                </Input>
                <Button
                    title="Realizar inscrição"
                    isLoading={false}
                    onPress={() => {
                    }}
                />

                <Link href="/" className="text-gray-100 text-base font-bold text-center mt-8">Já possui ingresso?</Link>
            </View>
        </View>
    )
}