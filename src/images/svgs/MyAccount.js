import * as React from "react"
import Svg, { Defs, LinearGradient, Stop, G, Path } from "react-native-svg"

function MyAccount(props) {
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
          x1={59.23}
          y1={124.66}
          x2={188.65}
          y2={124.66}
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
        <G id="my_account" data-name="my account">
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
            d="M122.05 128.92c20.48 0 37.09-19.06 37.09-42.57s-16.6-42.57-37.09-42.57-37.09 19.06-37.09 42.57 16.61 42.57 37.09 42.57zm30.46 2.64H95.37c-19.96 0-36.14 16.18-36.14 36.14v26.31c15.26 14.3 38.57 23.45 64.71 23.45s49.45-9.15 64.71-23.45V167.7c0-19.96-16.18-36.14-36.14-36.14z"
            fill="url(#linear-gradient)"
          />
        </G>
      </G>
    </Svg>
  )
}

export default MyAccount
