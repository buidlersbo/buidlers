'use client';

import { useRef } from 'react';
import { useFrame, ThreeElements } from '@react-three/fiber';
import * as THREE from 'three';

// Define props interface for the Block component
interface BlockProps {
  position?: [number, number, number];
  scale?: number | [number, number, number];
  rotation?: [number, number, number];
  animate?: boolean;
  color?: string;
}

// Main Block component with fallback cube geometry
export function Block({ 
  position = [0, 0, 0], 
  scale = 1, 
  rotation = [0, 0, 0], 
  animate = false,
  color = "#6366f1",
  ...props 
}: BlockProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((_state, delta) => {
    if (meshRef.current && animate) {
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.rotation.x += delta * 0.3;
    }
  });

  return (
    <group {...props} position={position} scale={scale} rotation={rotation}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color={color}
          roughness={0.3}
          metalness={0.1}
        />
        {/* Add wireframe overlay for better visual definition */}
        <lineSegments>
          <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(1, 1, 1)]} />
          <lineBasicMaterial attach="material" color="#ffffff" opacity={0.3} transparent />
        </lineSegments>
      </mesh>
    </group>
  );
}

// GLB Model Block component (when actual GLB model is available)
// This component can be used when the block.glb file is placed in /public/models/
/*
import { useGLTF } from '@react-three/drei';

export function GLBBlock({ position = [0, 0, 0], scale = 1, rotation = [0, 0, 0], ...props }: BlockProps) {
  const { scene } = useGLTF('/models/block.glb');
  
  return (
    <group {...props} position={position} scale={scale} rotation={rotation} dispose={null}>
      <primitive object={scene.clone()} />
    </group>
  );
}

// Preload the GLB model
useGLTF.preload('/models/block.glb');
*/
