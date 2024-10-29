import React from "react";
import { ActivityIndicator, View, Text, StyleSheet, Image, ImageBackground } from 'react-native'
import { BlurView } from "@react-native-community/blur";
import LoaderKit from 'react-native-loader-kit'


const Loader: React.FC = ({ }) => {
    return (

      

        <View style={{
            zIndex: 50,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,0.8)',
            overflow: 'hidden',
        }}>

            {/* <ImageBackground source={require('../images/meg.jpg')}
                blurRadius={100}
                resizeMode='stretch'
                style={{
                    width: '100%',
                    height: '100%',
                    opacity: 1,
                }}>

            </ImageBackground> */}

            <View
                style={{
                    position: 'absolute',
                    width: 250,
                    height: 250,
                    overflow: 'hidden',
                    backgroundColor: 'rgba(0,0,0,0.0)',
                    // backgroundColor:'red',
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: '30%',

                    // left: '36%',
                    borderRadius: 10,
                }}>
                {/* <ActivityIndicator
                    animating={true}
                    size={'large'}
                    color={'gold'}
                    style={{ top: 20, height: 100, width: 100 }}
                /> */}
                <LoaderKit
                    style={{ width: 150, height: 150 }}
                    name={'BallScaleMultiple'} // Optional: see list of animations below
                    color={'gold'} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
                />
                <Text style={{ marginTop: 20, color: 'white', fontSize: 20 }}>
                    Please wait
                </Text>
            </View>

        </View>






        //       </BlurView>

    );
}


const styles = StyleSheet.create({
    container: {
        zIndex: 5,
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        height: '100%',
    },
    absolute: {
        zIndex: 5,
        width: '100%',
        height: '100%',
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
});

export default Loader;