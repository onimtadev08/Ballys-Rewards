import * as React from "react"
import Svg, { Defs, LinearGradient, Stop, G, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: style */

function Tournament(props) {
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
                    x1={53.93}
                    y1={125.24}
                    x2={203.88}
                    y2={125.24}
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
                <G id="Tournament">
                    <G
                        style={{
                            isolation: "isolate"
                        }}
                    >
                        <Path
                            className="cls-2"
                            d="M223.32 0c17.59 0 31.78 14.26 31.73 31.82l-.52 190.92c-.05 17.56-14.32 31.82-31.91 31.82H31.73C14.14 254.56-.05 240.3 0 222.74L.52 31.82C.57 14.26 14.84 0 32.43 0h190.89z"
                            fill="#fff3d8"
                        />
                    </G>
                    <Path
                        d="M137.14 184.78h14.87v10.16h13.4v21.14H91.49v-20.83h13.07v-10.38h15.38v-31.63c0-5.29 1.5-11.24-.46-15.67-1.78-4.02-7.63-6.09-11.14-9.57-4.77-4.72-10.38-7.88-16.2-11.1-24.42-13.53-37-34.52-38.21-62.27-.03-.72.08-1.45.15-2.61h27.98c.23-2.85.42-5.28.64-8.02h91.55c.23 2.66.45 5.2.7 8.13h28.93c-1.64 7.86-2.51 15.27-4.77 22.22-6.76 20.73-20.26 35.79-40.18 45.09-1.68.79-3.16 2.05-4.65 3.19-4.88 3.76-9.78 7.49-14.53 11.41-1.16.96-2.49 2.59-2.5 3.92-.17 15.42-.11 30.82-.11 46.82zm-69.95-126c.52 20.26 8.22 36.4 24.44 48.34-6.92-15.36-9.25-31.62-9.64-48.34h-14.8zm98.73 47.16c15.16-12.03 22.6-27.77 23.76-46.92H174.9c-.24 16.32-2.78 31.95-8.98 46.92z"
                        fill="url(#linear-gradient)"
                    />
                    <Path
                        className="cls-2"
                        d="M136.31 111.06h-11.78V72.95c-4.3 3.45-9.37 6.01-15.21 7.66v-9.18c3.07-.86 6.41-2.5 10.02-4.91 3.6-2.41 6.08-5.22 7.42-8.44h9.56v52.98h-.01z"
                        fill="#fff3d8"
                    />
                </G>
            </G>
        </Svg>
    )
}

export default Tournament
