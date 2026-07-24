/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { prefersReducedMotion } from '../lib/gsap';

interface ThreeHeroSceneProps {
  className?: string;
}

export default function ThreeHeroScene({ className = '' }: ThreeHeroSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduced = prefersReducedMotion();
    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      // WebGL unavailable — leave the decorative CSS background as-is.
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      Math.max(container.clientWidth, 1) / Math.max(container.clientHeight, 1),
      0.1,
      100
    );
    camera.position.set(0, 0.7, 6.5);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth || 1, container.clientHeight || 1);
    container.appendChild(renderer.domElement);

    // Undulating silk-fabric plane
    const geometry = new THREE.PlaneGeometry(10, 5, 120, 60);
    const positionAttr = geometry.attributes.position;
    const basePositions = Float32Array.from(positionAttr.array as Float32Array);

    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#9e3745'),
      emissive: new THREE.Color('#40121b'),
      emissiveIntensity: 0.35,
      metalness: 0.4,
      roughness: 0.35,
      side: THREE.DoubleSide,
    });

    const fabric = new THREE.Mesh(geometry, material);
    fabric.rotation.x = -Math.PI / 2.5;
    fabric.position.y = -0.6;
    scene.add(fabric);

    // Drifting gold-thread dust particles
    const particleCount = window.innerWidth < 768 ? 100 : 240;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 11;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 5 + 1.2;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: new THREE.Color('#e0b66b'),
      size: 0.035,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Lighting
    scene.add(new THREE.AmbientLight('#fbf5e6', 0.7));
    const keyLight = new THREE.DirectionalLight('#e0b66b', 1.1);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight('#d49842', 0.9, 20);
    rimLight.position.set(-4, 1, 2);
    scene.add(rimLight);

    let frameId = 0;
    let time = 0;
    let isVisible = true;

    // Cursor parallax targets (normalized -1..1), eased toward each frame
    let pointerX = 0;
    let pointerY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    const renderFrame = () => {
      const pos = positionAttr.array as Float32Array;
      for (let i = 0; i < pos.length; i += 3) {
        const x = basePositions[i];
        const y = basePositions[i + 1];
        pos[i + 2] = Math.sin(x * 0.6 + time) * 0.35 + Math.cos(y * 0.5 + time * 0.8) * 0.25;
      }
      positionAttr.needsUpdate = true;
      geometry.computeVertexNormals();

      // Ease current tilt toward the pointer-driven target for a smooth parallax follow
      currentTiltX += (pointerX - currentTiltX) * 0.05;
      currentTiltY += (pointerY - currentTiltY) * 0.05;

      fabric.rotation.z = Math.sin(time * 0.15) * 0.05 + currentTiltX * 0.12;
      fabric.rotation.y = currentTiltX * 0.2;
      camera.position.x = currentTiltX * 0.8;
      camera.position.y = 0.7 - currentTiltY * 0.5;
      camera.lookAt(0, 0, 0);
      particles.rotation.y = time * 0.05 + currentTiltX * 0.3;

      renderer.render(scene, camera);
    };

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (!isVisible) return;
      time += 0.008;
      renderFrame();
    };

    if (reduced) {
      renderFrame();
    } else {
      animate();
    }

    const handleVisibility = () => {
      isVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Cursor-reactive parallax: track pointer position relative to the hero
    // section (the canvas itself is pointer-events-none, so we listen on
    // window and compute relative position via the container's rect).
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const relX = ((e.clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1;
      const relY = ((e.clientY - rect.top) / Math.max(rect.height, 1)) * 2 - 1;
      pointerX = Math.max(-1, Math.min(1, relX));
      pointerY = Math.max(-1, Math.min(1, relY));
    };
    const handlePointerLeave = () => {
      pointerX = 0;
      pointerY = 0;
    };

    if (!reduced) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerleave', handlePointerLeave);
    }

    const resizeObserver = new ResizeObserver(() => {
      const { clientWidth, clientHeight } = container;
      if (clientWidth === 0 || clientHeight === 0) return;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
      if (reduced) renderFrame();
    });
    resizeObserver.observe(container);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      resizeObserver.disconnect();
      geometry.dispose();
      material.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className={className} aria-hidden="true" />;
}
