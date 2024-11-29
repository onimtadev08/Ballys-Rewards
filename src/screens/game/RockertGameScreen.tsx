import * as React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import AnimationView from './components/AnimationView';
import ButtonGrid from './components/ButtonGrid';
import CustomTextFeild from './components/CustomTextFeild';


const itemList = [20, 100, 300, 800, 3000, 10000];

export default function RockertGameScreen() {
    const [refresh, setRefresh] = React.useState(0);
    const [disable, setDisable] = React.useState<boolean>(false);
    const [value, setValue] = React.useState<string | number>('');

    const generateNumber = React.useMemo<number>(() => {
        const min = 500;
        const max = 10000;
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomNumber;
    }, [refresh]);

    return (
        <View style={styles.container}>
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
            <CustomTextFeild
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
            />
            <Text>ASDSA</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#171b36',
    },
    box: {
        width: 60,
        height: 60,
        marginVertical: 20,
    },
});