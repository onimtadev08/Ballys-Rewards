import * as React from "react"
import Svg, { Defs, LinearGradient, Stop, G, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: style */

function MyCard(props) {
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
          x1={0}
          y1={127.28}
          x2={255.05}
          y2={127.28}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0} stopColor="#b07515" />
          <Stop offset={0.09} stopColor="#e0ba5f" />
          <Stop offset={0.14} stopColor="#f5d77f" />
          <Stop offset={0.26} stopColor="#ffffd7" />
          <Stop offset={0.36} stopColor="#f5d77f" />
          <Stop offset={0.49} stopColor="#b07515" />
          <Stop offset={0.57} stopColor="#e0ba5f" />
          <Stop offset={0.61} stopColor="#f5d77f" />
          <Stop offset={0.74} stopColor="#ffffd7" />
          <Stop offset={0.84} stopColor="#f5d77f" />
          <Stop offset={1} stopColor="#b07515" />
        </LinearGradient>
        <LinearGradient
          id="linear-gradient-2"
          x1={3.67}
          x2={251.38}
          xlinkHref="#linear-gradient"
        />
        <LinearGradient
          id="linear-gradient-3"
          x1={9.3}
          y1={127.28}
          x2={245.75}
          y2={127.28}
          xlinkHref="#linear-gradient"
        />
        <LinearGradient
          id="linear-gradient-4"
          x1={9.3}
          y1={127.28}
          x2={245.75}
          y2={127.28}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0} stopColor="#0f1115" />
          <Stop offset={0.14} stopColor="#1c2228" />
          <Stop offset={0.26} stopColor="#232a32" />
          <Stop offset={0.36} stopColor="#1c2228" />
          <Stop offset={0.49} stopColor="#0f1115" />
          <Stop offset={0.61} stopColor="#1c2228" />
          <Stop offset={0.74} stopColor="#232a32" />
          <Stop offset={0.84} stopColor="#1c2228" />
          <Stop offset={1} stopColor="#0f1115" />
        </LinearGradient>
        <LinearGradient
          id="linear-gradient-5"
          x1={66.06}
          y1={126.06}
          x2={188.99}
          y2={126.06}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0} stopColor="#b07515" />
          <Stop offset={0.09} stopColor="#e0ba5f" />
          <Stop offset={0.14} stopColor="#f5d77f" />
          <Stop offset={0.26} stopColor="#ffffd7" />
          <Stop offset={0.36} stopColor="#f5d77f" />
          <Stop offset={0.61} stopColor="#f5d77f" />
          <Stop offset={0.74} stopColor="#ffffd7" />
          <Stop offset={0.84} stopColor="#f5d77f" />
          <Stop offset={1} stopColor="#b07515" />
        </LinearGradient>
      </Defs>
      <G id="Layer_1-2" data-name="Layer 1">
        <G id="MY_CARD" data-name="MY CARD">
          <G className="cls-4">
            <Path
              d="M223.32 0c17.59 0 31.78 14.26 31.73 31.82l-.52 190.92c-.05 17.56-14.32 31.82-31.91 31.82H31.73C14.14 254.56-.05 240.3 0 222.74L.52 31.82C.57 14.26 14.84 0 32.43 0h190.89z"
              fill="url(#linear-gradient)"
            />
          </G>
          <G className="cls-4">
            <Path
              d="M220.57 6.5c17.08 0 30.87 13.53 30.82 30.19l-.51 181.17c-.05 16.66-13.91 30.19-30.99 30.19H34.48c-17.08 0-30.87-13.53-30.82-30.19l.51-181.17C4.22 20.03 18.08 6.5 35.16 6.5h185.4z"
              fill="url(#linear-gradient-2)"
            />
          </G>
          <G className="cls-4">
            <Path
              d="M216.34 10.95c16.31 0 29.46 13.03 29.42 29.08l-.48 174.5c-.05 16.05-13.28 29.08-29.58 29.08H38.71c-16.31 0-29.46-13.03-29.42-29.08l.48-174.5c.05-16.05 13.28-29.08 29.58-29.08h176.98z"
              fill="url(#linear-gradient-3)"
            />
          </G>
          <G className="cls-4">
            <Path
              d="M216.34 10.95c16.31 0 29.46 13.03 29.42 29.08l-.48 174.5c-.05 16.05-13.28 29.08-29.58 29.08H38.71c-16.31 0-29.46-13.03-29.42-29.08l.48-174.5c.05-16.05 13.28-29.08 29.58-29.08h176.98z"
              fill="url(#linear-gradient-4)"
            />
          </G>
          <G opacity={0.06}>
            <Path
              d="M245.27 214.53l.48-174.5c.05-16.05-13.11-29.08-29.42-29.08H39.36c-7.86 0-15 3.03-20.3 7.97l216.93 216.72c5.69-5.3 9.26-12.8 9.28-21.11z"
              fill="#fff"
            />
          </G>
          <Path
            d="M105.44 136.56c-.51.74-.51 1.7-.67 2.58-.68 3.65-4.18 5.98-7.39 7.85-10.52 6.14-21.04 12.18-31.32 18.68 14.68 16.84 36.28 27.5 60.38 27.5 25.31 0 47.86-11.75 62.54-30.08-8.89-4.6-17.77-9.21-26.66-13.81-2.09-1.08-4.18-2.17-6.38-3.02-1.72-.67-3.55-1.21-4.97-2.41-2.2-1.86-1.67-4.86-2.26-7.41-.16-.7-.33-1.42-.77-1.99-1.04-1.31-3.16-1.24-4.32-2.46-.7-.74-.91-1.81-.93-2.83-.01-.64.04-1.31.35-1.88.37-.67 1.2-1.01 1.78-1.48.61-.5 1.25-.95 1.91-1.4 1.4-.95 2.69-1.98 3.34-3.6.95-2.35 1.59-5.08 1.87-7.59.29-2.66-.3-5.82.84-8.33 1.1-2.42 3.38-3.5 3.89-6.32.43-2.4 0-5.51-.97-7.74-.45-1.04-1.17-1.69-1.79-2.59-.65-.94-.23-2.08-.09-3.17.41-3.28-.29-6.59-.99-9.83-.25-1.15-.5-2.3-.92-3.4-.89-2.29-2.57-4.25-4.65-5.55-1.05-.65-2.26-.95-3.31-1.57-1.16-.68-2.35-1.24-3.6-1.77-2.77-1.18-5.6-2.21-8.52-2.95-5.7-1.44-11.87-1.69-17.3.87-2.81 1.33-5.47 3.7-5.77 6.79-3.97-1.13-8.59.72-10.7 4.27-1.68 2.83-2.01 6.11-1.86 9.34.14 2.96 1.19 5.63 1.62 8.57.12.81.22 1.71-.23 2.39-.38.57-1.08.88-1.44 1.47-.26.43-.3.96-.33 1.47-.22 3.66-.36 7.59 1.61 10.68.28.43.6.85 1.01 1.17.32.25.69.43 1.03.65 1.68 1.05 2.79 2.83 3.41 4.71.58 1.74.48 3.56.93 5.3.37 1.42.83 2.97 1.34 4.36.43 1.17 1.21 1.87 2.07 2.7.89.86 1.43 1.85 2.72 2.21.08.26.21.49.32.74.27.65.3 1.38.32 2.09.04 1.29.17 3.33-.71 4.37-1.11 1.31-3.38.9-4.42 2.4z"
            id="my_card"
            data-name="my card"
            fill="url(#linear-gradient-5)"
          />
        </G>
      </G>
    </Svg>
  )
}

export default MyCard
