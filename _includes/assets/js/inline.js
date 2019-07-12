if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}

// Yank theme bgColor from localStorage and use it.
document.documentElement.style.setProperty(
  "--primary-theme-background-color", localStorage.getItem("userThemeColor")
);

// Yank theme textColor from localStorage and use it.
document.documentElement.style.setProperty(
  "--primary-theme-text-color", localStorage.getItem("userTextColor")
);

document.addEventListener("DOMContentLoaded", function() {

  const themeSwitchers = document.querySelectorAll('.js-theme-switcher');

  const handleThemeUpdate = (cssVars) => {
    const root = document.querySelector(':root');
    const keys = Object.keys(cssVars);
    keys.forEach(key => {
      root.style.setProperty(key, cssVars[key]);
    });
  }

  themeSwitchers.forEach((item) => {
    item.addEventListener('click', (e) => {
      const bgColor = e.target.getAttribute('data-bg-color')
      const color = e.target.getAttribute('data-color')
      handleThemeUpdate({
        '--primary-theme-background-color': bgColor,
        '--primary-theme-text-color': color
      });
      console.log(bgColor, color);

      // Save the value for next time page is visited.
      localStorage.setItem("userThemeColor", bgColor);
      localStorage.setItem("userTextColor", color);
    });
  });

});
