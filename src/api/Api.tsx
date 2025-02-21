
import { Domain } from "../data/data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WhereToRedeemScreen from "../screens/WhereToRedeemScreen";

const getOtpUrl = Domain + '/api/Ballys/GetOTP';

const VaidateOTPUrl = Domain + '/api/Ballys/ValidateOTP';

const ResendOTPUrl = Domain + '/api/Ballys/ResendOTP';

const FirstTimeSignInUrl = Domain + '/api/Ballys/PlayerAccountSave';

const HomeUrl = Domain + '/api/Ballys/Home';

const PlayerStatusUrl = Domain + '/api/Ballys/PlayerStatus';

const GetEventsUrl = Domain + '/api/Ballys/GetEvents';

const NotificatioMassageUrl = Domain + '/api/Ballys/MemberMessage';

const getTransactionHistoryUrl = Domain + '/api/Ballys/getTransactionHistory';

const getHostUrl = Domain + '/api/Ballys/Contact';

const getSinglePageDetailsApiUrl = Domain + '/api/Ballys/get_single_page_details';

const WhereToRedeemUrl = Domain + '/api/Ballys/ShoppingCreditLocation';

const UpgradeDowngradeMessageUrl = Domain + '/api/Ballys/UpgradeDowngradeMessage';

const fetchGiftAndGoodWillUrl = Domain + '/api/Ballys/MyOffers';

const MyCardUrl = Domain + '/api/Ballys/MyCard';

const MyBookingUrl = Domain + '/api/Ballys/MyBooking';

// get otp
export async function getOtp(PlayerID: string, ClientID: string) {

    const Token = await AsyncStorage.getItem('Token');

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "bearer " + Token);

    const raw: string = JSON.stringify({
        strMID: PlayerID,
        strClientID: ClientID,
    });

    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    const response = await fetch(getOtpUrl, requestOptions);
    if (!response.ok) {
        throw new Error('Server Connection error');
    }
    return response.json();
}

// sign in temp and original
export async function TempLogin(PlayerID: string, PIN: string, Method: string) {

    let method = Method === 'TEMP' ? 'FirstTimeSignIn' : 'SignIn';
    let Url = Domain + '/api/Ballys/' + method;


    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw: string = JSON.stringify({
        strMID: PlayerID,
        strPIN: PIN,
        strToken: ''
    });


    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    const response = await fetch(Url, requestOptions);
    if (!response.ok) {
        throw new Error('Server Connection error');
    }
    return response.json();
}


export async function VaidateOTP(PlayerID: string, OTP: string) {
    const Token = await AsyncStorage.getItem('Token');

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "bearer " + Token);

    const raw: string = JSON.stringify({
        strMID: PlayerID,
        strOTP: OTP,
    });




    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    const response = await fetch(VaidateOTPUrl, requestOptions);
    if (!response.ok) {
        throw new Error('Server Connection error');
    }
    return response.json();
}


export async function ResendOTP(PlayerID: string) {
    const Token = await AsyncStorage.getItem('Token');

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "bearer " + Token);

    const raw: string = JSON.stringify({
        strMID: PlayerID,
    });


    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    const response = await fetch(ResendOTPUrl, requestOptions);
    if (!response.ok) {
        throw new Error('Server Connection error');
    }

    return response.json();
}
// PlayerAccountSave
export async function FirstTimeSignIn(
    fname: string,
    lname: string,
    arg2: string,
    email: string,
    PlayerID: string,
    PIN: string,
    Image: string,
) {
    const Token = await AsyncStorage.getItem('Token');

    return new Promise((resolve, reject) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        //  myHeaders.append("Authorization", "bearer " + Token);

        const raw: string = JSON.stringify({
            FirstName: fname,
            LastName: lname,
            Phone: arg2,
            Email: email,
            DOB: PIN,
            Passport: PlayerID,
            strPlayerID: '',
            Image: Image,
        });




        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch(FirstTimeSignInUrl, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                reject('Server Connection error');
                //       throw new Error('Server Connection error'); 
            });
    })

}

export async function Home(MID: string) {
    const Token = await AsyncStorage.getItem('Token');

    return new Promise((resolve, reject) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + Token);

        const raw = JSON.stringify({
            "strMID": MID
        });

        const requestOptions: any = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };



        fetch(HomeUrl, requestOptions)
            .then((response) => response.json())
            .then((result) => {

                resolve(result);
            })
            .catch((error) => {
                reject(error);
                throw new Error('Server Connection error');
            });
    })

}

export async function getNotification(MID: string) {
    const Token = await AsyncStorage.getItem('Token');

    return new Promise((resolve, reject) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + Token);

        const raw = JSON.stringify({
            "strMID": MID
        });

        const requestOptions: any = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };


        fetch(NotificatioMassageUrl, requestOptions)
            .then((response) => response.json())
            .then((result) => {

                resolve(result);
            })
            .catch((error) => {

                reject(error);
                throw new Error('Server Connection error');
            });
    })

}

