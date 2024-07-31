import * as React from "react"
import Svg, { Defs, LinearGradient, Stop, G, Path } from "react-native-svg"

function Rewards(props) {
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
          x1={43.23}
          y1={128}
          x2={217.79}
          y2={128}
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
        <G id="Rewards">
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
            d="M145.69 105.21h39.95a58.91 58.91 0 00-6.1-11.41h-33.86v11.41zm-74.55 22.07c0 17.24 7.35 32.76 19.08 43.6v-54.79H72.2c-.69 3.62-1.06 7.36-1.06 11.19zM102 179.36c3.69 2.02 7.61 3.66 11.72 4.87v-68.15H102v63.28zm65.94-6c5.31-4.32 9.86-9.54 13.42-15.43h-13.42v15.43zM130.51 40c-48.2 0-87.28 39.08-87.28 87.28s39.08 87.28 87.28 87.28 87.28-39.08 87.28-87.28c0-48.21-39.08-87.28-87.28-87.28zm0 160.41c-40.39 0-73.14-32.74-73.14-73.14s32.74-73.14 73.14-73.14c36.59 0 66.9 26.86 72.29 61.94h-71.48V82.93h38.67c-10.49-9.34-24.31-15.02-39.47-15.02-2 0-3.97.1-5.92.29v28.24h-10.87V70.32c-17.49 5.15-31.63 18.13-38.34 34.89h49.21v81.14c1.95.19 3.92.29 5.92.29 10.2 0 19.8-2.58 28.19-7.11v-21.6h-27.39v-10.87h27.39v-10.69h-27.39V125.5h72.31c.01.59.02 1.18.02 1.77 0 40.4-32.75 73.14-73.14 73.14zm37.43-53.35h18.56c1.21-3.43 2.12-7 2.69-10.69h-21.25v10.69z"
            fill="url(#linear-gradient)"
          />
        </G>
      </G>
    </Svg>
  )
}

export default Rewards
