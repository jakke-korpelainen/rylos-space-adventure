import { useRef } from "react"
import { useLoader, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { useGameStore } from "../store"

const geometry = new THREE.BoxBufferGeometry(1, 1, 40)
const red = new THREE.Color("red")
const orangered = new THREE.Color("orangered")
const ambientYellowLight = new THREE.Color("#FFF293")
const laserMaterial = new THREE.MeshBasicMaterial({ color: orangered })
const crossMaterial = new THREE.MeshBasicMaterial({ color: orangered, fog: false })
const position = new THREE.Vector3()
const direction = new THREE.Vector3()

export default function Ship() {
  const { nodes } = useLoader(GLTFLoader, "/rylos-space-adventure/ship.gltf") as any
  const clock = useGameStore((state) => state.clock)
  const mutation = useGameStore((state) => state.mutation)
  const immunity = useGameStore((state) => state.immunity)
  const lasers = useGameStore((state) => state.lasers)

  const { mouse, ray } = mutation
  const main = useRef<THREE.Group>()
  const laserGroup = useRef<THREE.Group>()
  const laserLight = useRef<THREE.PointLight>()
  const exhaust = useRef<THREE.PointLight>()
  const cross = useRef<THREE.Group>()
  const target = useRef<THREE.Group>()

  useFrame(() => {
    if (main.current) {
      if (clock) {
        main.current.position.z = Math.sin(clock.getElapsedTime() * 40) * Math.PI * 0.2
      }

      main.current.rotation.z += (mouse.x / 500 - main.current.rotation.z) * 0.2
      main.current.rotation.x += (-mouse.y / 1200 - main.current.rotation.x) * 0.2
      main.current.rotation.y += (-mouse.x / 1200 - main.current.rotation.y) * 0.2
      main.current.position.x += (mouse.x / 10 - main.current.position.x) * 0.2
      main.current.position.y += (25 + -mouse.y / 10 - main.current.position.y) * 0.2
    }

    if (laserGroup.current) {
      for (let i = 0; i < lasers.length; i++) {
        const group = laserGroup.current.children[i] as THREE.Group
        if (group.position) {
          group.position.z -= 20
        }
      }
    }

    if (laserLight.current) {
      laserLight.current.intensity += ((lasers.length && Date.now() - lasers[lasers.length - 1] < 100 ? 20 : 0) - laserLight.current.intensity) * 0.3
    }

    // get ships orientation and save it to the stores ray
    if (main.current) {
      main.current.getWorldPosition(position)
      main.current.getWorldDirection(direction)
    }

    ray.origin.copy(position)
    ray.direction.copy(direction.negate())

    crossMaterial.color = mutation.hits ? red : orangered
    if (target.current) {
      target.current.visible = !!mutation.hits
    }
  })

  return (
    <group ref={main}>
      <group visible={immunity}>
        <mesh>
          <sphereGeometry args={[13, 8]} />
          <meshBasicMaterial color="#1a73c0" fog={false} reflectivity={0.2} />
        </mesh>
      </group>
      <group scale={[3.5, 3.5, 3.5]}>
        <group ref={cross} position={[0, 0, -300]} name="cross">
          <mesh renderOrder={1000} material={crossMaterial}>
            <boxGeometry args={[20, 2, 2]} />
          </mesh>
          <mesh renderOrder={1000} material={crossMaterial}>
            <boxGeometry args={[2, 20, 2]} />
          </mesh>
        </group>
        <group ref={target} position={[0, 0, -300]} name="target">
          <mesh position={[0, 20, 0]} renderOrder={1000} material={crossMaterial}>
            <boxGeometry args={[40, 2, 2]} />
          </mesh>
          <mesh position={[0, -20, 0]} renderOrder={1000} material={crossMaterial}>
            <boxGeometry args={[40, 2, 2]} />
          </mesh>
          <mesh position={[20, 0, 0]} renderOrder={1000} material={crossMaterial}>
            <boxGeometry args={[2, 40, 2]} />
          </mesh>
          <mesh position={[-20, 0, 0]} renderOrder={1000} material={crossMaterial}>
            <boxGeometry args={[2, 40, 2]} />
          </mesh>
        </group>
        <pointLight ref={laserLight} position={[0, 0, -20]} distance={100} intensity={0.5} color={ambientYellowLight} />
        <group ref={laserGroup}>
          {lasers.map((_, i) => (
            <group key={i}>
              <mesh position={[-2.8, 0, -0.8]} geometry={geometry} material={laserMaterial} />
              <mesh position={[2.8, 0, -0.8]} geometry={geometry} material={laserMaterial} />
            </group>
          ))}
        </group>
        <group rotation={[Math.PI / 2, Math.PI, 0]}>
          <mesh name="Renault_(S,_T1)_0" geometry={nodes["Renault_(S,_T1)_0"].geometry}>
            <meshStandardMaterial color="#16161d" />
          </mesh>
          <mesh name="Renault_(S,_T1)_1" geometry={nodes["Renault_(S,_T1)_1"].geometry}>
            <meshStandardMaterial color="#4c341c" />
          </mesh>
          <mesh name="Renault_(S,_T1)_2" geometry={nodes["Renault_(S,_T1)_2"].geometry}>
            <meshStandardMaterial color="#16161d" />
          </mesh>
          <mesh name="Renault_(S,_T1)_3" geometry={nodes["Renault_(S,_T1)_3"].geometry}>
            <meshBasicMaterial color="lightblue" />
          </mesh>
          <mesh name="Renault_(S,_T1)_4" geometry={nodes["Renault_(S,_T1)_4"].geometry}>
            <meshBasicMaterial color="orangered" />
          </mesh>
          <mesh name="Renault_(S,_T1)_5" geometry={nodes["Renault_(S,_T1)_5"].geometry}>
            <meshBasicMaterial color="orangered" />
          </mesh>
        </group>
      </group>
      <pointLight ref={exhaust} scale={[1, 1, 1]} position={[0, 1, 30]} distance={100} intensity={1} color="orangered" />
    </group>
  )
}
