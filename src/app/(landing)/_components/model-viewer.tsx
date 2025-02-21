"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, PerspectiveCamera } from "@react-three/drei";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import * as THREE from "three";
import React from "react";

function Model({ onLoad }: { onLoad: () => void }) {
  const { scene } = useGLTF(
    "https://raw.githubusercontent.com/kkhh-hub/sadeem-statics/main/sadeem_full.glb"
  );
  const modelRef = useRef<THREE.Group>(null);
  const rotationDirection = useRef(1);
  const rotationLimit = 0.3; // 17 degree

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.toneMapped = false;
        }
      });
      // Set initial rotation to face camera (180 degrees / π radians)
      modelRef.current.rotation.y = Math.PI + Math.PI / 2;
    }
    onLoad();
  }, [onLoad]);

  useFrame((state) => {
    if (modelRef.current) {
      const baseRotation = Math.PI + Math.PI / 2;
      // Adjust rotation limits relative to the initial rotation
      if (modelRef.current.rotation.y >= baseRotation + rotationLimit) {
        rotationDirection.current = -1;
      } else if (modelRef.current.rotation.y <= baseRotation - rotationLimit) {
        rotationDirection.current = 1;
      }

      modelRef.current.rotation.y += 0.002 * rotationDirection.current;
    }
  });

  return (
    <primitive ref={modelRef} object={scene} scale={3} position={[0, 0, 0]} />
  );
}

function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex flex-col md:left-[35rem] items-center justify-center">
      <img
        src="/labeeb.svg"
        alt="Labeeb"
        className="h-72 md:h-[23rem] md:w-1/3 mt-24 md:mt-0 object-contain animate-pulse"
      />
      {/* <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#881739] border-t-transparent" /> */}
    </div>
  );
}

// Add this new component at the top level
class ModelErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Add this new fallback component
function FallbackImage() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <img
        src="/labeeb.svg"
        alt="Labeeb"
        className="w-full h-full object-contain"
      />
    </div>
  );
}

export default function ModelViewer() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}

      <ModelErrorBoundary fallback={<FallbackImage />}>
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={50} />
          <ambientLight intensity={1.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
          <pointLight position={[-5, -5, -5]} intensity={0.5} />
          <Suspense fallback={null}>
            <Model onLoad={handleLoad} />
          </Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={false}
            enableRotate={false}
            autoRotateSpeed={0.3}
          />
        </Canvas>
      </ModelErrorBoundary>
    </>
  );
}
