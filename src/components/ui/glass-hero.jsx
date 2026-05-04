"use client"

import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { 
  MeshTransmissionMaterial, 
  Environment, 
  ContactShadows, 
  PresentationControls,
  Float
} from '@react-three/drei'

function GlassObject() {
  const meshRef = useRef()
  const [scroll, setScroll] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = height > 0 ? window.scrollY / height : 0
      setScroll(scrolled)
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(time / 2) * 0.3 + scroll * Math.PI
      meshRef.current.rotation.y = time + scroll * Math.PI
    }
  })

  return (
    <Float rotationIntensity={1} floatIntensity={2} speed={2}>
      <mesh ref={meshRef} scale={1.5}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={2}
          thickness={1.5}
          samples={10}
          transmission={1}
          clearcoat={1}
          clearcoatRoughness={0}
          roughness={0.1}
          chromaticAberration={0.04}
          anisotropy={0.1}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.1}
          color="#ffffff"
        />
      </mesh>
    </Float>
  )
}

export const GlassHero = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 35 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
        
        <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 1500 }}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
        >
          <GlassObject />
        </PresentationControls>

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
