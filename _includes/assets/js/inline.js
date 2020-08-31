if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}

if (localStorage.getItem("userThemeFavicon") !== null) {
  document.querySelector("link[rel*='icon']").href = localStorage.getItem("userThemeFavicon");
}

// Grab theme colorBackground from localStorage and use it (if it exists).
if (localStorage.getItem("userThemeColor") !== null) {
  document.documentElement.style.setProperty(
    "--theme-color-background", localStorage.getItem("userThemeColor")
  );
}

// Grab theme primary accent color from localStorage and use it (if it exists).
if (localStorage.getItem("userColorAccentPrimary") !== null) {
  document.documentElement.style.setProperty(
    "--theme-color-accent-primary", localStorage.getItem("userColorAccentPrimary")
  );
}

// Grab theme secondary accent color from localStorage and use it (if it exists).
if (localStorage.getItem("userColorAccentSecondary") !== null) {
  document.documentElement.style.setProperty(
    "--theme-color-accent-secondary", localStorage.getItem("userColorAccentSecondary")
  );
}

// Grab theme text color from localStorage and use it (if it exists).
if (localStorage.getItem("userTextColor") !== null) {
  document.documentElement.style.setProperty(
    "--theme-color-text", localStorage.getItem("userTextColor")
  );
}

// Grab theme maximum contrast color from localStorage and use it (if it exists).
if (localStorage.getItem("userColorMaxContrast") !== null) {
  document.documentElement.style.setProperty(
    "--theme-color-max-contrast", localStorage.getItem("userColorMaxContrast")
  );
}

document.addEventListener("DOMContentLoaded", function() {

  const whale = document.querySelector('.Illustration-whale');
  if (whale) {
    console.log('thar she blows');
    let eyeBall = document.querySelector('.eyeball'),
    pupil = document.querySelector('.pupil'),
    eyeArea = eyeBall.getBoundingClientRect(),
    pupilArea = pupil.getBoundingClientRect(),
    R = eyeArea.width/2,
    r = pupilArea.width/2,
    centerX = eyeArea.left + R,
    centerY = eyeArea.top + R;

    document.addEventListener("mousemove", (e) => {
    let x = e.clientX - centerX,
        y = e.clientY - centerY,
        theta = Math.atan2(y,x),
        angle = theta*180/Math.PI + 360;

    pupil.style.transform = `translateX(${R - r +"px"}) rotate(${angle + "deg"})`;
    pupil.style.transformOrigin = `${r +"px"} center`;
    }); 
  }

  const themeSwitchers = document.querySelectorAll('.js-theme-switcher');
  const lightModeBtn = document.getElementById('light-mode');
  const darkModeBtn = document.getElementById('dark-mode');
  const userThemePreference = localStorage.getItem("userThemePreference");
  
  const changeFavicon = link => {
    const $favicon = document.querySelector('link[rel="icon"]')
    if ($favicon !== null) {
      $favicon.href = link
    } 
    else {
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
      const colorAccentPrimary = e.target.getAttribute('data-color-accent-primary');
      const colorAccentSecondary = e.target.getAttribute('data-color-accent-secondary')
      const colorBackground = e.target.getAttribute('data-color-background');
      const colorMaxContrast = e.target.getAttribute('data-color-max-contrast');
      const themeFavicon = e.target.getAttribute('data-favicon');
      const theme = e.target.getAttribute('data-theme');

      if (e.target.id == 'light-mode') {
        darkModeBtn.classList.remove('is-active');
        item.classList.add('is-active');
      }
      else {
        lightModeBtn.classList.remove('is-active');
        item.classList.add('is-active');
      }

      // Update theme styles
      handleThemeUpdate({
        '--theme-color-accent-primary': colorAccentPrimary,
        '--theme-color-accent-secondary': colorAccentSecondary,
        '--theme-color-background': colorBackground,
        '--theme-color-max-contrast': colorMaxContrast,
        '--theme-color-text': color,
      });

      // Update favicon
      changeFavicon(themeFavicon);

      // Save the value for next time page is visited.
      localStorage.setItem("userThemeColor", colorBackground);
      localStorage.setItem("userTextColor", color);
      localStorage.setItem("userColorAccentPrimary", colorAccentPrimary);
      localStorage.setItem("userColorAccentSecondary", colorAccentSecondary);
      localStorage.setItem("userColorMaxContrast", colorMaxContrast);
      localStorage.setItem("userThemeFavicon", themeFavicon);
      localStorage.setItem("userThemePreference", theme);

      // testing
      // console.log(
      //   color,
      //   colorAccentPrimary,
      //   colorAccentSecondary,
      //   colorBackground,
      //   colorMaxContrast,
      //   themeFavicon,
      //   theme        
      // );

    });
  });

  // Check for existing theme data in `localStorage` on page load
  // Adds `is-active` class to "appropriate" theme switcher button
  // This preference is not related to system (light/dark mode) settings
  // I address that later
  
  // If no previous user preference exist
  if (userThemePreference == null) {
    if (window.matchMedia && 
        window.matchMedia('(prefers-color-scheme: dark)').matches) {
      darkModeBtn.classList.add('is-active');
    }
    else {
      lightModeBtn.classList.add('is-active');
    }
  }
  // If user preference is "light mode"
  else if (userThemePreference == "light") {
    darkModeBtn.classList.remove('is-active');
    lightModeBtn.classList.add('is-active');
  }
  // Else user preference  is "dark mode"
  else {
    lightModeBtn.classList.remove('is-active');
    darkModeBtn.classList.add('is-active');
  }

  // Update theme colors when user changes system settings
  // Intended to work even if user has interacted with the theme  
  // switcher buttons and `localStorage` theme data exists.
  //
  // I had to use `addListener` here because `addEventListener` is not
  // currently supported in Safari (as of 08.29.2020)
  // See: https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList/addListener

  const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

  function switchThemeColors(e) {
    // dark mode
    if (e.matches) {
      lightModeBtn.classList.remove('is-active');
      darkModeBtn.click();
    } 
    // light mode
    else {
      darkModeBtn.classList.remove('is-active');
      lightModeBtn.click();
    }
  }
  darkModeQuery.addListener(switchThemeColors);
});
