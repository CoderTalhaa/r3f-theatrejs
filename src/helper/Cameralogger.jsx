import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

function CameraLogger({ event } = {}) {
  const { camera } = useThree();
  const cameraRef = useRef(camera);

  useEffect(() => {
    const logCamera = () => {
      const { x, y, z } = cameraRef.current.position;
      const roundedX = Math.round(x * 100) / 100;
      const roundedY = Math.round(y * 100) / 100;
      const roundedZ = Math.round(z * 100) / 100;
      console.log(`camera Position: ${roundedX}, ${roundedY} ,${roundedZ}`);
    };

    cameraRef.current = camera;
    window.addEventListener(event, logCamera);

    return () => {
      window.removeEventListener(event, logCamera);
    };
  }, []);
  return null;
}

export default CameraLogger;