"use client"

import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { 
  MeshTransmissionMaterial, 
  Environment, 
  ContactShadows, 
  Float
} from '@react-three/drei'

function GlassSphere() {
  const meshRef = useRef()
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(time / 4) * 0.2
      meshRef.current.rotation.y = time / 2
    }
  })

  return (
    <Float rotationIntensity={1} floatIntensity={1} speed={1.5}>
      <mesh ref={meshRef} scale={2.2}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={2}
          thickness={1}
          samples={10}
          transmission={1}
          clearcoat={1}
          clearcoatRoughness={0}
          roughness={0.1}
          chromaticAberration={0.02}
          anisotropy={0.1}
          distortion={0.3}
          distortionScale={0.3}
          temporalDistortion={0.1}
          color="#ffffff"
        />
      </mesh>
    </Float>
  )
}

export const GlassAbout = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 35 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <GlassSphere />
        <Environment preset="studio" />
        <ContactShadows
          position={[0, -2.5, 0]}
          opacity={0.4}
          scale={10}
          blur={2.5}
          far={4}
        />
      </Canvas>
    </div>
  )
}
