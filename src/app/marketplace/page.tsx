import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { MarketplaceClient } from "@/components/MarketplaceClient";

export const metadata = {
  title: "Marketplace — Naano",
  description: "Browse vetted B2B LinkedIn creators by vertical, audience size, price and country.",
};

export default function MarketplacePage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-[#fbfcff]">
        <MarketplaceClient />
      </main>
      <Footer />
    </>
  );
}
