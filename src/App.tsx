import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  DoorOpen,
  ExternalLink,
  Gift,
  HandHeart,
  Heart,
  HeartHandshake,
  House,
  Mail,
  MapPin,
  Menu,
  PawPrint,
  Phone,
  Search,
  Send,
  Share2,
  ShieldCheck,
  Stethoscope,
  UsersRound,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { siteContent, type Animal } from "./content";

type Page = "home" | "story" | "animals" | "help" | "contact";
type Frequency = "One-time" | "Monthly";
type AnimalCategory = "All animals" | "Dogs" | "Cats" | "Other Animals";

const PAGE_PATHS: Record<Page, string> = {
  home: "/",
  story: "/our-story",
  animals: "/our-animals",
  help: "/how-you-can-help",
  contact: "/contact",
};

const PAGE_TITLES: Record<Page, string> = {
  home: "A Safe Haven Since 1988",
  story: "Our Story",
  animals: "Our Animals",
  help: "How You Can Help",
  contact: "Contact Us",
};

const NAV_ITEMS: { page: Page; label: string }[] = [
  { page: "home", label: "Home" },
  { page: "story", label: "Our Story" },
  { page: "animals", label: "Our Animals" },
  { page: "help", label: "How You Can Help" },
  { page: "contact", label: "Contact" },
];

const timelineItems = [
  {
    year: "1988",
    title: "A safe place begins",
    copy: "The shelter begins its mission to help animals in need and give them somewhere safe to land.",
  },
  {
    year: "The years that followed",
    title: "A community keeps showing up",
    copy: "Dedicated supporters, volunteers and neighbors help the shelter continue its work, year after year.",
  },
  {
    year: "2020",
    title: "A difficult turning point",
    copy: "The organization begins facing significant financial challenges as many contributors are lost.",
  },
  {
    year: "Today",
    title: "The next chapter is in our hands",
    copy: "The shelter is fighting to remain open and keep caring for animals who depend on it.",
  },
];

const impactItems: {
  title: string;
  copy: string;
  icon: LucideIcon;
  amount: number;
}[] = [
  {
    title: "Food & daily care",
    copy: "Help provide the food, comfort and everyday care animals need.",
    icon: Heart,
    amount: 25,
  },
  {
    title: "Medical care",
    copy: "Help make compassionate veterinary and emergency care possible.",
    icon: Stethoscope,
    amount: 50,
  },
  {
    title: "A safe shelter",
    copy: "Help keep a safe place available for animals who need somewhere to go.",
    icon: House,
    amount: 100,
  },
  {
    title: "Keep the doors open",
    copy: "Help this organization continue its rescue work for years to come.",
    icon: DoorOpen,
    amount: 250,
  },
];

const trustItems: { title: string; copy: string; icon: LucideIcon }[] = [
  {
    title: "Food",
    copy: "Everyday nourishment for animals in our care.",
    icon: Heart,
  },
  {
    title: "Veterinary care",
    copy: "Checkups, treatment and urgent care when it is needed.",
    icon: Stethoscope,
  },
  {
    title: "Shelter operations",
    copy: "A safe, warm place and the essentials that keep it running.",
    icon: House,
  },
  {
    title: "Rescue & supplies",
    copy: "The practical supplies and support that help animals start again.",
    icon: HandHeart,
  },
];

const faqs = [
  {
    question: "Where does my donation go?",
    answer:
      "Demo answer: Contributions support the shelter's animal care and day-to-day needs. The shelter can edit this answer to reflect its current budget and reporting practices.",
  },
  {
    question: "Can I make a recurring donation?",
    answer:
      "Demo answer: Recurring gifts may be available through the shelter's secure donation provider. Add the provider's exact options here before launch.",
  },
  {
    question: "Can I support a specific animal?",
    answer:
      "Demo answer: Contact the shelter to ask about a particular animal or a current care need. Replace this text with the shelter's confirmed process.",
  },
  {
    question: "How can I volunteer?",
    answer:
      "Demo answer: Send a note through the contact form and the shelter will share current volunteer opportunities and next steps.",
  },
  {
    question: "How can I share the shelter's campaign?",
    answer:
      "Use the share button on this page or follow the shelter on Facebook. A link to the official page can be added in the editable site content.",
  },
];

function pageFromPath(path: string): Page {
  const match = (Object.entries(PAGE_PATHS) as [Page, string][]).find(
    ([, route]) => route === path.replace(/\/$/, "") || (route === "/" && path === "/"),
  );
  return match?.[0] ?? "home";
}

function PageLink({
  page,
  onNavigate,
  className,
  children,
  ...props
}: {
  page: Page;
  onNavigate: (page: Page) => void;
  className?: string;
  children: ReactNode;
  [key: string]: unknown;
}) {
  return (
    <a
      href={PAGE_PATHS[page]}
      className={className}
      onClick={(event) => {
        event.preventDefault();
        onNavigate(page);
      }}
      {...props}
    >
      {children}
    </a>
  );
}

function DonateButton({
  onClick,
  label = "Donate now",
  variant = "gold",
  className = "",
}: {
  onClick: () => void;
  label?: string;
  variant?: "gold" | "green" | "light";
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`button button--${variant} ${className}`}
      onClick={onClick}
    >
      <span>{label}</span>
      <ArrowRight size={17} strokeWidth={1.8} aria-hidden="true" />
    </button>
  );
}

function FacebookMark({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.6 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.4V13h2.8v8h3.4Z" />
    </svg>
  );
}

