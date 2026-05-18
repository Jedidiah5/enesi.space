"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HERO_STICKERS, PixelSticker } from "./PixelSticker";
import { ProfileAvatar } from "./ProfileAvatar";
import { SocialIcons } from "./SocialIcons";

type Social = { label: string; href: string };

type Props = {
  helloHeadline: string;
  roleSubtitle: string;
  introHeading: string;
  bio: string;
  profileImageUrl?: string;
  name: string;
  socials: Social[];
  email?: string;
};

export function AnabolioHero({
  helloHeadline,
  roleSubtitle,
  introHeading,
  bio,
  profileImageUrl,
  name,
  socials,
  email,
}: Props) {
  const reduce = useReducedMotion();

  return (
    <section className="border-b border-ana-line/40 pb-12 pt-4 md:pb-16 md:pt-6">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-2 md:gap-12 md:px-8 lg:gap-16">
        {/* Left — stickers + greeting */}
        <div className="flex flex-col justify-center">
          <div className="mb-6 flex items-end gap-3 md:mb-8 md:gap-4">
            {HERO_STICKERS.map((variant, i) => (
              <motion.div
                key={variant}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.07, duration: 0.4 }}
                className="transition-transform hover:-translate-y-1"
              >
                <PixelSticker variant={variant} size={i === 1 || i === 2 ? 52 : 48} />
              </motion.div>
            ))}
          </div>

          <motion.h1
            className="text-[clamp(2rem,5.5vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-ana-ink"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
          >
            {helloHeadline}
          </motion.h1>

          <motion.p
            className="mt-2 text-lg text-ana-muted md:text-xl"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.22 }}
          >
            {roleSubtitle}
          </motion.p>

          <motion.div
            className="mt-6"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.28 }}
          >
            <SocialIcons socials={socials} email={email} />
          </motion.div>
        </div>

        {/* Right — bio card */}
        <div className="flex flex-col justify-center md:pl-4 lg:pl-8">
          <div className="flex gap-4">
            <ProfileAvatar name={name} src={profileImageUrl} />
            <div className="min-w-0 pt-0.5">
              <h2 className="text-lg font-bold text-ana-ink md:text-xl">{introHeading}</h2>
              <p className="mt-3 text-[15px] leading-[1.65] text-ana-muted md:text-base">{bio}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
