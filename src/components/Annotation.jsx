/* eslint-disable react/prop-types */
import { Html, PositionalAudio } from "@react-three/drei";
import { useRef, useState } from "react";

export default function Annotation({ name, children, ...props }) {
  const namesWithDetails = [
    { name: "Goblin", details: "Details about Dog...", audio: "/zap.mp3" },
    { name: "mama", details: "The mama.", audio: "/zap.mp3" },
    { name: "Spell", details: "Details about Bat...", audio: "/zap.mp3" },
    { name: "yaga", details: "The protector..", audio: "/zap.mp3" },
    {
      name: "Lady",
      details: "Details about Cat... i sm asid hsda ",
      audio: "/zap.mp3",
    },
    { name: "Knight", details: "The protector..", audio: "/zap.mp3" },
  ];
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState("");
  const [showSong, setShowSong] = useState(false);
  const [song, setSong] = useState("");

  const meshRef = useRef();
  const annoRef = useRef();

  const handleClick = () => {
    // Find details of the clicked name

    const selectedName = namesWithDetails.find((item) => item.name === name);
    if (selectedName) {
      if (showDetails && showSong) {
        // If details are already shown, hide them
        setShowDetails(false);
        setDetails("");
        setShowSong(false);
        setSong("");
      } else {
        // If details are not shown, show them
        setDetails(selectedName.details);
        setShowDetails(true);
        setSong(selectedName.audio);
        setShowSong(true);

      }
    }
  };

  return (
    <>
      <Html
      name=""
        {...props}
        ref={annoRef}
        distanceFactor={10}
        zIndexRange={[0, 0]}
        geometry={<boxGeometry args={[1.66, 0.47, 0.24]} />}
      >
        <div
          className="flex items-center justify-center space-x-1 "
          onClick={handleClick}
        >
          <div className="annotation">{children}</div>
          {showDetails && <div className="details">{details}</div>}
        </div>
      </Html>
      {showSong && (
        <PositionalAudio
          url={song}
          distance={1}
          loop={false}
          autoplay
          ref={(audio) => {
            if (audio && meshRef.current) {
              meshRef.current.add(audio);
            }
          }}
        />
      )}
      <mesh ref={meshRef} name={children} />
    </>
  );
}
