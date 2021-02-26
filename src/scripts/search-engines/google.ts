import mobile from 'is-mobile';
import { CSSAttribute } from '../styles';
import { SerpHandler } from '../types';
import { getParentElement, handleSerp, insertElement } from './helpers';

// #region desktop
const desktopGlobalStyle: CSSAttribute = {
  '[data-ub-blocked="visible"]': {
    background: 'rgba(255, 192, 192, 0.5)',
  },
  '.ub-button': {
    color: 'rgb(26, 13, 171)',
  },
  '.ub-button:hover': {
    textDecoration: 'underline',
  },
};

const desktopInlineActionStyle: CSSAttribute = {
  display: 'inline-block',
  width: 0,
};

const desktopDefaultActionStyle: CSSAttribute = {
  ...desktopInlineActionStyle,
  fontSize: '14px',
  marginLeft: '4px',
  '.fl + &': {
    marginLeft: '6px',
  },
  'span:not([class]) + &': {
    marginLeft: 0,
  },
};

const desktopAboutThisResultActionStyle: CSSAttribute = {
  ...desktopInlineActionStyle,
  fontSize: '14px',
  left: '52px',
  position: 'relative',
  visibility: 'visible',
};

const desktopNewsActionStyle: CSSAttribute = {
  ...desktopInlineActionStyle,
  fontSize: '12px',
  marginLeft: '6px',
};

