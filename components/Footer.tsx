export default function Footer() {
  return (
    <footer id="contatti" className="bg-[#000000] border-t border-white/5 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        <div className="flex flex-col items-center md:items-start">
          <span className="text-white font-bold tracking-widest text-xl mb-2">PECHINO</span>
          <span className="text-white/40 text-sm">© {new Date().getFullYear()} Tutti i diritti riservati.</span>
        </div>
        
        <div className="flex space-x-8">
          <a href="#" className="text-white/40 hover:text-[#C8A97E] transition-colors text-sm uppercase tracking-wider">Instagram</a>
          <a href="#" className="text-white/40 hover:text-[#C8A97E] transition-colors text-sm uppercase tracking-wider">Twitter</a>
          <a href="mailto:info@pechino.com" className="text-white/40 hover:text-[#C8A97E] transition-colors text-sm uppercase tracking-wider">Email</a>
        </div>
      </div>
    </footer>
  );
}
