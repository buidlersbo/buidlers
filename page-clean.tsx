'use client';
import { useState } from 'react';
import { Button } from '@heroui/react';

export default function Home() {
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = () => {
    setShowMessage(true);
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-8 p-8'>
      <Button 
        color='primary' 
        size='lg'
        onClick={handleClick}
      >
        Hello World
      </Button>
      
      {showMessage && (
        <p className='text-2xl font-semibold text-gray-800 dark:text-white'>
          Hello World! 🌍
        </p>
      )}
    </div>
  );
}
