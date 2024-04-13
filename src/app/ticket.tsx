import {StatusBar, View, Text, ScrollView, TouchableOpacity, Alert, Modal, Share} from "react-native";
import {FontAwesome} from "@expo/vector-icons"

import {Header} from "@/components/header";
import {Credential} from "@/components/credential";
import {colors} from "@/styles/colors";
import React, {useState} from "react";
import {Button} from "@/components/button";
import * as ImagePicker from "expo-image-picker"
import {QRCode} from "@/components/qrcode";

import {useBadgeStore} from "@/store/badge-store"
import {Redirect} from "expo-router"
import {MotiView} from "moti"

export default function Ticket() {

    const [expandQRCode, setExpandQRCode] = useState(false)

    const badgeStore =  useBadgeStore();

    async function handleShare(){
        try {
            if(badgeStore.data?.badge.checkInUrl){
                await  Share.share({
                    message: badgeStore.data.badge.checkInUrl
                })
            }
        } catch (error) {
            console.log(error)
            Alert.alert("Compartilhar", "Não foi possível compartilhar")
        }
    }
    async function handleSelectImage() {
        try {
            const result = await ImagePicker.launchImageLibraryAsync(
                {
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [4, 4],
                }
            )

            if (result.assets) {
                badgeStore.updateAvatar(result.assets[0].uri)
            }

        } catch (error) {
            console.log(error)
            Alert.alert("foto", "Não foi possível selecionar a imagem.")
        }
    }

    if(!badgeStore.data?.badge.checkInUrl) {
        return <Redirect  href="/"/>
    }

    return (
        <View className="flex-1 bg-green-500">
            <StatusBar barStyle="light-content"/>
            <Header title="Minha Credencial"/>

            <ScrollView className="-mt-28 -z-10" contentContainerClassName="px-6 pb-8"
                        showsVerticalScrollIndicator={false}>
                <Credential data={badgeStore.data}  onChangeAvatar={handleSelectImage}
                            onExpandQRCode={() => setExpandQRCode(true)}/>

                <MotiView from={{
                    translateY: 0,
                }} animate={{
                    translateY: 10,
                }} transition={{
                    loop: true,
                    type: "timing",
                    duration: 700,
                }}>
                    <FontAwesome name="angle-double-down" size={24} color={colors.gray[300]} className="self-center my-6"/>
                </MotiView>

                <Text className="text-white font-bold text-2xl mt-4">Compartilhar credencial</Text>

                <Text className="text-white font-regular text-base mt-1 mb-6">{badgeStore.data.event.details}</Text>

                <Button title="Compartilhar" onPress={handleShare}/>

                <TouchableOpacity activeOpacity={0.7} style={{marginTop: 20}} onPress={() => badgeStore.remove()}>
                    <Text className="text-base text-white font-bold text-center">Remover Ingresso</Text>
                </TouchableOpacity>
            </ScrollView>

            <Modal visible={expandQRCode} statusBarTranslucent>
                <View className="flex-1 bg-green-500 items-center justify-center">
                    <TouchableOpacity activeOpacity={0.7} onPress={() => setExpandQRCode(false)}>
                        <QRCode value={badgeStore.data.badge.checkInUrl} size={300}/>
                        <Text
                            className="font-body text-orange-500 text-sm text-center mt-10">Fechar</Text></TouchableOpacity>
                </View>
            </Modal>

        </View>
    )
}