const desktopSerpHandlers: Record<string, SerpHandler> = {
  // All
  '': handleSerp({
    globalStyle: {
      ...desktopGlobalStyle,
      '[data-ub-blocked="visible"] .kp-blk, [data-ub-blocked="visible"] .cv2VAd, [data-ub-blocked="visible"] .WpKAof': {
        background: 'transparent !important',
      },
    },
    targets:
      '#result-stats, #botabar, .IsZvec, .g, .ttfMne, .F4CzCf, .YwonT, .kno-fb-ctx, .tYlW7b, .eejeod, .VibNM, .dbsr, .F9rcV',
    controlHandlers: [
      {
        target: '#result-stats',
      },
      {
        target: '#botabar',
        position: 'afterend',
        style: {
          color: 'rgb(112, 117, 122)',
          display: 'block',
          margin: '-24px 0 24px 180px',
        },
      },
      {
        target: '.vI9alf',
        position: 'afterend',
        style: {
          color: 'rgb(112, 117, 122)',
          display: 'block',
          margin: '0 0 16px 180px',
        },
      },
    ],
    entryHandlers: [
      // Default, Web Result (About this result)
      {
        target: '.g .IsZvec',
        level: target => {
          const root = target.closest<HTMLElement>('.g');
          // Featured Snippet, People Also Ask
          return root && (root.matches('.g *') ? null : root);
        },
        url: 'a',
        actionTarget: '.csDOgf',
        actionPosition: 'afterend',
        actionStyle: desktopAboutThisResultActionStyle,
      },
      // Default, Web Result
      {
        target: '.g .IsZvec',
        level: target => {
          const root = target.closest<HTMLElement>('.g');
          return root && (root.matches('.g *') ? null : root);
        },
        url: 'a',
        actionTarget: '.eFM0qc',
        actionStyle: desktopDefaultActionStyle,
      },
      // Default, Web Result (Fallback)
      {
        target: '.g .IsZvec',
        level: target => {
          const root = target.closest<HTMLElement>('.g');
          return root && (root.matches('.g *') ? null : root);
        },
        url: 'a',
        actionTarget: '',
        actionStyle: {
          fontSize: '14px',
          marginTop: '4px',
        },
      },
      // Featured Snippet (About this result)
      {
        target: '.g > .kp-blk > .xpdopen > .ifM9O > div > .g',
        level: 5,
        url: '.yuRUbf > a',
        actionTarget: '.csDOgf',
        actionPosition: 'afterend',
        actionStyle: desktopAboutThisResultActionStyle,
      },
      // Featured Snippet
      {
        target: '.g > .kp-blk > .xpdopen > .ifM9O > div > .g',
        level: 5,
        url: '.yuRUbf > a',
        actionTarget: '.eFM0qc',
        actionStyle: desktopDefaultActionStyle,
      },
      // Latest
      {
        target: '.So9e7d > .ttfMne',
        level: target => {
          const root = getParentElement(target);
          // Map from the Web (COVID-19)
          return root.matches('.UDZeY *') ? null : root;
        },
        url: '.VlJC0',
        actionTarget: '.ttfMne',
        actionStyle: {
          display: 'block',
          fontSize: '14px',
          margin: '-10px 0 10px',
          padding: '0 16px',
        },
      },
      // People Also Ask (About this result)
      {
        target: '.related-question-pair > g-accordion-expander > .gy6Qzb > div > div > .g',
        level: target => {
          const root = getParentElement(target, 5);
          // Common Question (COVID-19)
          return root.matches('.UDZeY *') ? null : root;
        },
        url: '.yuRUbf > a',
        actionTarget: '.csDOgf',
        actionPosition: 'afterend',
        actionStyle: {
          ...desktopAboutThisResultActionStyle,
          '& > .ub-button': {
            display: 'inline-block',
            overflowY: 'hidden',
          },
        },
      },
      // People Also Ask
      {
        target: '.related-question-pair > g-accordion-expander > .gy6Qzb > div > div > .g',
        level: target => {
          const root = getParentElement(target, 5);
          return root.matches('.UDZeY *') ? null : root;
        },
        url: '.yuRUbf > a',
        actionTarget: '.eFM0qc',
        actionStyle: {
          ...desktopDefaultActionStyle,
          '& > .ub-button': {
            display: 'inline-block',
            overflowY: 'hidden',
          },
        },
      },
      // Quote in the News
      {
        target: '.UaDxmd > .F4CzCf',
        level: 1,
        url: '.YVkwvd',
        actionTarget: '.FF4Vu',
        actionStyle: {
          display: 'block',
          fontSize: '14px',
          lineHeight: '20px',
        },
      },
      // Recipe
      {
        target: '.YwonT',
        url: '.a-no-hover-decoration',
        actionTarget: '.a-no-hover-decoration',
        actionStyle: {
          display: 'block',
          fontSize: '12px',
        },
      },
      // Top Story (Horizontal)
      {
        target: '.JJZKK .kno-fb-ctx',
        level: '.JJZKK',
        url: 'a',
        actionTarget: '.kno-fb-ctx',
        actionStyle: {
          display: 'block',
          fontSize: '12px',
          margin: '-10px 0 10px',
          padding: '0 16px',
          position: 'relative',
          zIndex: 1,
        },
      },
      // Top Story (Vertical)
      {
        target: 'div > div > div > lazy-load-item > .dbsr > a > .P5BnJb > .Od9uAe > .tYlW7b',
        level: 8,
        url: 'a',
        actionTarget: '.tYlW7b',
        actionStyle: {
          ...desktopInlineActionStyle,
          fontSize: '14px',
        },
      },
      {
        target: 'div > div > .dbsr > a > div > div > .tYlW7b',
        level: 6,
        url: 'a',
        actionTarget: '.tYlW7b',
        actionStyle: {
          ...desktopInlineActionStyle,
          fontSize: '14px',
        },
      },
      // Twitter, Twitter Search (About this result)
      {
        target: '.eejeod, .g',
        url: 'g-link > a',
        actionTarget: '.oERM6',
        actionPosition: 'afterend',
        actionStyle: desktopAboutThisResultActionStyle,
      },
      // Twitter, Twitter Search
      {
        target: '.eejeod, .g',
        url: 'g-link > a',
        actionTarget: '.ellip',
        actionStyle: desktopDefaultActionStyle,
      },
      // Video
      {
        target: '.VibNM',
        url: '.WpKAof',
        actionTarget: '.ocUPSd',
        actionStyle: desktopDefaultActionStyle,
      },
      // News (COVID-19)
      {
        target: 'div > .XBBQi + .dbsr, div > .AxkxJb + .dbsr',
        level: 1,
        url: '.dbsr > a',
        actionTarget: '.XTjFC',
        actionStyle: desktopNewsActionStyle,
      },
      {
        target: 'div > .nChh6e > div > div > div:not(.XBBQi):not(.AxkxJb) + .dbsr',
        level: 4,
        url: '.dbsr > a',
        actionTarget: '.XTjFC',
        actionStyle: desktopNewsActionStyle,
      },
      {
        target: '.nChh6e > div > .dbsr',
        level: 2,
        url: '.dbsr > a',
        actionTarget: '.XTjFC',
        actionStyle: desktopNewsActionStyle,
      },
      // People Also Search For (COVID-19)
      {
        target: '.F9rcV',
        url: '.Tsx23b',
        actionTarget: '.Tsx23b',
        actionStyle: {
          display: 'block',
          fontSize: '12px',
          margin: '-12px 0 12px',
          padding: '0 16px',
        },
      },
      // Top Story (Vertical, COVID-19)
      {
        target: '.bh13Qc > .cv2VAd > div > .dbsr > a > .P5BnJb > .Od9uAe > .tYlW7b',
        level: 7,
        url: 'a',
        actionTarget: '.tYlW7b',
        actionStyle: {
          ...desktopInlineActionStyle,
          fontSize: '14px',
        },
      },
    ],
    pagerHandlers: [
      // People Also Ask
      {
        target: '.related-question-pair',
        innerTargets: '.g',
      },
      // Recipe, Default (COVID-19), Web Result (COVID-19), ...
      {
        target: '.yl > div',
        innerTargets: '.YwonT, .IsZvec, .dbsr, .F9rcV, .kno-fb-ctx, .tYlW7b',
      },
      // AutoPagerize
      {
        target: '.autopagerize_page_info ~ .g',
        innerTargets: '.IsZvec',
      },
    ],
  }),
  // Books
  bks: handleSerp({
    globalStyle: desktopGlobalStyle,
    targets: '#result-stats, .Yr5TG',
    controlHandlers: [
      {
        target: '#result-stats',
      },
    ],
    entryHandlers: [
      {
        target: '.Yr5TG',
        url: '.bHexk > a',
        actionTarget: '.eFM0qc',
      },
    ],
  }),
  // Images
  isch: handleSerp({
    globalStyle: desktopGlobalStyle,
    targets: '.cEPPT, .isv-r, .VFACy',
    controlHandlers: [
      {
        target: '.cEPPT',
        position: 'afterend',
        style: {
          color: '#70757a',
          display: 'block',
          padding: '0 0 11px 165px',
        },
      },
    ],
    entryHandlers: [
      {
        target: '.isv-r, .isv-r > .VFACy',
        level: '.isv-r',
        url: '.VFACy',
        actionTarget: '',
        actionStyle: {
          display: 'block',
          fontSize: '11px',
          lineHeight: '16px',
          padding: '0 4px',
          '[data-ub-blocked="visible"] &': {
            background: 'rgba(255, 192, 192, 0.5)',
          },
        },
      },
    ],
  }),
  // News
  nws: handleSerp({
    globalStyle: desktopGlobalStyle,
    targets: '#result-stats, .dbsr, .F9rcV',
    controlHandlers: [
      {
        target: '#result-stats',
      },
    ],
    entryHandlers: [
      // Default
      {
        target: 'div > .XBBQi + .dbsr, div > .AxkxJb + .dbsr',
        level: 1,
        url: '.dbsr > a',
        actionTarget: '.XTjFC',
        actionStyle: desktopNewsActionStyle,
      },
      {
        target: 'div > .nChh6e > div > div > div:not(.XBBQi):not(.AxkxJb) + .dbsr',
        level: 4,
        url: '.dbsr > a',
        actionTarget: '.XTjFC',
        actionStyle: desktopNewsActionStyle,
      },
      {
        target: '.nChh6e > div > .dbsr',
        level: 2,
        url: '.dbsr > a',
        actionTarget: '.XTjFC',
        actionStyle: desktopNewsActionStyle,
      },
      // People Also Search For
      {
        target: '.F9rcV',
        url: '.Tsx23b',
        actionTarget: '.Tsx23b',
        actionStyle: {
          display: 'block',
          fontSize: '12px',
          margin: '-12px 0 12px',
          padding: '0 16px',
        },
      },
    ],
    pagerHandlers: [
      // AutoPagerize
      {
        target: '.autopagerize_page_info ~ div',
        innerTargets: '.dbsr',
      },
    ],
  }),
  // Videos
  vid: handleSerp({
    globalStyle: desktopGlobalStyle,
    targets: '#result-stats, .IsZvec',
    controlHandlers: [
      {
        target: '#result-stats',
      },
    ],
    entryHandlers: [
      {
        target: '.g > .tF2Cxc > .IsZvec',
        level: 2,
        url: '.yuRUbf > a',
        actionTarget: '.eFM0qc',
        actionStyle: desktopDefaultActionStyle,
      },
    ],
    pagerHandlers: [
      // AutoPagerize
      {
        target: '.autopagerize_page_info ~ .g',
        innerTargets: '.IsZvec',
      },
    ],
  }),
};
// #endregion desktop

