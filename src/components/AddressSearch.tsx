import React from 'react';
import { FlatList, View } from 'react-native';
import CustomeTextInput from '../components/CustomeTextInput';
import { MapKey } from '../data/data';
import 'react-native-get-random-values';
import { getAddressAutoComplete, getGeoCode } from '../api/MapApi';
import SingleLocationRow from './SingleLocationRow';
import { GEOCodeResult, Predictions } from '../model/model';

interface myProps {
    onLocationSelect: (geoCodes: GEOCodeResult) => void;
}

const AddressSearch: React.FC<myProps> = ({ onLocationSelect }) => {

    const [DropLocation, setDropLocation] = React.useState('');
    const [predictions, setpredictions] = React.useState<Predictions[]>([]);

    const onHandleChange = async (text: string) => {
        const response = await getAddressAutoComplete(text);
        setDropLocation(text);
        setpredictions(response.predictions);
    };

    const renderSingleLocationRow = ({ item }: { item: Predictions }) => {
        return (
            <SingleLocationRow
                mainLocationTitle={item.structured_formatting!.main_text}
                subLocationTitle={item.description!}
                onPress={() => {
                    getGeoCode(item.place_id ?? '').then((response) => {
                        onLocationSelect(response);
                    });
                }}
            />
        );
    };

    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: 'white', position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>

            <View style={{ width: '100%', height: '85%', alignItems: 'center' }}>

                <CustomeTextInput
                    containerStyle={{ marginTop: 5 }}
                    placeholder="Your destination"
                    placeholderTextColor={'#63666b'}
                    contextMenuHidden={true}
                    onChangeText={onHandleChange}
                />

                <View style={{ flex: 1, width: '100%', marginTop: 20 }}>
                    <FlatList
                        data={predictions}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={renderSingleLocationRow}
                        keyboardShouldPersistTaps="handled"
                    />
                </View>
            </View>

        </View>
    );
};

export default AddressSearch;