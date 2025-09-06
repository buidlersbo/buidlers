'use client';
import Image from "next/image";
import { useState } from "react";
import { 
  Button, 
  Card, 
  CardBody, 
  CardHeader,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Chip,
  Avatar
} from "@heroui/react";

export default function Home() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("Hello World! 🌎");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleGreeting = () => {
    if (name.trim()) {
      setMessage(`Hello ${name}! 🎉 Welcome to HeroUI + Tailwind v4`);
    } else {
      setMessage("Hello World! 🌎 Please enter your name");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="w-full p-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
          🚀 Hello World - HeroUI Demo
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Next.js + HeroUI + Tailwind CSS v4 + TypeScript
        </p>
      </header>

      <main className="container mx-auto px-4 py-8 flex flex-col items-center gap-8">
        {/* Logo Section */}
        <div className="flex items-center gap-4 mb-8">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={120}
            height={24}
            priority
          />
          <Chip color="success" variant="flat">
            + HeroUI v2.8+
          </Chip>
        </div>

        {/* Main Card */}
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="flex gap-3 pb-4">
            <Avatar
              icon={<span className="text-2xl">👋</span>}
              classNames={{
                base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                icon: "text-black/80",
              }}
            />
            <div className="flex flex-col">
              <p className="text-lg font-semibold">Interactive Greeting</p>
              <p className="text-small text-default-500">Enter your name</p>
            </div>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg text-center">
              <p className="text-lg font-medium text-gray-800 dark:text-white">
                {message}
              </p>
            </div>
            
            <Input
              label="Your name"
              placeholder="Enter your name here..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="bordered"
              color="primary"
              size="lg"
              classNames={{
                input: "text-lg",
                inputWrapper: "h-12"
              }}
            />

            <div className="flex gap-2">
              <Button 
                color="primary" 
                variant="solid"
                onClick={handleGreeting}
                className="flex-1"
                size="lg"
              >
                👋 Greet
              </Button>
              <Button 
                color="secondary" 
                variant="bordered"
                onClick={onOpen}
                size="lg"
              >
                ℹ️ Info
              </Button>
            </div>

            <Button 
              color="success" 
              variant="flat"
              onClick={() => setName("")}
              className="w-full"
            >
              🔄 Clear
            </Button>
          </CardBody>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-8">
          <Card className="p-4 hover:shadow-lg transition-shadow">
            <CardBody className="text-center">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold mb-2">Tailwind CSS v4</h3>
              <p className="text-small text-default-500">
                CSS-first approach with better performance
              </p>
            </CardBody>
          </Card>

          <Card className="p-4 hover:shadow-lg transition-shadow">
            <CardBody className="text-center">
              <div className="text-3xl mb-2">🎨</div>
              <h3 className="font-semibold mb-2">HeroUI Components</h3>
              <p className="text-small text-default-500">
                Modern and accessible components
              </p>
            </CardBody>
          </Card>

          <Card className="p-4 hover:shadow-lg transition-shadow">
            <CardBody className="text-center">
              <div className="text-3xl mb-2">🚀</div>
              <h3 className="font-semibold mb-2">Next.js 15</h3>
              <p className="text-small text-default-500">
                With Turbopack for fast development
              </p>
            </CardBody>
          </Card>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mt-8">
          <Chip color="primary" variant="flat">React 19</Chip>
          <Chip color="secondary" variant="flat">TypeScript</Chip>
          <Chip color="success" variant="flat">Tailwind CSS v4</Chip>
          <Chip color="warning" variant="flat">HeroUI v2.8+</Chip>
          <Chip color="danger" variant="flat">Framer Motion</Chip>
        </div>
      </main>

      {/* Info Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                🎉 Project Information!
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">🔧 Tech Stack:</h4>
                    <ul className="space-y-1 text-small">
                      <li>• <strong>Next.js 15.5.2</strong> - React Framework</li>
                      <li>• <strong>HeroUI v2.8+</strong> - Component Library</li>
                      <li>• <strong>Tailwind CSS v4</strong> - CSS Framework</li>
                      <li>• <strong>TypeScript</strong> - Static Typing</li>
                      <li>• <strong>Framer Motion</strong> - Animations</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">✨ Features:</h4>
                    <ul className="space-y-1 text-small">
                      <li>• Modern and accessible components</li>
                      <li>• Automatic light/dark theme</li>
                      <li>• Responsive design</li>
                      <li>• Smooth animations</li>
                    </ul>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Got it!
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}