
const weddingDate = new Date("2027-02-14T18:00:00+05:30").getTime();

// ==========================================
// 1. WEDDING COUNTDOWN
// ==========================================

function updateCountdown() {
  const now = Date.now();
  const distance = weddingDate - now;

  const ids = ["days", "hours", "minutes", "seconds"];

  if (distance <= 0) {
    ids.forEach(id => {
      const element = document.getElementById(id);
      if (element) element.textContent = "0";
    });
    return;
  }

  const values = [
    Math.floor(distance / 86400000),
    Math.floor((distance % 86400000) / 3600000),
    Math.floor((distance % 3600000) / 60000),
    Math.floor((distance % 60000) / 1000)
  ];

  ids.forEach((id, i) => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = String(values[i]).padStart(2, "0");
    }
  });
}

updateCountdown();
setInterval(updateCountdown, 1000);


// ==========================================
// 2. OPEN INVITATION + PLAY MUSIC
// ==========================================

const openInvite = document.getElementById("openInvite");

if (openInvite) {
  openInvite.addEventListener("click", () => {

    const audio = document.getElementById("weddingMusic");
    const musicButton = document.getElementById("musicButton");

    // Start music immediately after visitor taps
    if (audio) {
      audio.play()
        .then(() => {
          if (musicButton) {
            musicButton.textContent = "Ⅱ Pause music";
          }
        })
        .catch(error => {
          console.log("Music playback error:", error);
          if (musicButton) {
            musicButton.textContent = "♫ Play music";
          }
        });
    }

    // Scroll to invitation section
    const invitation = document.getElementById("invitation");

    if (invitation) {
      invitation.scrollIntoView({
        behavior: "smooth"
      });
    }

  });
}


// ==========================================
// 3. SHARE INVITATION
// ==========================================

const shareButton = document.getElementById("shareButton");

if (shareButton) {
  shareButton.addEventListener("click", async () => {

    const shareData = {
      title: "Tanay & Arpita — Wedding Invitation",
      text: "You are warmly invited to the wedding of Tanay Mondal & Arpita Gayen on 14 February 2027.",
      url: location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(location.href);
        alert("Invitation link copied. Share it on WhatsApp!");
      }
    } catch (e) {
      if (e.name !== "AbortError") {
        prompt("Copy and share this invitation link:", location.href);
      }
    }

  });
}


// ==========================================
// 4. BOTTOM MUSIC PLAY / PAUSE BUTTON
// ==========================================

const audio = document.getElementById("weddingMusic");
const musicButton = document.getElementById("musicButton");

if (musicButton && audio) {

  musicButton.addEventListener("click", async () => {

    if (audio.paused) {

      try {
        await audio.play();
        musicButton.textContent = "Ⅱ Pause music";
      } catch (e) {
        alert("Unable to play music. Please check music/wedding.mp3.");
        console.log("Music playback error:", e);
      }

    } else {

      audio.pause();
      musicButton.textContent = "♫ Play music";

    }

  });

}
