import React, { useRef, useEffect } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { ColorFirst, ColorTherd } from '../data/data';

interface GlowBorderProps {
    // Add any custom properties here if needed
}

const AnimatedBorderBox: React.FC<GlowBorderProps> = () => {

    return (
        <View style={{ width: "40%", height: 200, backgroundColor: ColorFirst }}>
            <WebView
                style={{ backgroundColor: 'transparent' }}
                originWhitelist={['*']}
                source={{ html: '<html> <style>.animated-border-box, .animated-border-box-glow {max-height: 64%;max-width: 64%;height: 100%;width: 100%;position: absolute;overflow: hidden;z-index: 0;border-radius: 10px;}.animated-border-box-glow {overflow: hidden;filter: blur(20px);}.animated-border-box:before, .animated-border-box-glow:before {content: "";z-index: -2;text-align: center;top: 50%;left: 50%;transform: translate(-50%, -50%) rotate(0deg);position: absolute;width: 99999px;height: 99999px;background-repeat: no-repeat;background-position: 0 0;background-image: conic-gradient(rgba(0, 0, 0, 0), #FFCE6C, rgba(0, 0, 0, 0) 25%);animation: rotate 4s linear infinite;}.animated-border-box:after {content: "";position: absolute;z-index: -1;left: 30px;top: 30px;width: calc(100% - 60px);height: calc(100% - 60px);background: #292a2e;border-radius: 7px;}.animated-border-box-glow:after {content: "";position: absolute;z-index: -1;left: 85px;top: 80px;width: calc(100% - 85px);height: calc(100% - 85px);background: #292a2e;border-radius: 7px;}@keyframes rotate {100% {transform: translate(-50%, -50%) rotate(1turn);}}body {margin: 0px; background-color: ;}.center-box {height: 100vh;display: flex;justify-content: center;align-items: center;background-color: trasparent;}</style> <body> <div class="animated-border-box-glow"></div> <div class="animated-border-box"> </div> </div> </body> </html>' }}
            />
            <View>

                <Image
                    source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/026/164/709/small_2x/businessman-portrait-elegant-man-in-business-suit-employee-of-business-institution-in-uniform-man-office-worker-business-avatar-profile-picture-illustration-vector.jpg' }}
                    style={{
                        position: 'absolute',
                        top:-195,
                        left:8,
                        height: 185,
                        width: 142,
                    }}
                />
            </View>
        </View>
    );
};





export default AnimatedBorderBox;