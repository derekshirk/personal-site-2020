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

// Yank theme textColor from localStorage and use it.
document.documentElement.style.setProperty(
  "--primary-theme-accent-color", localStorage.getItem("userAccentColor")
);

// Yank theme textColor from localStorage and use it.
document.documentElement.style.setProperty(
  "--primary-theme-accent-alt-color", localStorage.getItem("userAccentAltColor")
);

// Yank theme bgColor from localStorage and use it.
document.documentElement.style.setProperty(
  "--primary-theme-background-color", localStorage.getItem("userThemeColor")
);

// Yank theme textColor from localStorage and use it.
document.documentElement.style.setProperty(
  "--primary-theme-text-color", localStorage.getItem("userTextColor")
);

// Yank theme textColor from localStorage and use it.
document.documentElement.style.setProperty(
  "--primary-theme-heading-color", localStorage.getItem("userHeadingColor")
);

// Yank theme textColor from localStorage and use it.
document.documentElement.style.setProperty(
  "--primary-theme-link-color", localStorage.getItem("userLinkColor")
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
      const accentColor = e.target.getAttribute('data-accent-color')
      const accentAltColor = e.target.getAttribute('data-accent-alt-color');
      const bgColor = e.target.getAttribute('data-bg-color');
      const color = e.target.getAttribute('data-color');
      const headingColor = e.target.getAttribute('data-heading-color');
      const linkColor = e.target.getAttribute('data-link-color');
      const themeFavicon = e.target.getAttribute('data-favicon');

      // testing
      console.log(
        accentColor,
        accentAltColor,
        bgColor,
        color,
        headingColor,
        linkColor,
        themeFavicon
      );

      // Update theme styles
      handleThemeUpdate({
        '--primary-theme-accent-color': accentColor,
        '--primary-theme-accent-alt-color': accentAltColor,
        '--primary-theme-background-color': bgColor,
        '--primary-theme-heading-color': headingColor,
        '--primary-theme-link-color': linkColor,
        '--primary-theme-text-color': color,
      });

      // Favicon
      changeFavicon(themeFavicon);

      // Save the value for next time page is visited.
      localStorage.setItem("userThemeColor", bgColor);
      localStorage.setItem("userTextColor", color);
      localStorage.setItem("userAccentColor", accentColor);
      localStorage.setItem("userAccentAltColor", accentAltColor);
      localStorage.setItem("userHeadingColor", headingColor);
      localStorage.setItem("userLinkColor", linkColor);
      localStorage.setItem("userThemeFavicon", themeFavicon);
    });
  });
});