// #region mobile
function getURLFromQuery(selector: string): (root: HTMLElement) => string | null {
  return root => {
    const a = selector ? root.querySelector(selector) : root;
    if (!(a instanceof HTMLAnchorElement)) {
      return null;
    }
    const url = a.href;
    if (!url) {
      return null;
    }
    const u = new URL(url);
    return u.origin === window.location.origin
      ? u.pathname === '/url'
        ? u.searchParams.get('q')
        : u.pathname === '/imgres' || u.pathname === '/search'
        ? null
        : url
      : url;
  };
}

const mobileGlobalStyle: CSSAttribute = {
  '[data-ub-blocked="visible"]': {
    background: 'rgba(255, 192, 192, 0.5) !important',
  },
  '.ub-button': {
    color: 'rgb(25, 103, 210)',
  },
};

const mobileColoredControlStyle: CSSAttribute = {
  color: 'rgba(0, 0, 0, 0.54)',
};

const mobileDefaultControlStyle: CSSAttribute = {
  ...mobileColoredControlStyle,
  borderRadius: '8px',
  boxShadow: '0 1px 6px rgba(32, 33, 36, 0.28)',
  display: 'block',
  marginBottom: '10px',
  padding: '11px 16px',
};

const mobileImageControlStyle: CSSAttribute = {
  ...mobileColoredControlStyle,
  background: 'white',
  borderRadius: '8px',
  boxShadow: '0 1px 6px rgba(32, 33, 36, 0.18)',
  display: 'block',
  margin: '0 8px 10px',
  padding: '11px 16px',
};

