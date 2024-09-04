import React from "react";
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native'
import { BlurView } from "@react-native-community/blur";

const Loader: React.FC = ({ }) => {
    return (

        // <View style={{ width: '100%', height: '100%', backgroundColor: 'green' }}>

        // </View>

        // <BlurView
        //     style={styles.absolute}
        //     blurAmount={5}
        //     blurType='dark'
        //     reducedTransparencyFallbackColor='white'
        // />





        <BlurView style={{
            zIndex: 5,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            width: '100%',
            height: '100%',
        }}
            blurAmount={5}
            blurType='dark'
            reducedTransparencyFallbackColor='white'
        >





            <View
                style={{
                    position: 'absolute',
                    width: 200,
                    height: 200,
                    overflow: 'hidden',
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    // backgroundColor:'red',
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: '30%',

                    // left: '36%',
                    borderRadius: 10,
                }}>
                <ActivityIndicator
                    animating={true}
                    size={'large'}
                    color={'gold'}
                    style={{ top: 20, height: 100, width: 100 }}
                />
                <Text style={{ marginTop: 20, color: 'white', fontSize: 20 }}>
                    Please wait
                </Text>
            </View>



        </BlurView>

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