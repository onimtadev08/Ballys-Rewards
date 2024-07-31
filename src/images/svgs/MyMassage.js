import * as React from "react"
import Svg, { Defs, LinearGradient, Stop, G, Path } from "react-native-svg"

function MyMassage(props) {
  return (
    <Svg
      id="Layer_2"
      data-name="Layer 2"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 255.05 254.56"
      {...props}
    >
      <Defs>
        <LinearGradient
          id="linear-gradient"
          x1={32.82}
          y1={129.78}
          x2={197.37}
          y2={129.78}
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
        <LinearGradient
          id="linear-gradient-2"
          x1={119.1}
          y1={87.05}
          x2={221.97}
          y2={87.05}
          xlinkHref="#linear-gradient"
        />
      </Defs>
      <G id="Layer_1-2" data-name="Layer 1">
        <G id="Message">
          <G
            style={{
              isolation: "isolate"
            }}
          >
            <Path
              d="M223.32 0c17.59 0 31.78 14.26 31.73 31.82l-.52 190.92c-.05 17.56-14.32 31.82-31.91 31.82H31.73C14.14 254.56-.05 240.3 0 222.74L.52 31.82C.57 14.26 14.84 0 32.43 0h190.89z"
              fill="#fff3d8"
            />
          </G>
          <Path
            d="M197.37 129.52V88.58c0-14.93-12.44-27.38-27.38-27.38H60.2c-15.21 0-27.38 12.45-27.38 27.38v40.93c0 14.65 11.62 26.55 25.73 27.38v26.82c0 2.49 1.38 4.42 3.6 5.54.82.28 1.66.55 2.48.55 1.39 0 3.05-.83 4.15-1.66l31.53-31.25H170c14.93 0 27.37-12.17 27.37-27.37z"
            fill="#FF0024"
          />
          <Path
            d="M207.32 128.13v2.21c0 19.91-16.31 35.95-36.23 35.95H119.1v4.42c0 9.4 7.46 17.15 17.14 17.15h43.7l19.63 19.36c.83.83 1.66 1.11 2.76 1.11.28 0 .83 0 1.38-.28 1.38-.55 2.22-1.94 2.22-3.32v-16.87c8.84-.55 16.04-8.02 16.04-17.15V145c.02-8.57-6.35-15.76-14.65-16.87z"
            fill="#FF0024"
          />
        </G>
      </G>
    </Svg>
  )
}

export default MyMassage
