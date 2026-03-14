"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import * as THREE from "three";

const DEG2RAD = Math.PI / 180;
const AUTO_ROTATE_SPEED = 0.15; // độ/frame
const MIN_FOV = 30;
const MAX_FOV = 90;
const ZOOM_SENSITIVITY = 2;

export type HotspotItem = { id: string; label: string; yaw: number; pitch: number };

const DEFAULT_HOTSPOTS: HotspotItem[] = [
  { id: "1", label: "Sofa", yaw: -30, pitch: -5 },
  { id: "2", label: "Dining table", yaw: 40, pitch: 0 },
  { id: "3", label: "Window", yaw: 120, pitch: 10 },
  { id: "4", label: "Lighting", yaw: -120, pitch: -20 },
];

export type PanoramaView360Props = {
  src: string;
  roomLabel: string;
  autoRotate: boolean;
  /** 1 = thuận chiều kim đồng hồ, -1 = ngược chiều */
  rotateDirection?: 1 | -1;
  hotspots?: HotspotItem[];
  /** URL ảnh dùng làm icon cho 4 hotspot (vd. /uploads/b/.../video_1_450.jpg) */
  hotspotIconUrl?: string;
};

export function PanoramaView360({ src, roomLabel, autoRotate, rotateDirection = 1, hotspots = DEFAULT_HOTSPOTS, hotspotIconUrl }: PanoramaView360Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hotspotPositions, setHotspotPositions] = useState<{ id: string; label: string; x: number; y: number; visible: boolean }[]>([]);
  const [fov, setFov] = useState(75);
  const yawRef = useRef(0);
  const pitchRef = useRef(0);
  const isDraggingRef = useRef(false);
  const prevPointerRef = useRef({ x: 0, y: 0 });
  const autoRotateRef = useRef(autoRotate);
  autoRotateRef.current = autoRotate;
  const rotateDirectionRef = useRef(rotateDirection);
  rotateDirectionRef.current = rotateDirection;
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  const updateHotspotPositions = useCallback(() => {
    const camera = cameraRef.current;
    if (!camera || !containerRef.current) return;
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const list: { id: string; label: string; x: number; y: number; visible: boolean }[] = [];
    const v = new THREE.Vector3();
    for (const h of hotspots) {
      const phi = (90 - h.pitch) * DEG2RAD;
      const theta = (h.yaw + 180) * DEG2RAD;
      v.setFromSphericalCoords(1, phi, theta);
      v.project(camera);
      const visible = v.z >= -1 && v.z <= 1;
      const x = (v.x * 0.5 + 0.5) * width;
      const y = (-v.y * 0.5 + 0.5) * height;
      list.push({ id: h.id, label: h.label, x, y, visible });
    }
    setHotspotPositions(list);
  }, [hotspots]);

  const updateHotspotRef = useRef(updateHotspotPositions);
  updateHotspotRef.current = updateHotspotPositions;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 0.01);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    const geometry = new THREE.SphereGeometry(1, 64, 64);
    geometry.scale(-1, 1, 1);
    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin("");
    textureLoader.load(src, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
    });

    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    let rafId: number;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const cam = cameraRef.current;
      if (cam) {
        if (autoRotateRef.current && !isDraggingRef.current) {
          const dir = rotateDirectionRef.current;
          yawRef.current += AUTO_ROTATE_SPEED * dir;
          if (yawRef.current >= 360) yawRef.current -= 360;
          if (yawRef.current < 0) yawRef.current += 360;
        }
        const yawRad = yawRef.current * DEG2RAD;
        const pitchRad = pitchRef.current * DEG2RAD;
        cam.rotation.order = "YXZ";
        cam.rotation.y = yawRad;
        cam.rotation.x = pitchRad;
      }
      renderer.render(scene, camera);
      updateHotspotRef.current();
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);
      renderer.dispose();
      container.removeChild(renderer.domElement);
      sceneRef.current = null;
      cameraRef.current = null;
      rendererRef.current = null;
    };
  }, [src]);

  useEffect(() => {
    const cam = cameraRef.current;
    if (cam) {
      cam.fov = fov;
      cam.updateProjectionMatrix();
    }
  }, [fov]);

  const onPointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    prevPointerRef.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - prevPointerRef.current.x;
    const dy = e.clientY - prevPointerRef.current.y;
    prevPointerRef.current = { x: e.clientX, y: e.clientY };
    yawRef.current -= dx * 0.4;
    pitchRef.current = Math.max(-85, Math.min(85, pitchRef.current + dy * 0.3));
    if (yawRef.current >= 360) yawRef.current -= 360;
    if (yawRef.current < 0) yawRef.current += 360;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setFov((prev) => Math.max(MIN_FOV, Math.min(MAX_FOV, prev + e.deltaY * 0.02 * ZOOM_SENSITIVITY)));
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden cursor-grab active:cursor-grabbing bg-black"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onWheel={onWheel}
      style={{ touchAction: "none" }}
    >
      <span className="absolute top-2 left-2 px-2 py-1 rounded bg-black/50 text-white text-xs font-medium z-10 pointer-events-none">
        {roomLabel} — {autoRotate ? "Đang xoay 360°" : "Kéo xoay · Scroll zoom · Hotspot"}
      </span>

      {hotspotPositions.map(
        (p) =>
          p.visible && (
            <button
              key={p.id}
              type="button"
              className="absolute z-10 w-10 h-10 rounded-full overflow-hidden bg-white/90 shadow-lg border-2 border-amber-500 flex items-center justify-center hover:scale-110 hover:border-amber-600 transition-transform pointer-events-auto animate-pulse hover:animate-none group"
              style={{
                left: p.x - 20,
                top: p.y - 20,
              }}
              title={p.label}
              aria-label={p.label}
            >
              {hotspotIconUrl ? (
                <img src={hotspotIconUrl} alt="" className="w-full h-full object-cover pointer-events-none" />
              ) : (
                <span className="pointer-events-none text-amber-600 text-sm font-bold">+</span>
              )}
              <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 px-2 py-1 rounded bg-black/80 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {p.label}
              </span>
            </button>
          )
      )}
    </div>
  );
}