function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
  light = false,
}: {
  eyebrow: string;
  title: ReactNode;
  copy?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={`section-heading section-heading--${align}${light ? " section-heading--light" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {copy && <p className="section-heading__copy">{copy}</p>}
    </div>
  );
}

function Header({
  page,
  onNavigate,
  onDonate,
  scrolled,
}: {
  page: Page;
  onNavigate: (page: Page) => void;
  onDonate: () => void;
  scrolled: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  function navigate(event: React.MouseEvent<HTMLAnchorElement>, target: Page) {
    event.preventDefault();
    setMenuOpen(false);
    onNavigate(target);
  }

  return (
    <header className={`site-header${scrolled ? " site-header--scrolled" : ""}`}>
      <div className="nav-shell">
        <a
          className="brand"
          href="/"
          aria-label={`${siteContent.name} home`}
          onClick={(event) => navigate(event, "home")}
        >
          <span className="brand-mark"><PawPrint size={24} strokeWidth={1.7} aria-hidden="true" /></span>
          <span className="brand-name">
            <span>Association For</span>
            <strong>Animal Rights</strong>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.page}
              href={PAGE_PATHS[item.page]}
              className={page === item.page ? "nav-link is-active" : "nav-link"}
              aria-current={page === item.page ? "page" : undefined}
              onClick={(event) => navigate(event, item.page)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <DonateButton onClick={onDonate} className="nav-donate" />
          <button
            type="button"
            className="menu-toggle"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`mobile-nav${menuOpen ? " mobile-nav--open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.page}
              href={PAGE_PATHS[item.page]}
              className={page === item.page ? "mobile-nav__link is-active" : "mobile-nav__link"}
              tabIndex={menuOpen ? 0 : -1}
              onClick={(event) => navigate(event, item.page)}
            >
              {item.label}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          ))}
          <div className="mobile-nav__social">
            <span>Here for the animals, since {siteContent.since}</span>
            <PawPrint size={16} aria-hidden="true" />
          </div>
        </nav>
      </div>
    </header>
  );
}

function Footer({
  onNavigate,
  onDonate,
  onFacebook,
  onPlaceholder,
}: {
  onNavigate: (page: Page) => void;
  onDonate: () => void;
  onFacebook: () => void;
  onPlaceholder: (message: string) => void;
}) {
  return (
    <footer className="site-footer">
      <div className="footer-top container">
        <div className="footer-brand-block">
          <PageLink page="home" onNavigate={onNavigate} className="brand brand--footer">
            <span className="brand-mark"><PawPrint size={23} strokeWidth={1.7} aria-hidden="true" /></span>
            <span className="brand-name"><span>Association For</span><strong>Animal Rights</strong></span>
          </PageLink>
          <p>Serving animals and our community since {siteContent.since}.</p>
          <p className="footer-mantra">Built around compassion. Powered by community.</p>
        </div>

        <div className="footer-nav-group">
          <p className="footer-label">Explore</p>
          <nav aria-label="Footer navigation">
            {NAV_ITEMS.slice(1).map((item) => (
              <PageLink key={item.page} page={item.page} onNavigate={onNavigate}>
                {item.label}
              </PageLink>
            ))}
          </nav>
        </div>

        <div className="footer-nav-group footer-connect">
          <p className="footer-label">Stay close</p>
          <button type="button" onClick={onFacebook}><FacebookMark /> Facebook</button>
          <a href={`mailto:${siteContent.contact.email}`}><Mail size={16} aria-hidden="true" /> Contact</a>
          <button type="button" onClick={onDonate}><Heart size={16} aria-hidden="true" /> Donate</button>
        </div>
      </div>
      <div className="footer-bottom container">
        <span>© {new Date().getFullYear()} Association For Animal Rights</span>
        <div className="footer-legal">
          <button type="button" onClick={() => onPlaceholder("Privacy policy content can be added here before launch.")}>Privacy policy</button>
          <button type="button" onClick={() => onPlaceholder("Terms content can be added here before launch.")}>Terms</button>
        </div>
      </div>
    </footer>
  );
}

