"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { PanoramaView360 } from "./PanoramaView360";

const UPLOAD_BASE = "/uploads/1/5/3/1/153154201";

// Ảnh dự án — dùng cho viewport theo phòng và gallery
const PROJECT_IMAGES = [
  "a2.jpg",
  "3a.png",
  "chot9.png",
  "living-room-dining-room-2.jpg",
  "02-1.jpg",
  "exterior.png",
  "06.jpg",
  "kitchen-1.png",
  "14-16-morris-road-014.jpg",
  "e1.png",
  "b.jpg",
  "d-01.png",
];

// 1 ảnh = 1 phòng. Mỗi phòng trong danh sách có đúng một ảnh; chuyển phòng = đổi ảnh.
const ROOM_IMAGE_BASE: Record<string, string> = {
  living1: "/room",
  living2: "/room",
  balcony: "/our_exterior",
  master1: "/room",
  master2: "/room",
  master3: "/room",
  master4: "/room",
  bath1: "/uploads/1/5/3/1/153154201",
  bath2: "/uploads/1/5/3/1/153154201",
  kid1: "/room",
  room1: "/uploads/1/5/3/1/153154201",
  kitchen1: "/room",
};
const ROOM_TO_IMAGE: Record<string, string> = {
  living1: "living/lv1.jpg",
  living2: "living/lv2.jpg",
  balcony: "oe1.jpg",
  master1: "bed/b1.jpg",
  master2: "bed/b2.jpg",
  master3: "bed/b3.jpg",
  master4: "bed/b4.jpg",
  bath1: "06.jpg",
  bath2: "kitchen-1.png",
  kid1: "kids/k1.jpg",
  room1: "02-1.jpg",
  kitchen1: "kitchen/kc1.jpg",
};
function getRoomImageSrc(room: string): string {
  const base = ROOM_IMAGE_BASE[room] ?? UPLOAD_BASE;
  const path = ROOM_TO_IMAGE[room] || PROJECT_IMAGES[0];
  return `${base}/${path}`;
}
// Mỗi phòng 1 ảnh → gallery = chính ảnh đó (strip dưới + tab Images)
function getRoomThumbnails(room: string): { base: string; paths: string[] } {
  const base = ROOM_IMAGE_BASE[room] ?? UPLOAD_BASE;
  const path = ROOM_TO_IMAGE[room];
  if (path) return { base, paths: [path] };
  return { base: UPLOAD_BASE, paths: PROJECT_IMAGES.slice(0, 8) };
}

// Panorama 360° (1 file equirectangular = 1 phòng). Để trống thì dùng View360 với 1 ảnh.
const ROOM_PANORAMA_360: Record<string, string> = {};

const ROOM_360_BASE: Record<string, string> = {
  living1: "/room",
  living2: "/room",
  balcony: "/our_exterior",
  master1: "/room",
  master2: "/room",
  master3: "/room",
  master4: "/room",
  bath1: UPLOAD_BASE,
  bath2: UPLOAD_BASE,
  kid1: "/room",
  room1: UPLOAD_BASE,
  kitchen1: "/room",
};
// 360°: mỗi phòng chỉ 1 ảnh — view 360 hiển thị đúng ảnh đó (không xoay nhiều góc)
const ROOM_IMAGES_360: Record<string, string[]> = {
  living1: ["living/lv1.jpg"],
  living2: ["living/lv2.jpg"],
  balcony: ["oe1.jpg"],
  master1: ["bed/b1.jpg"],
  master2: ["bed/b2.jpg"],
  master3: ["bed/b3.jpg"],
  master4: ["bed/b4.jpg"],
  bath1: ["06.jpg", "kitchen-1.png", "02-1.jpg", "living-room-dining-room-2.jpg"],
  bath2: ["kitchen-1.png", "06.jpg", "02-1.jpg"],
  kid1: ["kids/k1.jpg"],
  room1: ["02-1.jpg", "14-16-morris-road-014.jpg", "kitchen-1.png", "living-room-dining-room-2.jpg", "a2.jpg"],
  kitchen1: ["kitchen/kc1.jpg"],
};

