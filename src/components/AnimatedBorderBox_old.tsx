import React, { useRef, useEffect } from 'react';
import { Image, View, Text } from 'react-native';
import WebView from 'react-native-webview';
import { ColorFirst, ColorSecond, ColorTherd } from '../data/data';

interface GlowBorderProps {
    // Add any custom properties here if needed
}

const AnimatedBorderBox_old: React.FC<GlowBorderProps> = () => {

    return (
        <View style={{ width: "90%", height: 195, backgroundColor: 'transparent' }}>
            <WebView
                style={{ backgroundColor: 'transparent' }}
                originWhitelist={['*']}
                //  source={{ html: '<html> <style>.animated-border-box, .animated-border-box-glow {max-height: 64%;max-width: 64%;height: 100%;width: 100%;position: absolute;overflow: hidden;z-index: 0;border-radius: 70px;}.animated-border-box-glow {overflow: hidden;filter: blur(20px);}.animated-border-box:before, .animated-border-box-glow:before {content: "";z-index: -2;text-align: center;top: 50%;left: 50%;transform: translate(-50%, -50%) rotate(0deg);position: absolute;width: 99999px;height: 99999px;background-repeat: no-repeat;background-position: 0 0;background-image: conic-gradient(rgba(0, 0, 0, 0), #FFCE6C, rgba(0, 0, 0, 0) 25%);animation: rotate 4s linear infinite;}.animated-border-box:after {content: "";position: absolute;z-index: -1;left: 30px;top: 30px;width: calc(100% - 60px);height: calc(100% - 60px);background: #292a2e;border-radius: 70px;}.animated-border-box-glow:after {content: "";position: absolute;z-index: -1;left: 85px;top: 80px;width: calc(100% - 85px);height: calc(100% - 85px);background: #292a2e;border-radius: 70px;}@keyframes rotate {100% {transform: translate(-50%, -50%) rotate(1turn);}}body {margin: 0px; background-color: ;}.center-box {height: 100vh;display: flex;justify-content: center;align-items: center;background-color: trasparent;}</style> <body> <div class="animated-border-box-glow"></div> <div class="animated-border-box"> </div> </div> </body> </html>' }}
                source={{ html: '<html> <style> .animated-border-box, .animated-border-box-glow {max-height: 100%;max-width: 100%;height: 100%;width: 100%;position: absolute;overflow: hidden;z-index: 0;border-radius: 70px;}.animated-border-box-glow {overflow: hidden;filter: blur(20px);}.animated-border-box:before, .animated-border-box-glow:before {content: "";z-index: -2;text-align: center;top: 50%;left: 50%;transform: translate(-50%, -50%) rotate(0deg);position: absolute;width: 99999px;height: 500%;background-repeat: no-repeat;background-position: 0 0;background-image:  conic-gradient(rgba(0,0,0,0), #FFCE6C, rgba(0,0,0,0) 25%);animation: rotate 4s linear infinite;}.animated-border-box:after {content: "";position: absolute;z-index: -1;left: 30px;top: 30px;width: calc(100% - 60px);height: calc(100% - 60px);background: trasparent;border-radius: 70px;}@keyframes rotate {100% {transform: translate(-50%, -50%) rotate(1turn);}}body {margin: 0px;}.center-box {height: 100vh;display: flex;justify-content: center;align-items: center;background: trasparent;}</style> <body> <div> <div class="center-box"> <div class="animated-border-box-glow"></div> <div class="animated-border-box"> </div> </div> </div> </body> </html>' }}
            />


            <View style={{
                left: 142,
                width: 250,
                height: 48,
                backgroundColor: ColorSecond,
                position: 'absolute'

            }}></View>

            <View style={{
                top: 148,
                left: 142,
                width: 250,
                height: 50,
                backgroundColor: ColorSecond,
                position: 'absolute'

            }}></View>

            <View style={{
                alignItems: 'center',
                position: 'absolute',
                marginTop: 8,
                marginLeft: 8,
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>


                    <View style={{
                        top: -18,
                        position: 'absolute',
                        flexDirection: 'column',
                        width: 130,
                        backgroundColor: 'transparent',
                        height: 50,
                        left: 11,
                        marginLeft: 5,
                        borderTopEndRadius: 30,
                        borderLeftColor: 'transparent',
                        borderRightColor: ColorSecond,
                        borderTopColor: ColorSecond,
                        borderBottomColor: 'transparent',
                        borderWidth: 10,
                        borderCurve: 'continuous',

                    }} />


                    <View style={{
                        top: 145,
                        position: 'absolute',
                        flexDirection: 'column',
                        width: 130,
                        backgroundColor: 'transparent',
                        height: 50,
                        left: 12,
                        marginLeft: 5,
                        borderBottomEndRadius: 30,
                        borderLeftColor: 'transparent',
                        borderRightColor: ColorSecond,
                        borderTopColor: 'transparent',
                        borderBottomColor: ColorSecond,
                        borderWidth: 10,
                        borderCurve: 'continuous',

                    }} />


                    <Image
                        source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/026/164/709/small_2x/businessman-portrait-elegant-man-in-business-suit-employee-of-business-institution-in-uniform-man-office-worker-business-avatar-profile-picture-illustration-vector.jpg' }}
                        style={{
                            height: 180,
                            width: 130,
                            borderRadius: 20,
                        }}
                    />


                    <View style={{
                        borderRadius: 10,
                        left: 120,
                        position: 'absolute',
                        flexDirection: 'column',
                        width: '62%',
                        backgroundColor: 'white',
                        height: 85,
                    }}
                    />

                    <View style={{
                        flexDirection: 'column',
                        width: '63%',
                        backgroundColor: 'transparent',
                        height: 120,
                        marginLeft: 5,
                        borderEndEndRadius: 20,
                        borderTopEndRadius: 20,
                        borderLeftColor: 'transparent',
                        borderRightColor: ColorSecond,
                        borderTopColor: ColorSecond,
                        borderBottomColor: ColorSecond,
                        borderWidth: 10,
                        borderCurve: 'continuous',

                    }}>
                        <Text style={{ fontSize: 18, marginTop: 10 }}>BALLYS MEMBER</Text>
                        <View style={{ borderWidth: 1, borderColor: 'red', marginStart: 10, marginEnd: 20 }}></View>

                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <Text style={{ flex: 1, fontSize: 16 }}>MEMBER # : </Text>
                            <Text style={{ flex: 1, fontSize: 16 }}>BM15125</Text>
                        </View>

                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <Text style={{ flex: 1, fontSize: 16 }}>EXPIRES : </Text>
                            <Text style={{ flex: 1, fontSize: 16 }}>2024-12-31</Text>
                        </View>

                        <View style={{ flexDirection: 'row', flex: 1, marginBottom: 10 }}>
                            <Text style={{ flex: 1, fontSize: 16 }}>CARD TIER : </Text>
                            <Text style={{ flex: 1, fontSize: 16 }}>INFINITY</Text>
                        </View>
                    </View>
                </View>
            </View>


        </View>
    );
};





export default AnimatedBorderBox_old;