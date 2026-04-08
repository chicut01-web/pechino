import Navbar from "@/components/Navbar";
import PechinoZaino from "@/components/PechinoZaino";
import Features from "@/components/Features";
import Discover from "@/components/Discover";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#000000] text-white min-h-screen">
      <Navbar />
      <PechinoZaino />
      <Features />
      <Discover />
      <Footer />
    </main>
  );
}
