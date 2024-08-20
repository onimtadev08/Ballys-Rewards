import React, { useState } from "react";
import DatePicker from "react-native-date-picker";
import { View, Dimensions, TouchableOpacity, Text } from 'react-native'
import AntDesing from 'react-native-vector-icons/AntDesign'
import moment from "moment";
import { ColorFirst } from "../data/data";
import { BlurView } from "@react-native-community/blur";

const { width, height } = Dimensions.get('window');

interface DatePickerProps {
    date: Date;
    onDateChange: (date: Date) => void;
    onPressCancel: () => void;
    mode?: 'date' | 'time' | 'datetime';
    minimumDate?: Date;
    maximumDate?: Date;
    format?: string;
    locale?: string;
    onDone: (data: string) => void;
    // Add other props as needed
}

const MyDatePicker = (prop: DatePickerProps) => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    React.useEffect(() => {
        prop.onDateChange(selectedDate);
    }, [selectedDate])


    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
    };

    return (
        <BlurView style={{
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            width: '100%',
            height: '100%',
        }}>
            <View style={{
                backgroundColor: 'rgba(0,0,0,0.4)',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                width: '100%',
                height: '100%',
            }}>
                <View
                    style={{
                        margin: 100,
                        backgroundColor: ColorFirst,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        width: '80%',
                        height: '60%',
                        top: height / 13,
                        left: -55,
                        elevation: 100,
                        borderRadius: 20,
                    }}>
                    <View
                        style={{
                            margin: 20,
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flex: 0.2,
                            top: -25
                        }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{
                                marginTop: 10,
                                flex: 5,
                                margin: 20,
                                textAlign: 'center',
                                color: 'white',
                                fontSize: 20,
                                fontWeight: '500',
                            }}>Select Date</Text>



                        </View>
                        <DatePicker
                            style={{ top: 20 }}
                            date={selectedDate}
                            onDateChange={handleDateChange}
                            mode={prop.mode}
                            confirmText="ok"
                            cancelText="hh"
                            theme='dark'


                        />

                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={{
                                    borderColor: 'gold',
                                    borderWidth: 2,
                                    padding: 10,
                                    width: '40%',
                                    alignItems: 'center',
                                    borderRadius: 10,
                                    top: 50,
                                    marginRight: 10,
                                }}
                                onPress={() => {
                                    prop.onPressCancel();
                                }}
                            >
                                <Text style={{ color: 'white', fontWeight: '500' }}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    backgroundColor: 'gold',
                                    padding: 10,
                                    width: '40%',
                                    alignItems: 'center',
                                    borderRadius: 10,
                                    top: 50,
                                    marginLeft: 10,
                                }}
                                onPress={() => {
                                    prop.onDone(moment(selectedDate).format('DD/MM/YYYY'));
                                }}
                            >
                                <Text style={{ color: 'black', fontWeight: '500' }}>Done</Text>
                            </TouchableOpacity>
                        </View>


                    </View>
                </View>
            </View>
        </BlurView >
    );
};

export default MyDatePicker;
