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

// ...




const itemList = [20, 100, 300, 800, 3000, 10000];

export default function RockertGameScreen() {
    const [refresh, setRefresh] = React.useState(0);
    const [disable, setDisable] = React.useState<boolean>(false);
    const [value, setValue] = React.useState<string | number>('');

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
                        <TopNav navigation={navigation} titel={'LUCKY GAME'} />
                    </View>
                    <View
                        style={{ flex: 1, backgroundColor: '#36105A' }}
                    >




                        <View style={{ flex: 1.4 }}>
                            <ResentWinsComponent />

                        </View>


                        <View style={{ flex: 1 }}>
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
                            />
                        </View>


                        <View style={{ flex: 1 }}>

                        </View>

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

                    {/* <CustomTextFeild
                    title={'Bet'}
                    disable={disable}
                    placeholder="Type the price how much you betting"
                    value={value.toString()}
                    onChangeText={(text: string) => setValue(text)}
                />
                <ButtonGrid
                    disable={disable}
                    numberList={itemList}
                    onPress={(value: number) => setValue(value === 0 ? '' : value)}
                    onPlaceBetPress={() => { }}
                    onTakeWinningPress={() => { }}
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