import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

const pseudoRandom = (index, seed) => {
  const value = Math.sin(index * 127.1 + seed * 311.7) * 43758.5453
  return value - Math.floor(value)
}

function StarField() {
  const pointsRef = useRef(null)
  const emberRef = useRef(null)

  const positions = useMemo(() => {
    const total = 5600
    const coords = new Float32Array(total * 3)

    for (let i = 0; i < total; i += 1) {
      coords[i * 3] = (pseudoRandom(i, 1) - 0.5) * 52
      coords[i * 3 + 1] = (pseudoRandom(i, 2) - 0.5) * 30
      coords[i * 3 + 2] = (pseudoRandom(i, 3) - 0.5) * 58
    }

    return coords
  }, [])

  const emberPositions = useMemo(() => {
    const total = 1300
    const coords = new Float32Array(total * 3)

    for (let i = 0; i < total; i += 1) {
      coords[i * 3] = (pseudoRandom(i, 11) - 0.5) * 30
      coords[i * 3 + 1] = (pseudoRandom(i, 12) - 0.5) * 16
      coords[i * 3 + 2] = (pseudoRandom(i, 13) - 0.5) * 26
    }

    return coords
  }, [])

  useFrame(({ clock }) => {
    if (!pointsRef.current) {
      return
    }

    pointsRef.current.rotation.y = clock.elapsedTime * 0.006
    pointsRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.05) * 0.03

    if (emberRef.current) {
      emberRef.current.rotation.y = -clock.elapsedTime * 0.022
      emberRef.current.rotation.x = Math.cos(clock.elapsedTime * 0.11) * 0.08
      emberRef.current.position.y = Math.sin(clock.elapsedTime * 0.45) * 0.35
    }
  })

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={positions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="#f4f4f4" size={0.028} opacity={0.86} transparent sizeAttenuation />
      </points>

      <points ref={emberRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={emberPositions}
            count={emberPositions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="#E6501B" size={0.05} opacity={0.34} transparent sizeAttenuation />
      </points>
    </>
  )
}

function EvolvingEarth() {
  const groupRef = useRef(null)

  useFrame(({ clock }) => {
    if (!groupRef.current) {
      return
    }

    groupRef.current.rotation.y = clock.elapsedTime * 0.22
    groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.18) * 0.1
  })

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[2.6, 56, 56]} />
        <meshStandardMaterial color="#050505" roughness={0.86} metalness={0.18} emissive="#740A03" emissiveIntensity={0.32} />
      </mesh>

      <mesh>
        <sphereGeometry args={[2.63, 56, 56]} />
        <meshBasicMaterial color="#f4f4f4" wireframe transparent opacity={0.2} />
      </mesh>

      <mesh>
        <sphereGeometry args={[2.95, 56, 56]} />
        <meshBasicMaterial color="#E6501B" wireframe transparent opacity={0.09} />
      </mesh>
    </group>
  )
}

function OrbitingPlanet({ radius, speed, size, color, offset, vertical = 0.5 }) {
  const ref = useRef(null)

  useFrame(({ clock }) => {
    if (!ref.current) {
      return
    }

    const time = clock.elapsedTime * speed + offset
    ref.current.position.x = Math.cos(time) * radius
    ref.current.position.y = Math.sin(time * 0.8) * vertical
    ref.current.position.z = Math.sin(time) * radius * 0.2
    ref.current.rotation.y += 0.01
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.36} roughness={0.52} metalness={0.24} />
    </mesh>
  )
}

function OrbitRings() {
  const ringOne = useRef(null)
  const ringTwo = useRef(null)

  useFrame(({ clock }) => {
    if (ringOne.current) {
      ringOne.current.rotation.z = clock.elapsedTime * 0.13
    }

    if (ringTwo.current) {
      ringTwo.current.rotation.z = -clock.elapsedTime * 0.09
      ringTwo.current.rotation.x = 0.35
    }
  })

  return (
    <>
      <mesh ref={ringOne} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[4.7, 0.012, 12, 120]} />
        <meshBasicMaterial color="#f4f4f4" transparent opacity={0.28} />
      </mesh>

      <mesh ref={ringTwo} rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[6.2, 0.01, 12, 120]} />
        <meshBasicMaterial color="#E6501B" transparent opacity={0.22} />
      </mesh>
    </>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 3, 5]} intensity={1.1} color="#f4f4f4" />
      <pointLight position={[-6, -2, 1]} intensity={1.5} color="#C3110C" />
      <pointLight position={[0, 5, -4]} intensity={1.05} color="#E6501B" />

      <StarField />
      <EvolvingEarth />
      <OrbitRings />

      <OrbitingPlanet radius={4.7} speed={0.34} size={0.36} color="#FFC24A" offset={0.4} />
      <OrbitingPlanet radius={6.1} speed={0.27} size={0.42} color="#E6501B" offset={1.8} vertical={0.8} />
      <OrbitingPlanet radius={7.3} speed={0.22} size={0.5} color="#C3110C" offset={2.9} vertical={0.9} />
    </>
  )
}

export default function SolarSystemHero3D() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 10.5], fov: 52 }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
