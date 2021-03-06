import React from 'react';

import Lottie from 'react-lottie';

import * as done from './done.json';

// const defaultOptions = {
//   loop: true,
//   autoplay: true,
//   animationData: loading.default,
//   rendererSettings: {
//     preserveAspectRatio: "xMidYMid slice",
//   },
// };

const defaultOptions2 = {
  loop: false,
  autoplay: true,
  animationData: done.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

// const Loading = () => {
//   return (
//     <div
//       style={{
//         marginTop: "10rem",
//         zIndex: "100",
//         position: "fixed",
//         right: "0",
//         top: "20%",
//         width: "100%",
//       }}
//     >
//       <Lottie options={defaultOptions} height={120} width={120} />
//     </div>
//   );
// };

const Loading1 = () => {
  return (
    <div
      style={{
        marginTop: "10rem",
        zIndex: "100",
        position: "fixed",
        right: "0",
        top: "20%",
        width: "100%",
      }}
    >
      <Lottie options={defaultOptions2} height={120} width={120} />
    </div>
  );
};

export default Loading1;
