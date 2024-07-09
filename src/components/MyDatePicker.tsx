import React, { useState } from "react";
import DatePicker from "react-native-date-picker";
import { View, Dimensions, TouchableOpacity, Text } from 'react-native'
import AntDesing from 'react-native-vector-icons/AntDesign'
import moment from "moment";

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
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    width: '70%',
                    height: '50%',
                    top: height / 13         ,
                    left: -35,
                    elevation: 100,
                    borderRadius: 20,
                }}>
                <View
                    style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 0.2,
                        top: -35
                    }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{
                            flex: 5,
                            margin: 20,
                            textAlign: 'center',
                            color: 'black',
                            fontSize: 14,
                            fontWeight: '500',
                        }}>Select Date</Text>

                        <TouchableOpacity
                            onPress={prop.onPressCancel}
                        >
                            <AntDesing name='close' size={50} color={'red'} style={{ flex: 1, margin: 10 }} />
                        </TouchableOpacity>

                    </View>
                    <DatePicker
                        style={{ top: 20 }}
                        date={selectedDate}
                        onDateChange={handleDateChange}
                        mode={prop.mode}
                        confirmText="ok"
                        cancelText="hh"

                    />
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'green',
                            padding: 10,
                            width: '75%',
                            alignItems: 'center',
                            borderRadius: 10,
                            top: 50,
                        }}
                        onPress={() => {
                            prop.onDone(moment(selectedDate).format('DD/MM/YYYY'));
                        }}
                    >
                        <Text style={{ color: 'white', fontWeight: '500' }}>Done</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default MyDatePicker;
