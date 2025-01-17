import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Octicons from 'react-native-vector-icons/Octicons';
import { ColorFirst, ColorSecond, ColorTherd } from '../../../data/data';

interface myProps {
    isBet: boolean;
}

const RockertBetingComponent: React.FC<myProps> = ({ isBet }) => {
    return (
        <View
            style={{
                margin: 10,
                borderWidth: 2,
                borderColor: '#240332',
                borderRadius: 10,
                backgroundColor: '#7756B1',
                height: '20%',
            }}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
                <View style={{ flex: 1, margin: 5 }}>
                    <View style={{ flexDirection: 'column', flex: 1 }}>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: '#240332',
                                margin: 5,
                                borderRadius: 5,
                                flexDirection: 'row',
                            }}>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#7756B1',
                                    margin: 5,
                                    borderRadius: 5,
                                }}>
                                <Text style={{ color: 'white', fontSize: 20 }}>-</Text>
                            </TouchableOpacity>

                            <Text style={{ flex: 1, color: 'white' }}></Text>

                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#7756B1',
                                    margin: 5,
                                    borderRadius: 5,
                                }}>
                                <Text style={{ color: 'white', fontSize: 20 }}>+</Text>
                            </TouchableOpacity>
                        </View>

                        <View
                            style={{
                                flex: 1,
                                backgroundColor: '#240332',
                                margin: 5,
                                borderRadius: 5,
                                flexDirection: 'row',
                            }}>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#7756B1',
                                    margin: 5,
                                    borderRadius: 5,
                                }}>
                                <Text style={{ color: 'white', fontSize: 12 }}>+1</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#7756B1',
                                    margin: 5,
                                    borderRadius: 5,
                                }}>
                                <Text style={{ color: 'white', fontSize: 12 }}>+2</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#7756B1',
                                    margin: 5,
                                    borderRadius: 5,
                                }}>
                                <Text style={{ color: 'white', fontSize: 12 }}>+3</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#7756B1',
                                    margin: 5,
                                    borderRadius: 5,
                                }}>
                                <Text style={{ color: 'white', fontSize: 12 }}>+4</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: '#240332',
                        margin: 10,
                        borderRadius: 5,
                    }}>
                    <TouchableOpacity
                        disabled={isBet}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: 5,
                            borderRadius: 5,
                            borderColor: ColorTherd,
                            borderWidth: 10,
                        }}>
                        <LinearGradient
                            colors={[ColorFirst, ColorSecond, ColorTherd]}
                            style={{
                                flex: 1,
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                }}>
                                {!isBet ? 'Place your\nbet' : ' Wait for next\nround'}
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

// 7756B1   1b
// 240332   2inside
// 36105A   3main

export default RockertBetingComponent;
