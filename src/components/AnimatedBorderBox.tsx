import React, { } from 'react';
import { Image, View, Text, Dimensions } from 'react-native';
import { ColorSecond } from '../data/data';
import AnimatedBorderViewCus from './AnimatedBorderViewCus';

const { width: screenWidth } = Dimensions.get('window');
const { height: screenHeight } = Dimensions.get('window');

interface GlowBorderProps {
    MemberImg: string;
    CardTier: string;
    MemberName: string;
    ExpireData: string;
}

const AnimatedBorderBox: React.FC<GlowBorderProps> = ({
    MemberImg,
    CardTier,
    MemberName,
    ExpireData,
}) => {

    return (
        <View style={{ marginTop: 40, width: "100%", alignItems: 'center', justifyContent: 'center', height: 300, backgroundColor: 'transparent', flexDirection: 'column' }}>

            <AnimatedBorderViewCus
                width={140}
                height={190}
                borderRadius={20}
                sliderWidth={100}
                sliderHeight={5}
                delayInAnimation={3500}
                pathColor='trasparent' // Light Steel Blue
                sliderColor='#FFD700' // Deep Sky Blue
                innerContainerColor={ColorSecond}
            >

                <Image
                    resizeMode='contain'
                    source={{
                        uri: MemberImg === '' ? '' : MemberImg
                    }}
                    style={{
                        zIndex: 2,
                        height: 180,
                        width: 130,
                        borderRadius: 20,
                    }}
                />
            </AnimatedBorderViewCus>


            <View style={{ marginTop: 10, marginBottom: 20, justifyContent: 'center', alignItems: 'center', zIndex: -1, width: '100%' }}>

                <View style={{
                    borderWidth: 3,
                    borderColor: 'gold',
                    borderRadius: 20,
                    paddingLeft: 20,
                    flexDirection: 'column',
                    width: '60%',
                    backgroundColor: 'white',


                }}>
                    <Text style={{ fontSize: 18, marginTop: 10 }}>BALLYS MEMBER</Text>
                    <View style={{ borderWidth: 1, borderColor: 'red', marginStart: 10, marginEnd: 20 }}></View>

                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <Text style={{ flex: 1, fontSize: 16 }}>MEMBER # : </Text>
                        <Text style={{ flex: 1, fontSize: 16, overflowWrap: 'break-word' }}>{MemberName}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <Text style={{ flex: 1, fontSize: 16 }}>EXPIRES : </Text>
                        <Text style={{ flex: 1, fontSize: 16 }}>{ExpireData}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', width: '100%', marginBottom: 10 }}>
                        <Text style={{ flex: 1, fontSize: 16 }}>CARD TIER : </Text>
                        <Text style={{ flex: 1, fontSize: 16 }}>{CardTier}</Text>
                    </View>
                </View>

                {/* </AnimatedBorderViewCus> */}
            </View>






            {/* 


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
            </View> */}


        </View>
    );
};





export default AnimatedBorderBox;