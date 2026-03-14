"use client";

import { useRef, useCallback, useEffect } from "react";
import Link from "next/link";

const SCROLL_AMOUNT = 320;
const AUTO_PLAY_INTERVAL_MS = 2500;

// Nhân đôi mảng ảnh để vòng lặp vô hạn: khi cuộn qua "bản sao" ta nhảy ngược về vị trí tương ứng (cùng nội dung) → không thấy giật
const duplicateForInfinite = (arr: string[]) => [...arr, ...arr];

export default function HomeSlideshow({ images }: { images: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scrollNextRef = useRef<() => void>(() => {});
  const infiniteImages = duplicateForInfinite(images);
  const n = images.length;

  const scrollPrev = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    if (container.scrollLeft <= SCROLL_AMOUNT) {
      container.scrollTo({ left: container.scrollWidth - container.clientWidth - SCROLL_AMOUNT, behavior: "auto" });
      requestAnimationFrame(() => {
        container.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
      });
    } else {
      container.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
    }
  }, []);

  const scrollNext = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
  }, []);

  scrollNextRef.current = scrollNext;

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  const startAutoPlay = useCallback(() => {
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => scrollNextRef.current(), AUTO_PLAY_INTERVAL_MS);
  }, [stopAutoPlay]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const mid = el.scrollWidth / 2;
      if (el.scrollLeft >= mid) {
        el.scrollLeft = el.scrollLeft - mid;
      } else if (el.scrollLeft <= 0) {
        el.scrollLeft = el.scrollLeft + mid;
      }
    };

    container.addEventListener("scroll", onScroll, { passive: true });

    startAutoPlay();
    return () => {
      container.removeEventListener("scroll", onScroll);
      stopAutoPlay();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="slideshow-section"
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
    >
      <div
        className="slideshow-container"
        ref={containerRef}
        role="region"
        aria-label="Featured projects gallery"
        style={{ overflowX: "auto", overflowY: "hidden", WebkitOverflowScrolling: "touch" }}
      >
        {infiniteImages.map((src, i) => {
          const houseNumber = (i % n) + 1;
          return (
            <div key={`${src}-${i}`} className="slideshow-image" style={{ display: "inline-block", width: 300, height: "auto", minHeight: 225 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`House-${houseNumber}`} width={300} height={225} style={{ width: "100%", height: 225, objectFit: "cover", display: "block" }} />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginTop: 8, paddingLeft: 4, paddingRight: 4 }}>
                <span style={{ color: "#2a2a2a", fontSize: "0.95rem", fontWeight: 600 }}>House-{houseNumber}</span>
                <Link href="/house-tour" className="wsite-button wsite-button-small wsite-button-highlight" style={{ flexShrink: 0 }}>
                  <span className="wsite-button-inner">House Tour</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <button type="button" className="prev-button" onClick={scrollPrev} aria-label="Previous">
        &#10094;
      </button>
      <button type="button" className="next-button" onClick={scrollNext} aria-label="Next">
        &#10095;
      </button>
    </div>
  );
}