export async function GetEvents() {

    return new Promise((resolve, reject) => {

        const requestOptions: any = {
            method: "GET",
            redirect: "follow"
        };

        fetch(GetEventsUrl, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                reject(error);
                throw new Error('Server Connection error');
            });
    })

}

export async function PlayerStatus(MID: string) {
    const Token = await AsyncStorage.getItem('Token');

    return new Promise((resolve, reject) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + Token);

        const raw = JSON.stringify({
            "strMID": MID,
            "strToken": ''
        });


        const requestOptions: any = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(PlayerStatusUrl, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                reject(error);
                throw new Error('Server Connection error');
            });
    })

}


export async function getTransactionHistory(MID: string) {
    const Token = await AsyncStorage.getItem('Token');

    return new Promise((resolve, reject) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + Token);

        const raw = JSON.stringify({
            "strMID": MID
        });

        const requestOptions: any = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };


        fetch(getTransactionHistoryUrl, requestOptions)
            .then((response) => response.json())
            .then((result) => {

                resolve(result);
            })
            .catch((error) => {

                reject(error);
                throw new Error('Server Connection error');
            });
    })

}


export async function getHostApi() {
    const Token = await AsyncStorage.getItem('Token');

    return new Promise((resolve, reject) => {

        const requestOptions: RequestInit = {
            method: "GET",
            redirect: "follow"
        };


        fetch(getHostUrl, requestOptions)
            .then((response) => response.json())
            .then((result) => {

                resolve(result);
            })
            .catch((error) => {

                reject(error);
                throw new Error('Server Connection error');
            });
    })

}

export async function getSinglePageDetailsApi(Page: string) {
    const Token = await AsyncStorage.getItem('Token');

    return new Promise((resolve, reject) => {

        const requestOptions: RequestInit = {
            method: "GET",
            redirect: "follow"
        };

        console.log(getSinglePageDetailsApiUrl + '/' + Page);


        fetch(getSinglePageDetailsApiUrl + '/' + Page, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);

                resolve(result);
            })
            .catch((error) => {

                reject(error);
                throw new Error('Server Connection error');
            });
    })

}


export async function getWhereToRedeem(MID: string) {
    const Token = await AsyncStorage.getItem('Token');

    return new Promise((resolve, reject) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + Token);

        console.log(Token);


        const raw = JSON.stringify({
            "strMID": MID,
            "strToken": Token
        });

        const requestOptions: any = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };


        fetch(WhereToRedeemUrl, requestOptions)
            .then((response) => response.json())
            .then((result) => {

                resolve(result);
            })
            .catch((error) => {

                reject(error);
                throw new Error('Server Connection error');
            });
    })

}


export async function fetchUpgradeDowngradeMessage(MID: string) {
    const Token = await AsyncStorage.getItem('Token');

    return new Promise((resolve, reject) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + Token);

        console.log(Token);


        const raw = JSON.stringify({
            "strMID": MID
        });

        const requestOptions: any = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };


        fetch(UpgradeDowngradeMessageUrl, requestOptions)
            .then((response) => response.json())
            .then((result) => {

                resolve(result);
            })
            .catch((error) => {

                reject(error);
                throw new Error('Server Connection error');
            });
    })

}




export async function fetchGiftAndGoodWill(MID: string) {
    const Token = await AsyncStorage.getItem('Token');

    return new Promise((resolve, reject) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + Token);

        console.log(Token);


        const raw = JSON.stringify({
            "MID": MID
        });

        const requestOptions: any = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };


        fetch(fetchGiftAndGoodWillUrl, requestOptions)
            .then((response) => response.json())
            .then((result) => {

                resolve(result);
            })
            .catch((error) => {

                reject(error);
                throw new Error('Server Connection error');
            });
    })

}


export async function fetchMyCard(MID: string) {
    const Token = await AsyncStorage.getItem('Token');

    return new Promise((resolve, reject) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + Token);

        console.log(Token);


        const raw = JSON.stringify({
            "MID": MID
        });

        const requestOptions: any = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };


        fetch(MyCardUrl, requestOptions)
            .then((response) => response.json())
            .then((result) => {

                resolve(result);
            })
            .catch((error) => {

                reject(error);
                throw new Error('Server Connection error');
            });
    })

}

export async function fetchMyBooking(MID: string) {
    const Token = await AsyncStorage.getItem('Token');

    return new Promise((resolve, reject) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + Token);

        console.log(Token);


        const raw = JSON.stringify({
            "MID": MID
        });

        const requestOptions: any = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };


        fetch(MyBookingUrl, requestOptions)
            .then((response) => response.json())
            .then((result) => {

                resolve(result);
            })
            .catch((error) => {

                reject(error);
                throw new Error('Server Connection error');
            });
    })

}