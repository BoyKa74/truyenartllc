"use client";

const UPLOAD = "/uploads/1/5/3/1/153154201";

export default function ContactPage() {
  return (
    <>
      <div className="banner-wrap">
        <div className="wsite-elements wsite-not-footer wsite-header-elements">
          <div className="wsite-section-wrap">
            <div
              className="wsite-section wsite-header-section wsite-section-bg-color"
              style={{ height: 385, backgroundColor: "#f1f5f6" }}
            >
              <div className="wsite-section-content">
                <div className="container">
                  <div className="banner">
                    <div className="wsite-section-elements">
                      <div className="paragraph">WHERE WE ARE</div>
                      <h2 className="wsite-content-title">Contact</h2>
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
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", maxWidth: 1200, margin: "0 auto" }}>
                      <div>
                        <h2 className="wsite-content-title">Get in Touch</h2>
                        <hr className="styled-hr" style={{ width: "100%" }} />
                        <div className="paragraph" style={{ color: "#515151" }}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                          <br /><br />
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </div>
                        <div className="paragraph" style={{ marginTop: 20 }}>
                          <strong>Email:</strong>{" "}
                          <a href="mailto:mt@truyenartllc.com">mt@truyenartllc.com</a>
                          <br />
                          <strong>Instagram:</strong>{" "}
                          <a href="https://www.instagram.com/trart.3dvisualizer/" target="_blank" rel="noopener noreferrer">
                            @trart.3dvisualizer
                          </a>
                          <br />
                          <strong>LinkedIn:</strong>{" "}
                          <a href="https://www.linkedin.com/in/truyen-mai-056505366/" target="_blank" rel="noopener noreferrer">
                            Truyen Mai
                          </a>
                        </div>
                      </div>
                      <div>
                        <form
                          action="#"
                          method="post"
                          id="contact-form"
                          className="wsite-form-container"
                          style={{ marginTop: 10 }}
                          onSubmit={(e) => {
                            e.preventDefault();
                            alert("Form submission can be connected to your backend or email service.");
                          }}
                        >
                          <label className="wsite-form-label wsite-form-fields-required-label">
                            <span className="form-required">*</span> Indicates required field
                          </label>
                          <div className="wsite-form-field wsite-name-field" style={{ margin: "5px 0" }}>
                            <label className="wsite-form-label">Name <span className="form-required">*</span></label>
                            <div style={{ display: "flex", gap: 8 }}>
                              <input
                                className="wsite-form-input wsite-input"
                                placeholder="First"
                                type="text"
                                name="first"
                                required
                                style={{ flex: 1 }}
                              />
                              <input
                                className="wsite-form-input wsite-input"
                                placeholder="Last"
                                type="text"
                                name="last"
                                required
                                style={{ flex: 1 }}
                              />
                            </div>
                          </div>
                          <div className="wsite-form-field" style={{ margin: "5px 0" }}>
                            <label className="wsite-form-label" htmlFor="contact-email">
                              Email <span className="form-required">*</span>
                            </label>
                            <input
                              id="contact-email"
                              className="wsite-form-input wsite-input"
                              type="email"
                              name="email"
                              required
                              style={{ maxWidth: 370, width: "100%" }}
                            />
                          </div>
                          <div className="wsite-form-field" style={{ margin: "5px 0" }}>
                            <label className="wsite-form-label" htmlFor="contact-comment">
                              Comment <span className="form-required">*</span>
                            </label>
                            <textarea
                              id="contact-comment"
                              className="wsite-form-input wsite-input"
                              name="comment"
                              required
                              rows={6}
                              style={{ maxWidth: 370, width: "100%", height: 200 }}
                            />
                          </div>
                          <div style={{ marginTop: 10 }}>
                            <button type="submit" className="wsite-button">
                              <span className="wsite-button-inner">Submit</span>
                            </button>
                          </div>
                        </form>
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
