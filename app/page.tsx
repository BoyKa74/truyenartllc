import Link from "next/link";
import Image from "next/image";
import HomeSlideshow from "@/components/HomeSlideshow";

const UPLOAD = "/uploads/1/5/3/1/153154201";
const SLIDES = [
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

export default function HomePage() {
  return (
    <>
      <div className="banner-wrap">
        <div className="wsite-elements wsite-not-footer wsite-header-elements">
          <div className="wsite-section-wrap">
            <div
              className="wsite-section wsite-header-section wsite-section-bg-video"
              style={{
                height: 850,
                verticalAlign: "middle",
                backgroundImage: "url(/uploads/b/153154201-360091501976169670/video_1_450.jpg)",
              }}
            >
              <div className="wsite-section-content">
                <div className="container">
                  <div className="banner">
                    <div className="wsite-section-elements">
                      <div className="paragraph">
                        <u>TruyenArt LLC</u>
                      </div>
                      <h2 className="wsite-content-title" style={{ textAlign: "center" }}>
                        <strong>Your Designs & Our Visual Expertise</strong>
                      </h2>
                      <div className="wsite-spacer" style={{ height: 130 }} />
                      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
                        <Link href="/our-work" className="wsite-button wsite-button-large wsite-button-highlight">
                          <span className="wsite-button-inner">Our Work</span>
                        </Link>
                        <Link href="/contact" className="wsite-button wsite-button-small wsite-button-highlight">
                          <span className="wsite-button-inner">Contact</span>
                        </Link>
                      </div>
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
          {/* Three columns - services */}
          <div className="wsite-section-wrap">
            <div
              className="wsite-section wsite-body-section wsite-section-bg-color wsite-background-1"
              style={{ height: 494, backgroundColor: "#dce7e8" }}
            >
              <div className="wsite-section-content">
                <div className="container">
                  <div className="wsite-section-elements">
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem", maxWidth: 1200, margin: "0 auto" }}>
                      <div>
                        <h2 className="wsite-content-title" style={{ textAlign: "center" }}>
                          Interior & Exterior Visualization
                        </h2>
                        <hr className="styled-hr" style={{ width: "100%" }} />
                        <div className="paragraph" style={{ textAlign: "justify", color: "#2a2a2a" }}>
                          From cozy interiors to grand architectural facades, we produce realistic images and videos that help clients visualize every aspect of your project with clarity and precision.
                        </div>
                      </div>
                      <div>
                        <h2 className="wsite-content-title" style={{ textAlign: "center" }}>
                          Interactive 360 & VR Experiences
                        </h2>
                        <hr className="styled-hr" style={{ width: "100%" }} />
                        <div className="paragraph" style={{ textAlign: "justify", color: "#2a2a2a" }}>
                          Enhance your presentations with interactive 360 panoramas and virtual reality (VR) solutions powered by Enscape, allowing stakeholders to truly immerse themselves in your design.
                        </div>
                      </div>
                      <div>
                        <h2 className="wsite-content-title" style={{ textAlign: "center" }}>
                          Rapid Prototyping with Enscape & Sketchup
                        </h2>
                        <hr className="styled-hr" style={{ width: "100%" }} />
                        <div className="paragraph" style={{ textAlign: "justify", color: "#2a2a2a" }}>
                          Utilizing the real-time capabilities of Enscape and the flexibility of SketchUp, we offer fast turnaround times for high-quality visualizations, adapting quickly to your project needs.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured project slideshow */}
          <div className="wsite-section-wrap">
            <div className="wsite-section wsite-body-section wsite-background-34" style={{ height: "auto" }}>
              <div className="wsite-section-content">
                <div className="container">
                  <div className="wsite-section-elements">
                    <div className="paragraph" style={{ textAlign: "center" }}>
                      <Link href="/house-tour" style={{ color: "#2a2a2a", fontSize: "1.25rem", textDecoration: "none" }}>
                        <strong>FEATURED PROJECT</strong>
                      </Link>
                    </div>
                    <div style={{ height: 20 }} />
                    <HomeSlideshow images={SLIDES.map((name) => `${UPLOAD}/${name}`)} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enscape section */}
          <div className="wsite-section-wrap">
            <div
              className="wsite-section wsite-body-section wsite-section-bg-color wsite-background-2"
              style={{ backgroundColor: "#f1f5f6" }}
            >
              <div className="wsite-section-content">
                <div className="container">
                  <div className="wsite-section-elements">
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "center", maxWidth: 1200, margin: "0 auto" }}>
                      <div>
                        <h2 className="wsite-content-title" style={{ color: "#2a2a2a" }}>
                          Harnessing Enscape for Next-Gen Architectural Renders
                        </h2>
                        <hr className="styled-hr" style={{ width: "50%" }} />
                        <div className="paragraph" style={{ color: "#626262", textAlign: "justify" }}>
                          As an architectural visualization specialist, I have deeply integrated Enscape into my workflow, recognizing its pivotal role in the evolving design landscape. The strategic acquisition of Enscape by Chaos Group (known for V-Ray) reinforces my confidence in its continuous advancement and robust development trajectory. This powerful tool revolutionizes the rendering process by offering real-time feedback, drastically reducing turnaround times and allowing for quick design iterations. Beyond its speed, Enscape continuously pushes the boundaries of visual fidelity, delivering increasingly photorealistic results. My proficiency extends across its full range of capabilities: from crafting high-quality still images and engaging architectural videos to generating interactive 360° virtual tours. Partner with an expert who is not just using, but leading the way with Enscape, ensuring your projects benefit from the latest and most efficient visualization technology.
                        </div>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <Image
                          src={`${UPLOAD}/editor/03bc0d.png`}
                          alt="Rendered by me using Enscape 4.6"
                          width={600}
                          height={400}
                          style={{ width: "auto", maxWidth: "100%" }}
                        />
                        <div style={{ fontSize: "90%" }}>Rendered by me using Enscape 4.6</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vision / Founder */}
          <div className="wsite-section-wrap">
            <div className="wsite-section wsite-body-section wsite-background-3">
              <div className="wsite-section-content">
                <div className="container">
                  <div className="wsite-section-elements">
                    <div style={{ display: "grid", gridTemplateColumns: "minmax(200px, 41%) 1fr", gap: "2rem", maxWidth: 1200, margin: "0 auto" }}>
                      <div style={{ textAlign: "center" }}>
                        <Image
                          src={`${UPLOAD}/3131_orig.png`}
                          alt="Mai Truyen"
                          width={280}
                          height={350}
                          style={{ width: "auto", maxWidth: "100%" }}
                        />
                        <div className="paragraph" style={{ textAlign: "center" }}>
                          <small>FOUNDER & LEAD ARCHITECTURAL VISUALIZER</small>
                        </div>
                      </div>
                      <div>
                        <h2 className="wsite-content-title" style={{ textAlign: "center" }}>
                          The Vision Behind TruyenArt LLC
                        </h2>
                        <div className="paragraph" style={{ textAlign: "justify" }}>
                          Hello! I&apos;m Truyen, the founder and lead artist behind TruyenArt LLC. With a deep passion for architectural design and a meticulous eye for detail, I specialize in transforming concepts into stunning, photorealistic visualizations. I bring years of dedicated experience with Enscape, leveraging its powerful capabilities to deliver cutting-edge real-time renders. My commitment to excellence is further reflected in my track record as a Top Rated Plus freelancer on Upwork, where I&apos;ve successfully completed numerous projects, achieving a 100% Job Success Score and earning over $50,000. These achievements underscore my dedication to delivering exceptional results and ensuring client satisfaction. My journey in architectural rendering began with a fascination for bringing unbuilt spaces to life, and I&apos;ve continuously dedicated myself to mastering the tools and techniques that deliver impactful results. I pride myself on clear communication, efficient workflows, and a commitment to ensuring every client&apos;s vision is perfectly captured and presented. When you partner with TruyenArt LLC, you&apos;re working directly with an expert dedicated to elevating your architectural projects.
                        </div>
                        <div className="paragraph" style={{ textAlign: "right" }}>
                          <strong style={{ color: "#2a2a2a" }}>
                            <a href="https://www.upwork.com/freelancers/maitruyen" target="_blank" rel="noopener noreferrer">
                              www.upwork.com/freelancers/maitruyen
                            </a>
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials & commitment */}
          <div className="wsite-section-wrap">
            <div className="wsite-section wsite-body-section wsite-background-5" style={{ verticalAlign: "middle" }}>
              <div className="wsite-section-content">
                <div className="container">
                  <div className="wsite-section-elements">
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", maxWidth: 1200, margin: "0 auto" }}>
                      <div>
                        <h2 className="wsite-content-title" style={{ textAlign: "center", color: "#2a2a2a" }}>
                          Hear From Our Satisfied Clients
                        </h2>
                        <blockquote>Truyen is my favorite colleague, collaborator and architect on the projects. He&apos;s excellent in all aspects of the work — Horizonte Design Studio</blockquote>
                        <blockquote>Truyen is kind, responsive, and adheres to timelines. Communication was great! — David Berg (Upwork Client)</blockquote>
                        <blockquote>Another project completed on time, and executed perfectly. Will no doubt use Truyen again in the future! (Upwork Client)</blockquote>
                        <blockquote>Excellent to work with. Prompt turn around of work that was done to a high standard. Would highly recommend Truyen for house rendering and visualisations. — Joel B (Upwork Client)</blockquote>
                      </div>
                      <div>
                        <h2 className="wsite-content-title" style={{ textAlign: "center", color: "#2a2a2a" }}>
                          Our Commitment to Your Success
                        </h2>
                        <div className="paragraph">
                          <ul style={{ color: "#2a2a2a" }}>
                            <li>Expertise in Enscape: Leveraging cutting-edge Enscape technology for rapid, photorealistic results.</li>
                            <li>Proven Reliability: Backed by a 100% Job Success Score and numerous successful projects on Upwork.</li>
                            <li>Comprehensive Solutions: Delivering everything from stunning stills to immersive videos and 360 panoramas.</li>
                            <li>Client-Centric Approach: Committed to clear communication and precise execution to meet your unique vision.</li>
                          </ul>
                        </div>
                        <h2 className="wsite-content-title" style={{ textAlign: "center" }}>
                          <strong style={{ color: "#2a2a2a", fontSize: "1.25rem" }}>Trusted by Leading Firms</strong>
                        </h2>
                        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                          <Image
                            src={`${UPLOAD}/published/c-m-logo-white-background-pdf-2194b.png`}
                            alt="Client logo"
                            width={173}
                            height={80}
                          />
                          <Image
                            src={`${UPLOAD}/published/screenshot-2024-04-08-153815d7ab.jpg`}
                            alt="Client logo"
                            width={130}
                            height={80}
                          />
                        </div>
                      </div>
                    </div>
                    <div style={{ height: 97 }} />
                    <h2 className="wsite-content-title" style={{ textAlign: "center" }}>
                      READY TO BRING YOUR VISION TO LIFE?
                    </h2>
                    <div style={{ textAlign: "center" }}>
                      <Link href="/contact" className="wsite-button wsite-button-small wsite-button-highlight">
                        <span className="wsite-button-inner">DISCUSS YOUR PROJECT</span>
                      </Link>
                    </div>
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
