import Link from "next/link";
import PortfolioSection from "@/components/our-work/PortfolioSection";

// Ảnh từ public/our_exterior, public/our_interior, public/room (tên chuẩn)
const EXTERIOR_BASE = "/our_exterior";
const EXTERIOR_ITEMS = [
  { id: "1", image: "oe1.jpg", title: "Exterior", description: "Phối cảnh ngoại thất" },
];

const INTERIOR_BASE = "/our_interior";
const INTERIOR_ITEMS = [
  { id: "1", image: "oi2.jpg", title: "Interior", description: "Nội thất" },
];

const ROOM_BASE = "/room";
const FEATURED_ROOMS_ITEMS = [
  { id: "1", image: "living/lv1.jpg", title: "Living" },
  { id: "2", image: "living/lv2.jpg", title: "Living 2" },
  { id: "3", image: "bed/b1.jpg", title: "Bedroom" },
  { id: "4", image: "bed/b2.jpg", title: "Bedroom 2" },
  { id: "5", image: "bed/b3.jpg", title: "Bedroom 3" },
  { id: "6", image: "bed/b4.jpg", title: "Bedroom 4" },
  { id: "7", image: "kitchen/kc1.jpg", title: "Kitchen" },
  { id: "8", image: "kids/k1.jpg", title: "Kids Room" },
];

export const metadata = {
  title: "Our Work | TruyenArt LLC",
  description: "Portfolio of architectural visualization projects - 3D renders, Enscape, interior and exterior visualization.",
};

export default function OurWorkPage() {
  return (
    <>
      <div className="banner-wrap">
        <div className="wsite-elements wsite-not-footer wsite-header-elements">
          <div className="wsite-section-wrap">
            <div
              className="wsite-section wsite-header-section wsite-section-bg-color"
              style={{ height: 300, backgroundColor: "#dce7e8" }}
            >
              <div className="wsite-section-content">
                <div className="container">
                  <div className="banner">
                    <div className="wsite-section-elements">
                      <div className="paragraph">PORTFOLIO</div>
                      <h2 className="wsite-content-title">Our Work</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="main-wrap">
        <div id="wsite-content" className="wsite-elements wsite-not-footer">
          <div className="wsite-section-wrap">
            <div className="wsite-section wsite-body-section" style={{ padding: "60px 40px" }}>
              <div className="container">
                <div className="wsite-section-elements">
                  <PortfolioSection
                    items={EXTERIOR_ITEMS}
                    sectionTitle="Our Exterior Visualization Portfolio"
                    tourLabel="Exterior Tour"
                    baseUrl={EXTERIOR_BASE}
                    tourIndex={1}
                  />
                  <PortfolioSection
                    items={INTERIOR_ITEMS}
                    sectionTitle="Our Interior Visualization Portfolio"
                    tourLabel="House Tour"
                    baseUrl={INTERIOR_BASE}
                    tourIndex={2}
                  />
                  <PortfolioSection
                    items={FEATURED_ROOMS_ITEMS}
                    sectionTitle="Featured Rooms"
                    tourLabel="Room Tour"
                    baseUrl={ROOM_BASE}
                    tourIndex={3}
                  />

                  <div style={{ textAlign: "center", marginTop: 40 }}>
                    <Link href="/contact" className="wsite-button wsite-button-small wsite-button-highlight">
                      <span className="wsite-button-inner">Discuss Your Project</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
