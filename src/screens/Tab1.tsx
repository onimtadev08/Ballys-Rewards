import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import CardView from 'react-native-cardview';
import LinearGradient from 'react-native-linear-gradient';

const { width: screenWidth } = Dimensions.get('window');

const images = [
    require('../images/ballys.png'),
    require('../images/wha.jpg'),
    require('../images/meg.jpg'),
    require('../images/sms.jpg'),
    require('../images/pon.jpg'),
    // Add more local image paths as needed
];

const Tab1 = () => {

    const navigation = useNavigation();
    const scrollRef = useRef();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % images.length;
            scrollRef.current.scrollTo({ x: nextIndex * screenWidth, animated: true });
            setCurrentIndex(nextIndex);
        }, 2000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    const handleLogin = () => {
        navigation.navigate('SignUp');

    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient
                colors={['#FF0024', '#FF6648', '#FFCE6C']}
                style={styles.container}>
                <ScrollView style={styles.container}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <CardView style={{ flex: 1, flexDirection: 'column', borderRadius: 20, margin: 10 }}
                            cardElevation={20}
                            cardMaxElevation={10}
                            cornerRadius={20}>
                            <View style={{ flex: 1, flexDirection: 'column', borderRadius: 10 }}>
                                <ScrollView
                                    ref={scrollRef}
                                    horizontal
                                    pagingEnabled
                                    showsHorizontalScrollIndicator={false}
                                    style={styles.scrollView}
                                >
                                    {images.map((image, index) => (
                                        <Image key={index} source={image} style={styles.image} />
                                    ))}
                                </ScrollView>

                            </View>
                        </CardView>

                    </View>

                    <View style={{ flex: 1, flexDirection: 'row' }}>

                        <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }} onPress={handleLogin}>

                            <View style={{ flex: 1, flexDirection: 'row' }}>

                                <CardView style={{ flex: 1, flexDirection: 'column', backgroundColor: '#FFCE6C', borderRadius: 20, margin: 10 }}
                                    cardElevation={20}
                                    cardMaxElevation={10}
                                    cornerRadius={20}>
                                    <View>
                                        <Text style={{ height: 150, width: 150 }}>My Account</Text>
                                    </View>

                                </CardView>

                            </View>

                        </TouchableOpacity>


                        <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }}>

                            <View style={{ flex: 1, flexDirection: 'row' }}>

                                <CardView style={{ flex: 1, flexDirection: 'column', backgroundColor: '#FFCE6C', borderRadius: 20, margin: 10 }}
                                    cardElevation={20}
                                    cardMaxElevation={10}
                                    cornerRadius={20}>
                                    <View>
                                        <Text style={{ height: 150, width: 150 }}>My Offer</Text>
                                    </View>

                                </CardView>

                            </View>

                        </TouchableOpacity>

                        <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }}>

                            <View style={{ flex: 1, flexDirection: 'row' }}>

                                <CardView style={{ flex: 1, flexDirection: 'column', backgroundColor: '#FFCE6C', borderRadius: 20, margin: 10 }}
                                    cardElevation={20}
                                    cardMaxElevation={10}
                                    cornerRadius={20}>
                                    <View>
                                        <Text style={{ height: 150, width: 150 }}>Tournament & Drawer</Text>
                                    </View>

                                </CardView>

                            </View>

                        </TouchableOpacity>

                    </View>

                    <View style={{ flex: 1, flexDirection: 'row' }}>

                        <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }}>

                            <View style={{ flex: 1, flexDirection: 'row' }}>

                                <CardView style={{ flex: 1, flexDirection: 'column', backgroundColor: '#FFCE6C', borderRadius: 20, margin: 10 }}
                                    cardElevation={20}
                                    cardMaxElevation={10}
                                    cornerRadius={20}>
                                    <View>
                                        <Text style={{ height: 150, width: 150 }}>Dining</Text>
                                    </View>

                                </CardView>

                            </View>

                        </TouchableOpacity>

                        <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }}>

                            <View style={{ flex: 1, flexDirection: 'row' }}>

                                <CardView style={{ flex: 1, flexDirection: 'column', backgroundColor: '#FFCE6C', borderRadius: 20, margin: 10 }}
                                    cardElevation={20}
                                    cardMaxElevation={10}
                                    cornerRadius={20}>
                                    <View>
                                        <Text style={{ height: 150, width: 150 }}>Entertainment</Text>
                                    </View>

                                </CardView>

                            </View>

                        </TouchableOpacity>

                        <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }}>

                            <View style={{ flex: 1, flexDirection: 'row' }}>

                                <CardView style={{ flex: 1, flexDirection: 'column', backgroundColor: '#FFCE6C', borderRadius: 20, margin: 10 }}
                                    cardElevation={20}
                                    cardMaxElevation={10}
                                    cornerRadius={20}>
                                    <View>
                                        <Text style={{ height: 150, width: 150 }}>Online Casino</Text>
                                    </View>

                                </CardView>

                            </View>

                        </TouchableOpacity>

                    </View>



                    <View style={{ flex: 1, flexDirection: 'row' }}>


                        <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>

                                <CardView style={{ flex: 1, flexDirection: 'column', backgroundColor: '#FFCE6C', borderRadius: 20, margin: 10 }}
                                    cardElevation={20}
                                    cardMaxElevation={10}
                                    cornerRadius={20}>
                                    <View>
                                        <Text style={{ height: 150, width: 150 }}>Packages</Text>
                                    </View>

                                </CardView>

                            </View>

                        </TouchableOpacity>

                        <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>

                                <CardView style={{ flex: 1, flexDirection: 'column', backgroundColor: '#FFCE6C', borderRadius: 20, margin: 10 }}
                                    cardElevation={20}
                                    cardMaxElevation={10}
                                    cornerRadius={20}>
                                    <View>
                                        <Text style={{ height: 150, width: 150 }}>Rewards Circle</Text>
                                    </View>

                                </CardView>

                            </View>

                        </TouchableOpacity>

                        <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>

                                <CardView style={{ flex: 1, flexDirection: 'column', backgroundColor: '#FFCE6C', borderRadius: 20, margin: 10 }}
                                    cardElevation={20}
                                    cardMaxElevation={10}
                                    cornerRadius={20}>
                                    <View>
                                        <Text style={{ height: 150, width: 150 }}>Contact Us</Text>
                                    </View>

                                </CardView>

                            </View>

                        </TouchableOpacity>





                    </View>

                    <View style={{ flex: 1, flexDirection: 'row' }}>

                        <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>

                                <CardView style={{ flex: 1, flexDirection: 'column', backgroundColor: '#FFCE6C', borderRadius: 20, margin: 10 }}
                                    cardElevation={20}
                                    cardMaxElevation={10}
                                    cornerRadius={20}>
                                    <View>
                                        <Text style={{ height: 150, width: 150 }}>Messaging</Text>
                                    </View>

                                </CardView>

                            </View>

                        </TouchableOpacity>

                        <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>

                                <CardView style={{ flex: 1, flexDirection: 'column', backgroundColor: '#FFCE6C', borderRadius: 20, margin: 10 }}
                                    cardElevation={20}
                                    cardMaxElevation={10}
                                    cornerRadius={20}>
                                    <View>
                                        <Text style={{ height: 150, width: 150 }}>Feedback & Follow Us</Text>
                                    </View>

                                </CardView>

                            </View>

                        </TouchableOpacity>


                        <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>

                                <CardView style={{ flex: 1, flexDirection: 'column', backgroundColor: '#FFCE6C', borderRadius: 20, margin: 10 }}
                                    cardElevation={20}
                                    cardMaxElevation={10}
                                    cornerRadius={20}>
                                    <View>
                                        <Text style={{ height: 150, width: 150 }}>My Ride</Text>
                                    </View>

                                </CardView>

                            </View>

                        </TouchableOpacity>


                    </View>

                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        width: screenWidth,
    },
    scrollView: {
        width: screenWidth,
    },
    image: {
        width: screenWidth,
        height: screenWidth * 1.1,
        resizeMode: 'stretch',
    },
});

export default Tab1;
