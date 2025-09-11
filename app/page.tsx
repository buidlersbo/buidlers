'use client';
import { useState, Suspense } from "react";
import { Button } from "@heroui/react";
import dynamic from "next/dynamic";

// Dynamically import the Scene component to avoid SSR issues
const Scene = dynamic(() => import('../components/Scene').then(mod => ({ default: mod.Scene })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-gray-500">Loading 3D Scene...</div>
    </div>
  )
});

export default function Home() {
  const [showMessage, setShowMessage] = useState(false);
  const [show3D, setShow3D] = useState(false);

  const handleClick = () => {
    setShowMessage(true);
  };

  const handle3DClick = () => {
    setShow3D(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
        React Three Fiber + HeroUI Demo
      </h1>
      
      <div className="flex gap-4 mb-8">
        <Button 
          color="primary" 
          size="lg"
          onClick={handleClick}
        >
          Hello World
        </Button>
        
        <Button 
          color="secondary" 
          size="lg"
          onClick={handle3DClick}
        >
          Load 3D Scene
        </Button>
      </div>
      
      {showMessage && (
        <p className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Hello World! 🌍
        </p>
      )}

      {show3D && (
        <div className="w-full max-w-4xl">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            3D Block Component Demo
          </h2>
          <Suspense fallback={
            <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          }>
            <Scene />
          </Suspense>
          
          <div className="mt-4 p-4 bg-yellow-100 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> To see the 3D blocks, please add your <code>block.glb</code> model to <code>/public/models/block.glb</code>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
