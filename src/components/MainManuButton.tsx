import { View, Button, Text, StyleSheet, ScrollView, Dimensions, Image, SafeAreaView, TouchableOpacity, ImageBackground, TouchableHighlight, ImageSourcePropType } from 'react-native';
import CardView from 'react-native-cardview';
import React from 'react'

const { width: screenWidth } = Dimensions.get('window');

interface myProps {
    Url?: ImageSourcePropType;
    title: string;
    svg?: React.JSX.Element;
    onPress?: () => void;
}

const MainMenuButton: React.FC<myProps> = ({
    Url,
    title,
    svg,
    onPress,
}) => {
    console.log(Url)
    return (
        <View>
            <TouchableOpacity
                onPress={onPress}
                underlayColor={'transparent'}
                style={{
                    marginTop: -10,
                    width: (screenWidth / 100) * 30,
                    height: (screenWidth / 100) * 40,
                    alignItems: 'center',
                    justifyContent: 'space-around'
                }}>

                <CardView
                    style={{
                        width: '100%',
                        height: '75%',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        backgroundColor: '#FFCE6C'
                    }}
                    cornerRadius={20}
                    cardElevation={10}
                >
                    {svg ? svg : <Image source={Url} style={{
                        width: '50%',
                        height: '50%'
                    }} />}

                </CardView>
            </TouchableOpacity>
            <Text style={{ fontWeight: 'bold', textAlign: 'center', marginTop: -10, fontSize: 15, color: 'white' }}>{title}</Text>
        </View>
    )
}
export default React.memo(MainMenuButton);