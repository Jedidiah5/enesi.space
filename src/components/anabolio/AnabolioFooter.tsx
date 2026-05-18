import { ProfileAvatar } from "./ProfileAvatar";
import { SocialIcons } from "./SocialIcons";

type Props = {
  name: string;
  roleLine?: string;
  profileImageUrl?: string;
  statusLead?: string;
  statusTrail?: string;
  signoff?: string;
  disclaimer?: string;
  socials: { label: string; href: string }[];
  email?: string;
};

export function AnabolioFooter({
  name,
  roleLine,
  profileImageUrl,
  statusLead,
  statusTrail,
  signoff,
  disclaimer,
  socials,
  email,
}: Props) {
  const lead =
    statusLead ?? "This site is still under construction 👩‍💻";
  const trail = statusTrail ?? "Thanks for your patience! More content coming soon.";
  const signoffLine = signoff ?? "Made with love and late-night sessions 🌝";

  return (
    <footer className="border-t border-ana-line/40 bg-[#f9f9f9] py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3">
            <ProfileAvatar name={name} src={profileImageUrl} size="sm" />
            <div className="text-left">
              <p className="text-base font-bold tracking-tight text-ana-ink">{name}</p>
              {roleLine ? <p className="text-sm text-ana-muted">{roleLine}</p> : null}
            </div>
          </div>

          <p className="mt-8 max-w-lg text-[15px] leading-relaxed md:max-w-xl md:text-base">
            <span className="text-ana-pink">{lead}</span>{" "}
            <span className="font-medium text-ana-violet">{trail}</span>
          </p>

          <p className="mt-3 text-[15px] text-ana-ink md:text-base">{signoffLine}</p>

          <SocialIcons socials={socials} email={email} className="mt-6 justify-center" />
        </div>

        {disclaimer ? (
          <div className="mt-14 max-w-2xl text-left md:mt-16">
            <p className="text-xs leading-relaxed text-ana-muted md:text-[13px]">
              <span className="font-bold text-ana-ink">Disclaimer!</span> {disclaimer}
            </p>
          </div>
        ) : null}
      </div>
    </footer>
  );
}
