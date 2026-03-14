# Deploy lên Vercel – tránh lỗi 404 NOT_FOUND

## Đã thêm trong repo
- `vercel.json`: framework Next.js, lệnh build/install.
- `app/not-found.tsx`: trang 404 của app (thay trang mặc định của Vercel).
- `package.json`: `engines.node": ">=18"` để dùng Node 18+.

## Kiểm tra trên Vercel Dashboard

1. **Project Settings → General**
   - **Framework Preset:** Next.js (nên tự nhận, nếu không chọn tay).
   - **Root Directory:** để trống nếu app nằm ở thư mục gốc repo; nếu app trong subfolder (vd. `truyenartllc/`) thì chọn đúng folder có `package.json` và `next.config.ts`.

2. **Project Settings → Build & Development**
   - **Build Command:** `npm run build` hoặc `next build`.
   - **Output Directory:** **không chỉnh** (để Vercel tự xử lý Next.js).
   - **Install Command:** `npm install`.

3. **Deploy**
   - Sau khi đẩy code (có `vercel.json` và `app/not-found.tsx`), bấm **Redeploy**.
   - Mở **Production URL** (vd. `https://xxx.vercel.app`) và thử:
     - Trang chủ: `https://xxx.vercel.app/`
     - Các trang: `/our-work`, `/house-tour`, `/about`, `/contact`.

## Nếu vẫn 404
- Xem **Deployments → Build Logs**: build có báo lỗi không.
- Xem **Runtime Logs**: có lỗi khi chạy không.
- Thử URL production chính (không dùng đường dẫn preview).
- Đảm bảo **Root Directory** trỏ đúng thư mục chứa app Next.js.
