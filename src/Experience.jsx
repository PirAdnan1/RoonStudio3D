import {
  useMatcapTexture,
  Center,
  Text3D,
  OrbitControls,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Experience() {

  const [torusGeometry, setTorusGeometry] = useState()
  const [matcapTexture] = useMatcapTexture("36220C_C6C391_8C844A_8B7B4C", 256);
  const donutGroup = useRef() 

  useFrame((state, delta) => {
    for(const donut of donutGroup.current.children)
    {
        donut.rotation.y += delta * 0.4
    }
  })
  return (
    <>
      <Perf position="top-left" />
        <torusGeometry ref={setTorusGeometry} />
      <OrbitControls makeDefault />
      <Center>
        <Text3D
          font="./fonts/helvetiker_regular.typeface.json"
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          Roon Studio
          <meshMatcapMaterial matcap={matcapTexture} />
        </Text3D>
      </Center>

    <group ref={donutGroup}>
      {[...Array(100)].map((value, index) => (
        <mesh
        key={index}
        geometry={torusGeometry}
        position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            
        ]}
        scale={0.2 + Math.random() * 0.2}
        rotation={[
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            0
        ]}
        >
          <meshMatcapMaterial matcap={matcapTexture} />
        </mesh>
      ))}
      </group>
    </>
  );
}
