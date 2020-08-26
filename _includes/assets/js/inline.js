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
  "--theme-color-accent", localStorage.getItem("userColorAccent")
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
  console.log('DOMContentLoaded fired');

  const themeSwitchers = document.querySelectorAll('.js-theme-switcher');

   // Favicon
   // TODO: Determine if javascript related to switching favicon can be removed
   //       if/once `prefers-color-scheme` media queries are implemented
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
      const color = e.target.getAttribute('data-color');
      const colorAccent = e.target.getAttribute('data-color-accent')
      const colorBackground = e.target.getAttribute('data-color-background');
      const colorMaxContrast = e.target.getAttribute('data-color-max-contrast');
      const themeFavicon = e.target.getAttribute('data-favicon');

      // testing
      console.log(
        color,
        colorAccent,
        colorBackground,
        colorMaxContrast,
        themeFavicon
      );

      // Update theme styles
      handleThemeUpdate({
        '--theme-color-accent': colorAccent,
        '--theme-color-background': colorBackground,
        '--theme-color-max-contrast': colorMaxContrast,
        '--theme-color-text': color,
      });

      // Favicon
      changeFavicon(themeFavicon);

      // Save the value for next time page is visited.
      localStorage.setItem("userThemeColor", colorBackground);
      localStorage.setItem("userTextColor", color);
      localStorage.setItem("userColorAccent", colorAccent);
      localStorage.setItem("userColorMaxContrast", colorMaxContrast);
      localStorage.setItem("userThemeFavicon", themeFavicon);
    });
  });
});