function Timeline({ compact = false }: { compact?: boolean }) {
  return (
    <ol className={`timeline${compact ? " timeline--compact" : ""}`}>
      {timelineItems.map((item, index) => (
        <li className="timeline-item reveal" key={item.year} style={{ transitionDelay: `${index * 90}ms` }}>
          <div className="timeline-year"><span>{item.year}</span></div>
          <div className="timeline-copy">
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function AnimalCard({ animal, onOpen }: { animal: Animal; onOpen: (animal: Animal) => void }) {
  return (
    <article className="animal-card reveal">
      <button
        type="button"
        className="animal-card__image"
        aria-label={`View ${animal.name}'s story`}
        onClick={() => onOpen(animal)}
      >
        <img src={animal.image} alt={animal.alt} loading="lazy" />
        <span className={`animal-status animal-status--${animal.status.toLowerCase().replace(/ /g, "-")}`}>
          {animal.status}
        </span>
        <span className="animal-card__open"><ArrowUpRight size={18} aria-hidden="true" /></span>
      </button>
      <div className="animal-card__body">
        <div className="animal-card__meta"><span>{animal.category}</span><span>{animal.age}</span></div>
        <h3>{animal.name}</h3>
        <p>{animal.story}</p>
        <button type="button" className="text-action" onClick={() => onOpen(animal)}>
          View story <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

function CampaignProgress({ onDonate }: { onDonate: () => void }) {
  const amount = siteContent.campaign.raised;
  const goal = siteContent.campaign.goal;
  const progress = goal > 0 ? Math.min((amount / goal) * 100, 100) : 0;

  return (
    <div className="campaign-panel reveal">
      <div className="campaign-panel__top">
        <p className="campaign-label"><span className="campaign-dot" /> Community goal</p>
        <span className="campaign-since">Since 1988</span>
      </div>
      <p className="campaign-panel__intro">{siteContent.campaign.headline}</p>
      <div className="campaign-amounts">
        <strong>${amount.toLocaleString()}</strong>
        <span>raised <i>/</i> ${goal.toLocaleString()} goal</span>
      </div>
      <div
        className="progress-track"
        role="progressbar"
        aria-label="Community fundraising goal demo progress"
        aria-valuemin={0}
        aria-valuemax={goal}
        aria-valuenow={amount}
      >
        <span className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="campaign-panel__foot">
        <span>{siteContent.campaign.isDemo ? "Demo figures - replace before launch" : "Community campaign"}</span>
        <button type="button" onClick={onDonate} aria-label="Help save the shelter">
          Help save the shelter <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function HomePage({
  onDonate,
  onAnimal,
  onNavigate,
  onFacebook,
  onShare,
}: {
  onDonate: (amount?: number) => void;
  onAnimal: (animal: Animal) => void;
  onNavigate: (page: Page) => void;
  onFacebook: () => void;
  onShare: () => void;
}) {
  const animals = siteContent.animals.slice(0, 3);

  return (
    <div className="page-content page-enter">
      <section className="hero" aria-labelledby="home-title">
        <img className="hero__photo" src={siteContent.images.hero} alt="A rescued dog resting safely indoors and looking toward the camera" />
        <div className="hero__scrim" />
        <div className="hero__content container">
          <div className="hero__identity">
            <span className="hero__mark"><PawPrint size={19} aria-hidden="true" /></span>
            <span>Association For Animal Rights</span>
          </div>
          <p className="hero__since">Serving animals and our community since {siteContent.since}</p>
          <h1 id="home-title">{siteContent.homepage.headline} <em>{siteContent.homepage.headlineAccent}</em></h1>
          <p className="hero__copy">{siteContent.homepage.description}</p>
          <div className="hero__actions">
            <DonateButton onClick={() => onDonate()} label="Donate now" className="hero__donate" />
            <button
              type="button"
              className="hero__secondary"
              onClick={() => document.getElementById("urgent-support")?.scrollIntoView({ behavior: "smooth" })}
            >
              See how your help makes a difference <ArrowDown size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="hero__bottom container">
          <p><span className="hero__trust-dot" /> A safe place, made possible by people who care.</p>
          <a href="#urgent-support" onClick={(event) => { event.preventDefault(); document.getElementById("urgent-support")?.scrollIntoView({ behavior: "smooth" }); }}>
            Scroll to discover <span className="scroll-line" />
          </a>
        </div>
      </section>

      <section className="urgent-section section-pad" id="urgent-support">
        <div className="container urgent-layout">
          <div className="urgent-copy reveal">
            <p className="eyebrow"><span className="eyebrow-mark" /> A moment that matters</p>
            <h2>Right now, they need us <em>more than ever.</em></h2>
            <p>Since 2020, our shelter has faced challenges that have made keeping our doors open increasingly difficult. We've lost many of the supporters who helped us continue our work, including our largest contributor.</p>
            <p>We're asking our community to help us make one more strong push to protect this shelter and the animals who depend on it.</p>
            <button type="button" className="text-action text-action--large" onClick={() => onDonate()}>
              Help save the shelter <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
          <CampaignProgress onDonate={() => onDonate()} />
        </div>
      </section>

      <section className="impact-section section-pad" id="your-impact">
        <div className="container">
          <SectionHeading
            eyebrow="Your care, made tangible"
            title={<>Why your donation <em>matters.</em></>}
            copy="Every gift supports the practical, everyday work of keeping animals safe and cared for."
          />
          <div className="impact-grid">
            {impactItems.map(({ title, copy, icon: Icon, amount }, index) => (
              <button
                type="button"
                className="impact-item reveal"
                key={title}
                style={{ transitionDelay: `${index * 70}ms` }}
                onClick={() => onDonate(amount)}
                aria-label={`Choose a $${amount} donation to support ${title.toLowerCase()}`}
              >
                <span className="impact-item__icon"><Icon size={24} strokeWidth={1.55} aria-hidden="true" /></span>
                <span className="impact-item__title">{title}</span>
                <span className="impact-item__copy">{copy}</span>
                <span className="impact-item__action">Choose a gift <ArrowUpRight size={16} aria-hidden="true" /></span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="animals-section section-pad" id="animals">
        <div className="container">
          <div className="section-head-row reveal">
            <SectionHeading
              eyebrow="The hearts behind the mission"
              title={<>Every animal deserves a <em>second chance.</em></>}
              copy="Behind every donation is an animal who deserves safety, care and another chance at a better life."
            />
            <PageLink page="animals" onNavigate={onNavigate} className="desktop-text-link">
              Meet more of our animals <ArrowRight size={17} aria-hidden="true" />
            </PageLink>
          </div>
          <p className="demo-caption">Example profiles shown. Replace with the shelter's current animals and stories.</p>
          <div className="animal-grid animal-grid--home">
            {animals.map((animal) => <AnimalCard key={animal.id} animal={animal} onOpen={onAnimal} />)}
          </div>
          <PageLink page="animals" onNavigate={onNavigate} className="mobile-text-link">
            Meet more of our animals <ArrowRight size={17} aria-hidden="true" />
          </PageLink>
        </div>
      </section>

      <section className="history-section section-pad">
        <div className="container history-layout">
          <div className="history-intro reveal">
            <p className="eyebrow">A promise held for decades</p>
            <h2>A mission that started in <em>1988.</em></h2>
            <p>For generations, this shelter has been a place animals and people could turn to. We don't want the story to end here.</p>
            <DonateButton onClick={() => onDonate()} label="Help us write the next chapter" variant="green" />
          </div>
          <Timeline compact />
        </div>
      </section>

      <section className="mission-section section-pad">
        <div className="mission-layout">
          <div className="mission-photo reveal">
            <img src={siteContent.images.care} alt="A veterinary team and volunteers caring for a dog" loading="lazy" />
            <span className="image-note"><PawPrint size={15} aria-hidden="true" /> Care, kindness, another chance.</span>
          </div>
          <div className="mission-copy reveal">
            <p className="eyebrow">The reason we stay</p>
            <h2>Our <em>mission.</em></h2>
            <p>For decades, this shelter has been a safe place for animals who needed someone to care. Our goal is simple: protect animals, provide compassionate care, and give them a chance at a better life.</p>
            <div className="mission-since"><span><PawPrint size={16} aria-hidden="true" /></span> Serving since 1988</div>
            <PageLink page="story" onNavigate={onNavigate} className="text-action">
              Read our full story <ArrowRight size={17} aria-hidden="true" />
            </PageLink>
          </div>
        </div>
      </section>

      <section className="help-section section-pad" id="ways-to-help">
        <div className="container">
          <SectionHeading
            eyebrow="Show up in the way you can"
            title={<>There are many ways to <em>make a difference.</em></>}
            copy="A gift, a kind word or an hour of your time can help carry this work forward."
          />
          <div className="help-grid">
            <HelpAction icon={Gift} title="Donate" copy="Help provide care and keep the shelter operating." action="Donate now" onClick={() => onDonate()} />
            <HelpAction icon={Share2} title="Share" copy="Help us reach someone who may never have heard our story." action="Share our mission" onClick={onShare} />
            <HelpAction icon={UsersRound} title="Volunteer" copy="Support the people and animals who make this mission possible." action="Learn more" onClick={() => onNavigate("contact")} />
            <HelpAction icon={HeartHandshake} title="Spread the word" copy="Tell your friends, family and community about the shelter." action="Get involved" onClick={() => onNavigate("help")} />
          </div>
        </div>
      </section>

      <section className="donation-banner">
        <img src={siteContent.images.closing} alt="A rescued dog receiving a gentle, reassuring touch outdoors" loading="lazy" />
        <div className="donation-banner__shade" />
        <div className="donation-banner__content container reveal">
          <p className="eyebrow eyebrow--light">A little help can keep hope here</p>
          <h2>They can't ask for help.<br /><em>But you can help them.</em></h2>
          <p>A donation today can help provide care, safety and hope for animals who depend on this shelter.</p>
          <div className="donation-banner__actions">
            <DonateButton onClick={() => onDonate()} label="Make a donation" />
            <PageLink page="help" onNavigate={onNavigate} className="light-link">Learn where your support goes <ArrowRight size={16} aria-hidden="true" /></PageLink>
          </div>
        </div>
      </section>

      <section className="transparency-section section-pad">
        <div className="container transparency-layout">
          <div className="transparency-intro reveal">
            <p className="eyebrow">Care with clarity</p>
            <h2>Your support has a <em>purpose.</em></h2>
            <p>Every contribution helps with the real, ongoing needs of caring for animals and keeping the shelter here.</p>
            <PageLink page="contact" onNavigate={onNavigate} className="text-action">
              Questions about donating? Contact us <ArrowRight size={17} aria-hidden="true" />
            </PageLink>
          </div>
          <div className="trust-list">
            {trustItems.map(({ title, copy, icon: Icon }, index) => (
              <div className="trust-item reveal" key={title} style={{ transitionDelay: `${index * 65}ms` }}>
                <span className="trust-item__icon"><Icon size={21} strokeWidth={1.55} aria-hidden="true" /></span>
                <div><h3>{title}</h3><p>{copy}</p></div>
                <Check size={17} className="trust-item__check" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="community-section section-pad">
        <div className="container community-layout reveal">
        <div className="community-mark"><FacebookMark size={25} /></div>
          <div className="community-copy">
            <p className="eyebrow">A community that cares</p>
            <h2>Stay connected with our <em>rescue community.</em></h2>
            <p>Follow our journey, see updates from the shelter and share our mission with your community.</p>
          </div>
          <div className="community-actions">
            <button type="button" className="button button--green" onClick={onFacebook}>Visit Facebook <ExternalLink size={16} aria-hidden="true" /></button>
            <button type="button" className="button button--outline" onClick={onShare}>Share our story <Share2 size={16} aria-hidden="true" /></button>
            <span>Facebook page: Association For Animal Rights</span>
          </div>
        </div>
      </section>

      <section className="closing-cta">
        <div className="closing-cta__inner container reveal">
          <div>
            <p className="eyebrow eyebrow--light">The next chapter starts with us</p>
            <h2>Help keep their<br /><em>safe haven open.</em></h2>
            <p>The shelter has been here since 1988. With your help, we hope it can continue being here for the animals who need it.</p>
          </div>
          <div className="closing-cta__action">
            <DonateButton onClick={() => onDonate()} label="Donate now" />
            <span>Every contribution makes a difference.</span>
          </div>
        </div>
        <PawPrint className="closing-cta__watermark" size={210} strokeWidth={0.7} aria-hidden="true" />
      </section>
    </div>
  );
}

function HelpAction({
  icon: Icon,
  title,
  copy,
  action,
  onClick,
  featured = false,
}: {
  icon: LucideIcon;
  title: string;
  copy: string;
  action: string;
  onClick: () => void;
  featured?: boolean;
}) {
  return (
    <button type="button" className={`help-action reveal${featured ? " help-action--featured" : ""}`} onClick={onClick}>
      <span className="help-action__icon"><Icon size={23} strokeWidth={1.55} aria-hidden="true" /></span>
      <span className="help-action__title">{title}</span>
      <span className="help-action__copy">{copy}</span>
      <span className="help-action__link">{action} <ArrowRight size={16} aria-hidden="true" /></span>
    </button>
  );
}

function StoryPage({ onDonate }: { onDonate: () => void }) {
  return (
    <div className="page-content page-enter">
      <section className="subhero subhero--story">
        <img src={siteContent.images.history} alt="A shelter volunteer serving food to dogs in their care" />
        <div className="subhero__shade" />
        <div className="subhero__content container">
          <p className="eyebrow eyebrow--light">A promise that has lasted</p>
          <h1>A story that began<br /><em>in 1988.</em></h1>
          <p>For decades, Association For Animal Rights has been a place of safety, care and another chance.</p>
          <DonateButton onClick={onDonate} label="Help continue the story" />
        </div>
        <span className="subhero__caption">A mission carried by care and community</span>
      </section>

      <section className="story-statement section-pad">
        <div className="container story-statement__layout">
          <div className="story-statement__mark reveal"><PawPrint size={43} strokeWidth={1.2} aria-hidden="true" /><span>Since<br />1988</span></div>
          <div className="reveal">
            <p className="eyebrow">A place to turn</p>
            <h2>Somewhere safe to land.<br /><em>Someone ready to care.</em></h2>
            <p>Association For Animal Rights began with a simple belief: animals in need deserve safety, patience and the chance to begin again. That belief has held steady through changing times, because people in this community chose to care.</p>
          </div>
        </div>
      </section>

      <section className="story-timeline-section section-pad">
        <div className="container story-timeline-layout">
          <div className="story-timeline-intro reveal">
            <p className="eyebrow">Our story, so far</p>
            <h2>A mission held by <em>many hands.</em></h2>
            <p>The shelter's history belongs to the animals, the people who cared for them and the neighbors who helped keep the doors open.</p>
          </div>
          <Timeline />
        </div>
      </section>

      <section className="turning-point section-pad">
        <div className="container turning-point__layout">
          <div className="turning-point__photo reveal">
            <img src={siteContent.images.care} alt="Volunteers working together to provide care for a dog" loading="lazy" />
            <span>Every day of care begins with a community.</span>
          </div>
          <div className="turning-point__copy reveal">
            <p className="eyebrow">A difficult chapter</p>
            <h2>Since 2020, keeping the doors open has become <em>harder.</em></h2>
            <p>Like many small organizations, the shelter has faced mounting financial challenges. Many of the contributors who helped sustain its work are no longer able to give, including its largest supporter.</p>
            <p>This is a critical moment, but it is not the end of the story. The shelter is making one major community appeal to protect this place and the animals who rely on it.</p>
            <DonateButton onClick={onDonate} label="Help save the shelter" variant="green" />
          </div>
        </div>
      </section>

      <section className="story-end section-pad">
        <div className="container story-end__inner reveal">
          <p className="eyebrow">We don't want the story to end here</p>
          <h2>Help us write<br /><em>the next chapter.</em></h2>
          <p>Your support can help this shelter continue being here for animals who need somewhere safe to go.</p>
          <DonateButton onClick={onDonate} label="Donate now" />
        </div>
      </section>
    </div>
  );
}

function AnimalsPage({
  onAnimal,
  onDonate,
}: {
  onAnimal: (animal: Animal) => void;
  onDonate: () => void;
}) {
  const [category, setCategory] = useState<AnimalCategory>("All animals");
  const [status, setStatus] = useState("All needs");
  const [query, setQuery] = useState("");
  const categories: AnimalCategory[] = ["All animals", "Dogs", "Cats", "Other Animals"];
  const statuses = ["All needs", "Needs Support", "In Our Care", "Looking for a Home"];

  const filteredAnimals = useMemo(() => siteContent.animals.filter((animal) => {
    const matchesCategory = category === "All animals" || animal.category === category;
    const matchesStatus = status === "All needs" || animal.status === status;
    const searchText = `${animal.name} ${animal.category} ${animal.story} ${animal.status}`.toLowerCase();
    return matchesCategory && matchesStatus && searchText.includes(query.toLowerCase().trim());
  }), [category, query, status]);

  return (
    <div className="page-content page-enter">
      <section className="page-intro section-pad">
        <div className="container page-intro__inner">
          <div className="reveal">
            <p className="eyebrow">The ones at the heart of it all</p>
            <h1>Meet the animals<br /><em>behind our mission.</em></h1>
          </div>
          <div className="page-intro__side reveal">
            <p>Every animal has their own story. These example profiles show how easy it will be to share the animals who need a little care, support or a place to call home.</p>
            <DonateButton onClick={onDonate} label="Support their safe haven" variant="green" />
          </div>
        </div>
      </section>

      <section className="animal-directory section-pad">
        <div className="container">
          <div className="directory-note reveal"><PawPrint size={16} aria-hidden="true" /><span>Demo profiles only - replace names, photos, stories and status before launch.</span></div>
          <div className="animal-controls reveal">
            <div className="animal-search">
              <Search size={18} aria-hidden="true" />
              <label className="visually-hidden" htmlFor="animal-search">Search animals</label>
              <input id="animal-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search animals" />
              {query && <button type="button" aria-label="Clear search" onClick={() => setQuery("")}><X size={15} aria-hidden="true" /></button>}
            </div>
            <div className="filter-row" aria-label="Animal type filters">
              {categories.map((item) => (
                <button type="button" key={item} className={category === item ? "filter-button is-selected" : "filter-button"} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>
              ))}
            </div>
            <label className="status-select-wrap">
              <span className="visually-hidden">Filter by status</span>
              <select value={status} onChange={(event) => setStatus(event.target.value)}>
                {statuses.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
              <ChevronDown size={15} aria-hidden="true" />
            </label>
          </div>

          {filteredAnimals.length ? (
            <div className="animal-grid animal-grid--directory">
              {filteredAnimals.map((animal) => <AnimalCard key={animal.id} animal={animal} onOpen={onAnimal} />)}
            </div>
          ) : (
            <div className="empty-results"><Search size={24} aria-hidden="true" /><h2>No matches just yet</h2><p>Try another search or choose a different filter.</p><button type="button" className="text-action" onClick={() => { setCategory("All animals"); setStatus("All needs"); setQuery(""); }}>Clear filters <ArrowRight size={16} aria-hidden="true" /></button></div>
          )}
        </div>
      </section>

      <section className="animals-support section-pad">
        <div className="container animals-support__inner reveal">
          <div><p className="eyebrow">A safe haven takes all of us</p><h2>Not ready to adopt?<br /><em>You can still help.</em></h2><p>A donation helps the shelter continue caring for every animal who comes through its doors.</p></div>
          <DonateButton onClick={onDonate} label="Make a donation" />
        </div>
      </section>
    </div>
  );
}

function HelpPage({
  onDonate,
  onNavigate,
  onFacebook,
  onShare,
}: {
  onDonate: (amount?: number) => void;
  onNavigate: (page: Page) => void;
  onFacebook: () => void;
  onShare: () => void;
}) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="page-content page-enter">
      <section className="help-hero section-pad">
        <div className="container help-hero__inner">
          <div className="help-hero__copy reveal">
            <p className="eyebrow">Every kind of care counts</p>
            <h1>There are many ways<br />to <em>make a difference.</em></h1>
            <p>A gift is powerful. So is an hour, a conversation or one more person who knows this shelter's story.</p>
            <DonateButton onClick={() => onDonate()} label="Donate now" />
          </div>
          <div className="help-hero__image reveal">
            <img src={siteContent.images.care} alt="Volunteers and a veterinarian caring for a dog" />
            <span><PawPrint size={15} aria-hidden="true" /> Together, care goes further.</span>
          </div>
        </div>
      </section>

      <section className="help-options section-pad">
        <div className="container">
          <SectionHeading eyebrow="Find your way to help" title={<>A little care can go <em>a long way.</em></>} copy="Choose what feels right for you. Every action helps carry the shelter's mission forward." />
          <div className="help-options-grid">
            <HelpAction icon={Gift} title="Donate" copy="Your financial support helps provide care and keep the shelter operating." action="Donate now" onClick={() => onDonate()} featured />
            <HelpAction icon={Heart} title="Sponsor an animal" copy="Ask the shelter how to support an animal's ongoing care or a current need." action="Choose a gift" onClick={() => onDonate(100)} />
            <HelpAction icon={UsersRound} title="Volunteer" copy="Offer your time and support the people and animals who make this work possible." action="Get in touch" onClick={() => onNavigate("contact")} />
            <HelpAction icon={Share2} title="Share our story" copy="Help the shelter reach friends, family and neighbors who might want to help." action="Share the campaign" onClick={onShare} />
            <HelpAction icon={Share2} title="Follow us" copy="Stay close to shelter updates and the stories of the animals in our care." action="Visit Facebook" onClick={onFacebook} />
            <HelpAction icon={HeartHandshake} title="Support the campaign" copy="Help this community make one more strong push to keep the doors open." action="Help save the shelter" onClick={() => onDonate()} />
          </div>
        </div>
      </section>

      <section className="donation-explainer section-pad">
        <div className="container donation-explainer__layout">
          <div className="donation-explainer__copy reveal">
            <p className="eyebrow">Giving, made simple</p>
            <h2>Support that keeps<br /><em>care moving.</em></h2>
            <p>Choose a one-time gift or monthly support in the donation window. The secure donation provider will be linked here before the site launches.</p>
            <DonateButton onClick={() => onDonate()} label="Choose your support" variant="green" />
          </div>
          <div className="donation-steps reveal">
            <div><span>01</span><div><h3>Choose an amount</h3><p>Pick a suggested gift or enter an amount of your own.</p></div></div>
            <div><span>02</span><div><h3>Choose how often</h3><p>Select a one-time contribution or monthly support.</p></div></div>
            <div><span>03</span><div><h3>Continue securely</h3><p>When connected, the button will take you to the shelter's real donation provider.</p></div></div>
          </div>
        </div>
      </section>

      <section className="faq-section section-pad">
        <div className="container faq-layout">
          <div className="faq-intro reveal">
            <p className="eyebrow">Good questions deserve clear answers</p>
            <h2>Here to make<br /><em>helping simple.</em></h2>
            <p>These answers are editable placeholders. The shelter can make them its own before launch.</p>
            <PageLink page="contact" onNavigate={onNavigate} className="text-action">Still have a question? Contact us <ArrowRight size={16} aria-hidden="true" /></PageLink>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div className={`faq-item reveal${isOpen ? " faq-item--open" : ""}`} key={faq.question}>
                  <h3>
                    <button type="button" aria-expanded={isOpen} aria-controls={`faq-answer-${index}`} onClick={() => setOpenFaq(isOpen ? null : index)}>
                      <span>{faq.question}</span><span className="faq-toggle"><ChevronDown size={17} aria-hidden="true" /></span>
                    </button>
                  </h3>
                  <div id={`faq-answer-${index}`} className="faq-answer" hidden={!isOpen}><p>{faq.answer}</p></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactPage({ onFacebook }: { onFacebook: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (event.currentTarget.reportValidity()) setSubmitted(true);
  }

  return (
    <div className="page-content page-enter">
      <section className="contact-heading section-pad">
        <div className="container contact-heading__inner reveal">
          <div><p className="eyebrow">A real person is on the other side</p><h1>We're here<br /><em>to help.</em></h1></div>
          <p>Questions about donating, volunteering or an animal in our care? Send a note. We'd be glad to hear from you.</p>
        </div>
      </section>

      <section className="contact-main section-pad">
        <div className="container contact-layout">
          <div className="contact-form-wrap reveal">
            {!submitted ? (
              <form className="contact-form" onSubmit={submitContact}>
                <div className="contact-form__intro"><p className="eyebrow">Write us a note</p><h2>How can we <em>help?</em></h2><p>Demo form only. It will need a real inbox or form service before launch.</p></div>
                <div className="form-grid">
                  <div className="form-field"><label htmlFor="contact-name">Name <span>*</span></label><input id="contact-name" name="name" autoComplete="name" required placeholder="Your name" /></div>
                  <div className="form-field"><label htmlFor="contact-email">Email <span>*</span></label><input id="contact-email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></div>
                  <div className="form-field"><label htmlFor="contact-phone">Phone <small>optional</small></label><input id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder="(555) 000-0000" /></div>
                  <div className="form-field"><label htmlFor="contact-reason">Reason for contacting <span>*</span></label><select id="contact-reason" name="reason" defaultValue="" required><option value="" disabled>Choose a topic</option><option>Donation Question</option><option>Volunteering</option><option>Animal Question</option><option>General Question</option><option>Other</option></select></div>
                  <div className="form-field form-field--full"><label htmlFor="contact-message">Message <span>*</span></label><textarea id="contact-message" name="message" rows={5} required placeholder="Tell us a little about how we can help..." /></div>
                </div>
                <button type="submit" className="button button--green form-submit">Send message <Send size={16} aria-hidden="true" /></button>
                <p className="form-privacy">Your details will only be used to reply to your message.</p>
              </form>
            ) : (
              <div className="form-success" role="status">
                <span><Check size={24} aria-hidden="true" /></span>
                <p className="eyebrow">Thank you for reaching out</p>
                <h2>Your note is <em>ready to go.</em></h2>
                <p>This prototype isn't connected to an inbox yet. Before launch, connect the form to the shelter's email or form service.</p>
                <button type="button" className="text-action" onClick={() => setSubmitted(false)}>Send another message <ArrowRight size={16} aria-hidden="true" /></button>
              </div>
            )}
          </div>

          <aside className="contact-aside reveal">
            <div className="contact-aside__note"><p className="eyebrow">Reach us directly</p><h2>We'd love to<br /><em>hear from you.</em></h2><p>Contact details below are editable placeholders until the shelter confirms the right information.</p></div>
            <a className="contact-line" href={`mailto:${siteContent.contact.email}`}><span><Mail size={19} aria-hidden="true" /></span><div><small>Email</small><strong>{siteContent.contact.email}</strong></div><ArrowUpRight size={17} aria-hidden="true" /></a>
            <a className="contact-line" href={`tel:${siteContent.contact.phone.replace(/[^\d+]/g, "")}`}><span><Phone size={19} aria-hidden="true" /></span><div><small>Phone</small><strong>{siteContent.contact.phone}</strong></div><ArrowUpRight size={17} aria-hidden="true" /></a>
            <button type="button" className="contact-line" onClick={onFacebook}><span><FacebookMark size={19} /></span><div><small>Facebook</small><strong>Association For Animal Rights</strong></div><ArrowUpRight size={17} aria-hidden="true" /></button>
            <div className="map-placeholder">
              <div className="map-placeholder__pattern" />
              <span className="map-pin"><MapPin size={20} aria-hidden="true" /></span>
              <div className="map-placeholder__label"><small>Find the shelter</small><strong>{siteContent.contact.location}</strong></div>
              <span className="map-placeholder__edit">Map location to be added</span>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

function DonationModal({
  amount,
  customAmount,
  frequency,
  message,
  onClose,
  onAmountChange,
  onCustomAmountChange,
  onFrequencyChange,
  onContinue,
}: {
  amount: number | null;
  customAmount: string;
  frequency: Frequency;
  message: string;
  onClose: () => void;
  onAmountChange: (amount: number | null) => void;
  onCustomAmountChange: (value: string) => void;
  onFrequencyChange: (frequency: Frequency) => void;
  onContinue: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const currentAmount = amount ?? Number(customAmount);

  return (
    <div className="modal-scrim" onMouseDown={(event) => { if (event.currentTarget === event.target) onClose(); }}>
      <section className="donation-modal" role="dialog" aria-modal="true" aria-labelledby="donation-title" aria-describedby="donation-description">
        <div className="donation-modal__visual">
          <img src={siteContent.images.hero} alt="A rescued dog in a safe, quiet place" />
          <div className="donation-modal__visual-shade" />
          <button type="button" className="modal-close modal-close--light" data-modal-close aria-label="Close donation window" onClick={onClose}><X size={20} aria-hidden="true" /></button>
          <div className="donation-modal__visual-copy">
            <span className="modal-paw"><PawPrint size={19} aria-hidden="true" /></span>
            <p>Since 1988, a safe place to land.</p>
            <strong>Your kindness can help keep it here.</strong>
          </div>
        </div>
        <div className="donation-modal__form-side">
          <button type="button" className="modal-close modal-close--dark" data-modal-close aria-label="Close donation window" onClick={onClose}><X size={19} aria-hidden="true" /></button>
          <p className="eyebrow">Your support matters</p>
          <h2 id="donation-title">Choose your <em>support.</em></h2>
          <p id="donation-description" className="donation-modal__intro">Choose a gift that feels right for you. No payment is taken in this preview.</p>
          <form onSubmit={onContinue}>
            <fieldset className="gift-amounts">
              <legend>Choose an amount</legend>
              {[25, 50, 100, 250].map((gift) => (
                <button type="button" key={gift} className={amount === gift ? "gift-amount is-selected" : "gift-amount"} aria-pressed={amount === gift} onClick={() => onAmountChange(gift)}>${gift}</button>
              ))}
              <button type="button" className={amount === null ? "gift-amount gift-amount--custom is-selected" : "gift-amount gift-amount--custom"} aria-pressed={amount === null} onClick={() => onAmountChange(null)}>Custom</button>
            </fieldset>
            {amount === null && (
              <label className="custom-amount-field" htmlFor="custom-donation"><span>Enter your amount</span><div><b>$</b><input id="custom-donation" type="number" min="1" step="1" inputMode="decimal" autoFocus value={customAmount} onChange={(event) => onCustomAmountChange(event.target.value)} placeholder="Other amount" /></div></label>
            )}
            <fieldset className="frequency-toggle">
              <legend>How often?</legend>
              <div role="group" aria-label="Donation frequency">
                {(["One-time", "Monthly"] as Frequency[]).map((item) => (
                  <button type="button" key={item} className={frequency === item ? "is-selected" : ""} aria-pressed={frequency === item} onClick={() => onFrequencyChange(item)}>{item}</button>
                ))}
              </div>
            </fieldset>
            <button type="submit" className="button button--green donation-continue" disabled={!currentAmount || currentAmount < 1}>
              Continue to donate <ArrowRight size={17} aria-hidden="true" />
            </button>
            {message ? <p className="donation-message" role="status">{message}</p> : <p className="donation-secure"><ShieldCheck size={15} aria-hidden="true" /> Secure donation link will be added before launch.</p>}
            <p className="donation-demo-note">This front-end preview does not collect or process payments.</p>
          </form>
        </div>
      </section>
    </div>
  );
}

function AnimalModal({ animal, onClose, onDonate }: { animal: Animal; onClose: () => void; onDonate: () => void }) {
  return (
    <div className="modal-scrim" onMouseDown={(event) => { if (event.currentTarget === event.target) onClose(); }}>
      <section className="animal-modal" role="dialog" aria-modal="true" aria-labelledby="animal-modal-title">
        <div className="animal-modal__photo"><img src={animal.image} alt={animal.alt} /><button type="button" className="modal-close modal-close--light" data-modal-close aria-label="Close animal profile" onClick={onClose}><X size={20} aria-hidden="true" /></button></div>
        <div className="animal-modal__content">
          <p className="eyebrow">Demo animal profile / {animal.category} / {animal.age}</p>
          <span className={`animal-status animal-status--${animal.status.toLowerCase().replace(/ /g, "-")}`}>{animal.status}</span>
          <h2 id="animal-modal-title">Meet <em>{animal.name}.</em></h2>
          <p>{animal.story}</p>
          <p className="animal-modal__note">This is example content for the prototype. The shelter can replace the name, photo, story and status with current animal information.</p>
          <div className="animal-modal__actions"><DonateButton onClick={onDonate} label="Support animals in our care" variant="green" /><button type="button" className="text-action" onClick={onClose}>Close story <X size={15} aria-hidden="true" /></button></div>
        </div>
      </section>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>(() => pageFromPath(window.location.pathname));
  const [scrolled, setScrolled] = useState(false);
  const [donationOpen, setDonationOpen] = useState(false);
  const [activeAnimal, setActiveAnimal] = useState<Animal | null>(null);
  const [donationAmount, setDonationAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState<Frequency>("One-time");
  const [donationMessage, setDonationMessage] = useState("");
  const [notice, setNotice] = useState("");
  const previousFocus = useRef<HTMLElement | null>(null);
  const wasModalOpen = useRef(false);
  const isModalOpen = donationOpen || activeAnimal !== null;

  function navigate(nextPage: Page) {
    if (nextPage !== page) {
      window.history.pushState({}, "", PAGE_PATHS[nextPage]);
      setPage(nextPage);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openDonation(amount?: number) {
    if (!isModalOpen) previousFocus.current = document.activeElement as HTMLElement;
    setDonationAmount(amount ?? 50);
    setCustomAmount("");
    setFrequency("One-time");
    setDonationMessage("");
    setActiveAnimal(null);
    setDonationOpen(true);
  }

  function openAnimal(animal: Animal) {
    previousFocus.current = document.activeElement as HTMLElement;
    setActiveAnimal(animal);
  }

  function closeModals() {
    setDonationOpen(false);
    setActiveAnimal(null);
  }

  function showNotice(message: string) {
    setNotice(message);
  }

  function openFacebook() {
    if (siteContent.facebookUrl) {
      window.open(siteContent.facebookUrl, "_blank", "noopener,noreferrer");
    } else {
      showNotice("Facebook link placeholder: add the shelter's official page URL in src/content.ts.");
    }
  }

  async function shareStory() {
    const shareData = { title: siteContent.name, text: "Help Association For Animal Rights keep their safe haven open.", url: window.location.href };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        showNotice("Thank you for sharing the shelter's story.");
      } catch {
        // A closed share sheet is not an error that needs a message.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(shareData.url);
      showNotice("This page link is copied and ready to share.");
    } catch {
      showNotice(`Share this page: ${shareData.url}`);
    }
  }

  function continueDonation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const amount = donationAmount ?? Number(customAmount);
    if (!amount || amount < 1) {
      setDonationMessage("Please enter an amount of at least $1.");
      return;
    }
    if (siteContent.donationUrl) {
      window.open(siteContent.donationUrl, "_blank", "noopener,noreferrer");
      setDonationMessage(`Your ${frequency.toLowerCase()} gift of $${amount.toLocaleString()} will continue on the shelter's donation page.`);
    } else {
      setDonationMessage(`Preview only: your ${frequency.toLowerCase()} gift of $${amount.toLocaleString()} is not being processed. Add the secure donation URL in src/content.ts to connect this button.`);
    }
  }

  useEffect(() => {
    const handlePopState = () => {
      setPage(pageFromPath(window.location.pathname));
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 380);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useEffect(() => {
    document.title = `${siteContent.name} | ${PAGE_TITLES[page]}`;
  }, [page]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const targets = document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)");
      if (!("IntersectionObserver" in window)) {
        targets.forEach((target) => target.classList.add("is-visible"));
        return;
      }
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -44px 0px" });
      targets.forEach((target) => observer.observe(target));
    });
    return () => window.cancelAnimationFrame(frame);
  }, [page]);

  useEffect(() => {
    if (isModalOpen) {
      if (!wasModalOpen.current) previousFocus.current = previousFocus.current ?? document.activeElement as HTMLElement;
      wasModalOpen.current = true;
      document.body.style.overflow = "hidden";
      window.setTimeout(() => document.querySelector<HTMLElement>("[data-modal-close]")?.focus(), 40);
    } else {
      document.body.style.overflow = "";
      if (wasModalOpen.current) previousFocus.current?.focus();
      wasModalOpen.current = false;
    }

    function handleModalKeys(event: KeyboardEvent) {
      if (!isModalOpen) return;
      if (event.key === "Escape") {
        event.preventDefault();
        closeModals();
      }
      if (event.key === "Tab") {
        const dialog = document.querySelector<HTMLElement>("[role='dialog']");
        const focusable = dialog?.querySelectorAll<HTMLElement>("button:not([disabled]), input:not([disabled]), a[href], select:not([disabled]), textarea:not([disabled])");
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleModalKeys);
    return () => document.removeEventListener("keydown", handleModalKeys);
  }, [isModalOpen]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(""), 5200);
    return () => window.clearTimeout(timer);
  }, [notice]);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      {siteContent.announcement && <div className="announcement-bar"><PawPrint size={14} aria-hidden="true" />{siteContent.announcement}</div>}
      <Header page={page} onNavigate={navigate} onDonate={() => openDonation()} scrolled={scrolled} />
      <main id="main-content" tabIndex={-1}>
        {page === "home" && <HomePage onDonate={openDonation} onAnimal={openAnimal} onNavigate={navigate} onFacebook={openFacebook} onShare={shareStory} />}
        {page === "story" && <StoryPage onDonate={() => openDonation()} />}
        {page === "animals" && <AnimalsPage onAnimal={openAnimal} onDonate={() => openDonation()} />}
        {page === "help" && <HelpPage onDonate={openDonation} onNavigate={navigate} onFacebook={openFacebook} onShare={shareStory} />}
        {page === "contact" && <ContactPage onFacebook={openFacebook} />}
      </main>
      <Footer onNavigate={navigate} onDonate={() => openDonation()} onFacebook={openFacebook} onPlaceholder={showNotice} />

      {scrolled && (
        <div className="floating-actions">
          <button type="button" className="back-to-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><ArrowDown size={17} aria-hidden="true" /></button>
          <DonateButton onClick={() => openDonation()} label="Donate now" className="floating-donate" />
        </div>
      )}

      {donationOpen && (
        <DonationModal
          amount={donationAmount}
          customAmount={customAmount}
          frequency={frequency}
          message={donationMessage}
          onClose={closeModals}
          onAmountChange={setDonationAmount}
          onCustomAmountChange={setCustomAmount}
          onFrequencyChange={setFrequency}
          onContinue={continueDonation}
        />
      )}
      {activeAnimal && <AnimalModal animal={activeAnimal} onClose={closeModals} onDonate={() => openDonation()} />}
      {notice && <div className="toast-message" role="status" aria-live="polite"><PawPrint size={17} aria-hidden="true" /><span>{notice}</span><button type="button" aria-label="Dismiss message" onClick={() => setNotice("")}><X size={15} aria-hidden="true" /></button></div>}
    </>
  );
}