import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="footer-wrap">
      <div className="footer">
        <div className="wsite-elements wsite-footer">
          <div className="wsite-multicol">
            <div className="wsite-multicol-table-wrap" style={{ margin: "0 -15px" }}>
              <table className="wsite-multicol-table">
                <tbody className="wsite-multicol-tbody">
                  <tr className="wsite-multicol-tr">
                    <td className="wsite-multicol-col" style={{ width: "9.39%", padding: "0 15px" }}>
                      <div className="wsite-image wsite-image-border-none">
                        <Image
                          src="/uploads/1/5/3/1/153154201/editor/25db2.png"
                          alt=""
                          width={80}
                          height={80}
                          style={{ maxWidth: "100%" }}
                        />
                      </div>
                    </td>
                    <td className="wsite-multicol-col" style={{ width: "90.61%", padding: "0 15px" }}>
                      <h2 className="wsite-content-title" style={{ textAlign: "center" }}>
                        Your Vision. Our Expertise. Flawlessly Rendered.
                      </h2>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="wsite-spacer" style={{ height: "70px" }} />
          <div className="wsite-multicol">
            <div className="wsite-multicol-table-wrap" style={{ margin: "0 -15px" }}>
              <table className="wsite-multicol-table">
                <tbody className="wsite-multicol-tbody">
                  <tr className="wsite-multicol-tr">
                    <td className="wsite-multicol-col" style={{ width: "25%", padding: "0 15px", textAlign: "center" }}>
                      <strong>
                        <a href="mailto:[email protected]">[email protected]</a>
                      </strong>
                    </td>
                    <td className="wsite-multicol-col" style={{ width: "25%", padding: "0 15px", textAlign: "center" }}>
                      <a href="https://www.instagram.com/trart.3dvisualizer/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        Instagram
                      </a>
                    </td>
                    <td className="wsite-multicol-col" style={{ width: "25%", padding: "0 15px", textAlign: "center" }}>
                      <a href="https://www.linkedin.com/in/truyen-mai-056505366/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        LinkedIn
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="paragraph" style={{ textAlign: "center", marginTop: "20px" }}>
            <strong>
              <Link href="/">HOME</Link> · <Link href="/our-work">PORTFOLIO</Link> · <Link href="/about">ABOUT</Link> · <Link href="/contact">CONTACT</Link>
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}
