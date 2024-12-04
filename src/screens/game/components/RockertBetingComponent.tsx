import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Octicons from 'react-native-vector-icons/Octicons';

interface myProps { }

const RockertBetingComponent: React.FC<myProps> = () => {
    const renderItem = ({ item }: { item: { id: number; Val: number; time: string } }) => {
        return (
            <View
                style={{
                    flex: 1,
                    marginBottom: 10
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
                        style={{ flex: 1, color: 'white', margin: 5, textAlign: 'center', fontSize: 12 }}>
                        {item.Val}x
                    </Text>
                </View>
                <Text
                    style={{ flex: 1, color: 'white', textAlign: 'center', fontSize: 10 }}>
                    {item.time}
                </Text>
            </View >
        );
    };

    const data = [
        {
            id: 1,
            Val: 1.54,
            time: '2 s ago',
        },
        {
            id: 2,
            Val: 1.54,
            time: '2 s ago',
        },
        {
            id: 3,
            Val: 1.54,
            time: '2 s ago',
        },
        {
            id: 4,
            Val: 1.54,
            time: '2 s ago',
        },
        {
            id: 5,
            Val: 1.54,
            time: '2 s ago',
        },
        {
            id: 6,
            Val: 1.54,
            time: '2 s ago',
        },
        {
            id: 7,
            Val: 1.54,
            time: '2 s ago',
        },
        {
            id: 8,
            Val: 1.54,
            time: '2 s ago',
        },
        {
            id: 9,
            Val: 1.54,
            time: '2 s ago',
        },
        {
            id: 10,
            Val: 1.54,
            time: '2 s ago',
        }, {
            id: 11,
            Val: 1.54,
            time: '2 s ago',
        },
        {
            id: 12,
            Val: 1.54,
            time: '2 s ago',
        },
        {
            id: 13,
            Val: 1.54,
            time: '2 s ago',
        },
        {
            id: 14,
            Val: 1.54,
            time: '2 s ago',
        },
        {
            id: 15,
            Val: 1.54,
            time: '2 s ago',
        },
        {
            id: 16,
            Val: 1.54,
            time: '2 s ago',
        },
        {
            id: 17,
            Val: 1.54,
            time: '2 s ago',
        },
        {
            id: 18,
            Val: 1.54,
            time: '2 s ago',
        },
        {
            id: 19,
            Val: 1.54,
            time: '2 s ago',
        },
        {
            id: 20,
            Val: 1.54,
            time: '2 s ago',
        },
    ];

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

        </View>
    );
};

// 7756B1   1b
// 240332   2inside
// 36105A   3main

export default RockertBetingComponent;
