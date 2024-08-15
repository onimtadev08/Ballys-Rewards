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
        <View style={{ height: '90%', alignItems: 'center', marginBottom: -15 }}>
            {/* <AwesomeButton
           //     onPress={() => { console.log('onPress') }}
                onPressIn={() => { console.log('onPressIn') }}
                onPressOut={() => { console.log('onPressOut') }}
                onPressedIn={() => { console.log('onPressedIn') }}
                onProgressStart={() => { console.log('onProgressStart') }}
                onProgressEnd={() => { console.log('onProgressEnd') }}
                onPress={()=>{
                    console.log('onPress');
                    onPress;
                }}
                backgroundColor='transparent'
               
                raiseLevel={15}
                backgroundDarker='transparent'
                backgroundShadow='transparent'
                backgroundActive='transparent'
            > */}
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
                        {svg ? svg : <Image source={Url} style={{
                            width: '100%',
                            height: '80%',
                        }}
                            resizeMode='stretch'
                        />}
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