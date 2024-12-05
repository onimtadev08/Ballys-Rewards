import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Octicons from 'react-native-vector-icons/Octicons';
import moment from 'moment';
interface myProps {
    count: number;
}

interface recentCount {
    id: number;
    Val: number;
    time: string;
};

let Recentdata: recentCount[] = [];
let index: number = 0;
const ResentWinsComponent: React.FC<myProps> = ({ count }) => {

    const [Count, setCount] = React.useState<number>(0);

    saveWins(count);

    function saveWins(count: number) {

        if (Count !== count) {

            const StartTime = moment(new Date()).format('LTS')

            const getRecent: recentCount = {
                id: index,
                Val: count,
                time: StartTime,
            }

            Recentdata.push(getRecent);
            index++;
            setCount(count);
        }

    }

    const renderItem = ({
        item,
    }: {
        item: recentCount;
    }) => {
        return (
            <View
                style={{
                    flex: 1,
                    marginBottom: 10,
                }}>
                <View
                    style={{
                        flex: 1,
                        borderRadius: 10,
                        borderColor: '#7756B1',
                        borderWidth: 1,
                        marginStart: 5,
                        marginEnd: 5,
                    }}>
                    <Text
                        style={{
                            flex: 1,
                            color: 'white',
                            margin: 5,
                            textAlign: 'center',
                            fontSize: 12,
                            fontWeight: 'bold',
                        }}>
                        {item.Val}x
                    </Text>
                </View>
                <Text
                    style={{ flex: 1, color: 'white', textAlign: 'center', fontSize: 10 }}>
                    {item.time}
                </Text>
            </View>
        );
    };

    return (
        <View
            style={{
                margin: 10,
                borderWidth: 2,
                borderColor: '#7756B1',
                borderRadius: 10,
                backgroundColor: '#240332',
                height: '90%',
            }}>
            <View
                style={{
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Text
                    style={{
                        color: 'white',
                        fontSize: 20,
                        fontWeight: 'bold',
                        margin: 20,
                        flex: 1,
                    }}>
                    Recent Boom
                </Text>
                <TouchableOpacity
                    style={{
                        marginEnd: 20,
                        backgroundColor: '#36105A',
                        borderRadius: 5,
                    }}>
                    <Octicons
                        name="x"
                        size={20}
                        color={'white'}
                        style={{ margin: 10, marginStart: 15, marginEnd: 15 }}
                    />
                </TouchableOpacity>
            </View>

            <FlatList data={Recentdata} renderItem={renderItem} numColumns={5} />
        </View>
    );
};

// 7756B1   1b
// 240332   2inside
// 36105A   3main

export default ResentWinsComponent;


