import { Model } from "./Model";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

export const Experience = () => {
  return (
    <>
      <CameraRig>
        <Model />
      </CameraRig>
    </>
  );
};

function CameraRig({ children }) {
  const group = useRef();
  useFrame((state, delta) => {
    easing.dampE(
      group.current.rotation,
      [0, -state.pointer.x / 10, 0],
      1.3,
      delta
    );
  });
  return <group ref={group}>{children}</group>;
}