const ROOMS = [
  { id: "living1", label: "Living 1", icon: "🛋️" },
  { id: "living2", label: "Living 2", icon: "🛋️" },
  { id: "balcony", label: "Balcony", icon: "🏠" },
  { id: "master1", label: "Master 1", icon: "🛏️" },
  { id: "master2", label: "Master 2", icon: "🛏️" },
  { id: "master3", label: "Master 3", icon: "🛏️" },
  { id: "master4", label: "Master 4", icon: "🛏️" },
  { id: "bath1", label: "Bath", icon: "🛁" },
  { id: "bath2", label: "Bath", icon: "🚿" },
  { id: "kid1", label: "Kid", icon: "🧒" },
  { id: "room1", label: "Room 1", icon: "🚪" },
  { id: "kitchen1", label: "Kitchen", icon: "🍳" },
];

const TRONG_NHA_IDS = ["living1", "living2", "master1", "master2", "master3", "master4", "bath1", "bath2", "kid1", "room1", "kitchen1"];
const NGOAI_NHA_IDS = ["balcony"];
const PHONG_IDS = ROOMS.map((r) => r.id);

const COLORS = [
  { id: "black", hex: "#1a1a1a", label: "Black" },
  { id: "white", hex: "#f5f5f5", label: "White" },
  { id: "mint", hex: "#a8e6cf", label: "Mint" },
  { id: "beige", hex: "#d4b896", label: "Beige" },
];

const FURNITURE_OPTIONS = [
  { id: "with", label: "With", locked: false },
  { id: "without", label: "Without", locked: true },
];

const FLOOR_OPTIONS = [
  { id: "wood", label: "Wood", locked: true },
  { id: "stone", label: "Stone", locked: false },
];

const COLLECTIONS = [
  { label: "First Class B", short: "B", locked: false },
  { label: "First Class A", short: "BA", locked: true },
  { label: "Business B", short: "BiB", locked: true },
  { label: "Business A", short: "BiA", locked: true },
  { label: "Primary B", short: "PrB", locked: true },
  { label: "Primary A", short: "PrA", locked: true },
];

// Phòng trên sơ đồ mặt bằng — click vào sẽ đổi view chính sang phòng đó (roomId = state sidebar)
const FLOOR_PLAN_ROOMS = [
  { id: "living", label: "Living", roomId: "living1" },
  { id: "living2", label: "Living 2", roomId: "living2" },
  { id: "kitchen", label: "Kitchen", roomId: "kitchen1" },
  { id: "master", label: "Master", roomId: "master1" },
  { id: "bath", label: "Bath", roomId: "bath1" },
  { id: "kid", label: "Kid", roomId: "kid1" },
];

function SectionTitle({ title, showInfo = true }: { title: string; showInfo?: boolean }) {
  return (
    <div className="flex items-center gap-1.5 mb-3">
      <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">{title}</h3>
      {showInfo && (
        <span className="text-gray-400 text-xs cursor-help w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center" title="Thông tin">i</span>
      )}
    </div>
  );
}

function PillButton({
  active,
  onClick,
  children,
  locked = false,
  className = "",
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  locked?: boolean;
  className?: string;
}) {
  const disabled = locked;
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 ${disabled ? "bg-gray-100 text-gray-400 border border-gray-300 cursor-not-allowed" : active ? "bg-teal-500 text-white border border-teal-500" : "bg-white text-gray-800 border border-gray-300 hover:border-gray-400"} ${className}`}
    >
      {children}
      {locked && <span className="text-[10px] opacity-70" aria-hidden>🔒</span>}
    </button>
  );
}

function RightIcon({ label, active, icon, onClick }: { label: string; active?: boolean; icon: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-0.5 py-2 px-3 rounded-lg text-xs font-medium transition-colors ${active ? "bg-teal-500 text-white" : "bg-white/95 text-gray-700 hover:bg-white border border-gray-200"}`}
      title={label}
      aria-label={label}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

