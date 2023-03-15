import React from 'react';

const SITE_DOMAIN = 'novu.co';
const PLAUSIBLE_DOMAIN = 'plausible.io';
const SCRIPT_URI = '/js/script.js';

// eslint-disable-next-line import/prefer-default-export
export const onRenderBody = ({ setHeadComponents, setPreBodyComponents, setHtmlAttributes }) => {
  if (process.env.NODE_ENV === 'production') {
    const scriptProps = {
      'data-domain': SITE_DOMAIN,
      src: `https://${PLAUSIBLE_DOMAIN}${SCRIPT_URI}`,
    };

    setHeadComponents([
      // eslint-disable-next-line react/jsx-filename-extension
      <link key="plausible-preconnect" rel="preconnect" href={`https://${PLAUSIBLE_DOMAIN}`} />,
      <script key="plausible-script" defer {...scriptProps} />,
      // See: https://plausible.io/docs/custom-event-goals#1-trigger-custom-events-with-javascript-on-your-site
      <script
        key="plausible-custom-events"
        dangerouslySetInnerHTML={{
          __html: `
            window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) };
          `,
        }}
      />,
    ]);
  }

  setPreBodyComponents([
    <script
      dangerouslySetInnerHTML={{
        __html: `
        let mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

        function updateTheme(savedTheme) {
          let theme = 'system';
          try {
            if (!savedTheme) {
              savedTheme = window.localStorage.theme
            }
            if (savedTheme === 'dark') {
              theme = 'dark';
              document.documentElement.classList.add('dark')
            } else if (savedTheme === 'light') {
              theme = 'light';
              document.documentElement.classList.remove('dark')
            } else if (mediaQuery.matches) {
              theme = 'dark';
              document.documentElement.classList.add('dark');
            } else {
              theme = 'light';
              document.documentElement.classList.remove('dark');
            }
          } catch {
            theme = 'light'
            document.documentElement.classList.remove('dark');
          }
          return theme
        }
      
        function updateThemeWithoutTransitions(savedTheme) {
          updateTheme(savedTheme);
          document.documentElement.classList.add('[&_*]:!transition-none');
          window.setTimeout(() => {
            document.documentElement.classList.remove('[&_*]:!transition-none');
          }, 0)
        }
      
        document.documentElement.setAttribute('data-theme', updateTheme());
      
        new MutationObserver(([{ oldValue }]) => {
          let newValue = document.documentElement.getAttribute('data-theme');
          if (newValue !== oldValue) {
            try {
              window.localStorage.setItem('theme', newValue);
            } catch {}
            updateThemeWithoutTransitions(newValue);
          }
        }).observe(document.documentElement, { attributeFilter: ['data-theme'], attributeOldValue: true })
      
        mediaQuery.addEventListener('change', updateThemeWithoutTransitions);
        window.addEventListener('storage', updateThemeWithoutTransitions);`,
      }}
      key="theme-picker"
    />,
  ]);

  setHtmlAttributes({ lang: 'en', prefix: 'og: http://ogp.me/ns#' });

  return null;
};
