"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const CARD_WIDTH = 280;
const GAP = 16;
const STEP = CARD_WIDTH + GAP;
const AUTO_PLAY_MS = 4500;
// Ảnh giữa phóng to để che ~30% mỗi bên: 30% * 280 = 84px mỗi bên → scale = (280 + 168)/280 ≈ 1.6
const CENTER_SCALE = 1.6;

type Item = { id: string; image: string; title: string; description?: string };

export default function PortfolioSection({
  items,
  sectionTitle,
  tourLabel,
  baseUrl,
  tourIndex = 1,
}: {
  items: Item[];
  sectionTitle: string;
  tourLabel: string;
  baseUrl: string;
  /** 1, 2, hoặc 3 — truyền vào URL /house-tour?tour= */
  tourIndex?: 1 | 2 | 3;
}) {
  const n = items.length;
  // Track vòng: [last, first, second, ..., second-to-last] x2 để infinite
  const order = [items[n - 1], ...items.slice(0, n - 1)];
  const displayItems = [...order, ...order];

  const [currentIndex, setCurrentIndex] = useState(0); // logical 0..n-1
  const [viewAll, setViewAll] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(700);
  const [noTransition, setNoTransition] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const update = () => setViewportWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Auto-play (dừng khi hover hoặc viewAll)
  useEffect(() => {
    if (viewAll || isPaused) return;
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((L) => {
        if (L >= n - 1) {
          setNoTransition(true);
          return 0;
        }
        return L + 1;
      });
    }, AUTO_PLAY_MS);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [viewAll, isPaused, n]);

  useEffect(() => {
    if (!noTransition) return;
    const id = requestAnimationFrame(() => setNoTransition(false));
    return () => cancelAnimationFrame(id);
  }, [noTransition]);

  // Offset: translateX(d) đẩy track sang phải → ảnh giữa (index currentIndex+1) có center = viewportWidth/2
  const trackOffset =
    viewportWidth > 0
      ? viewportWidth / 2 - (currentIndex + 1) * STEP - CARD_WIDTH / 2
      : 0;

  const goPrev = () => {
    if (currentIndex <= 0) {
      setNoTransition(true);
      setCurrentIndex(n - 1);
    } else {
      setCurrentIndex((i) => i - 1);
    }
  };
  const goNext = () => {
    if (currentIndex >= n - 1) {
      setNoTransition(true);
      setCurrentIndex(0);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  if (viewAll) {
    return (
      <section style={{ marginBottom: 56 }}>
        <h2 className="wsite-content-title" style={{ color: "#2a2a2a", fontSize: "1.5rem", marginBottom: 24 }}>
          {sectionTitle}
        </h2>
        <button
          type="button"
          onClick={() => setViewAll(false)}
          style={{
            marginBottom: 16,
            padding: "8px 16px",
            background: "#e5e7eb",
            border: "1px solid #d1d5db",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: "0.9rem",
          }}
        >
          ← Back to carousel
        </button>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.5rem",
            maxWidth: 1200,
          }}
        >
          {items.map((item) => (
            <div key={item.id} style={{ overflow: "hidden", border: "1px solid #ddd", borderRadius: 8 }}>
              <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
                <Image
                  src={`${baseUrl}/${item.image}`}
                  alt={item.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div
                style={{
                  padding: "14px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  background: "#fafafa",
                  borderTop: "1px solid #eee",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: "#2a2a2a", fontSize: "1rem", fontWeight: 600, lineHeight: 1.3, marginBottom: 2 }}>
                    {item.title}
                  </div>
                  {item.description && (
                    <div style={{ color: "#626262", fontSize: "0.8rem", lineHeight: 1.35 }}>
                      {item.description}
                    </div>
                  )}
                </div>
                <Link
                  href={`/house-tour?tour=${tourIndex}`}
                  className="wsite-button wsite-button-small wsite-button-highlight"
                  style={{ flexShrink: 0, padding: "8px 14px", borderRadius: 8, fontSize: "0.85rem" }}
                >
                  <span className="wsite-button-inner">{tourLabel}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section style={{ marginBottom: 56 }}>
      <h2 className="wsite-content-title" style={{ color: "#2a2a2a", fontSize: "1.5rem", marginBottom: 24 }}>
        {sectionTitle}
      </h2>
      <div
        ref={viewportRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{
          position: "relative",
          overflow: "hidden",
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: GAP,
            width: displayItems.length * STEP - GAP,
            transform: `translateX(${trackOffset}px)`,
            transition: noTransition ? "none" : "transform 0.4s ease-out",
          }}
        >
          {displayItems.map((item, i) => {
            const isCenter = i === currentIndex + 1;
            return (
            <div
              key={`${item.id}-${i}`}
              style={{
                flex: `0 0 ${CARD_WIDTH}px`,
                overflow: "visible",
                border: "1px solid #ddd",
                borderRadius: 12,
                boxShadow: isCenter ? "0 12px 40px rgba(0,0,0,0.18)" : "0 4px 12px rgba(0,0,0,0.08)",
                transition: "transform 0.4s ease-out, opacity 0.4s ease-out, box-shadow 0.4s ease-out, filter 0.4s ease-out",
                transform: isCenter ? `scale(${CENTER_SCALE})` : "scale(0.88)",
                transformOrigin: "center center",
                opacity: isCenter ? 1 : 0.7,
                filter: isCenter ? "none" : "blur(1px)",
                zIndex: isCenter ? 2 : 1,
              }}
            >
              <Link
                href={`/house-tour?tour=${tourIndex}`}
                style={{ display: "block", height: "100%", cursor: "pointer" }}
                aria-label={`${item.title} — ${tourLabel}`}
              >
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "4/3",
                    borderRadius: isCenter ? 12 : 0,
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={`${baseUrl}/${item.image}`}
                    alt={item.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="280px"
                  />
                </div>
              </Link>
            </div>
            );
          })}
        </div>
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous"
          style={{
            position: "absolute",
            left: 8,
            top: "50%",
            transform: "translateY(-50%)",
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "none",
            background: "rgba(255,255,255,0.95)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            cursor: "pointer",
            fontSize: "1.2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
          }}
        >
          ‹
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next"
          style={{
            position: "absolute",
            right: 8,
            top: "50%",
            transform: "translateY(-50%)",
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "none",
            background: "rgba(255,255,255,0.95)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            cursor: "pointer",
            fontSize: "1.2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
          }}
        >
          ›
        </button>
      </div>
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <button
          type="button"
          onClick={() => setViewAll(true)}
          style={{
            padding: "10px 24px",
            background: "#0d9488",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: "0.95rem",
            fontWeight: 600,
          }}
        >
          View All
        </button>
      </div>
    </section>
  );
}
