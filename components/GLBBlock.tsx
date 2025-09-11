'use client';

import { useRef, Suspense } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Define props interface for the GLB Block component
interface GLBBlockProps {
  position?: [number, number, number];
  scale?: number | [number, number, number];
  rotation?: [number, number, number];
  animate?: boolean;
  modelPath?: string;
}

// GLB Model Block component for when actual GLB model is available
export function GLBBlock({ 
  position = [0, 0, 0], 
  scale = 1, 
  rotation = [0, 0, 0], 
  animate = false,
  modelPath = '/models/block.glb',
  ...props 
}: GLBBlockProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Load the GLTF model
  const { scene } = useGLTF(modelPath);
  
  useFrame((_state, delta) => {
    if (groupRef.current && animate) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group 
      ref={groupRef} 
      {...props} 
      position={position} 
      scale={scale} 
      rotation={rotation}
      dispose={null}
    >
      <primitive object={scene.clone()} />
    </group>
  );
}

// Error boundary component for GLB loading
export function GLBBlockWithFallback(props: GLBBlockProps) {
  return (
    <Suspense fallback={
      <mesh position={props.position} scale={props.scale} rotation={props.rotation}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#94a3b8" wireframe />
      </mesh>
    }>
      <GLBBlock {...props} />
    </Suspense>
  );
}

// Preload function to be called when model is available
export function preloadGLBBlock(modelPath: string = '/models/block.glb') {
  try {
    useGLTF.preload(modelPath);
  } catch (error) {
    console.warn(`Could not preload GLB model: ${modelPath}`, error);
  }
}