const AUTO_ROTATE_SPEED = 0.5; // độ mỗi frame
const DRAG_SENSITIVITY = 0.5; // 1px kéo = 0.5 độ

/** View 360°: nhiều ảnh theo góc — xoay = đổi ảnh, cảm giác đứng trong phòng quay nhìn nội thất */
function View360({ images, roomLabel, autoRotate, rotateDirection, baseUrl }: { images: string[]; roomLabel: string; autoRotate: boolean; rotateDirection: 1 | -1; baseUrl: string }) {
  const n = images.length;
  const [yaw, setYaw] = useState(0); // 0–360, góc nhìn
  const [isDragging, setIsDragging] = useState(false);
  const startRef = useRef({ x: 0, yaw: 0 });
  const yawRef = useRef(0);
  const directionRef = useRef(rotateDirection);
  directionRef.current = rotateDirection;
  const rafRef = useRef<number>(0);

  yawRef.current = yaw;

  // Tự động xoay khi bấm Play (chiều quay theo rotateDirection)
  useEffect(() => {
    if (!autoRotate || isDragging || n === 0) return;
    const tick = () => {
      yawRef.current += AUTO_ROTATE_SPEED * directionRef.current;
      if (yawRef.current >= 360) yawRef.current -= 360;
      if (yawRef.current < 0) yawRef.current += 360;
      setYaw(yawRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [autoRotate, isDragging, n]);

  const onPointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    startRef.current = { x: e.clientX, yaw: yawRef.current };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - startRef.current.x;
    let newYaw = startRef.current.yaw + dx * DRAG_SENSITIVITY;
    if (newYaw >= 360) newYaw -= 360;
    if (newYaw < 0) newYaw += 360;
    yawRef.current = newYaw;
    setYaw(newYaw);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  if (n === 0) return null;

  // Góc 0–360 → index ảnh (0 đến n-1) + hệ số blend với ảnh kế tiếp (crossfade mượt)
  const anglePerImage = 360 / n;
  const rawIndex = (yaw * n) / 360;
  const index0 = Math.floor(rawIndex % n + n) % n;
  const index1 = (index0 + 1) % n;
  const blend = rawIndex - Math.floor(rawIndex); // 0..1

  return (
    <div
      className="w-full h-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing relative"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {/* Ảnh nền (góc trước) */}
      <div className="absolute inset-0">
        <Image
          src={`${baseUrl}/${images[index0]}`}
          alt={`${roomLabel} view ${index0 + 1}`}
          fill
          className="object-cover select-none pointer-events-none"
          sizes="(max-width:1200px) 100vw, 1200px"
          draggable={false}
        />
      </div>
      {/* Ảnh góc sau — crossfade khi chuyển cảnh */}
      <div className="absolute inset-0" style={{ opacity: blend }}>
        <Image
          src={`${baseUrl}/${images[index1]}`}
          alt={`${roomLabel} view ${index1 + 1}`}
          fill
          className="object-cover select-none pointer-events-none transition-opacity duration-75"
          sizes="(max-width:1200px) 100vw, 1200px"
          draggable={false}
        />
      </div>
      <span className="absolute top-2 left-2 px-2 py-1 rounded bg-black/50 text-white text-xs font-medium z-10 pointer-events-none">
        {roomLabel} — {autoRotate ? "Đang xoay 360°" : "Kéo trái/phải để nhìn xung quanh · Play = tự xoay"}
      </span>
      <span className="absolute top-2 right-2 px-2 py-1 rounded bg-black/40 text-white text-xs z-10 pointer-events-none">
        {index0 + 1}/{n} góc
      </span>
    </div>
  );
}

export default function HouseTourClient() {
  const [room, setRoom] = useState("living1");
  const [color, setColor] = useState("black");
  const [furniture, setFurniture] = useState("with");
  const [floor, setFloor] = useState("stone");
  const [collection, setCollection] = useState("First Class B");
  const [rightView, setRightView] = useState<"layout" | "360" | "images" | "spec" | "download">("360");
  const [isPlaying, setIsPlaying] = useState(false);
  /** 1 = chiều kim đồng hồ, -1 = ngược chiều. Bấm icon vòng lặp để đổi. */
  const [rotateDirection, setRotateDirection] = useState<1 | -1>(1);

  const searchParams = useSearchParams();
  const tourFromUrl = Math.min(3, Math.max(1, parseInt(searchParams.get("tour") || "1", 10) || 1));
  const [houseTourIndex, setHouseTourIndex] = useState(tourFromUrl);
  type RoomFilter = "trong-nha" | "ngoai-nha" | "phong";
  const [roomFilter, setRoomFilter] = useState<RoomFilter>("phong");
  const [trongNhaIndex, setTrongNhaIndex] = useState(0);
  const [ngoaiNhaIndex, setNgoaiNhaIndex] = useState(0);
  const [phongIndex, setPhongIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const filterIds =
    roomFilter === "trong-nha" ? TRONG_NHA_IDS : roomFilter === "ngoai-nha" ? NGOAI_NHA_IDS : PHONG_IDS;
  const filteredRooms = ROOMS.filter((r) => filterIds.includes(r.id));

  const switchFilter = (f: RoomFilter) => {
    setRoomFilter(f);
    const ids = f === "trong-nha" ? TRONG_NHA_IDS : f === "ngoai-nha" ? NGOAI_NHA_IDS : PHONG_IDS;
    const list = ROOMS.filter((r) => ids.includes(r.id));
    if (!ids.includes(room) && list.length > 0) setRoom(list[0].id);
  };

  useEffect(() => {
    setHouseTourIndex(tourFromUrl);
  }, [tourFromUrl]);

  const goHouseTourPrev = () => setHouseTourIndex((i) => (i <= 1 ? 3 : i - 1));
  const goHouseTourNext = () => setHouseTourIndex((i) => (i >= 3 ? 1 : i + 1));

  // Click phòng trên sơ đồ → đổi view chính sang phòng đó (và đồng bộ sidebar)
  const selectRoomFromFloorPlan = (roomId: string) => {
    setRoom(roomId);
  };

  return (
    <div className="min-h-screen flex bg-gray-800 relative">
      {/* Nút hamburger khi sidebar đóng — mở lại panel Lọc */}
      {!sidebarOpen && (
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-xl bg-gray-100/95 backdrop-blur border border-gray-200 shadow-lg flex items-center justify-center text-gray-700 hover:bg-white transition-colors"
          aria-label="Mở bảng lọc"
        >
          <span className="text-xl font-bold" style={{ fontFamily: "ui-sans-serif" }}>≡</span>
        </button>
      )}

      {/* Left Sidebar - frosted panel */}
      <aside
        className={`w-80 flex-shrink-0 bg-gray-100/95 backdrop-blur rounded-r-2xl shadow-xl overflow-y-auto p-5 flex flex-col gap-6 border border-gray-200/50 transition-transform duration-300 ease-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full absolute left-0 top-0 bottom-0 z-20"
        }`}
      >
        {/* Nút đóng sidebar (≡) + Nút chuyển House Tour: ‹ House Tour 1 › */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="flex-shrink-0 w-9 h-9 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700"
            aria-label="Đóng bảng lọc"
          >
            <span className="text-lg font-bold" style={{ fontFamily: "ui-sans-serif" }}>≡</span>
          </button>
          <Link
            href={`/house-tour?tour=${houseTourIndex <= 1 ? 3 : houseTourIndex - 1}`}
            className="flex-shrink-0 w-9 h-9 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700 font-bold"
            aria-label="House Tour trước"
          >
            ‹
          </Link>
          <span className="flex-1 text-center text-sm font-semibold text-gray-800">House Tour {houseTourIndex}</span>
          <Link
            href={`/house-tour?tour=${houseTourIndex >= 3 ? 1 : houseTourIndex + 1}`}
            className="flex-shrink-0 w-9 h-9 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700 font-bold"
            aria-label="House Tour sau"
          >
            ›
          </Link>
        </div>

        {/* 3 nút lọc: Trong nhà / Ngoài nhà / Phòng */}
        <div className="flex flex-col gap-2">
          <SectionTitle title="Lọc" showInfo={false} />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => switchFilter("trong-nha")}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                roomFilter === "trong-nha"
                  ? "bg-teal-500 text-white shadow"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Trong nhà
            </button>
            <button
              type="button"
              onClick={() => switchFilter("ngoai-nha")}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                roomFilter === "ngoai-nha"
                  ? "bg-teal-500 text-white shadow"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Ngoài nhà
            </button>
            <button
              type="button"
              onClick={() => switchFilter("phong")}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                roomFilter === "phong"
                  ? "bg-teal-500 text-white shadow"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Phòng
            </button>
          </div>
        </div>

        {/* ROOM — chỉ hiện phòng theo filter đã chọn */}
        <div>
          <SectionTitle title="Room" />
          <div className="flex flex-wrap gap-2">
            {filteredRooms.map((r) => (
              <PillButton key={r.id} active={room === r.id} onClick={() => setRoom(r.id)}>
                <span className="mr-0.5">{r.icon}</span>
                {r.label}
              </PillButton>
            ))}
          </div>
        </div>

        {/* Color Palette */}
        <div>
          <SectionTitle title="Color Palette" />
          <div className="flex flex-wrap gap-3">
            {COLORS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setColor(c.id)}
                className={`w-10 h-10 rounded-full border-2 transition-all ${color === c.id ? "border-gray-800 ring-2 ring-teal-400 ring-offset-2" : "border-gray-300 hover:border-gray-400"}`}
                style={{ backgroundColor: c.hex }}
                title={c.label}
                aria-label={c.label}
              />
            ))}
          </div>
        </div>

        {/* Furniture */}
        <div>
          <SectionTitle title="Furniture" />
          <div className="flex flex-wrap gap-2">
            {FURNITURE_OPTIONS.map((f) => (
              <PillButton key={f.id} active={furniture === f.id} onClick={() => !f.locked && setFurniture(f.id)} locked={f.locked}>
                {f.label}
              </PillButton>
            ))}
          </div>
        </div>

        {/* Floor */}
        <div>
          <SectionTitle title="Floor" />
          <div className="flex flex-wrap gap-2">
            {FLOOR_OPTIONS.map((f) => (
              <PillButton key={f.id} active={floor === f.id} onClick={() => !f.locked && setFloor(f.id)} locked={f.locked}>
                {f.label}
              </PillButton>
            ))}
          </div>
        </div>

        {/* Collection */}
        <div>
          <SectionTitle title="Collection" />
          <div className="grid grid-cols-2 gap-2">
            {COLLECTIONS.map((c) => (
              <PillButton
                key={c.label}
                active={collection === c.label}
                onClick={() => !c.locked && setCollection(c.label)}
                locked={c.locked}
              >
                {c.short}
              </PillButton>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="mt-auto w-full py-3 rounded-xl bg-teal-500 text-white font-semibold hover:bg-teal-600 transition-colors shadow"
        >
          Save & Finish
        </button>
      </aside>

      {/* Main Viewport */}
      <main className="flex-1 relative flex flex-col min-h-0">
        {/* Top bar - playback (giống rainbow-telaviv: Play = tự xoay 360°, Pause = dừng) */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 bg-[#e8e4df] rounded-full px-2 py-1.5 shadow-lg border border-gray-300/50">
          <button
            type="button"
            onClick={() => setRotateDirection((d) => (d === 1 ? -1 : 1))}
            className={`p-2 rounded-full hover:bg-white/50 ${rotateDirection === -1 ? "bg-teal-500/20 text-teal-700" : "text-gray-600 hover:text-gray-900"}`}
            aria-label={rotateDirection === 1 ? "Đổi chiều quay (hiện tại: thuận)" : "Đổi chiều quay (hiện tại: ngược)"}
            title={rotateDirection === 1 ? "Chiều thuận · Bấm để quay ngược" : "Chiều ngược · Bấm để quay thuận"}
          >
            {rotateDirection === 1 ? "↻" : "↺"}
          </button>
          <button
            type="button"
            onClick={() => setIsPlaying(false)}
            className={`p-2 rounded-full ${!isPlaying ? "bg-gray-700 text-white" : "text-gray-600 hover:bg-white/50"}`}
            aria-label="Pause"
          >
            ‖
          </button>
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            className={`p-2 rounded-lg ${isPlaying ? "bg-teal-500 text-white" : "text-gray-600 hover:bg-white/50"}`}
            aria-label="Play"
          >
            ▶
          </button>
          <button type="button" className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-white/50" aria-label="Next">▶▶</button>
        </div>

        {/* Right sidebar - Layout, 360°, Images, Spec., Download */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2">
          <RightIcon
            label="Layout"
            active={rightView === "layout"}
            icon="📐"
            onClick={() => setRightView((prev) => (prev === "layout" ? "360" : "layout"))}
          />
          <div className="bg-gray-200/90 rounded-xl p-1.5 flex flex-col gap-1 border border-gray-300/50">
            <button
              type="button"
              onClick={() => setRightView("360")}
              className={`flex flex-col items-center gap-0.5 py-2 px-3 rounded-lg text-xs font-medium transition-colors ${rightView === "360" ? "bg-teal-500 text-white" : "bg-transparent text-gray-700 hover:bg-white/50"}`}
              aria-label="360°"
            >
              <span className="text-lg">⟳</span>
              <span>360°</span>
            </button>
            <button
              type="button"
              onClick={() => setRightView("images")}
              className={`flex flex-col items-center gap-0.5 py-2 px-3 rounded-lg text-xs font-medium transition-colors ${rightView === "images" ? "bg-teal-500 text-white" : "bg-transparent text-gray-700 hover:bg-white/50"}`}
              aria-label="Images"
            >
              <span className="text-lg">🖼️</span>
              <span>Images</span>
            </button>
            <button
              type="button"
              onClick={() => setRightView("spec")}
              className={`flex flex-col items-center gap-0.5 py-2 px-3 rounded-lg text-xs font-medium transition-colors ${rightView === "spec" ? "bg-teal-500 text-white" : "bg-transparent text-gray-700 hover:bg-white/50"}`}
              aria-label="Spec."
            >
              <span className="text-lg">💡</span>
              <span>Spec.</span>
            </button>
          </div>
          <RightIcon
            label="Download"
            active={rightView === "download"}
            icon="↓"
            onClick={() => setRightView("download")}
          />
        </div>

        {/* 3D / Scene area — áp dụng màu từ Color Palette (overlay tint) */}
        {(() => {
          const selectedColorHex = COLORS.find((c) => c.id === color)?.hex ?? "#1a1a1a";
          return (
        <div className="flex-1 min-h-[400px] bg-gray-700 flex items-center justify-center relative overflow-hidden">
          <div className="w-full h-full max-w-5xl min-h-[380px] flex items-center justify-center rounded-lg m-4 border border-gray-500/50 overflow-hidden bg-gray-600/50 relative">
            <div
              className="absolute inset-0 pointer-events-none z-[1] rounded-lg mix-blend-multiply opacity-30"
              style={{ backgroundColor: selectedColorHex }}
              aria-hidden
            />
            {rightView === "images" ? (
              <div className="w-full h-full p-4 overflow-y-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {(() => {
                    const { base, paths } = getRoomThumbnails(room);
                    return paths.map((name) => (
                      <div key={name} className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-500">
                        <Image
                          src={`${base}/${name}`}
                          alt={name.replace(/\.[^.]+$/, "")}
                          fill
                          className="object-cover"
                          sizes="(max-width:640px) 50vw, 33vw"
                        />
                      </div>
                    ));
                  })()}
                </div>
              </div>
            ) : rightView === "360" ? (() => {
              const panoramaSrc = ROOM_PANORAMA_360[room];
              const base = ROOM_360_BASE[room] ?? UPLOAD_BASE;
              const images = ROOM_IMAGES_360[room] ?? [ROOM_TO_IMAGE[room] || PROJECT_IMAGES[0]];
              const singleImageSrc = panoramaSrc || (images.length === 1 ? `${base}/${images[0]}` : null);
              const label = ROOMS.find((r) => r.id === room)?.label || room;
              if (singleImageSrc) {
                return (
                  <PanoramaView360
                    src={singleImageSrc}
                    roomLabel={label}
                    autoRotate={isPlaying}
                    rotateDirection={rotateDirection}
                    hotspotIconUrl="/uploads/b/153154201-360091501976169670/video_1_450.jpg"
                  />
                );
              }
              return (
                <View360
                  images={images}
                  roomLabel={label}
                  autoRotate={isPlaying}
                  rotateDirection={rotateDirection}
                  baseUrl={base}
                />
              );
            })() : (
              <>
                <Image
                  src={getRoomImageSrc(room)}
                  alt={`Room ${room}`}
                  fill
                  className="object-cover"
                  sizes="(max-width:1200px) 100vw, 1200px"
                  priority
                />
                <span className="absolute top-2 left-2 px-2 py-1 rounded bg-black/50 text-white text-xs font-medium capitalize">
                  {ROOMS.find((r) => r.id === room)?.label || room}
                </span>
                <div className="absolute bottom-2 left-2 right-2 flex gap-2 overflow-x-auto pb-1">
                  {(() => {
                    const { base, paths } = getRoomThumbnails(room);
                    return paths.map((name) => (
                      <div key={name} className="relative w-24 h-16 flex-shrink-0 rounded overflow-hidden border-2 border-white/60 shadow-lg">
                        <Image
                          src={`${base}/${name}`}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>
                    ));
                  })()}
                </div>
              </>
            )}
          </div>

          {/* Floor plan overlay — chỉ hiện khi bấm Layout; click từng phòng → view chính chuyển sang phòng đó */}
          {rightView === "layout" && (
          <div className="absolute right-6 top-6 bottom-24 w-72 bg-white/95 backdrop-blur rounded-xl shadow-xl border border-gray-200 overflow-hidden flex flex-col z-10">
            <p className="text-sm font-semibold text-gray-800 px-3 pt-3 pb-2 border-b border-gray-100">Sơ đồ mặt bằng — bấm phòng để xem</p>
            <div className="relative flex-1 min-h-[180px] bg-[#c4b5a5]">
              <Image
                src="/images/layout.jpeg"
                alt="Floor plan"
                fill
                className="object-contain p-1"
                sizes="288px"
              />
            </div>
            <div className="flex flex-wrap gap-1.5 p-3 border-t border-gray-100">
              {FLOOR_PLAN_ROOMS.map((fp) => {
                const isActive = room === fp.roomId || (fp.roomId === "bath1" && (room === "bath1" || room === "bath2"));
                return (
                  <button
                    key={fp.id}
                    type="button"
                    onClick={() => selectRoomFromFloorPlan(fp.roomId)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${isActive ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                  >
                    {fp.label}
                  </button>
                );
              })}
            </div>
          </div>
          )}
        </div>
          );
        })()}

        {/* Footer message */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 bg-gray-900/80 backdrop-blur rounded text-gray-300 text-sm">
          *9098 To purchase the apartment or for more information{" "}
          <Link href="/contact" className="text-teal-400 hover:underline">contact us</Link>
        </div>
      </main>
    </div>
  );
}
