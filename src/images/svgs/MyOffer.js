import * as React from "react"
import Svg, {
    Defs,
    LinearGradient,
    Stop,
    G,
    Path,
    Text,
    TSpan
} from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: style */

function MyOffer(props) {
    return (
        <Svg
            id="Layer_2"
            data-name="Layer 2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 255.05 254.56"
            {...props}
        >
            <Defs>
                <LinearGradient
                    id="linear-gradient"
                    x1={27.92}
                    y1={127.98}
                    x2={227.16}
                    y2={127.98}
                    gradientTransform="matrix(1 0 0 -1 0 255.28)"
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop offset={0} stopColor="#f26822" />
                    <Stop offset={0.05} stopColor="#f05327" />
                    <Stop offset={0.11} stopColor="#ef402a" />
                    <Stop offset={0.17} stopColor="#ee302d" />
                    <Stop offset={0.26} stopColor="#ee232e" />
                    <Stop offset={0.44} stopColor="#ed1f2e" />
                </LinearGradient>
            </Defs>
            <G id="Layer_1-2" data-name="Layer 1">
                <G id="my_offer" data-name="my offer">
                    <G className="cls-1">
                        <Path
                            d="M223.32 0c17.59 0 31.78 14.26 31.73 31.82l-.52 190.92c-.05 17.56-14.32 31.82-31.91 31.82H31.73C14.14 254.56-.05 240.3 0 222.74L.52 31.82C.57 14.26 14.84 0 32.43 0h190.89z"
                            fill="#fff3d8"
                        />
                    </G>
                    <Path
                        d="M185.84 208.06L172.8 202.02 172.11 216.38 160.21 208.32 157.23 222.38 146.77 212.53 141.58 225.93 132.84 214.52 125.56 226.91 118.76 214.25 109.59 225.32 104.91 211.73 94.09 221.18 91.65 207.02 79.44 214.61 79.31 200.24 66.05 205.77 68.22 191.57 54.24 194.9 58.66 181.23 44.33 182.28 50.89 169.49 36.57 168.23 45.1 156.66 31.17 153.12 41.44 143.07 28.26 137.34 40.01 129.06 27.92 121.29 40.84 115.01 30.16 105.4 43.92 101.27 34.91 90.08 49.16 88.21 42.07 75.71 56.43 76.15 51.43 62.68 65.54 65.42 62.77 51.32 76.26 56.29 75.78 41.93 88.29 48.99 90.13 34.74 101.35 43.72 105.45 29.95 115.08 40.62 121.33 27.68 129.13 39.75 137.38 27.98 143.14 41.15 153.17 30.86 156.74 44.78 168.29 36.23 169.58 50.54 182.36 43.96 181.34 58.29 195 53.84 191.69 67.83 205.89 65.63 200.39 78.9 214.76 79 207.19 91.22 221.36 93.63 211.93 104.48 225.53 109.13 214.48 118.32 227.16 125.09 214.78 132.4 226.21 141.11 212.82 146.34 222.7 156.77 208.65 159.78 216.72 171.67 202.37 172.38 208.44 185.41 194.15 183.81 198.05 197.65 184.21 193.78 185.84 208.06z"
                        fill="url(#linear-gradient)"
                    />
                    <G className="cls-1">
                        <Text className="cls-2" transform="rotate(-12.6 596.017 -375.24)" fontSize={35} fontWeight={'bold'}>
                            <TSpan x={0} y={0} fill="#fff3d8">
                                {"MY"}
                            </TSpan>
                        </Text>
                        <Text className="cls-2" transform="rotate(-12.6 831.264 -185.385)" fontSize={35} fontWeight={'bold'}>
                            <TSpan x={0} y={0} fill="#fff3d8" >
                                {"OFFERS"}
                            </TSpan>
                        </Text>
                    </G>
                </G>
            </G>
        </Svg>
    )
}

export default MyOffer
