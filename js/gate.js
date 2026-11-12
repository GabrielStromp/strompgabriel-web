/* =========================================================
   Jednoduchý zámok na heslo pre skola.html.
   DÔLEŽITÉ: GitHub Pages je len statický hosting, takže toto
   NIE JE skutočné zabezpečenie — niekto zručný vie obsah nájsť
   priamo v HTML zdrojovom kóde. Slúži len na to, aby náhodný
   návštevník neklikol na obsah omylom.

   AKO SI ZMENIŤ HESLO:
   1. Vymysli si nové heslo.
   2. V prehliadači otvor konzolu (F12 → Console) a napíš:
        crypto.subtle.digest("SHA-256", new TextEncoder().encode("TVOJE_HESLO"))
          .then(b => console.log([...new Uint8Array(b)]
            .map(x => x.toString(16).padStart(2,"0")).join("")));
   3. Skopíruj vypísaný reťazec (64 znakov) a nahraď ním hodnotu
      PASSWORD_HASH nižšie.

   Predvolené heslo je: skola2026   (zmeň si ho!)
   ========================================================= */

var PASSWORD_HASH = "dc445ede81f6c0ee052f2a1a148b5da7d415aaefec225cfb43d49df59c6dccdd";
var STORAGE_KEY = "skola-unlocked";

async function sha256Hex(text) {
  var buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf))
    .map(function (b) { return b.toString(16).padStart(2, "0"); })
    .join("");
}

function showProtectedContent() {
  document.getElementById("gate-wrapper").classList.add("hidden");
  document.getElementById("protectedContent").classList.add("visible");
}

function showGate() {
  document.getElementById("gate-wrapper").classList.remove("hidden");
  document.getElementById("protectedContent").classList.remove("visible");
}

// Ak už bolo heslo v tejto relácii overené, odomkni rovno.
if (sessionStorage.getItem(STORAGE_KEY) === "yes") {
  showProtectedContent();
}

var form = document.getElementById("gateForm");
var errorEl = document.getElementById("gateError");

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!window.crypto || !window.crypto.subtle) {
      errorEl.textContent = "Overenie hesla funguje len cez HTTPS (napr. priamo na strompgabriel.sk).";
      return;
    }

    var value = document.getElementById("gatePassword").value;
    var hash = await sha256Hex(value);

    if (hash === PASSWORD_HASH) {
      sessionStorage.setItem(STORAGE_KEY, "yes");
      errorEl.textContent = "";
      showProtectedContent();
    } else {
      errorEl.textContent = "Nesprávne heslo, skús to znova.";
    }
  });
}

var lockBtn = document.getElementById("lockAgain");
if (lockBtn) {
  lockBtn.addEventListener("click", function () {
    sessionStorage.removeItem(STORAGE_KEY);
    showGate();
  });
}
