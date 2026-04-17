

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/enduranceimage16/" },
  { name: "Facebook", href: "https://facebook.com" },
  { name: "WhatsApp", href: "https://wa.me/" },
  { name: "LinkedIn", href: "https://linkedin.com" },
  { name: "YouTube", href: "https://youtube.com" }
];

const Footer = () => {
  return (
    <footer 
      id="footer" 
      className="relative w-full bg-[#0d0d0d] pt-16 md:pt-20 pb-0 overflow-hidden"
    >
      {/* Subtle Purple Radial Glow */}
      <div 
        className="absolute top-0 left-0 w-full max-w-[800px] h-[800px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at top left, rgba(123,47,190,0.12) 0%, transparent 60%)"
        }}
      />

      {/* Main Grid Container — Note generous 80px side padding requested for larger screens */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 pb-12 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Contact / Social (~45% implicitly mapped to col-5 via grid mapping) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold text-white leading-tight mb-2">
                Let's Create Something Extraordinary Together.
              </h2>
              <p className="text-[#999999] text-[13px] italic">
                "Hit us up and let's make it happen."
              </p>
            </div>

            {/* Social Pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-full border border-white/20 text-white text-[12px] bg-transparent transition-all duration-300 hover:border-[#a855f7] hover:text-[#a855f7]"
                >
                  {social.name}
                </a>
              ))}
            </div>

            {/* Contact Details Stack */}
            <div className="flex flex-col gap-6">
              
              <div className="flex flex-col">
                <span className="text-[#666666] uppercase text-[10px] font-semibold italic tracking-wider mb-1">
                  Our Studio
                </span>
                <span className="text-white text-[15px] md:text-[17px]">
                  New Delhi, India
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-[#666666] uppercase text-[10px] font-semibold italic tracking-wider mb-1">
                  Drop Us a Line
                </span>
                <a href="mailto:hello@enduranceimage.com" className="text-white text-[15px] md:text-[17px] hover:text-[#a855f7] transition-colors">
                  hello@enduranceimage.com
                </a>
              </div>

              <div className="flex flex-col">
                <span className="text-[#666666] uppercase text-[10px] font-semibold italic tracking-wider mb-1">
                  Phone
                </span>
                <a href="tel:+919876543210" className="text-white text-[15px] md:text-[17px] hover:text-[#a855f7] transition-colors">
                  +91 98765 43210
                </a>
              </div>

              <div className="flex flex-col">
                <span className="text-[#666666] uppercase text-[10px] font-semibold italic tracking-wider mb-1">
                  Address
                </span>
                <span className="text-white text-[15px] md:text-[17px] max-w-[250px] leading-relaxed">
                  Greater Noida, Uttar Pradesh, India
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Map Embed (~55% mapped to col-7) */}
          <div className="lg:col-span-7 w-full h-full min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[400px] flex items-stretch">
            <div className="w-full h-full rounded-[12px] overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
              {/* Google Maps iFrame */}
              <iframe 
                title="Endurance Image Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112173.84497359556!2d77.40182512192087!3d28.49051877689945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cea64b8e8d4f5%3A0x815f9b4f9d0c6eb2!2sGreater%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1713000000000!5m2!1sen!2sin" 
                className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] border-0 outline-none"
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                style={{ filter: "grayscale(100%) invert(90%) contrast(85%)" }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="w-full border-t border-[rgba(255,255,255,0.08)] bg-[#0d0d0d]">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-[80px] py-4 sm:py-6 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-[#555555] text-[12px] text-center md:text-left">
            © {new Date().getFullYear()} Endurance Image. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-[#555555] text-[12px]">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>·</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
