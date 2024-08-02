import { Font, View, Button, Text, StyleSheet, ScrollView, Dimensions, Image, SafeAreaView, TouchableOpacity, ImageBackground, TouchableHighlight, ImageSourcePropType } from 'react-native';
import CardView from 'react-native-cardview';
import React from 'react'
import AwesomeButton from 'react-native-really-awesome-button';



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


    React.useEffect(() => {
        //     Font.loadAsync({
        //         'MyCustomFont': require('./assets/fonts/Ubuntu-Italic.ttf'),
        //     }).then(() => {
        //    //     setFontLoaded(true);
        //     });
    }, []);

    return (
        <View style={{ backgroundColor: 'transparent', height: '90%' }}>
            <AwesomeButton
                onPress={onPress}
                backgroundColor='transparent'
                width={(screenWidth / 100) * 33}
                height={(screenWidth / 100) * 43}
                raiseLevel={15}
                backgroundDarker='transparent'
                backgroundShadow='transparent'
                backgroundActive='transparent'
            >
                <View style={{
                    minWidth: '100%',
                    height: '100%',
                    left: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}>
                    <View style={{
                        width: '80%',
                        height: '80%',
                    }}>
                        {svg ? svg : <Image source={Url} style={{
                            width: '50%',
                            height: '50%'
                        }} />}
                    </View>
                    <Text style={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                        fontSize: 14,
                        color: 'white',
                        fontFamily: 'SFPRODISPLAYBOLD',
                    }}>{title.toUpperCase()}</Text>
                </View>
            </AwesomeButton>

        </View >
    )
}





export default React.memo(MainMenuButton);