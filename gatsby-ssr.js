import React from 'react';

// eslint-disable-next-line import/prefer-default-export
export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    <script
      dangerouslySetInnerHTML={{
        __html: `
        let mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

        function updateTheme(savedTheme) {
          let theme = 'system'
          try {
            if (!savedTheme) {
              savedTheme = window.localStorage.theme
            }
            if (savedTheme === 'dark') {
              theme = 'dark'
              document.documentElement.classList.add('dark')
            } else if (savedTheme === 'light') {
              theme = 'light'
              document.documentElement.classList.remove('dark')
            } else if (mediaQuery.matches) {
              document.documentElement.classList.add('dark')
            } else {
              document.documentElement.classList.remove('dark')
            }
          } catch {
            theme = 'light'
            document.documentElement.classList.remove('dark')
          }
          return theme
        }
      
        function updateThemeWithoutTransitions(savedTheme) {
          updateTheme(savedTheme)
          document.documentElement.classList.add('[&_*]:!transition-none')
          window.setTimeout(() => {
            document.documentElement.classList.remove('[&_*]:!transition-none')
          }, 0)
        }
      
        document.documentElement.setAttribute('data-theme', updateTheme())
      
        new MutationObserver(([{ oldValue }]) => {
          let newValue = document.documentElement.getAttribute('data-theme')
          if (newValue !== oldValue) {
            try {
              window.localStorage.setItem('theme', newValue)
            } catch {}
            updateThemeWithoutTransitions(newValue)
          }
        }).observe(document.documentElement, { attributeFilter: ['data-theme'], attributeOldValue: true })
      
        mediaQuery.addEventListener('change', updateThemeWithoutTransitions)
        window.addEventListener('storage', updateThemeWithoutTransitions)`,
      }}
      key="theme-picker"
    />,
  ]);

  return null;
};
