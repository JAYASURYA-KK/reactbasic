import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import Image from './assets/glass.glb';

function Model() {
  const { scene } = useGLTF(Image);
  return <primitive object={scene} scale={1} />;
}

function ThreePage() {

  const handleClick = () => {
    alert("Button Clicked!");
  }

  return (
    <div style={{ width: "100vw", height: "100vh", margin: 0, overflow: "hidden", position: "relative" }}>
      
      {/* 3D Model */}
      <Canvas camera={{ position: [0, 1, 5] }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 2, 2]} />
        <Model />
        <OrbitControls />
      </Canvas>

      {/* Center Button */}
      <button 
        onClick={handleClick} 
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "20px 40px",
          fontSize: "20px",
          borderRadius: "10px",
          border: "none",
          backgroundColor: "#ff3366",
          color: "white",
          cursor: "pointer",
          zIndex: 10
        }}
      >
        Click Me
      </button>

    </div>
  );
}

export default ThreePage;
