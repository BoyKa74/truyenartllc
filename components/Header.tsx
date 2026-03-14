"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Home" },
  { href: "/our-work", label: "Our Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const SCROLL_THRESHOLD = 60;

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`birdseye-header ${scrolled ? "header-scrolled" : ""}`}>
      <div className="nav-wrap">
        <div className="container">
          <div className="logo">
            <span className="wsite-logo">
              <Link href="/">
                <Image
                  src="/uploads/1/5/3/1/153154201/published/218e7.png"
                  alt="TruyenArt LLC"
                  width={200}
                  height={40}
                  style={{ maxWidth: "200px", maxHeight: "40px" }}
                />
              </Link>
            </span>
          </div>
          <nav className="nav desktop-nav">
            <ul className="wsite-menu-default">
              {nav.map(({ href, label }) => (
                <li
                  key={href}
                  id={pathname === href || (href === "/" && pathname === "/") ? "active" : undefined}
                  className="wsite-menu-item-wrap"
                >
                  <Link href={href} className="wsite-menu-item">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <a className="hamburger" aria-label="Menu" href="#">
            <span></span>
          </a>
        </div>
      </div>
    </div>
  );
}
