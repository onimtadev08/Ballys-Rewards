
import { Domain } from "../data/data";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getOtpUrl = Domain + '/api/Ballys/GetOTP';

const VaidateOTPUrl = Domain + '/api/Ballys/ValidateOTP';

const ResendOTPUrl = Domain + '/api/Ballys/ResendOTP';

const FirstTimeSignInUrl = Domain + '/api/Ballys/FirstTimeLoginSave';


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
export async function TempLogin(PlayerID: string, PIN: string, Token: string, Method: string) {

    let method = Method === 'TEMP' ? 'FirstTimeSignIn' : 'SignIn';
    let Url = Domain + '/api/Ballys/' + method;


    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw: string = JSON.stringify({
        strMID: PlayerID,
        strPIN: PIN,
    });

    console.log('=====================================');
    console.log(Url, '\n', raw);


    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    const response = await fetch(Url, requestOptions);
    if (!response.ok) {
        console.log(response);
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

    console.log(raw);


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

    console.log('=====================================');
    console.log(ResendOTPUrl, '\n', raw);


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
    console.log(response);
    console.log('=====================================');

    return response.json();
}

export async function FirstTimeSignIn(fname: string, lname: string, arg2: string, email: string, PlayerID: string, PIN: string) {
    const Token = await AsyncStorage.getItem('Token');


    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "bearer " + Token);

    const raw: string = JSON.stringify({
        strFirstName: fname,
        strLastName: lname,
        strMobile: arg2,
        strEMail: email,
        strDOB: PIN,
        strPassport: PlayerID,
    });

    console.log('=====================================');
    console.log(FirstTimeSignInUrl, '\n', raw);


    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    const response = await fetch(FirstTimeSignInUrl, requestOptions);
    if (!response.ok) {
        throw new Error('Server Connection error');
    }
    console.log(response.json());
    console.log('=====================================');

    return response.json();

}
