import {View, Image, ImageBackground, Text, TouchableOpacity, useWindowDimensions} from "react-native";
import React from "react";
import {Feather} from "@expo/vector-icons"
import {colors} from "@/styles/colors";
import {QRCode} from "@/components/qrcode";
import {BadgeStore, Data} from "@/store/badge-store";
import {MotiView} from "moti"

type  Props = {
    data: Data
    onChangeAvatar?: () => void
    onExpandQRCode?: () => void
}

export function Credential({data, onChangeAvatar, onExpandQRCode}: Props) {

    const {height} = useWindowDimensions()

    return (
        <MotiView className="w-full self-stretch items-center"
                  from={{
                      opacity: 0,
                      translateY: -height,
                      rotateZ: "50deg",
                      rotateY: "30deg",
                      rotateX: "30deg"
                  }}
                  transition={{
                      type: "spring",
                      damping: 20,
                      rotateZ: {
                          damping: 15,
                          mass: 3,
                      }
                  }}
                  animate={{
                      opacity: 1,
                      translateY: 0,
                      rotateZ: "0deg",
                      rotateY: "0deg",
                      rotateX: "0deg"
                  }}
        >
            <Image source={require("@/assets/ticket/band.png")} className="w-24 h-52 z-10"/>
            <View className="bg-black/20 self-stretch items-center pb-6 borde border-white/10 mx-3 rounded-2xl -mt-5">
                <ImageBackground source={require("@/assets/ticket/header.png")}
                                 className="px-6 py-8 h-40 items-center self-stretch border-b border-white/10 overflow-hidden">
                    <View className="w-full flex-col items-center justify-between mb-3">
                        <Text className="text-zinc-50 text-sm font-bold justify-center">
                            {data.event.title}
                        </Text>
                        <Text className="text-zinc-50 text-sm">
                            #{data.badge.id}
                        </Text>
                    </View>
                    <View className="w-40 h-40 bg-black rounded-full"/>
                </ImageBackground>

                {data.badge.image ? (
                    <TouchableOpacity activeOpacity={0.9} onPress={onChangeAvatar}>
                        <Image source={{uri: data.badge.image}}
                               className="w-36 h-36 rounded-full" style={{marginTop: -60, marginBottom: 12}}/>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity activeOpacity={0.9}
                                      style={{
                                          width: 126,
                                          height: 126,
                                          borderRadius: 99999, // metade do valor da altura/largura para um círculo
                                          top: -60,
                                          backgroundColor: '#ccc',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          marginBottom: -50
                                      }}
                                      onPress={onChangeAvatar}>
                        <Feather name="camera" color={colors.green[400]} size={32}/>
                    </TouchableOpacity>
                )
                }

                <Text className="font-bold text-2xl text-zinc-50">
                    {data.badge.name}
                </Text>
                <Text className="font-regular text-base text-zinc-300 mb-4">{data.badge.email}</Text>

                <QRCode value={data.badge.checkInUrl} size={120}/>

                <TouchableOpacity activeOpacity={0.7} style={{marginTop: 23}} onPress={onExpandQRCode}>
                    <Text className="font-body text-orange-500 text-sm">
                        Ampliar QRcode
                    </Text>
                </TouchableOpacity>
            </View>
        </MotiView>
    )
}