const mobileDefaultActionStyle: CSSAttribute = {
  display: 'block',
  padding: '0 16px 12px',
};

const mobileSerpHandlers: Record<string, SerpHandler> = {
  // All
  '': handleSerp({
    globalStyle: {
      ...mobileGlobalStyle,
      '[data-ub-blocked="visible"] .ZINbbc': {
        background: 'transparent !important',
      },
    },
    targets: '#main > div, .xpd, .BVG0Nb, .qxDOhb > div, .X7NTVe',
    controlHandlers: [
      {
        target: '#main > div:nth-child(4)',
        position: 'beforebegin',
        style: mobileDefaultControlStyle,
      },
    ],
    entryHandlers: [
      // Default, Featured Snippet, Video
      {
        target: '.xpd',
        url: getURLFromQuery(':scope > .kCrYT > a'),
        actionTarget: '',
        actionStyle: mobileDefaultActionStyle,
      },
      // Latest
      {
        target: '.BVG0Nb',
        level: target => (target.querySelector('.S7Jdze:last-child') ? target : null),
        url: getURLFromQuery(''),
        actionTarget: '',
        actionStyle: {
          display: 'block',
          padding: '12px 16px',
        },
      },
      // People Also Ask
      {
        target: '.xpc > .qxDOhb > div',
        level: 2,
        url: getURLFromQuery('.kCrYT > a'),
        actionTarget: '.xpd',
        actionStyle: mobileDefaultActionStyle,
      },
      // Top Story (Horizontal), Twitter Search
      {
        target: '.BVG0Nb',
        level: target => (target.closest('.xpd')?.querySelector('.AzGoi') ? null : target),
        url: getURLFromQuery(''),
        actionTarget: '',
        actionStyle: mobileDefaultActionStyle,
      },
      // Top Story (Vertical)
      {
        target: '.X7NTVe',
        url: getURLFromQuery('.tHmfQe'),
        actionTarget: '.tHmfQe',
        actionStyle: {
          display: 'block',
          paddingTop: '12px',
        },
      },
      // Twitter
      {
        target: '.xpd',
        level: target =>
          target.querySelector(':scope > div:first-child > a > .kCrYT') ? target : null,
        url: getURLFromQuery('a'),
        actionTarget: '',
        actionStyle: mobileDefaultActionStyle,
      },
    ],
  }),
  // Books
  bks: handleSerp({
    globalStyle: mobileGlobalStyle,
    targets: '#main > div, .xpd',
    controlHandlers: [
      {
        target: '#main > div:nth-child(4)',
        position: 'beforebegin',
        style: mobileDefaultControlStyle,
      },
    ],
    entryHandlers: [
      {
        target: '.xpd',
        url: '.kCrYT > a',
        actionTarget: '',
        actionStyle: mobileDefaultActionStyle,
      },
    ],
  }),
  // Images
  isch: handleSerp({
    globalStyle: {
      ...mobileGlobalStyle,
      '[data-ub-blocked="visible"] .iKjWAf': {
        background: 'transparent !important',
      },
    },
    targets: '.dmFHw, #uGbavf, .islrtb',
    controlHandlers: [
      {
        target: '.dmFHw',
        position: 'beforebegin',
        style: mobileImageControlStyle,
      },
      {
        target: '#uGbavf',
        position: target =>
          document.querySelector('.dmFHw') ? null : insertElement('span', target, 'beforebegin'),
        style: mobileImageControlStyle,
      },
    ],
    entryHandlers: [
      {
        target: '.islrtb',
        url: getURLFromQuery('.iKjWAf'),
        actionTarget: '',
        actionStyle: {
          display: 'block',
          fontSize: '11px',
          lineHeight: '20px',
          margin: '-4px 0 4px',
          padding: '0 4px',
        },
      },
    ],
  }),
  // News
  nws: handleSerp({
    globalStyle: mobileGlobalStyle,
    targets: '#main > div, .xpd',
    controlHandlers: [
      {
        target: '#main > div:nth-child(4)',
        position: 'beforebegin',
        style: mobileDefaultControlStyle,
      },
    ],
    entryHandlers: [
      {
        target: '.xpd',
        url: getURLFromQuery('.kCrYT > a'),
        actionTarget: '',
        actionStyle: mobileDefaultActionStyle,
      },
    ],
  }),
  // Videos
  vid: handleSerp({
    globalStyle: mobileGlobalStyle,
    targets: '#main > div, .xpd',
    controlHandlers: [
      {
        target: '#main > div:nth-child(4)',
        position: 'beforebegin',
        style: mobileDefaultControlStyle,
      },
    ],
    entryHandlers: [
      {
        target: '.xpd',
        url: getURLFromQuery('.kCrYT > a'),
        actionTarget: '',
        actionStyle: mobileDefaultActionStyle,
      },
    ],
  }),
};
// #endregion mobile

export function getSerpHandler(): SerpHandler | null {
  const tbm = new URL(window.location.href).searchParams.get('tbm') ?? '';
  return (mobile({ tablet: true }) ? mobileSerpHandlers : desktopSerpHandlers)[tbm] ?? null;
}
