import Image from "next/image";

const UPLOAD = "/uploads/1/5/3/1/153154201";

export const metadata = {
  title: "About | TruyenArt LLC",
  description: "Meet the team behind TruyenArt LLC - architectural visualization specialists.",
};

export default function AboutPage() {
  return (
    <>
      <div className="banner-wrap">
        <div className="wsite-elements wsite-not-footer wsite-header-elements">
          <div className="wsite-section-wrap">
            <div
              className="wsite-section wsite-header-section wsite-section-bg-color"
              style={{ height: 300, backgroundColor: "#f8f8f8" }}
            >
              <div className="wsite-section-content">
                <div className="container">
                  <div className="banner">
                    <div className="wsite-section-elements">
                      <div className="paragraph">WHO WE ARE</div>
                      <h2 className="wsite-content-title">About</h2>
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
            <div className="wsite-section wsite-body-section wsite-section-bg-color" style={{ backgroundColor: "#fff" }}>
              <div className="wsite-section-content">
                <div className="container">
                  <div className="wsite-section-elements">
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center", maxWidth: 1200, margin: "0 auto" }}>
                      <div style={{ textAlign: "center" }}>
                        <Image
                          src={`${UPLOAD}/img-9-full_1_orig.jpg`}
                          alt="Team"
                          width={500}
                          height={400}
                          style={{ width: "auto", maxWidth: "100%" }}
                        />
                      </div>
                      <div>
                        <h2 className="wsite-content-title">Meet the Team</h2>
                        <hr className="styled-hr" style={{ width: "100%" }} />
                        <div className="paragraph">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="wsite-section-wrap">
            <div className="wsite-section wsite-body-section wsite-section-bg-color" style={{ backgroundColor: "#f8f8f8" }}>
              <div className="wsite-section-content">
                <div className="container">
                  <div className="wsite-section-elements">
                    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                      <h2 className="wsite-content-title">Recognitions & Awards</h2>
                      <hr className="styled-hr" style={{ width: "100%" }} />
                      <div className="paragraph">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2rem", marginTop: 40 }}>
                        <Image src={`${UPLOAD}/logo1_2_orig.png`} alt="Robert & Sons Logo" width={180} height={80} style={{ maxWidth: "100%" }} />
                        <Image src={`${UPLOAD}/logo2_2_orig.png`} alt="Sentum Logo" width={180} height={80} style={{ maxWidth: "100%" }} />
                        <Image src={`${UPLOAD}/logo3_2_orig.png`} alt="Logo" width={180} height={80} style={{ maxWidth: "100%" }} />
                        <Image src={`${UPLOAD}/logo4_2_orig.png`} alt="Free Union Logo" width={180} height={80} style={{ maxWidth: "100%" }} />
                      </div>
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
