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

// Số nhà trên trang chủ (Featured slideshow)
const TOTAL_HOUSES = 12;
// Flow: Portfolio (House 1..12 → Exterior|Interior) | Rooms (Living Room|Bedroom|Bathroom|Kitchen)
const PORTFOLIO_EXTERIOR_IDS = ["balcony"];
const PORTFOLIO_INTERIOR_IDS = ["living1", "living2", "master1", "master2", "master3", "master4", "bath1", "bath2", "kid1", "room1", "kitchen1"];
const ROOM_CATEGORIES = {
  livingRoom: { label: "Living Room", ids: ["living1", "living2"] },
  bedroom: { label: "Bedroom", ids: ["master1", "master2", "master3", "master4", "kid1", "room1"] },
  bathroom: { label: "Bathroom", ids: ["bath1", "bath2"] },
  kitchen: { label: "Kitchen", ids: ["kitchen1"] },
} as const;
type RoomCategoryKey = keyof typeof ROOM_CATEGORIES;

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
      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 drop-shadow-sm" style={{ textShadow: "0 0 1px rgba(255,255,255,0.8)" }}>
        {title}
      </h3>
      {showInfo && (
        <span className="text-gray-500 text-xs cursor-help w-4 h-4 rounded-full border border-gray-500 flex items-center justify-center" title="Thông tin">i</span>
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

const AUTO_ROTATE_SPEED = 0.5; // độ mỗi frame (base)
const DRAG_SENSITIVITY = 0.5; // 1px kéo = 0.5 độ

/** View 360°: nhiều ảnh theo góc — xoay = đổi ảnh, cảm giác đứng trong phòng quay nhìn nội thất */
function View360({
  images,
  roomLabel,
  autoRotate,
  rotateDirection,
  baseUrl,
  speedMultiplier = 1,
}: {
  images: string[];
  roomLabel: string;
  autoRotate: boolean;
  rotateDirection: 1 | -1;
  baseUrl: string;
  speedMultiplier?: number;
}) {
  const n = images.length;
  const [yaw, setYaw] = useState(0); // 0–360, góc nhìn
  const [isDragging, setIsDragging] = useState(false);
  const startRef = useRef({ x: 0, yaw: 0 });
  const yawRef = useRef(0);
  const directionRef = useRef(rotateDirection);
  directionRef.current = rotateDirection;
  const speedRef = useRef(speedMultiplier);
  speedRef.current = speedMultiplier;
  const rafRef = useRef<number>(0);

  yawRef.current = yaw;

  // Tự động xoay khi bấm Play (chiều quay theo rotateDirection, tốc độ theo speedMultiplier)
  useEffect(() => {
    if (!autoRotate || isDragging || n === 0) return;
    const tick = () => {
      yawRef.current += AUTO_ROTATE_SPEED * speedRef.current * directionRef.current;
      if (yawRef.current >= 360) yawRef.current -= 360;
      if (yawRef.current < 0) yawRef.current += 360;
      setYaw(yawRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [autoRotate, isDragging, n, speedMultiplier]);

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
  const [rightView, setRightView] = useState<"layout" | "360" | "images" | "spec" | "download">("360");
  /** Mặc định phát; một nút bật/tắt Play/Pause. */
  const [isPlaying, setIsPlaying] = useState(true);
  /** Mặc định 0.5×. << giảm một nửa, >> tăng gấp đôi (1 = gốc, 0.5, 0.25). */
  const [speedMultiplier, setSpeedMultiplier] = useState(0.5);
  /** 1 = chiều kim đồng hồ, -1 = ngược chiều. Bấm icon vòng lặp để đổi. */
  const [rotateDirection, setRotateDirection] = useState<1 | -1>(1);

  const searchParams = useSearchParams();
  const tourFromUrl = Math.min(TOTAL_HOUSES, Math.max(1, parseInt(searchParams.get("tour") || "1", 10) || 1));
  const [houseTourIndex, setHouseTourIndex] = useState(tourFromUrl);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Filter flow: Portfolio | Rooms. Portfolio Section chỉ còn Exterior | Interior (không có Rooms).
  const [filterMode, setFilterMode] = useState<"portfolio" | "rooms">("portfolio");
  const [portfolioSection, setPortfolioSection] = useState<"exterior" | "interior">("interior");
  const [roomCategory, setRoomCategory] = useState<RoomCategoryKey>("livingRoom");

  const portfolioRoomIds =
    portfolioSection === "exterior" ? PORTFOLIO_EXTERIOR_IDS : PORTFOLIO_INTERIOR_IDS;
  const roomsModeRoomIds = ROOM_CATEGORIES[roomCategory].ids;
  const filteredRooms = ROOMS.filter((r) =>
    filterMode === "portfolio" ? portfolioRoomIds.includes(r.id) : (roomsModeRoomIds as readonly string[]).includes(r.id)
  );

  const ensureRoomInList = (ids: readonly string[]) => {
    if (!ids.includes(room) && ids.length > 0) setRoom(ids[0]);
  };
  const switchToPortfolio = (section?: "exterior" | "interior") => {
    setFilterMode("portfolio");
    if (section) setPortfolioSection(section);
    const ids = section === "exterior" ? PORTFOLIO_EXTERIOR_IDS : PORTFOLIO_INTERIOR_IDS;
    ensureRoomInList(ids);
  };
  const switchToRooms = (category?: RoomCategoryKey) => {
    setFilterMode("rooms");
    if (category) setRoomCategory(category);
    ensureRoomInList(ROOM_CATEGORIES[category ?? roomCategory].ids);
  };

  useEffect(() => {
    setHouseTourIndex(tourFromUrl);
  }, [tourFromUrl]);

  const goHouseTourPrev = () => setHouseTourIndex((i) => (i <= 1 ? TOTAL_HOUSES : i - 1));
  const goHouseTourNext = () => setHouseTourIndex((i) => (i >= TOTAL_HOUSES ? 1 : i + 1));

  // Click phòng trên sơ đồ → chuyển sang phòng đó, mở view 360° và bật tự xoay để tour chạy (không đứng yên)
  const selectRoomFromFloorPlan = (roomId: string) => {
    setRoom(roomId);
    setRightView("360");
    setIsPlaying(true);
  };

  return (
    <div className="h-screen relative overflow-hidden bg-gray-900">
      {/* Nút hamburger khi sidebar đóng — mở lại panel Lọc */}
      {!sidebarOpen && (
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-xl bg-white/20 backdrop-blur border border-white/30 shadow-lg flex items-center justify-center text-gray-800 hover:bg-white/40 transition-colors"
          aria-label="Mở bảng lọc"
        >
          <span className="text-xl font-bold" style={{ fontFamily: "ui-sans-serif" }}>≡</span>
        </button>
      )}

      {/* Left Sidebar — nền nâu (#c4b5a5) opacity 30% + blur để thấy ảnh 360° mờ phía sau */}
      <aside
        className={`w-80 absolute left-0 top-0 bottom-0 z-20 flex flex-col gap-6 overflow-y-auto p-5 bg-[#c4b5a5]/30 backdrop-blur-md transition-transform duration-300 ease-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Nút 3 gạch (≡) cùng hàng với Portfolio | Rooms */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="flex-shrink-0 w-9 h-9 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700"
              aria-label="Đóng bảng lọc"
            >
              <span className="text-lg font-bold" style={{ fontFamily: "ui-sans-serif" }}>≡</span>
            </button>
            <div className="flex flex-1 min-w-0 rounded-xl overflow-hidden border border-white/40 bg-white/25 p-0.5 shadow-inner">
              <button
                type="button"
                onClick={() => switchToPortfolio()}
                className={`flex-1 min-w-0 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  filterMode === "portfolio" ? "bg-teal-500 text-white shadow" : "text-slate-700 hover:bg-white/70"
                }`}
              >
                Portfolio
              </button>
              <button
                type="button"
                onClick={() => switchToRooms()}
                className={`flex-1 min-w-0 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  filterMode === "rooms" ? "bg-teal-500 text-white shadow" : "text-slate-700 hover:bg-white/70"
                }`}
              >
                Rooms
              </button>
            </div>
          </div>

          {filterMode === "portfolio" && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800 w-14 flex-shrink-0" style={{ textShadow: "0 0 1px rgba(255,255,255,0.9)" }}>Section</span>
                <div className="flex rounded-xl overflow-hidden border border-white/40 bg-white/25 p-1 shadow-inner">
                  <button
                    type="button"
                    onClick={() => switchToPortfolio("exterior")}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      portfolioSection === "exterior" ? "bg-teal-500 text-white shadow" : "text-slate-700 hover:bg-white/70"
                    }`}
                  >
                    Exterior
                  </button>
                  <button
                    type="button"
                    onClick={() => switchToPortfolio("interior")}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      portfolioSection === "interior" ? "bg-teal-500 text-white shadow" : "text-slate-700 hover:bg-white/70"
                    }`}
                  >
                    Interior
                  </button>
                </div>
              </div>
            </div>
          )}

          {filterMode === "rooms" && (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800" style={{ textShadow: "0 0 1px rgba(255,255,255,0.9)" }}>Category</span>
              <div className="flex flex-wrap gap-1.5">
                {(Object.keys(ROOM_CATEGORIES) as RoomCategoryKey[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => switchToRooms(key)}
                    className={`px-2.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      roomCategory === key ? "bg-teal-500 text-white shadow-sm" : "bg-white/60 text-gray-700 hover:bg-white/80 border border-gray-200/60"
                    }`}
                  >
                    {ROOM_CATEGORIES[key].label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* House 12/12 — nằm dưới phần Filter */}
          <div className="flex items-center gap-2">
            <Link
              href={`/house-tour?tour=${houseTourIndex <= 1 ? TOTAL_HOUSES : houseTourIndex - 1}`}
              className="flex-shrink-0 w-9 h-9 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700 font-bold"
              aria-label="House Tour trước"
            >
              ‹
            </Link>
            <span className="flex-1 text-center text-sm font-bold text-slate-800" style={{ textShadow: "0 0 1px rgba(255,255,255,0.9)" }}>
              {filterMode === "rooms" ? (ROOMS.find((r) => r.id === room)?.label ?? room) : `House ${houseTourIndex}/${TOTAL_HOUSES}`}
            </span>
            <Link
              href={`/house-tour?tour=${houseTourIndex >= TOTAL_HOUSES ? 1 : houseTourIndex + 1}`}
              className="flex-shrink-0 w-9 h-9 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700 font-bold"
              aria-label="House Tour sau"
            >
              ›
            </Link>
          </div>
        </div>

        {/* Room list — pills theo filter (Portfolio: Exterior | Interior; Rooms: category) */}
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

        <button
          type="button"
          className="mt-auto w-full py-3 rounded-xl bg-teal-500 text-white font-semibold hover:bg-teal-600 transition-colors shadow"
        >
          Save & Finish
        </button>
      </aside>

      {/* Main Viewport — full màn hình, nằm dưới sidebar để ảnh 360° hiện xuyên qua sidebar trong suốt */}
      <main className="absolute inset-0 flex flex-col min-h-0 min-w-0">
        {/* Top bar: chiều quay | Play/Pause | << (giảm tốc) | tốc độ | >> (tăng tốc) */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 bg-[#e8e4df] rounded-full px-2 py-1.5 shadow-lg border border-gray-300/50">
          <button
            type="button"
            onClick={() => setRotateDirection((d) => (d === 1 ? -1 : 1))}
            className={`p-2 rounded-full hover:bg-white/50 ${rotateDirection === -1 ? "bg-teal-500/20 text-teal-700" : "text-gray-600 hover:text-gray-900"}`}
            aria-label={rotateDirection === 1 ? "Đổi chiều quay" : "Đổi chiều quay"}
            title={rotateDirection === 1 ? "Chiều thuận · Bấm để quay ngược" : "Chiều ngược · Bấm để quay thuận"}
          >
            {rotateDirection === 1 ? "↻" : "↺"}
          </button>
          <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            className={`p-2 rounded-full min-w-[2.25rem] ${isPlaying ? "bg-teal-500 text-white" : "bg-gray-700 text-white"}`}
            aria-label={isPlaying ? "Dừng" : "Phát"}
            title={isPlaying ? "Dừng" : "Phát"}
          >
            {isPlaying ? "‖" : "▶"}
          </button>
          <button
            type="button"
            onClick={() => setSpeedMultiplier((s) => (s > 0.25 ? s / 2 : 0.25))}
            className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-white/50 font-bold text-sm"
            aria-label="Giảm tốc độ một nửa"
            title="Giảm tốc độ một nửa"
          >
            &lt;&lt;
          </button>
          <span className="px-1.5 text-xs font-medium text-gray-700 tabular-nums min-w-[2.5rem] text-center" title="Tốc độ hiện tại">
            {speedMultiplier === 1 ? "1×" : speedMultiplier === 0.5 ? "0.5×" : "0.25×"}
          </span>
          <button
            type="button"
            onClick={() => setSpeedMultiplier((s) => (s < 1 ? Math.min(1, s * 2) : 1))}
            className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-white/50 font-bold text-sm"
            aria-label="Tăng tốc độ gấp đôi"
            title="Tăng tốc độ gấp đôi"
          >
            &gt;&gt;
          </button>
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

        {/* 3D / Scene area — full màn hình, overlay màu từ Color Palette */}
        {(() => {
          const selectedColorHex = COLORS.find((c) => c.id === color)?.hex ?? "#1a1a1a";
          return (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <div className="w-full h-full flex items-center justify-center overflow-hidden relative">
            <div
              className="absolute inset-0 pointer-events-none z-[1] mix-blend-multiply opacity-30"
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
                    speedMultiplier={speedMultiplier}
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
                  speedMultiplier={speedMultiplier}
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

          {/* Floor plan overlay — không che nút Layout/360°/Images bên phải; ảnh sơ đồ vừa khung, ít khoảng trống */}
          {rightView === "layout" && (
          <div className="absolute right-20 top-6 bottom-24 w-72 bg-white/95 backdrop-blur rounded-xl shadow-xl border border-gray-200 overflow-hidden flex flex-col z-[9]">
            <p className="text-sm font-semibold text-gray-800 px-3 pt-2 pb-1.5 border-b border-gray-100 shrink-0">Sơ đồ mặt bằng — bấm phòng để xem</p>
            <div className="relative w-full shrink-0 flex items-center justify-center bg-white py-1">
              <div className="relative w-full aspect-[4/3] max-h-[200px]">
                <Image
                  src="/images/layout.jpeg"
                  alt="Floor plan"
                  fill
                  className="object-contain"
                  sizes="288px"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 p-2.5 border-t border-gray-100 shrink-0">
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
