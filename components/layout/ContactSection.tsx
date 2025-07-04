"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/hooks/useTheme"
import { GreanCard } from "@/components/ui/grean-card"
import { CONTACT_INFO } from "@/utils/constants"

interface ContactSectionProps {
  inverterActive?: boolean
  isMobile?: boolean
  className?: string
}

/**
 * Reusable contact section component
 */
export function ContactSection({ inverterActive = false, isMobile = false, className = "" }: ContactSectionProps) {
  const { isDark } = useTheme()

  const containerClasses = isMobile
    ? "fixed bottom-0 left-0 right-0 z-40 bg-transparent px-4 pb-2 pt-1"
    : `contact-section-container w-full ${inverterActive ? "mt-16" : "mt-8"} mb-8`

  const cardClasses = isMobile
    ? "relative backdrop-blur-md shadow-xl overflow-hidden border h-16 p-2"
    : "relative backdrop-blur-sm shadow-xl p-4 overflow-hidden"

  const cardStyle = isMobile
    ? {
        backdropFilter: "blur(16px)",
        backgroundColor: isDark ? "rgba(15, 23, 42, 0.95)" : "rgba(255, 255, 255, 0.95)",
        borderColor: isDark ? "rgba(61, 213, 109, 0.3)" : "rgba(43, 183, 87, 0.4)",
      }
    : {}

  return (
    <div className={`${containerClasses} ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className={`flex flex-col items-center justify-center ${isMobile ? "max-w-[280px]" : "max-w-3xl"} mx-auto w-full`}
      >
        <GreanCard pattern="dots" gradient className={cardClasses} style={cardStyle}>
          {/* Background accent elements */}
          <div
            className={`absolute -bottom-16 -right-16 w-48 h-48 rounded-full ${
              isDark ? "bg-[#3DD56D]/10" : "bg-[#2bb757]/20"
            }`}
          />
          <div
            className={`absolute -top-16 -left-16 w-32 h-32 rounded-full ${
              isDark ? "bg-[#3DD56D]/10" : "bg-[#2bb757]/20"
            }`}
          />

          {/* Section Header */}
          <h2
            className={`${
              isMobile ? "text-xs" : "text-2xl"
            } font-bold leading-tight mb-3 drop-shadow-lg tracking-tight text-center ${
              isDark
                ? "text-transparent bg-clip-text bg-gradient-to-r from-[var(--grean-primary)] to-[var(--grean-secondary)]"
                : "text-[var(--grean-secondary)]"
            }`}
          >
            Contact GREAN WORLD
          </h2>

          <div
            className={`flex ${isMobile ? "flex-row items-center gap-2" : "flex-col sm:flex-row items-center gap-4"}`}
          >
            {/* QR Code */}
            <div className="qr-code-section flex flex-col items-center justify-center">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3DD56D] to-[#2bb757] rounded-lg blur opacity-40 group-hover:opacity-70 transition duration-1000" />
                <img
                  src="/images/qr-greanworld.png"
                  alt="GREAN WORLD QR Code"
                  className={`relative ${
                    isMobile ? "w-10 h-10" : "w-24 h-24"
                  } rounded-lg shadow-lg group-hover:scale-105 transition-all duration-500`}
                  style={{ background: "white" }}
                />
              </div>
              <span
                className={`block mt-1 ${isMobile ? "text-[8px]" : "text-xs"} font-medium tracking-wide ${
                  isDark ? "text-[#3DD56D]/90" : "text-[#2bb757]"
                }`}
              >
                <motion.span
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  {isMobile ? "Scan" : "Scan for Contact Info"}
                </motion.span>
              </span>
            </div>

            {/* Contact Information - Hidden on mobile */}
            {!isMobile && (
              <div className="contact-info-details flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {/* Phone Number */}
                <ContactInfoCard
                  icon="phone"
                  label="Phone"
                  primary={CONTACT_INFO.PHONES[0]}
                  secondary={CONTACT_INFO.PHONES[1]}
                  isDark={isDark}
                />

                {/* Email */}
                <ContactInfoCard
                  icon="email"
                  label="Email"
                  primary={CONTACT_INFO.EMAILS[0]}
                  secondary={CONTACT_INFO.EMAILS[1]}
                  isDark={isDark}
                />

                {/* Location */}
                <ContactInfoCard icon="location" label="Address" primary={CONTACT_INFO.ADDRESS} isDark={isDark} />

                {/* Social Media Links */}
                <SocialMediaLinks isDark={isDark} />
              </div>
            )}
          </div>
        </GreanCard>
      </motion.div>
    </div>
  )
}

/**
 * Individual contact info card component
 */
function ContactInfoCard({
  icon,
  label,
  primary,
  secondary,
  isDark,
}: {
  icon: "phone" | "email" | "location"
  label: string
  primary: string
  secondary?: string
  isDark: boolean
}) {
  const icons = {
    phone: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.923V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    ),
    email: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    ),
    location: (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </>
    ),
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, x: 5 }}
      className={`p-2 rounded-lg border backdrop-blur-sm flex items-center gap-2 transition-all hover:shadow-md ${
        isDark
          ? "border-[#23A455]/30 bg-slate-900/50 hover:border-[#3DD56D]/50"
          : "border-[#2bb757]/60 bg-white/80 hover:border-[#23A455]/80"
      }`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isDark ? "bg-[#23A455]/50" : "bg-[#2bb757]"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 ${isDark ? "text-[#3DD56D]" : "text-white"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {icons[icon]}
        </svg>
      </div>
      <div className="min-w-0">
        <div
          className={`text-[10px] font-medium uppercase tracking-wider ${
            isDark ? "text-[#3DD56D]/80" : "text-[#2bb757]"
          }`}
        >
          {label}
        </div>
        <div className={`text-sm font-mono font-bold truncate ${isDark ? "text-white" : "text-[#2bb757]"}`}>
          {primary}
        </div>
        {secondary && (
          <div className={`text-xs font-mono font-medium truncate ${isDark ? "text-gray-300" : "text-[#2bb757]/80"}`}>
            {secondary}
          </div>
        )}
      </div>
    </motion.div>
  )
}

/**
 * Social media links component
 */
function SocialMediaLinks({ isDark }: { isDark: boolean }) {
  const socialLinks = [
    { name: "Facebook", url: CONTACT_INFO.SOCIAL.FACEBOOK, icon: "facebook" },
    { name: "Twitter", url: CONTACT_INFO.SOCIAL.TWITTER, icon: "twitter" },
    { name: "LinkedIn", url: CONTACT_INFO.SOCIAL.LINKEDIN, icon: "linkedin" },
    { name: "Instagram", url: CONTACT_INFO.SOCIAL.INSTAGRAM, icon: "instagram" },
  ]

  const socialIcons = {
    facebook: (
      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
    ),
    twitter: (
      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
    ),
    linkedin: (
      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
    ),
    instagram: (
      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.599-.92.248 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
    ),
  }

  return (
    <div className="flex items-center justify-around sm:justify-start sm:space-x-3 p-2">
      {socialLinks.map((social) => (
        <motion.a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2, rotate: 5 }}
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
            isDark ? "bg-[#23A455]/30 hover:bg-[#23A455]/50" : "bg-[#2bb757]/80 hover:bg-[#23A455]"
          }`}
          aria-label={`${social.name} - @greanworld`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="currentColor"
            className={`${isDark ? "text-[#3DD56D]" : "text-white"}`}
            viewBox="0 0 16 16"
          >
            {socialIcons[social.icon as keyof typeof socialIcons]}
          </svg>
        </motion.a>
      ))}
    </div>
  )
}
