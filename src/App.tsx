/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';

interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  priceLabel: string;
  basePrice: number;
  duration: string;
  image: string;
  alt: string;
  details: string;
  ritualSteps: string[];
  tiers: { role: string; stylist: string; price: string }[];
}

interface PortfolioItem {
  id: string;
  title: string;
  subtitle: string;
  stylist: string;
  duration: string;
  image: string;
  alt: string;
  offsetClass?: string;
  notes: string;
  recommendedServiceId: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: 'wig-architecture',
    title: 'Wig Architecture & Melt',
    shortDesc: 'Custom HD lace tinting, single-knot hairline plucking, and seamless installation.',
    priceLabel: 'From ₦150,000',
    basePrice: 150000,
    duration: '120 Min',
    image: 'https://images.pexels.com/photos/12636308/pexels-photo-12636308.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Bespoke Wig Architecture & HD Lace Melt Preview',
    details:
      'Engineered for undetectable realism under Lagos sunlight and flash photography. We custom-ventilate Swiss HD lace to your exact hairline contour, match lace undertones to your complexion, and execute a breathable, tension-free melt.',
    ritualSteps: [
      'Cranial measurement & custom melanin-matched HD lace tinting',
      'Flat-foundation cornrow prep with cooling peppermint scalp serum',
      'Micro-plucked natural density hairline & invisible adhesive or glueless melt',
      ' Precision hot-comb silk pressing or voluminous barrel sculpting',
    ],
    tiers: [
      { role: 'Senior Lace Specialist', stylist: 'Zainab Balogun-Cole', price: '₦150,000' },
      { role: 'Couture Wig Director', stylist: 'Chidinma Okafor', price: '₦220,000' },
      { role: 'Master Founder', stylist: 'Teniola Adeyemi', price: '₦320,000' },
    ],
  },
  {
    id: 'bridal-owambe-couture',
    title: 'Bridal & Owambe Couture',
    shortDesc: 'Sculptural waves, Gele-ready frontal updos, and VIP bridal suite styling.',
    priceLabel: 'From ₦350,000',
    basePrice: 350000,
    duration: '180 Min',
    image: 'https://images.pexels.com/photos/9301852/pexels-photo-9301852.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Bridal and Owambe Couture Styling Preview',
    details:
      'Designed for Nigerian brides, celebrants, and high-society guests who demand perfection from the traditional engagement to the reception after-party. Our structural setting technique locks in humidity-proof volume and seamlessly accommodates bespoke Gele tying.',
    ritualSteps: [
      'Private bridal lookbook trial & Aso-Ebi / gown neckline harmony mapping',
      '360° HD frontal or closure installation engineered for high updos & Gele',
      'Humidity-resistant structural pin-curl setting & pearl/coral ornamentation',
      'Optional on-location VIP hotel or bridal suite touch-up retainer',
    ],
    tiers: [
      { role: 'Senior Bridal Stylist', stylist: 'Damilola Coker', price: '₦350,000' },
      { role: 'Bridal Creative Director', stylist: 'Chidinma Okafor', price: '₦500,000' },
      { role: 'Master Founder (Full Day VIP)', stylist: 'Teniola Adeyemi', price: '₦850,000' },
    ],
  },
  {
    id: 'bundle-revival-ritual',
    title: 'Raw Bundle & Silk Ritual',
    shortDesc: 'Deep steam hydration, raw donor bundle reconstruction, and 4C silk press therapy.',
    priceLabel: 'From ₦85,000',
    basePrice: 85000,
    duration: '90 Min',
    image: 'https://images.pexels.com/photos/30154807/pexels-photo-30154807.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Raw Bundle Revival and Botanical Silk Ritual Preview',
    details:
      'Whether restoring treasured raw Vietnamese and Cambodian bundles to factory lustre or treating your natural 4C crown to a zero-damage silk press, our ultrasonic micro-mist and Ori-peptide ritual infuses mirror-like shine and bounce.',
    ritualSteps: [
      'Clarifying Chebe & hibiscus bath to lift product buildup without stripping',
      'Ultrasonic ozone steam infusion with cold-pressed Ori & silk amino acids',
      'Lace ultrasonic deep-cleanse, knot replacement & weft tightening',
      ' Ceramic ionic silk press or bouncy roller wrap with humidity shield',
    ],
    tiers: [
      { role: 'Texture & Revival Specialist', stylist: 'Amaka Nwosu', price: '₦85,000' },
      { role: 'Senior Stylist', stylist: 'Zainab Balogun-Cole', price: '₦120,000' },
      { role: 'Couture Wig Director', stylist: 'Chidinma Okafor', price: '₦160,000' },
    ],
  },
];

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'victoria-island-sculpt',
    title: 'The Eko Crown',
    subtitle: 'Sculpted High Updo · Melanin-Matched HD Melt',
    stylist: 'Teniola Adeyemi',
    duration: '2.5 Hours',
    image: 'https://images.pexels.com/photos/20433185/pexels-photo-20433185.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Portfolio 1 - The Eko Crown',
    notes:
      'An architectural high-volume updo crafted for a Victoria Island black-tie gala. Engineered with a custom 360° HD frontal melt that exposes a natural, baby-hair-refined temple and nape contour.',
    recommendedServiceId: 'wig-architecture',
  },
  {
    id: 'lagos-bridal-royale',
    title: 'Bridal Royale',
    subtitle: 'Traditional Engagement · Sleek Center-Part Architecture',
    stylist: 'Chidinma Okafor',
    duration: '3 Hours',
    image: 'https://images.pexels.com/photos/9301852/pexels-photo-9301852.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Portfolio 2 - Bridal Royale',
    offsetClass: 'lg:translate-y-20',
    notes:
      'Glass-finish center-part sleekness tailored for traditional bridal coral and gold regalia. Built on a low-tension foundation so transitions between traditional headwear and evening reception curls are effortless.',
    recommendedServiceId: 'bridal-owambe-couture',
  },
  {
    id: 'velvet-coil-couture',
    title: 'Velvet Texture',
    subtitle: 'Botanical Steam Hydration · Defined Crown Volume',
    stylist: 'Zainab Balogun-Cole',
    duration: '90 Minutes',
    image: 'https://images.pexels.com/photos/12636308/pexels-photo-12636308.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Portfolio 3 - Velvet Texture',
    notes:
      'Lush, cloud-soft curl definition achieved through our signature Ori-peptide ultrasonic steam ritual and precision tapered shaping to frame the cheekbones.',
    recommendedServiceId: 'bundle-revival-ritual',
  },
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [charState, setCharState] = useState<'initial' | 'dancing' | 'settled'>('initial');

  // Interactive Modals State
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<ServiceItem | null>(null);
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<PortfolioItem | null>(null);
  const [heritageModalOpen, setHeritageModalOpen] = useState(false);
  const [infoModal, setInfoModal] = useState<{ title: string; subtitle: string; body: string[] } | null>(null);

  // Booking Form State
  const [bookingServiceId, setBookingServiceId] = useState<string>('wig-architecture');
  const [bookingStylist, setBookingStylist] = useState<string>('Teniola Adeyemi — Master Founder');
  const [bookingLocationMode, setBookingLocationMode] = useState<string>('Victoria Island Flagship Lounge');
  const [bookingDate, setBookingDate] = useState<string>('2026-11-14');
  const [bookingTime, setBookingTime] = useState<string>('14:00');
  const [bookingName, setBookingName] = useState<string>('');
  const [bookingEmail, setBookingEmail] = useState<string>('');
  const [bookingPhone, setBookingPhone] = useState<string>('');
  const [bookingNotes, setBookingNotes] = useState<string>('');
  const [bookingError, setBookingError] = useState<string>('');
  const [bookingConfirmed, setBookingConfirmed] = useState<{
    reference: string;
    serviceTitle: string;
    stylist: string;
    locationMode: string;
    date: string;
    time: string;
    name: string;
  } | null>(null);

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'error' | 'subscribed'>('idle');

  // Hover image transform state per service row
  const hoverImageRefs = useRef<Record<string, HTMLImageElement | null>>({});

  // Hero Character Animation Trigger
  useEffect(() => {
    const startTimer = setTimeout(() => {
      setCharState('dancing');
    }, 50);

    const settleTimer = setTimeout(() => {
      setCharState('settled');
    }, 2800);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(settleTimer);
    };
  }, []);

  // Lock body scroll when mobile menu or modal is open
  useEffect(() => {
    const anyOverlayOpen =
      mobileMenuOpen ||
      bookingModalOpen ||
      Boolean(selectedServiceForModal) ||
      Boolean(selectedPortfolioItem) ||
      heritageModalOpen ||
      Boolean(infoModal);

    if (anyOverlayOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [
    mobileMenuOpen,
    bookingModalOpen,
    selectedServiceForModal,
    selectedPortfolioItem,
    heritageModalOpen,
    infoModal,
  ]);

  // IntersectionObserver for scroll animations and image zoom
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-on-scroll-visible');
          const zoomImg = entry.target.querySelector('img[data-zoom]');
          if (zoomImg) {
            zoomImg.classList.add('image-zoom-visible');
          }
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('[data-animation-on-scroll]');
    elements.forEach((el) => {
      el.classList.add('animate-on-scroll-hidden');
      const zoomImg = el.querySelector('img[data-zoom]');
      if (zoomImg) {
        zoomImg.classList.add('image-zoom-hidden');
      }
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleMenuMouseMove = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    const img = hoverImageRefs.current[id];
    if (!img) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    img.style.transform = `translateY(-50%) translateX(${(x - rect.width / 2) / 10}px) rotate(${
      (x - rect.width / 2) / 50
    }deg)`;
  };

  const handleMenuMouseLeave = (id: string) => {
    const img = hoverImageRefs.current[id];
    if (!img) return;
    img.style.transform = `translateY(-50%) scale(0.9)`;
  };

  const openBookingWithService = (serviceId?: string, stylistName?: string) => {
    if (serviceId) setBookingServiceId(serviceId);
    if (stylistName) setBookingStylist(stylistName);
    setSelectedServiceForModal(null);
    setSelectedPortfolioItem(null);
    setHeritageModalOpen(false);
    setBookingError('');
    setBookingConfirmed(null);
    setBookingModalOpen(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName.trim()) {
      setBookingError('Please enter your full name.');
      return;
    }
    if (!bookingEmail.trim() || !bookingEmail.includes('@')) {
      setBookingError('Please enter a valid email address.');
      return;
    }
    if (!bookingPhone.trim()) {
      setBookingError('Please provide your WhatsApp or mobile number.');
      return;
    }

    const chosenService = SERVICES.find((s) => s.id === bookingServiceId) || SERVICES[0];
    const refCode = `SH-VI-${Math.floor(100000 + Math.random() * 900000)}`;

    setBookingError('');
    setBookingConfirmed({
      reference: refCode,
      serviceTitle: `${chosenService.title} (${chosenService.priceLabel})`,
      stylist: bookingStylist,
      locationMode: bookingLocationMode,
      date: bookingDate,
      time: bookingTime,
      name: bookingName.trim(),
    });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      setNewsletterStatus('error');
      return;
    }
    setNewsletterStatus('subscribed');
    setNewsletterEmail('');
  };

  const heroLetters = ['S', 'H', 'E', 'A', 'R'];

  return (
    <div className="font-secondary bg-brand-light text-brand-dark overflow-x-hidden min-h-screen flex flex-col w-full relative">
      <main className="flex-grow">
        {/* Header & Hero Title */}
        <header className="bg-brand-light w-full flex flex-col items-center justify-center pt-6 lg:pt-10 px-4 lg:px-10 pb-10 lg:pb-20">
          <div className="max-w-[1440px] w-full flex flex-col gap-8 lg:gap-10">
            {/* Navbar */}
            <nav
              data-animation-on-scroll=""
              className="relative flex items-center justify-between border border-brand-dark rounded-btn p-4 lg:p-3 h-14 lg:h-12 w-full z-[110] bg-brand-light"
            >
              <div className="hidden lg:flex items-center justify-between w-full px-4">
                <div className="flex-1 text-left">
                  <a
                    href="#services"
                    className="font-secondary text-xl font-normal hover:opacity-70 transition-opacity whitespace-nowrap shrink-0"
                  >
                    Services
                  </a>
                </div>
                <div className="flex-1 text-center">
                  <a
                    href="#booking"
                    onClick={(e) => {
                      e.preventDefault();
                      openBookingWithService('wig-architecture');
                    }}
                    className="font-secondary text-xl font-normal hover:opacity-70 transition-opacity whitespace-nowrap shrink-0"
                  >
                    Book Appointment
                  </a>
                </div>
                <div className="flex gap-5 px-6 items-center">
                  <a
                    href="#top"
                    onClick={(e) => {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="font-primary font-bold text-2xl tracking-tighter uppercase cursor-pointer whitespace-nowrap shrink-0"
                  >
                    SHEAR
                  </a>
                </div>
                <div className="flex-1 text-center">
                  <a
                    href="#philosophy"
                    className="font-secondary text-xl font-normal hover:opacity-70 transition-opacity whitespace-nowrap shrink-0"
                  >
                    Philosophy
                  </a>
                </div>
                <div className="flex-1 text-right">
                  <a
                    href="#contact"
                    className="font-secondary text-xl font-normal hover:opacity-70 transition-opacity whitespace-nowrap shrink-0"
                  >
                    Contact
                  </a>
                </div>
              </div>

              {/* Mobile Layout */}
              <div className="flex lg:hidden items-center justify-between w-full">
                <a
                  href="#top"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="font-primary font-bold text-xl tracking-tighter uppercase whitespace-nowrap shrink-0"
                >
                  SHEAR
                </a>
                <button
                  id="mobile-menu-open"
                  onClick={() => setMobileMenuOpen(true)}
                  className="p-2 focus:outline-none text-brand-dark cursor-pointer"
                  aria-label="Open Menu"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                </button>
              </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
              id="mobile-menu"
              className={`fixed inset-0 z-[200] bg-brand-light transform transition-transform duration-500 ease-in-out lg:hidden flex flex-col p-8 ${
                mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              <div className="flex justify-between items-center mb-12">
                <span className="font-primary font-bold text-2xl tracking-tighter uppercase">SHEAR</span>
                <button
                  id="mobile-menu-close"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 focus:outline-none text-brand-dark cursor-pointer"
                  aria-label="Close Menu"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <div className="flex flex-col gap-8 text-center mt-10">
                <a
                  href="#services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mobile-nav-link font-primary text-3xl font-semibold uppercase tracking-widest hover:text-accent-gold transition-colors"
                >
                  Services
                </a>
                <a
                  href="#booking"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    openBookingWithService('wig-architecture');
                  }}
                  className="mobile-nav-link font-primary text-3xl font-semibold uppercase tracking-widest hover:text-accent-gold transition-colors"
                >
                  Book Now
                </a>
                <a
                  href="#philosophy"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mobile-nav-link font-primary text-3xl font-semibold uppercase tracking-widest hover:text-accent-gold transition-colors"
                >
                  Philosophy
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mobile-nav-link font-primary text-3xl font-semibold uppercase tracking-widest hover:text-accent-gold transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>

            {/* Main Title */}
            <div className="text-center overflow-hidden py-2 lg:py-4">
              <h1 className="font-primary font-bold text-hero leading-none select-none">
                <div className="inline-block uppercase whitespace-nowrap" id="hero-title">
                  {heroLetters.map((letter, idx) => (
                    <span
                      key={idx}
                      className={`char-box ${
                        charState === 'dancing'
                          ? 'dancing'
                          : charState === 'settled'
                          ? 'settled'
                          : ''
                      }`}
                      style={{ animationDelay: `${(idx + 1) * 0.1}s` }}
                    >
                      {letter}
                    </span>
                  ))}
                </div>
              </h1>
            </div>

            {/* Subheading */}
            <p
              data-animation-on-scroll=""
              className="font-secondary text-lg lg:text-2xl text-center max-w-[1000px] mx-auto opacity-80 px-4 leading-relaxed"
            >
              Where raw luxury meets flawless illusion. Victoria Island&apos;s premier destination for bespoke wig architecture, undetectable HD lace melts, and bridal hair couture.
            </p>
          </div>
        </header>

        {/* Hero Image Section */}
        <section className="bg-brand-light w-full flex flex-col items-center justify-center overflow-hidden px-4 lg:px-10 pb-20">
          <div className="max-w-[1440px] w-full h-[500px] lg:h-[900px] relative rounded-section overflow-hidden">
            <div data-animation-on-scroll="" className="w-full h-full overflow-hidden bg-brand-dark">
              <img
                data-zoom=""
                src="https://images.pexels.com/photos/4974568/pexels-photo-4974568.jpeg?w=1920&h=1080&fit=crop"
                alt="SHEAR Victoria Island Luxury Hair & Wig Atelier"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          </div>
        </section>

        {/* Our Philosophy Section */}
        <section id="philosophy" className="py-24 lg:py-40 bg-brand-light px-6">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div data-animation-on-scroll="" className="space-y-8">
              <h3 className="font-signature text-4xl text-accent-gold">The Art of the Melt</h3>
              <h2 className="font-primary text-4xl lg:text-6xl font-bold uppercase leading-tight">
                Every crown is a <span className="block">statement.</span>
              </h2>
              <p className="font-secondary text-lg lg:text-xl opacity-80 leading-relaxed max-w-xl">
                We don&apos;t just install hair; we engineer presence. From single-donor bone-straight Vietnamese bundles and custom-ventilated HD frontals to Gele-ready bridal updos, our master stylists craft looks that command every room from Lagos to London.
              </p>
              <div className="pt-6 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setHeritageModalOpen(true)}
                  className="inline-block border border-brand-dark rounded-btn px-10 py-5 font-primary font-bold uppercase text-sm tracking-widest hover:bg-brand-dark hover:text-brand-light transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0"
                >
                  Our Heritage
                </button>
              </div>
            </div>
            <div data-animation-on-scroll="" className="relative group">
              <div className="rounded-card overflow-hidden bg-brand-dark aspect-[4/5]">
                <img
                  data-zoom=""
                  src="https://images.pexels.com/photos/20433185/pexels-photo-20433185.jpeg?auto=compress&cs=tinysrgb&w=1000"
                  alt="Nigerian luxury hair sculpture and HD hairline mastery"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-brand-light p-10 rounded-card shadow-xl hidden md:block max-w-xs">
                <p className="font-secondary text-lg italic">
                  &ldquo;True luxury is an installation so seamless they assume it grew from your scalp.&rdquo;
                </p>
                <p className="font-primary font-bold text-sm uppercase mt-4 text-accent-gold">
                  — Teniola Adeyemi, Founder
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services / Menu Section */}
        <section id="services" className="py-24 lg:py-40 bg-brand-dark text-brand-light rounded-t-section">
          <div className="max-w-[1440px] mx-auto px-6">
            <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-20">
              <h2 data-animation-on-scroll="" className="font-primary text-5xl lg:text-7xl font-bold uppercase">
                The Menu
              </h2>
              <p data-animation-on-scroll="" className="font-secondary text-lg opacity-60 lg:max-w-md">
                Every appointment is hosted in our private Victoria Island suites or via VIP bridal call-out. Pricing reflects raw donor grade and artist tier.
              </p>
            </div>

            <div className="space-y-0">
              {SERVICES.map((service, index) => (
                <div
                  key={service.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedServiceForModal(service)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedServiceForModal(service);
                    }
                  }}
                  onMouseMove={(e) => handleMenuMouseMove(service.id, e)}
                  onMouseLeave={() => handleMenuMouseLeave(service.id)}
                  className={`menu-item-trigger group border-t ${
                    index === SERVICES.length - 1 ? 'border-b' : ''
                  } border-neutral-line py-12 flex flex-col md:flex-row justify-between items-start md:items-center relative cursor-pointer overflow-hidden transition-all duration-500 hover:px-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold`}
                >
                  <div className="flex flex-col gap-2 z-10">
                    <h3 className="font-primary text-3xl lg:text-4xl font-bold uppercase transition-transform duration-500 group-hover:translate-x-4">
                      {service.title}
                    </h3>
                    <p className="font-secondary text-base opacity-60 group-hover:translate-x-4 transition-transform duration-500">
                      {service.shortDesc}
                    </p>
                  </div>
                  <div className="flex items-center gap-10 mt-6 md:mt-0 z-10">
                    <span className="font-primary text-2xl font-bold uppercase tabular-nums">
                      {service.priceLabel}
                    </span>
                    <div className="w-12 h-12 border border-brand-light rounded-full flex items-center justify-center group-hover:bg-brand-light group-hover:text-brand-dark transition-all duration-300">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </div>
                  </div>
                  {/* Hover Image */}
                  <img
                    ref={(el) => {
                      hoverImageRefs.current[service.id] = el;
                    }}
                    src={service.image}
                    referrerPolicy="no-referrer"
                    className="menu-item-hover-image absolute right-40 top-1/2 -translate-y-1/2 w-64 h-40 object-cover rounded-card pointer-events-none hidden lg:block opacity-0 group-hover:opacity-100 z-0 scale-90 group-hover:scale-100 transition-all duration-500"
                    alt={service.alt}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery / Portfolio */}
        <section className="py-24 lg:py-40 bg-brand-light px-6">
          <div className="max-w-[1440px] mx-auto">
            <div className="text-center mb-20" data-animation-on-scroll="">
              <h2 className="font-primary text-4xl lg:text-7xl font-bold uppercase">The Portfolio</h2>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 reveal-stagger"
              data-animation-on-scroll=""
            >
              {PORTFOLIO_ITEMS.map((item) => (
                <div
                  key={item.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedPortfolioItem(item)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedPortfolioItem(item);
                    }
                  }}
                  className={`rounded-card overflow-hidden bg-brand-dark aspect-[3/4] relative group cursor-pointer ${
                    item.offsetClass || ''
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="font-primary font-bold uppercase tracking-widest text-brand-light text-xl">
                      {item.title}
                    </p>
                    <p className="font-secondary text-sm text-brand-light/80 mt-1">
                      {item.subtitle} · Inspect Look
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking CTA Section */}
        <section id="booking" className="py-24 lg:py-40 bg-brand-light px-6">
          <div className="max-w-[1440px] mx-auto rounded-section bg-brand-dark p-12 lg:p-32 text-center text-brand-light overflow-hidden relative">
            {/* Floating background letters */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <span className="font-primary font-bold text-[40vw] leading-none">S</span>
            </div>

            <div className="relative z-10 max-w-3xl mx-auto space-y-10" data-animation-on-scroll="">
              <h3 className="font-signature text-5xl text-accent-gold">Secure Your Chair</h3>
              <h2 className="font-primary text-4xl lg:text-6xl font-bold uppercase leading-tight">
                Command the Room
              </h2>
              <p className="font-secondary text-lg opacity-70">
                Private suite appointments in Victoria Island &amp; VIP bridal home or hotel call-outs across Lagos and Abuja.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
                <button
                  type="button"
                  onClick={() => openBookingWithService('wig-architecture')}
                  className="bg-brand-light text-brand-dark rounded-btn px-12 py-6 font-primary font-bold uppercase text-sm tracking-widest hover:bg-accent-gold hover:text-brand-dark transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0"
                >
                  Book Online
                </button>
                <a
                  href="tel:+2348094450100"
                  className="border border-brand-light rounded-btn px-12 py-6 font-primary font-bold uppercase text-sm tracking-widest hover:bg-brand-light hover:text-brand-dark transition-all duration-300 whitespace-nowrap shrink-0"
                >
                  Call VI Concierge
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-brand-dark text-brand-light pt-20 pb-10 px-6 overflow-hidden">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-20">
            <div data-animation-on-scroll="" className="flex flex-col gap-6 w-full max-w-md">
              <h3 className="font-primary text-2xl uppercase font-bold">The Inner Circle</h3>
              <p className="font-secondary text-lg opacity-60 max-w-sm">
                Receive first access to raw single-donor bundle drops, December Owambe slots, and private bridal trunk shows.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex border-b border-neutral-line pb-2 w-full">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => {
                    setNewsletterEmail(e.target.value);
                    if (newsletterStatus !== 'idle') setNewsletterStatus('idle');
                  }}
                  placeholder="Your Email"
                  aria-label="Your Email"
                  className="bg-transparent border-none outline-none flex-grow font-secondary text-lg py-2 text-brand-light placeholder:text-brand-light/40"
                />
                <button
                  type="submit"
                  className="font-primary uppercase text-sm font-bold tracking-widest hover:text-accent-gold transition-colors cursor-pointer whitespace-nowrap shrink-0 px-2"
                >
                  Join
                </button>
              </form>
              {newsletterStatus === 'error' && (
                <p className="font-secondary text-sm text-accent-gold">
                  Please enter a valid email address to join the VI Inner Circle.
                </p>
              )}
              {newsletterStatus === 'subscribed' && (
                <p className="font-secondary text-sm text-accent-gold">
                  Welcome to the SHEAR Lagos Inner Circle. Priority Raw Donor Drop alerts are now active.
                </p>
              )}
            </div>
            <div
              data-animation-on-scroll=""
              className="flex flex-col lg:items-end gap-4 text-left lg:text-right"
            >
              <p className="font-secondary text-xl">
                14 Adeola Odeku Street, Victoria Island
                <br />
                Lagos, Nigeria
              </p>
              <p className="font-secondary text-xl tabular-nums">+234 (0) 809 445 0100</p>
              <div className="flex gap-6 mt-4">
                <button
                  type="button"
                  onClick={() =>
                    setInfoModal({
                      title: 'SHEAR Lagos Archive',
                      subtitle: '@shear.lagos · Victoria Island & Abuja Bridal Diary',
                      body: [
                        'Explore our daily transformations featuring bone-straight 30-inch raw Vietnamese installations, custom 613 honey-blonde coloring, and high-society Owambe portraits.',
                        'Private wig-fitting consultations and champagne previews are hosted every Thursday evening at our Adeola Odeku flagship.',
                      ],
                    })
                  }
                  className="hover:text-accent-gold transition-colors font-primary uppercase text-xs tracking-tighter cursor-pointer"
                >
                  Instagram
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setInfoModal({
                      title: 'BellaNaija Weddings & ARISE Feature',
                      subtitle: 'Named "Lagos’s #1 Bridal & Couture Wig House"',
                      body: [
                        '“When Lagos brides and executives want an HD melt that survives 12 hours of dancing and Gele transitions without lifting, Teniola Adeyemi’s Victoria Island atelier is the undisputed gold standard.” — BellaNaija Weddings',
                        'Official backstage hair architecture partner for Lagos Fashion Week and elite destination weddings across Lagos, Abuja, and London.',
                      ],
                    })
                  }
                  className="hover:text-accent-gold transition-colors font-primary uppercase text-xs tracking-tighter cursor-pointer"
                >
                  BellaNaija
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setInfoModal({
                      title: 'The Crown Journal',
                      subtitle: 'Guides on Raw Donor Longevity & Humid-Climate Melts',
                      body: [
                        'Volume 04 — Surviving Lagos Humidity: How our multi-layer skin-prep and micro-mist setting keeps silk presses and frontal curls flawless from VI to Lekki.',
                        'Volume 03 — Investing in Raw Hair: How to distinguish authentic single-donor Vietnamese bundles from processed blends—and keep them lush for 5+ years.',
                      ],
                    })
                  }
                  className="hover:text-accent-gold transition-colors font-primary uppercase text-xs tracking-tighter cursor-pointer"
                >
                  Journal
                </button>
              </div>
            </div>
          </div>
          <div className="text-center mt-10">
            <h2 className="font-primary font-bold text-footer-logo leading-none select-none opacity-10 pointer-events-none">
              SHEAR
            </h2>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-neutral-line pt-10 mt-10 opacity-40 text-sm">
            <p>© 2026 SHEAR ATELIER LAGOS. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8 mt-4 md:mt-0">
              <button
                type="button"
                onClick={() =>
                  setInfoModal({
                    title: 'Privacy & VIP Discretion',
                    subtitle: 'SHEAR Victoria Island · Client Confidentiality',
                    body: [
                      'Your cranial measurements, custom lace tint formulas, and appointment schedules are strictly confidential.',
                      'We offer enclosed private VIP suites at our Victoria Island flagship for high-profile clients and brides requiring complete privacy.',
                    ],
                  })
                }
                className="hover:opacity-100 transition-opacity cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() =>
                  setInfoModal({
                    title: 'Atelier Booking Policy',
                    subtitle: 'Wig Drop-Off & Appointment Etiquette',
                    body: [
                      'For Custom Wig Architecture & HD Melts, units must be dropped off at our Victoria Island reception 48 hours prior to your appointment for custom plucking, knot bleaching, and lace tinting.',
                      'Express same-day customization is available for an additional ₦45,000 rush fee. Kindly provide 24 hours notice for rescheduling.',
                    ],
                  })
                }
                className="hover:opacity-100 transition-opacity cursor-pointer"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Service Detail Modal */}
      {selectedServiceForModal && (
        <div
          className="fixed inset-0 z-[300] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 lg:p-8"
          onClick={() => setSelectedServiceForModal(null)}
        >
          <div
            className="bg-brand-dark text-brand-light border border-neutral-line rounded-card max-w-3xl w-full p-8 lg:p-12 relative overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start gap-6 mb-8">
              <div>
                <p className="font-signature text-3xl text-accent-gold">Victoria Island Atelier Menu</p>
                <h3 className="font-primary text-3xl lg:text-5xl font-bold uppercase mt-1">
                  {selectedServiceForModal.title}
                </h3>
                <p className="font-secondary text-sm opacity-60 mt-2">
                  Estimated Session: {selectedServiceForModal.duration} · {selectedServiceForModal.priceLabel}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedServiceForModal(null)}
                className="w-11 h-11 rounded-full border border-neutral-line flex items-center justify-center hover:border-brand-light transition-colors cursor-pointer shrink-0"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-8">
              <div className="rounded-btn overflow-hidden aspect-[4/3] bg-neutral-900">
                <img
                  src={selectedServiceForModal.image}
                  alt={selectedServiceForModal.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-4">
                <p className="font-secondary text-base leading-relaxed opacity-80">
                  {selectedServiceForModal.details}
                </p>
                <div className="pt-2">
                  <h4 className="font-primary text-xs uppercase tracking-widest text-accent-gold mb-3">
                    The 4-Stage Lagos Luxury Protocol
                  </h4>
                  <ul className="space-y-2 font-secondary text-sm opacity-80">
                    {selectedServiceForModal.ritualSteps.map((step, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="font-primary text-xs text-accent-gold tabular-nums">0{i + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-neutral-line pt-6 mb-8">
              <h4 className="font-primary text-xs uppercase tracking-widest opacity-60 mb-4">
                Tiered Artist Pricing (NGN)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {selectedServiceForModal.tiers.map((tier) => (
                  <div
                    key={tier.role}
                    className="border border-neutral-line rounded-btn p-4 flex flex-col justify-between"
                  >
                    <span className="font-secondary text-xs opacity-60">{tier.role}</span>
                    <span className="font-secondary text-sm font-semibold mt-1">{tier.stylist}</span>
                    <span className="font-primary text-xl font-bold text-accent-gold mt-3 tabular-nums">
                      {tier.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-4">
              <button
                type="button"
                onClick={() => setSelectedServiceForModal(null)}
                className="border border-neutral-line rounded-btn px-8 py-4 font-primary font-bold uppercase text-xs tracking-widest hover:border-brand-light transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => openBookingWithService(selectedServiceForModal.id)}
                className="bg-brand-light text-brand-dark rounded-btn px-8 py-4 font-primary font-bold uppercase text-xs tracking-widest hover:bg-accent-gold transition-colors cursor-pointer"
              >
                Reserve {selectedServiceForModal.title}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Portfolio Lookbook Modal */}
      {selectedPortfolioItem && (
        <div
          className="fixed inset-0 z-[300] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 lg:p-8"
          onClick={() => setSelectedPortfolioItem(null)}
        >
          <div
            className="bg-brand-light text-brand-dark rounded-card max-w-3xl w-full p-8 lg:p-12 relative overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start gap-6 mb-8">
              <div>
                <p className="font-signature text-3xl text-accent-gold">Lagos Lookbook Study</p>
                <h3 className="font-primary text-3xl lg:text-5xl font-bold uppercase mt-1">
                  {selectedPortfolioItem.title}
                </h3>
                <p className="font-secondary text-sm opacity-70 mt-1">{selectedPortfolioItem.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPortfolioItem(null)}
                className="w-11 h-11 rounded-full border border-brand-dark/20 flex items-center justify-center hover:border-brand-dark transition-colors cursor-pointer shrink-0"
                aria-label="Close lookbook"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="rounded-btn overflow-hidden aspect-[3/4] bg-brand-dark">
                <img
                  src={selectedPortfolioItem.image}
                  alt={selectedPortfolioItem.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-6">
                <div>
                  <p className="font-primary text-xs uppercase tracking-widest opacity-50">Lead Hair Architect</p>
                  <p className="font-primary text-lg font-bold mt-1">{selectedPortfolioItem.stylist}</p>
                </div>
                <div>
                  <p className="font-primary text-xs uppercase tracking-widest opacity-50">Suite Session Time</p>
                  <p className="font-secondary text-base font-semibold mt-1">{selectedPortfolioItem.duration}</p>
                </div>
                <div>
                  <p className="font-primary text-xs uppercase tracking-widest opacity-50">Atelier Notes</p>
                  <p className="font-secondary text-base leading-relaxed opacity-80 mt-2">
                    {selectedPortfolioItem.notes}
                  </p>
                </div>
                <div className="pt-4 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      openBookingWithService(
                        selectedPortfolioItem.recommendedServiceId,
                        `${selectedPortfolioItem.stylist} — Lead Stylist`
                      )
                    }
                    className="bg-brand-dark text-brand-light rounded-btn px-8 py-4 font-primary font-bold uppercase text-xs tracking-widest hover:bg-accent-gold hover:text-brand-dark transition-colors cursor-pointer"
                  >
                    Book This Look
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Heritage Story Modal */}
      {heritageModalOpen && (
        <div
          className="fixed inset-0 z-[300] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 lg:p-8"
          onClick={() => setHeritageModalOpen(false)}
        >
          <div
            className="bg-brand-light text-brand-dark rounded-card max-w-2xl w-full p-8 lg:p-12 relative overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start gap-6 mb-6">
              <div>
                <p className="font-signature text-4xl text-accent-gold">Born in Victoria Island</p>
                <h3 className="font-primary text-3xl lg:text-4xl font-bold uppercase mt-1">
                  The SHEAR Lagos Story
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setHeritageModalOpen(false)}
                className="w-11 h-11 rounded-full border border-brand-dark/20 flex items-center justify-center hover:border-brand-dark transition-colors cursor-pointer shrink-0"
                aria-label="Close heritage modal"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4 font-secondary text-base lg:text-lg leading-relaxed opacity-85">
              <p>
                Founded at 14 Adeola Odeku Street by celebrity wig architect and trichologist Teniola Adeyemi, SHEAR was created to bring haute couture standards to Nigerian wig-making, HD frontal mastery, and bridal hair styling.
              </p>
              <p>
                We source 100% single-donor raw bundles directly and ventilate our ultra-thin Swiss HD lace in-house—calibrating every hairline to Nigerian skin undertones and protecting your natural edges underneath with botanical Ori and Chebe rituals.
              </p>
              <div className="grid grid-cols-3 gap-4 border-t border-b border-brand-dark/15 py-6 my-6 text-center">
                <div>
                  <p className="font-primary text-2xl font-bold tabular-nums">100%</p>
                  <p className="font-secondary text-xs opacity-60 mt-1">Single-Donor Raw Hair</p>
                </div>
                <div>
                  <p className="font-primary text-2xl font-bold tabular-nums">VI &amp; Ikoyi</p>
                  <p className="font-secondary text-xs opacity-60 mt-1">Private Suite &amp; Call-Out</p>
                </div>
                <div>
                  <p className="font-primary text-2xl font-bold tabular-nums">1:1</p>
                  <p className="font-secondary text-xs opacity-60 mt-1">Zero-Wait Chair Policy</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={() => openBookingWithService('wig-architecture')}
                className="bg-brand-dark text-brand-light rounded-btn px-8 py-4 font-primary font-bold uppercase text-xs tracking-widest hover:bg-accent-gold hover:text-brand-dark transition-colors cursor-pointer"
              >
                Book a Consultation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Editorial / Legal Info Modal */}
      {infoModal && (
        <div
          className="fixed inset-0 z-[300] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 lg:p-8"
          onClick={() => setInfoModal(null)}
        >
          <div
            className="bg-brand-dark text-brand-light border border-neutral-line rounded-card max-w-xl w-full p-8 lg:p-10 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start gap-6 mb-6">
              <div>
                <p className="font-secondary text-xs uppercase tracking-widest text-accent-gold">
                  {infoModal.subtitle}
                </p>
                <h3 className="font-primary text-2xl lg:text-3xl font-bold uppercase mt-2">
                  {infoModal.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInfoModal(null)}
                className="w-10 h-10 rounded-full border border-neutral-line flex items-center justify-center hover:border-brand-light transition-colors cursor-pointer shrink-0"
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4 font-secondary text-base leading-relaxed opacity-80">
              {infoModal.body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={() => setInfoModal(null)}
                className="bg-brand-light text-brand-dark rounded-btn px-8 py-3 font-primary font-bold uppercase text-xs tracking-widest hover:bg-accent-gold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Private Appointment Booking Modal */}
      {bookingModalOpen && (
        <div
          className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 lg:p-8"
          onClick={() => setBookingModalOpen(false)}
        >
          <div
            className="bg-brand-dark text-brand-light border border-neutral-line rounded-card max-w-2xl w-full p-8 lg:p-12 relative overflow-y-auto max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start gap-4 mb-8">
              <div>
                <p className="font-signature text-4xl text-accent-gold">Victoria Island &amp; VIP Concierge</p>
                <h3 className="font-primary text-3xl lg:text-4xl font-bold uppercase mt-1">
                  Reserve Your Chair
                </h3>
                <p className="font-secondary text-sm opacity-60 mt-1">
                  14 Adeola Odeku St, Victoria Island · Complimentary lace-tint &amp; edge-care consultation included
                </p>
              </div>
              <button
                type="button"
                onClick={() => setBookingModalOpen(false)}
                className="w-11 h-11 rounded-full border border-neutral-line flex items-center justify-center hover:border-brand-light transition-colors cursor-pointer shrink-0"
                aria-label="Close booking modal"
              >
                ✕
              </button>
            </div>

            {bookingConfirmed ? (
              <div className="space-y-6 py-4">
                <div className="border border-accent-gold/50 rounded-btn p-6 bg-white/5 space-y-4">
                  <p className="font-primary text-xs uppercase tracking-widest text-accent-gold">
                    Reservation Confirmed · Ref {bookingConfirmed.reference}
                  </p>
                  <h4 className="font-primary text-2xl font-bold uppercase">
                    We look forward to hosting you, {bookingConfirmed.name}.
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-line font-secondary text-sm">
                    <div>
                      <span className="opacity-50 block">Selected Service</span>
                      <span className="font-semibold">{bookingConfirmed.serviceTitle}</span>
                    </div>
                    <div>
                      <span className="opacity-50 block">Assigned Artist</span>
                      <span className="font-semibold">{bookingConfirmed.stylist}</span>
                    </div>
                    <div>
                      <span className="opacity-50 block">Date &amp; Time</span>
                      <span className="font-semibold tabular-nums">
                        {bookingConfirmed.date} at {bookingConfirmed.time}
                      </span>
                    </div>
                    <div>
                      <span className="opacity-50 block">Setting</span>
                      <span className="font-semibold">{bookingConfirmed.locationMode}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setBookingConfirmed(null);
                      setBookingModalOpen(false);
                    }}
                    className="bg-brand-light text-brand-dark rounded-btn px-10 py-4 font-primary font-bold uppercase text-xs tracking-widest hover:bg-accent-gold transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-primary text-xs uppercase tracking-widest opacity-70 mb-2">
                      Select Service
                    </label>
                    <select
                      value={bookingServiceId}
                      onChange={(e) => setBookingServiceId(e.target.value)}
                      className="w-full bg-transparent border border-neutral-line rounded-btn px-4 py-3.5 font-secondary text-base text-brand-light focus:border-accent-gold outline-none"
                    >
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.id} className="bg-brand-dark text-brand-light">
                          {s.title} ({s.priceLabel})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-primary text-xs uppercase tracking-widest opacity-70 mb-2">
                      Master Stylist
                    </label>
                    <select
                      value={bookingStylist}
                      onChange={(e) => setBookingStylist(e.target.value)}
                      className="w-full bg-transparent border border-neutral-line rounded-btn px-4 py-3.5 font-secondary text-base text-brand-light focus:border-accent-gold outline-none"
                    >
                      <option value="Teniola Adeyemi — Master Founder" className="bg-brand-dark text-brand-light">
                        Teniola Adeyemi — Master Founder
                      </option>
                      <option value="Chidinma Okafor — Couture Wig & Bridal Director" className="bg-brand-dark text-brand-light">
                        Chidinma Okafor — Couture Wig &amp; Bridal Director
                      </option>
                      <option value="Zainab Balogun-Cole — Senior Lace Specialist" className="bg-brand-dark text-brand-light">
                        Zainab Balogun-Cole — Senior Lace Specialist
                      </option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="block font-primary text-xs uppercase tracking-widest opacity-70 mb-2">
                      Appointment Setting
                    </label>
                    <select
                      value={bookingLocationMode}
                      onChange={(e) => setBookingLocationMode(e.target.value)}
                      className="w-full bg-transparent border border-neutral-line rounded-btn px-4 py-3.5 font-secondary text-base text-brand-light focus:border-accent-gold outline-none"
                    >
                      <option value="Victoria Island Flagship Lounge" className="bg-brand-dark text-brand-light">
                        VI Flagship Suite
                      </option>
                      <option value="VIP Private Enclosed Suite (VI)" className="bg-brand-dark text-brand-light">
                        VIP Private Suite (VI)
                      </option>
                      <option value="VIP Home / Bridal Hotel Call-Out (Ikoyi / Lekki / VI)" className="bg-brand-dark text-brand-light">
                        Home / Hotel Call-Out
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-primary text-xs uppercase tracking-widest opacity-70 mb-2">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full bg-transparent border border-neutral-line rounded-btn px-4 py-3.5 font-secondary text-base text-brand-light focus:border-accent-gold outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-primary text-xs uppercase tracking-widest opacity-70 mb-2">
                      Preferred Time
                    </label>
                    <select
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full bg-transparent border border-neutral-line rounded-btn px-4 py-3.5 font-secondary text-base text-brand-light focus:border-accent-gold outline-none"
                    >
                      <option value="09:00" className="bg-brand-dark text-brand-light">09:00 Early Bridal / Owambe Prep</option>
                      <option value="11:30" className="bg-brand-dark text-brand-light">11:30 Late Morning Session</option>
                      <option value="14:00" className="bg-brand-dark text-brand-light">14:00 Afternoon Session</option>
                      <option value="16:30" className="bg-brand-dark text-brand-light">16:30 Late Afternoon</option>
                      <option value="19:00" className="bg-brand-dark text-brand-light">19:00 Private Evening Slot</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-primary text-xs uppercase tracking-widest opacity-70 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Adesua Coker"
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      className="w-full bg-transparent border border-neutral-line rounded-btn px-4 py-3.5 font-secondary text-base text-brand-light placeholder:text-brand-light/30 focus:border-accent-gold outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-primary text-xs uppercase tracking-widest opacity-70 mb-2">
                      WhatsApp / Mobile Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+234 803 000 0000"
                      value={bookingPhone}
                      onChange={(e) => setBookingPhone(e.target.value)}
                      className="w-full bg-transparent border border-neutral-line rounded-btn px-4 py-3.5 font-secondary text-base text-brand-light placeholder:text-brand-light/30 focus:border-accent-gold outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-primary text-xs uppercase tracking-widest opacity-70 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="client@domain.ng"
                    value={bookingEmail}
                    onChange={(e) => setBookingEmail(e.target.value)}
                    className="w-full bg-transparent border border-neutral-line rounded-btn px-4 py-3.5 font-secondary text-base text-brand-light placeholder:text-brand-light/30 focus:border-accent-gold outline-none"
                  />
                </div>

                <div>
                  <label className="block font-primary text-xs uppercase tracking-widest opacity-70 mb-2">
                    Wig / Event Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Mention HD lace type (5x5 / 13x6 / 360), bundle drop-off date, Gele coordination, or hotel address..."
                    value={bookingNotes}
                    onChange={(e) => setBookingNotes(e.target.value)}
                    className="w-full bg-transparent border border-neutral-line rounded-btn px-4 py-3 font-secondary text-base text-brand-light placeholder:text-brand-light/30 focus:border-accent-gold outline-none resize-none"
                  />
                </div>

                {bookingError && (
                  <p className="font-secondary text-sm text-accent-gold">{bookingError}</p>
                )}

                <div className="flex flex-col sm:flex-row justify-end gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setBookingModalOpen(false)}
                    className="border border-neutral-line rounded-btn px-8 py-4 font-primary font-bold uppercase text-xs tracking-widest hover:border-brand-light transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-brand-light text-brand-dark rounded-btn px-10 py-4 font-primary font-bold uppercase text-xs tracking-widest hover:bg-accent-gold transition-colors cursor-pointer"
                  >
                    Confirm Appointment
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


