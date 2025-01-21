import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import { TotalWining } from '../gameModel/gameModel';
interface myProps {
    Wimimgs: TotalWining[];
}

const RecesntWiningsComponent: React.FC<myProps> = ({ Wimimgs }) => {
    const [isShowWin, setIsShowWin] = React.useState(false);

    return (
        <View
            style={{
                borderWidth: 1,
                borderColor: 'gold',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                margin: 5,
                marginStart: 30,
                marginEnd: 40,
            }}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Text
                    style={{
                        flex: 1,
                        margin: 5,
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: 'white',
                        marginStart: 10,
                    }}>
                    Recent Pick
                </Text>

                <TouchableOpacity
                    style={{
                        marginEnd: 20,
                        borderWidth: 1,
                        borderColor: 'gold',
                        borderRadius: 5,
                        marginTop: 10,
                        marginBottom: 10,
                    }}
                    onPress={() => setIsShowWin(!isShowWin)}>
                    <Octicons
                        name="x"
                        size={20}
                        color={'white'}
                        style={{ margin: 10, marginStart: 15, marginEnd: 15 }}
                    />
                </TouchableOpacity>
            </View>

            {isShowWin ? (
                <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text
                            style={{
                                flex: 1,
                                margin: 5,
                                fontSize: 12,
                                fontWeight: 'bold',
                                color: 'white',
                                textAlign: 'center',
                            }}>
                            1st Pick
                        </Text>
                        <Text
                            style={{
                                flex: 1,
                                margin: 5,
                                fontSize: 12,
                                fontWeight: 'bold',
                                color: 'white',
                                textAlign: 'center',
                            }}>
                            2nd Pick
                        </Text>
                        <Text
                            style={{
                                flex: 1,
                                margin: 5,
                                fontSize: 12,
                                fontWeight: 'bold',
                                color: 'white',
                                textAlign: 'center',
                            }}>
                            3rd Pick
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <Text
                            style={{
                                flex: 1,
                                margin: 5,
                                fontSize: 12,
                                fontWeight: 'bold',
                                color: 'white',
                                textAlign: 'center',
                            }}>
                            {Wimimgs.length > 0 ? Wimimgs[0].Amount : 0}
                        </Text>
                        <Text
                            style={{
                                flex: 1,
                                margin: 5,
                                fontSize: 12,
                                fontWeight: 'bold',
                                color: 'white',
                                textAlign: 'center',
                            }}>
                            {Wimimgs.length > 1 ? Wimimgs[1].Amount : 0}
                        </Text>
                        <Text
                            style={{
                                flex: 1,
                                margin: 5,
                                fontSize: 12,
                                fontWeight: 'bold',
                                color: 'white',
                                textAlign: 'center',
                            }}>
                            {Wimimgs.length > 2 ? Wimimgs[2].Amount : 0}
                        </Text>
                    </View>
                </View>
            ) : null}
        </View>
    );
};

export default RecesntWiningsComponent;
