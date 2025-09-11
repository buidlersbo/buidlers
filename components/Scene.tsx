'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Html } from '@react-three/drei';
import { BlocksGrid } from './BlocksGrid';

// Loading component for Suspense
function Loader() {
  return (
    <Html center>
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2 text-gray-600">Loading 3D Model...</span>
      </div>
    </Html>
  );
}

export function Scene() {
  return (
    <div className="w-full h-[600px] bg-gray-100 rounded-lg overflow-hidden">
      <Canvas
        camera={{ 
          position: [15, 12, 15], 
          fov: 60,
          near: 0.1,
          far: 1000 
        }}
        gl={{ antialias: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        
        {/* Environment and Controls */}
        <Environment preset="studio" />
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={30}
          target={[0, 0, 0]}
        />
        
        {/* 3D Content */}
        <Suspense fallback={<Loader />}>
          {/* 10x10 Grid of Blocks */}
          <BlocksGrid 
            rows={10} 
            columns={10} 
            spacing={1.5} 
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
