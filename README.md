# TruyenArt LLC

Website công ty TruyenArt LLC – Architectural Visualization. Dự án đã được chuyển sang **Next.js** (App Router).

## Chạy dự án

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

## Build production

```bash
npm run build
npm start
```

## Cấu trúc

- **`app/`** – Trang Next.js (App Router): Home, Our Work, About, Contact
- **`components/`** – Header, Footer, HomeSlideshow
- **`public/`** – Tài nguyên tĩnh: `uploads/`, `files/`, `cdn/` (đã copy từ bản mirror cũ)

## Dọn dẹp đã thực hiện

Đã xóa các file/thư mục **không cần thiết** (chỉ liên quan HTTrack hoặc trùng):

- `index.html` (root) – trang index của HTTrack, không phải nội dung site
- `backblue.gif`, `fade.gif` – asset giao diện HTTrack
- `cookies.txt`, `hts-log.txt` – file HTTrack (có thể chứa thông tin nhạy cảm)
- `hts-cache/` – cache của HTTrack
- `www.google.com/` – chỉ chứa reCAPTCHA api.js (mirror offline không dùng)

**Giữ lại (có thể xóa sau khi kiểm tra xong):**

- **`www.truyenartllc.com/`** – Bản mirror HTML gốc. Nội dung đã được chuyển vào Next.js + `public/`. Có thể xóa khi không cần so sánh nữa.
- **`cdn2.editmysite.com/`** – CDN mirror. Đã copy phần cần dùng vào `public/cdn/`. Có thể xóa khi không cần.

Không xóa nhầm: toàn bộ **nội dung site** (trang, ảnh, style) đã nằm trong Next.js và `public/`.
