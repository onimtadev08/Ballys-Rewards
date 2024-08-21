import React, { PixelRatio, useEffect, useRef, useState } from 'react';
import { Dimensions, View, Text, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GradientButton from '../components/GradientButtonfull';
import GradientButtonWithBorder from '../components/GradientButton';
// Image quality options
import YotiFaceCapture, {
  IMAGE_QUALITY_LOW,
  IMAGE_QUALITY_MEDIUM,
  IMAGE_QUALITY_HIGH
} from "@getyoti/react-native-yoti-face-capture";
import { useNavigation, useRoute } from '@react-navigation/native';

function EyeDetect(props) {

  const yotiFaceCaptureRef = useRef(null);
  const { width: windowWidth, height: windowHeight } = Dimensions.get('window');
  const [Detection, setDetection] = useState('');
  const [isDetected, setDetected] = useState(false);
  const [base64Icon, setbase64Icon] = useState('');
  const [base64IconApi, setbase64IconAPi] = useState('');
  const navigation = useNavigation()
  const route = useRoute();

  useEffect(() => {
    if (yotiFaceCaptureRef.current) {
      yotiFaceCaptureRef.current.startCamera();
      yotiFaceCaptureRef.current.startAnalyzing();
    }
  }, [yotiFaceCaptureRef.current])

  const NavigateToSignUp = () => {

    route.params.onGoBack({ 'Img': base64Icon, 'ImgApi': base64IconApi });
    navigation.goBack();
  }

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        style={{ flex: 1 }}
        colors={['#fd0925', '#ff0909', '#ff6603']}>
        {isDetected ?
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <View style={{ width: windowWidth, alignItems: 'center' }}>
              <Image
                source={isDetected === '' ? require('../images/user.png') : { uri: base64Icon }}
                resizeMode='cover'
                style={styles.cImage}
              />
            </View>
            <View style={{ width: '75%', marginTop: 20, marginBottom: 20 }}>
              <GradientButton
                title="Apply"
                onPress={() => {
                  NavigateToSignUp();
                }}
                colors={['#FF0024', '#FF0024', '#FF0024']}
                buttonStyle={{ width: '75%' }}
                textStyle={{
                  fontWeight: 'bold',
                  color: '#000000',
                  fontSize: 20,
                  textAlign: 'center',
                }}
              />
            </View>

            <View style={{ width: windowWidth, marginTop: 20, alignItems: 'center' }}>
              <GradientButtonWithBorder
                title="Try Again"
                onPress={() => {


                  if (yotiFaceCaptureRef.current) {
                    yotiFaceCaptureRef.current.startCamera();
                    yotiFaceCaptureRef.current.startAnalyzing();
                  }

                  setDetected(false);
                  setDetection(''),
                    setbase64Icon('');
                  setbase64IconAPi('');

                }}
                colors={['transparent', 'transparent', 'transparent']}
                borderColor="#FF0024"
                buttonStyle={{ width: '75%' }}
                textStyle={{
                  fontWeight: 'bold',
                  color: '#000000',
                  fontSize: 16,
                  textAlign: 'center',
                }}
              />
            </View>

          </View>
          :
          <View style={{ alignItems: 'center', justifyContent: 'center', height: windowHeight / 1.2 }}>
            <View style={{ borderRadius: 100, width: windowWidth, alignItems: 'center', marginTop: 20 }}>
              <Text style={{ color: 'white', fontSize: 20 }}> Blink your eyes to capture the picture</Text>
              <YotiFaceCapture
                style={{ marginTop: 20 }}
                width={windowHeight / 2.5}
                height={windowHeight / 2.5}
                imageQuality={IMAGE_QUALITY_MEDIUM}
                ref={yotiFaceCaptureRef}
                requireEyesOpen={true}
                requiredStableFrames={1}
                requireValidAngle={true}
                requireBrightEnvironment
                faceCenter={[
                  0.5,
                  0.5
                ]}

                onFaceCaptureAnalyzedImage={(result) => {
                  const { croppedImage } = result;
                  const uri = `data:image/jpg;base64,${croppedImage}`;

                  setDetected(true);
                  setbase64Icon(uri);
                  setbase64IconAPi(croppedImage);

                  yotiFaceCaptureRef.current.stopAnalyzing();
                  yotiFaceCaptureRef.current.stopCamera()

                }}
                onFaceCaptureImageAnalysisFailed={({ cause }) => {
                  switch (cause) {
                    case 'FaceCaptureAnalysisErrorNoFaceDetected':
                      setDetection('Face not Detected');
                      break;
                    case 'FaceCaptureAnalysisErrorFaceTooBig':
                      setDetection('Face to Close');
                      break;
                    case 'FaceCaptureAnalysisErrorFaceTooSmall':
                      setDetection('Face to Far');
                      break;
                    case 'FaceCaptureAnalysisErrorFaceNotCentered':
                      setDetection('Face not Centered');
                      break;
                  }

                }}
                onFaceCaptureStateChanged={(state) => {

                  if (state === 'FaceCaptureStateCameraReady') {
                    yotiFaceCaptureRef.current.startAnalyzing();
                  }

                }}
                onFaceCaptureStateFailed={(reason) => {

                }}
              />
            </View>
            <View style={{ flexDirection: 'column', margin: 30, alignItems: 'center' }}>
              <Text style={{ color: 'white', fontSize: 20 }}> {Detection}</Text>
            </View>
          </View>
        }
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  cImage: {
    width: 300,
    height: 300,
    borderRadius: 200,
    marginTop: 100,
    borderColor: 'black',
    borderWidth: 0.5
  }
});

export default EyeDetect;