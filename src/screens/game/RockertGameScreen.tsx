import * as React from 'react';

import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AnimationView from './components/AnimationView';
import ButtonGrid from './components/ButtonGrid';
import CustomTextFeild from './components/CustomTextFeild';
import LinearGradient from 'react-native-linear-gradient';
import TopNav from '../../components/TopNav';
import { ColorFirst, ColorSecond, ColorTherd } from '../../data/data';
import { useNavigation } from '@react-navigation/native';
import ResentWinsComponent from './components/ResentWinsComponent';
import ButtomNav from '../../components/ButtomNav';
import RockertBetingComponent from './components/RockertBetingComponent';
import FastImage from 'react-native-fast-image';

// ...




const itemList = [20, 100, 300, 800, 3000, 10000];

export default function RockertGameScreen() {
    const [refresh, setRefresh] = React.useState(0);
    const [disable, setDisable] = React.useState<boolean>(false);
    const [value, setValue] = React.useState<string | number>('');
    const [Count, setCount] = React.useState<number>(0);

    const navigation = useNavigation();

    const generateNumber = React.useMemo<number>(() => {
        const min = 500;
        const max = 10000;
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomNumber;
    }, [refresh]);

    return (
        <LinearGradient
            colors={[ColorFirst, ColorSecond, ColorTherd]}
            style={styles.container} >

            <SafeAreaView style={styles.safeArea}>

                <LinearGradient
                    colors={[ColorFirst, ColorSecond, ColorTherd]}
                    style={styles.container}>
                    <View style={{ zIndex: 10 }}>
                        <TopNav navigation={navigation} BackToHome={false} BackButton={true} titel={'LUCKY ROCKERT'} />
                    </View>
                    <View
                        style={{ flex: 1, backgroundColor: '#36105A' }}
                    >

                        <ResentWinsComponent count={Count} />

                        <View style={{ flex: 1, justifyContent: 'center' }}>

                            <FastImage
                                source={{
                                    uri: 'https://i.gifer.com/WBVi.gif',
                                    priority: FastImage.priority.normal,
                                    cache: FastImage.cacheControl.immutable,
                                }}
                                style={{
                                    top: 0,
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                            <AnimationView
                                key={refresh}
                                duration={generateNumber}
                                onBetStart={() => {
                                    setDisable(true);
                                }}
                                onBetFinished={(count) => {

                                    setCount(count);

                                    setTimeout(() => {
                                        setRefresh((prev) => prev + 1);
                                        setDisable(false);
                                        setValue('');
                                    }, 3000);
                                }}
                            />
                        </View>


                        <RockertBetingComponent isBet={disable} />


                    </View>
                    <View style={{
                        zIndex: 1,
                        height: '15%',
                        backgroundColor: 'transparent'
                    }}>
                        <ButtomNav navigation={navigation} />
                    </View>

                    {/*    
                        <AnimationView
                            key={refresh}
                            duration={generateNumber}
                            onBetStart={() => {
                                setDisable(true);
                            }}
                            onBetFinished={(_) => {
                                setTimeout(() => {
                                    setRefresh((prev) => prev + 1);
                                    setDisable(false);
                                    setValue('');
                                }, 3000);
                            }}
                        /> */}


                </LinearGradient>
            </SafeAreaView>
        </LinearGradient>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    box: {
        width: 60,
        height: 60,
        marginVertical: 20,
    },
    safeArea: {
        backgroundColor: 'rgba(0,0,0,0.0)',
        flex: 1,
    },
});