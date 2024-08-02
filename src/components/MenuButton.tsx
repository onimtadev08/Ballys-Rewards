import { View, TouchableOpacity, Text } from "react-native";
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'


interface MyProps {
    Titel: string;
    Icon?: string;
    Icon2?: string;
    Icon3?: string;
    Icon4?: string;
    onPress: () => void;
}

const MenuButton: React.FC<MyProps> = ({
    Titel,
    Icon = '',
    Icon2 = '',
    Icon3 = '',
    Icon4 = '',
    onPress,
}) => {
    return (
        <View style={{
            backgroundColor: '#FFCE6C',
            marginTop: 10,
            marginBottom: 10,
            marginStart: 30,
            marginEnd: 30,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'black'
        }}>
            <TouchableOpacity
                onPress={onPress}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                    {Icon === '' ?
                        Icon2 === '' ?
                            Icon3 === '' ?
                                <FontAwesome5 name={Icon4} size={40} style={{ flex: 0.3 }}></FontAwesome5>
                                :
                                <Ionicons name={Icon3} size={40} style={{ flex: 0.3 }}></Ionicons>
                            :
                            <MaterialIcons name={Icon2} size={40} style={{ flex: 0.3 }}></MaterialIcons>
                        :
                        <Entypo name={Icon} size={40} style={{ flex: 0.3 }}></Entypo>}

                    <Text style={{
                        flex: 1,
                        fontSize: 20,
                        fontWeight: 'bold',
                        fontFamily: 'SFPRODISPLAYBOLD',
                    }}>{Titel}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
export default MenuButton;