import { motion } from "framer-motion";
import { useState } from "react";
import {
  Mail,
  User,
  Phone,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

const JoinUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Build a pre-filled WhatsApp message
    const text = encodeURIComponent(
      `Hi Endurance Production! 👋\n\n` +
      `Name: ${formData.firstName} ${formData.lastName}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Message: ${formData.message || "—"}`
    );

    // Replace with the studio's actual WhatsApp number (digits only, with country code)
    const phone = "919876543210"; // e.g. 91 = India code, then 10-digit number
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-background text-foreground flex min-h-screen relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Left Side - Video Section */}
      <div className="w-1/2 relative hidden lg:flex items-center justify-center">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover object-top"
          style={{ objectPosition: "center 25%" }}
          src="/media/join-vid.mp4"
          autoPlay
          loop
          muted
        />
        <div className="absolute inset-0 bg-black/40" />

        <motion.div
          className="absolute bottom-10 left-10 text-foreground bg-white/60 backdrop-blur-md p-8 rounded-2xl border border-border max-w-sm"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.h2
            className="text-4xl font-bold mb-3"
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Let's Create Together
          </motion.h2>
          <p className="text-muted-foreground leading-relaxed">
            Tell us about your project and let's bring your vision to life
            with cinematic storytelling and visual excellence.
          </p>
          <motion.div
            className="mt-4 flex items-center gap-2 text-primary"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span>Ready to start your project?</span>
            <ArrowRight size={20} />
          </motion.div>
        </motion.div>
      </div>

      {/* Right Side - Form Section */}
      <div className="w-full lg:w-1/2 p-8 md:p-16 flex items-center justify-center relative z-10">
        <motion.div
          className="w-full max-w-md"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <p className="text-sm font-bold text-primary mb-2 uppercase">Endurance Production</p>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-pink-400 bg-clip-text text-transparent">
              Get In Touch
            </h1>
            <p className="text-muted-foreground text-sm mt-2">
              Fill in the details below and we'll open WhatsApp with your message pre-filled.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Fields */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  First name*
                </label>
                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-3 top-3 text-muted-foreground z-10"
                  />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Last name*
                </label>
                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-3 top-3 text-muted-foreground z-10"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  />
                </div>
              </div>
            </motion.div>

            {/* Email Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Email address
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-3 text-muted-foreground z-10"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                />
              </div>
            </motion.div>

            {/* Phone Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Phone number*
              </label>
              <div className="relative flex">
                <Phone
                  size={18}
                  className="absolute left-3 top-3 text-muted-foreground z-10"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 0000000000"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                />
              </div>
            </motion.div>

            {/* Message Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Tell us about your project
              </label>
              <div className="relative">
                <MessageSquare
                  size={18}
                  className="absolute left-3 top-3 text-muted-foreground z-10"
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your project, timeline, budget..."
                  rows={3}
                  className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none"
                />
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* WhatsApp icon inline */}
                <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3 .97 4.29L2.5 22l6.05-1.62c1.25.67 2.67 1.05 4.15 1.05 5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.41 0-2.73-.36-3.88-.99l-.28-.15-2.89.77.8-2.86-.18-.29C4.5 14.62 4 13.38 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z" />
                  <path d="M16.65 13.08c-.23-.12-1.37-.68-1.58-.75-.21-.07-.36-.11-.51.11-.15.23-.59.75-.72.9-.13.15-.26.17-.49.05-.23-.12-1-.37-1.91-1.18-.71-.63-1.18-1.41-1.32-1.64-.13-.23-.01-.36.1-.48.1-.1.23-.26.35-.39.12-.13.16-.23.24-.38.08-.15.04-.28-.02-.39-.06-.11-.51-1.23-.7-1.68-.18-.43-.37-.37-.51-.38-.13-.01-.28-.01-.42-.01-.15 0-.39.06-.59.28-.2.23-.76.74-.76 1.81 0 1.07.78 2.1.89 2.25.11.15 1.56 2.38 3.77 3.34.53.23.94.36 1.26.46.53.17 1.01.15 1.39.09.42-.06 1.37-.56 1.56-1.1.19-.54.19-1.01.13-1.1-.06-.09-.21-.14-.44-.26z" />
                </svg>
                Send via WhatsApp
              </motion.button>
            </motion.div>

            {/* Footer Text */}
            <motion.p
              variants={itemVariants}
              className="text-xs text-muted-foreground text-center"
            >
              Tapping the button will open WhatsApp with your details pre-filled.
            </motion.p>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default JoinUs;
