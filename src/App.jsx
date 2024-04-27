import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Html,
  Scroll,
  ScrollControls,
  Stars,
  useScroll,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { getProject, val } from "@theatre/core";
import {
  editable as e,
  PerspectiveCamera,
  useCurrentSheet,
  SheetProvider,
} from "@theatre/r3f";
import { Model } from "./components/Model";
import { Experience } from "./components/Experience";

import flyThroughState from "./fly.json";

function App() {
  const sheet = getProject("Fly Through", { state: flyThroughState }).sheet(
    "Scene"
  );

  return (
    <>
      <Canvas shadows gl={{ preserveDrawingBuffer: true }}>
        <color attach="background" args={[0x000]} />
        <fog attach="fog" args={[0x874ccc, 10, 60]} />
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

        {/* The scene i want is like this */}
        <Experience />

        {/* Below is the TheatreJs Scene */}

        {/* <ScrollControls pages={5} damping={0.5}>
          <SheetProvider sheet={sheet}>
            <Scene />
          </SheetProvider>
        </ScrollControls> */}
        <Environment preset="night" />
      </Canvas>
    </>
  );
}

export default App;

function Scene() {
  const sheet = useCurrentSheet();
  const scroll = useScroll();

  useFrame(() => {
    const sequenceLength = val(sheet.sequence.pointer.length);

    sheet.sequence.position = scroll.offset * sequenceLength;
  });

  return (
    <>
      <Model position={[0, 0, 0]} />
      <PerspectiveCamera
        theatreKey="Camera"
        makeDefault
        position={[0, 0, 0]}
        fov={75}
        near={0.1}
        far={10000}
      />
    </>
  );
}
