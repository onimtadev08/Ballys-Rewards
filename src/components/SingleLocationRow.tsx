import React, { FC } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

interface SingleLocationRowProps {
    mainLocationTitle: String;
    subLocationTitle: String;
    onPress?: () => void;
}

const SingleLocationRow: FC<SingleLocationRowProps> = ({
    mainLocationTitle = 'Main location title',
    subLocationTitle = 'No Sub location',
    onPress,
}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 10 }}>
                <View
                    style={{
                        width: 45,
                        height: 45,
                        borderRadius: 45 / 2,
                        backgroundColor: '#D9D9D9',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <FontAwesome5Icon name="map-marker-alt" size={20} color={'#000'} />
                </View>

                <View
                    style={{
                        flex: 1,
                        marginLeft: 30,
                        marginRight: 20,
                    }}>
                    <Text style={{ fontFamily: 'Asap-Bold', color: '#000' }}>
                        {mainLocationTitle}
                    </Text>
                    <Text style={{ fontFamily: 'Asap-Medium', color: '#838383' }}>
                        {subLocationTitle}
                    </Text>
                    <View
                        style={{ height: 1, backgroundColor: '#C5C5C5', marginTop: 10 }}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default SingleLocationRow;
