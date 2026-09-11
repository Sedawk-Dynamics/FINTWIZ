/**
 * Every photographic and video asset on the site, with its licence.
 *
 * Keeping the licence next to the path means the credits block on the Terms
 * page is generated from the same record the components read, so an image can
 * never be used without its attribution going up with it.
 */

export type MediaCredit = {
  src: string;
  alt: string;
  /** Title of the source work as published. */
  work: string;
  author: string;
  licence: string;
  licenceUrl: string | null;
  sourceUrl: string;
};

export const photography = {
  financialDistrict: {
    src: "/media/bkc-financial-district.jpg",
    alt: "Office towers of the Bandra Kurla Complex, Mumbai's financial district, at dusk",
    work: "Bandra-Kurla-Complex-Mumbai-Maharashtra-India.jpg",
    author: "N. Vivekananthamoorthy",
    licence: "CC BY 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by/4.0/",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Bandra-Kurla-Complex-Mumbai-Maharashtra-India.jpg",
  },
  towers: {
    src: "/media/bkc-towers.jpg",
    alt: "Commercial towers in the Bandra Kurla Complex, Mumbai",
    work: "Bandra-Kurla complex Bombay 3239.JPG",
    author: "Nikhil Kulkarni",
    licence: "Public domain",
    licenceUrl: null,
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Bandra-Kurla_complex_Bombay_3239.JPG",
  },
  narimanPoint: {
    src: "/media/nariman-point-morning.jpg",
    alt: "Morning view across the bay toward the Nariman Point skyline, Mumbai",
    work: "Morning view from Nariman Point.jpg",
    author: "Vaikoovery",
    licence: "CC BY 3.0",
    licenceUrl: "https://creativecommons.org/licenses/by/3.0/",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Morning_view_from_Nariman_Point.jpg",
  },
  exchange: {
    src: "/media/bse-phiroze-jeejeebhoy-towers.jpg",
    alt: "Phiroze Jeejeebhoy Towers, the Bombay Stock Exchange building, Mumbai",
    work: "Phiroze Jeejeebhoy Towers (Bombay Stock Exchange).jpg",
    author: "Appaiah",
    licence: "CC BY-SA 2.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Phiroze_Jeejeebhoy_Towers_(Bombay_Stock_Exchange).jpg",
  },
} as const satisfies Record<string, MediaCredit>;

export const heroVideo = {
  mp4: "/media/hero-ambient.mp4",
  webm: "/media/hero-ambient.webm",
  poster: "/media/hero-ambient-poster.jpg",
  /** Derived from photography.financialDistrict, so that credit covers it. */
  derivedFrom: "financialDistrict",
} as const;

/** Ordered list used to render the credits block on the Terms page. */
export const mediaCredits: readonly MediaCredit[] = Object.values(photography);
