"use client";
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const Globe = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(5, 64, 64);
    const textureLoader = new THREE.TextureLoader();


    const baseTexture = textureLoader.load(
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZEBFbDrCTBzHCFl-Qkd1Zpa-SqzK4BSkm0Q&s"
    );

    const material = new THREE.MeshPhongMaterial({
      map: baseTexture,
      color: new THREE.Color(0x4a90e2), 
      transparent: true,
      opacity: 0.9,
    });

    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    const wireframeGeometry = new THREE.WireframeGeometry(geometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 1 });
    const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    scene.add(wireframe); 

    
    const ambientLight = new THREE.AmbientLight(0x4a90e2, 0.5); 
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0x4a90e2, 0x000000, 1); 
    scene.add(hemiLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Set Camera Position
    camera.position.set(0, 0, 12);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.enableZoom = false;
    controls.autoRotate = false;

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.005; // Rotate the globe
      wireframe.rotation.y += 0.005; // Rotate wireframe grid with the globe
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle Resize
    const handleResize = () => {
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-1/3 h-full border-r border-gray-700" />;
};
