if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}

// 1. Check to see if a theme specific favicon is saved in local storage
// 2. If it is, use it.
// 3. If not, do nothing (defaults to using whatever favicon is defined in `<head>`).
// 4. If this conditional is not used, no favicon will be displayed on an initial
//    page load when nothing is saved to local storage.

if (localStorage.getItem("userThemeFavicon") !== null) {
  document.querySelector("link[rel*='icon']").href = localStorage.getItem("userThemeFavicon");
}

// Yank theme colorBackground from localStorage and use it.
document.documentElement.style.setProperty(
  "--theme-color-background", localStorage.getItem("userThemeColor")
);

// Yank theme textColor from localStorage and use it.
document.documentElement.style.setProperty(
  "--theme-color-accent-primary", localStorage.getItem("usercolorAccentPrimary")
);

// Yank theme textColor from localStorage and use it.
document.documentElement.style.setProperty(
  "--theme-color-accent-secondary", localStorage.getItem("usercolorAccentSecondary")
);

// Yank theme textColor from localStorage and use it.
document.documentElement.style.setProperty(
  "--theme-color-text", localStorage.getItem("userTextColor")
);

// Yank theme textColor from localStorage and use it.
document.documentElement.style.setProperty(
  "--theme-color-max-contrast", localStorage.getItem("userColorMaxContrast")
);

document.addEventListener("DOMContentLoaded", function() {

  const themeSwitchers = document.querySelectorAll('.js-theme-switcher');

   // Favicon
   // TODO: Determine if javascript related to switching favicon can 
   //       simplified or removed if/once `prefers-color-scheme` 
   //       are implemented media queries 
   const changeFavicon = link => {
    let $favicon = document.querySelector('link[rel="icon"]')
    // If a <link rel="icon"> element already exists,
    // change its href to the given link.
    if ($favicon !== null) {
      $favicon.href = link
    // Otherwise, create a new element and append it to <head>.
    } else {
      $favicon = document.createElement("link")
      $favicon.rel = "icon"
      $favicon.href = link
      document.head.appendChild($favicon)
    }
  }

  const handleThemeUpdate = (cssVars) => {
    const root = document.querySelector(':root');
    const keys = Object.keys(cssVars);
    keys.forEach(key => {
      root.style.setProperty(key, cssVars[key]);
    });
  }

  themeSwitchers.forEach((item) => {
    item.addEventListener('click', (e) => {
      const lightModeBtn = document.getElementById('light-mode');
      const darkModeBtn = document.getElementById('dark-mode');
      const color = e.target.getAttribute('data-color');
      const colorAccentPrimary = e.target.getAttribute('data-color-accent-primary');
      const colorAccentSecondary = e.target.getAttribute('data-color-accent-secondary')
      const colorBackground = e.target.getAttribute('data-color-background');
      const colorMaxContrast = e.target.getAttribute('data-color-max-contrast');
      const themeFavicon = e.target.getAttribute('data-favicon');
      // console.log(lightModeBtn);
      if (e.target.id == 'light-mode') {
        // console.log('clicked light mode');
        darkModeBtn.classList.remove('is-active');
        item.classList.toggle('is-active');
      }
      else {
        // console.log('clicked dark mode')
        lightModeBtn.classList.remove('is-active');
        item.classList.toggle('is-active');
      }
      

      // testing
      console.log(
        color,
        colorAccentPrimary,
        colorAccentSecondary,
        colorBackground,
        colorMaxContrast,
        themeFavicon
      );

      // Update theme styles
      handleThemeUpdate({
        '--theme-color-accent-primary': colorAccentPrimary,
        '--theme-color-accent-secondary': colorAccentSecondary,
        '--theme-color-background': colorBackground,
        '--theme-color-max-contrast': colorMaxContrast,
        '--theme-color-text': color,
      });

      // Favicon
      changeFavicon(themeFavicon);

      // Save the value for next time page is visited.
      localStorage.setItem("userThemeColor", colorBackground);
      localStorage.setItem("userTextColor", color);
      localStorage.setItem("usercolorAccentPrimary", colorAccentPrimary);
      localStorage.setItem("usercolorAccentSecondary", colorAccentSecondary);
      localStorage.setItem("userColorMaxContrast", colorMaxContrast);
      localStorage.setItem("userThemeFavicon", themeFavicon);
    });
  });
});
