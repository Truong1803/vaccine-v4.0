import React from "react";

import Lottie from "react-lottie";

import * as loading from "./loading.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loading.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

// const defaultOptions2 = {
//   loop: false,
//   autoplay: true,
//   animationData: done.default,
//   rendererSettings: {
//     preserveAspectRatio: "xMidYMid slice",
//   },
// };

const Loading = () => {
  return (
    <div
      style={{
        // marginTop: "10rem",
        zIndex: "100",
        position: "absolute",
        // right: "0",
        // top: "20%",
        width: "100%",
        backgroundColor: "#fff",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.8,
      }}
    >
      <Lottie options={defaultOptions} height={120} width={120} />
    </div>
  );
};

// const Loading = ({ loading }) => {
//   return (
//     <div style={{ marginTop: "10rem" }}>
//       {!loading ? (
//         <Lottie options={defaultOptions} height={120} width={120} />
//       ) : (
//         <Lottie options={defaultOptions2} height={120} width={120} />
//       )}
//     </div>
//   );
// };

export default Loading;
