import { Font, View, Button, Text, StyleSheet, ScrollView, Dimensions, Image, SafeAreaView, TouchableOpacity, ImageBackground, TouchableHighlight, ImageSourcePropType } from 'react-native';
import CardView from 'react-native-cardview';
import React from 'react'
import AwesomeButton from 'react-native-really-awesome-button';
import FastImage from 'react-native-fast-image';



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


    React.useEffect(() => {
        //     Font.loadAsync({
        //         'MyCustomFont': require('./assets/fonts/Ubuntu-Italic.ttf'),
        //     }).then(() => {
        //    //     setFontLoaded(true);
        //     });
    }, []);

    return (
        <View style={{ height: '100%', alignItems: 'center', marginBottom: -15 }}>

            <TouchableOpacity style={{
                width: (screenWidth / 100) * 33,
                height: (screenWidth / 100) * 43,
                shadowColor: 'black',
                elevation: 3,
            }}
                onPress={onPress}
            >
                <View style={{
                    minWidth: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}>
                    <View style={{
                        width: '80%',
                        height: '80%',
                    }}>
                        {svg ? svg :

                            <FastImage
                                style={{
                                    width: '100%',
                                    height: '80%',
                                }}
                                source={Url}
                                resizeMode={FastImage.resizeMode.stretch}
                            />

                        }
                    </View>
                    <Text style={{
                        marginTop: -15,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        fontSize: 14,
                        color: 'white',
                        fontFamily: 'SFPRODISPLAYBOLD',
                    }}>{title.toUpperCase()}</Text>
                </View>
            </TouchableOpacity>

        </View >
    )
}





export default React.memo(MainMenuButton);