import RoiCalculator from "./roi-calculator";
import Image from "next/image";
import GovEagleLogo from "./images/GovEagleLogo.png";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-4 gap-8 sm:p-8 font-[family-name:var(--font-geist-sans)] bg-ge-lightTeal">
      <Image src={GovEagleLogo} alt="GovEagle" className="w-32" />
      <main className="flex flex-col gap-2 row-start-2 items-center sm:items-start text-ge-darkTeal">
        <RoiCalculator />
      </main>
    </div>
  );
}
