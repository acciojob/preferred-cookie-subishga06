// Helper functions to set and get cookies
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = `${name}=${value};${expires};path=/`;
}

function getCookie(name) {
  const cname = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let c of ca) {
    c = c.trim();
    if (c.indexOf(cname) === 0) {
      return c.substring(cname.length, c.length);
    }
  }
  return null;
}

// Apply font preferences from cookies (if exist)
function applyPreferences() {
  const fontSize = getCookie("fontsize");
  const fontColor = getCookie("fontcolor");

  if (fontSize) {
    document.documentElement.style.setProperty("--fontsize", fontSize + "px");
    document.getElementById("fontsize").value = fontSize;
  }

  if (fontColor) {
    document.documentElement.style.setProperty("--fontcolor", fontColor);
    document.getElementById("fontcolor").value = fontColor;
  }
}

// Save preferences on form submit
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const fontSize = document.getElementById("fontsize").value;
  const fontColor = document.getElementById("fontcolor").value;

  // Update CSS variables
  document.documentElement.style.setProperty("--fontsize", fontSize + "px");
  document.documentElement.style.setProperty("--fontcolor", fontColor);

  // Save in cookies for 30 days
  setCookie("fontsize", fontSize, 30);
  setCookie("fontcolor", fontColor, 30);

  alert("Preferences saved!");
});

// Apply preferences on page load
window.addEventListener("load", applyPreferences);

