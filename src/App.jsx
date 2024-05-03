import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  CameraControls,
  Environment,
  Loader,
  Stars,
  Text,
} from "@react-three/drei";
import CameraLogger from "./helper/Cameralogger.jsx";
import { Experience } from "./components/Experience";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import * as THREE from "three";

function App() {
  const [click, setClick] = useState(false);
  const cameraRef = useRef();

  useGSAP(() => {
    const padding = click ? "0" : "5rem";

    gsap.to(".cont", {
      padding: padding,
      duration: 2,
      ease: "power2.out",
    });
  }, [click]);

  useEffect(() => {
    const targetPosition = new THREE.Vector3(0, 0, 0);
    if (click) {
      cameraRef.current.setLookAt(
        -3.18,
        3,
        -8,
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        true
      );
    } else {
      cameraRef.current.setLookAt(-6.18, 4.6, -16, 0, 0, 0, true);
    }
  }, [click]);

  function handleClick() {
    setClick((prev) => !prev);
  }

  return (
    <>
      <div className="absolute w-full p-3 lg:py-3 lg:pl-12 text-4xl text-white font-serif font bold ">
        <h1>Witch.</h1>
      </div>
      <Loader />
      <div className="cont w-full h-full bg-slate-900 flex justify-center items-center p-20 lg:p-30">
        <div className="w-full h-full rounded-xl overflow-hidden">
          <Canvas
            resize={{ polyfill: false }}
            shadows
            gl={{ preserveDrawingBuffer: true }}
            camera={{ position: [-6.31, 4.6, -16], fov: 75 }}
          >
            <color attach="background" args={[0x000]} />

            <fog attach="fog" args={[0x874ccc, 5, 60]} />
            <CameraControls ref={cameraRef} />
            <CameraLogger event="mousedown" />
            <Stars
              radius={100}
              depth={50}
              count={5000}
              factor={4}
              saturation={0}
              fade
              speed={1}
            />
            <ambientLight intensity={0.1} />

            <directionalLight
              color="yellow"
              intensity={0.8}
              position={[2, 40, -1]}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              shadow-camera-far={50}
              shadow-camera-left={-10}
              shadow-camera-right={10}
              shadow-camera-top={10}
              shadow-camera-bottom={-10}
            />
            <Text
              fontSize={1}
              position={[0, 5.6, -14]}
              rotation={[0, 0.6, 0]}
              onClick={handleClick}
            >
              X
            </Text>
            <Experience />
            <Suspense fallback={null}>
              <Environment preset="night" />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </>
  );
}

export default App;
