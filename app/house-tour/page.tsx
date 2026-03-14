import { Suspense } from "react";
import HouseTourClient from "@/components/house-tour/HouseTourClient";

export const metadata = {
  title: "House Tour | TruyenArt LLC",
  description: "Interactive house tour - chọn phòng, màu sắc, nội thất, sàn và bộ sưu tập.",
};

export default function HouseTourPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-800 text-white">Loading...</div>}>
      <HouseTourClient />
    </Suspense>
  );
}
