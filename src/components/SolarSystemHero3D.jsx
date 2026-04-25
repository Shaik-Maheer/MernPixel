import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

const pseudoRandom = (index, seed) => {
  const value = Math.sin(index * 127.1 + seed * 311.7) * 43758.5453
  return value - Math.floor(value)
}

function StarField() {
  const pointsRef = useRef(null)
  const emberRef = useRef(null)

  const positions = useMemo(() => {
    const total = 90000 // IMMENSE amount of stars
    const coords = new Float32Array(total * 3)
    for (let i = 0; i < total; i += 1) {
      coords[i * 3] = (pseudoRandom(i, 1) - 0.5) * 200
      coords[i * 3 + 1] = (pseudoRandom(i, 2) - 0.5) * 100
      coords[i * 3 + 2] = (pseudoRandom(i, 3) - 0.5) * 150
    }
    return coords
  }, [])

  const emberPositions = useMemo(() => {
    const total = 45000 // MASSIVE embers
    const coords = new Float32Array(total * 3)
    for (let i = 0; i < total; i += 1) {
      coords[i * 3] = (pseudoRandom(i, 11) - 0.5) * 60
      coords[i * 3 + 1] = (pseudoRandom(i, 12) - 0.5) * 30
      coords[i * 3 + 2] = (pseudoRandom(i, 13) - 0.5) * 60
    }
    return coords
  }, [])

  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = clock.elapsedTime * 0.04
    pointsRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.05) * 0.08

    if (emberRef.current) {
      emberRef.current.rotation.y = -clock.elapsedTime * 0.15
      emberRef.current.rotation.x = Math.cos(clock.elapsedTime * 0.11) * 0.15
      emberRef.current.position.y = Math.sin(clock.elapsedTime * 0.8) * 0.8
    }
  })

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={positions} count={positions.length / 3} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#ffffff" size={0.03} opacity={0.8} transparent sizeAttenuation blending={THREE.AdditiveBlending} />
      </points>
      <points ref={emberRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={emberPositions} count={emberPositions.length / 3} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#CA5995" size={0.15} opacity={0.4} transparent sizeAttenuation blending={THREE.AdditiveBlending} />
      </points>
      {/* Drei built-in extras */}
      <Stars radius={50} depth={50} count={12000} factor={8} saturation={1} fade speed={3} />
      <Sparkles count={2000} scale={30} size={15} speed={0.4} opacity={0.6} color="#FFB090" />
    </>
  )
}

function FireSun() {
  const groupRef = useRef(null)
  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = clock.elapsedTime * 0.5
    groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.3) * 0.15
  })
  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[3.2, 64, 64]} />
        <meshStandardMaterial color="#5D1C6A" emissive="#FFF1D3" emissiveIntensity={4} wireframe={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[3.5, 32, 32]} />
        <meshBasicMaterial color="#CA5995" wireframe transparent opacity={0.4} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh>
        <sphereGeometry args={[3.8, 48, 48]} />
        <meshBasicMaterial color="#FFB090" wireframe transparent opacity={0.2} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  )
}

function ChaosPlanet({ radius, speed, size, color, offset }) {
  const ref = useRef(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    const time = clock.elapsedTime * speed + offset
    ref.current.position.x = Math.cos(time) * radius
    ref.current.position.z = Math.sin(time) * radius
    ref.current.position.y = Math.sin(time * 2.5) * 1.5
    ref.current.rotation.y += 0.08
    ref.current.rotation.x += 0.05
  })
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[size, 1]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} wireframe />
    </mesh>
  )
}

function OrbitRings() {
  const ringGroup = useRef(null)
  useFrame(({ clock }) => {
    if (ringGroup.current) {
      ringGroup.current.rotation.x = clock.elapsedTime * 0.1
      ringGroup.current.rotation.y = clock.elapsedTime * 0.2
    }
  })
  return (
    <group ref={ringGroup}>
      {Array.from({length: 12}).map((_, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + (i*0.1), i*0.2, 0]}>
          <torusGeometry args={[5 + i*0.8, 0.015, 12, 120]} />
          <meshBasicMaterial color={i % 2 === 0 ? "#CA5995" : "#FFF1D3"} transparent opacity={0.3} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} intensity={10} color="#FFF1D3" distance={30} />
      <StarField />
      <FireSun />
      <OrbitRings />
      {[...Array(25)].map((_, i) => (
        <ChaosPlanet 
          key={i} 
          radius={4.5 + i * 0.6} 
          speed={0.1 + (pseudoRandom(i, 5) * 0.4)} 
          size={0.1 + pseudoRandom(i, 6) * 0.3} 
          color={pseudoRandom(i, 7) > 0.5 ? "#FFF1D3" : "#FFB090"} 
          offset={pseudoRandom(i, 8) * Math.PI * 2} 
        />
      ))}
    </>
  )
}

export default function SolarSystemHero3D() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 2, 14], fov: 60 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
