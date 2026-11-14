const weddingDate = new Date("2027-01-29T18:00:00+05:30").getTime();


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
// 2. LOCKED INVITATION + OPEN BUTTON
// ==========================================

const openInvite = document.getElementById("openInvite");
const invitation = document.getElementById("invitation");
const audio = document.getElementById("weddingMusic");
const musicButton = document.getElementById("musicButton");

if (openInvite) {
  openInvite.addEventListener("click", () => {

    // Unlock the invitation
    invitation.hidden = false;

    // Enable normal scrolling
    document.documentElement.classList.remove("invitation-locked");
    document.body.classList.remove("invitation-locked");

    // Start music from the visitor's tap
    if (audio) {
      audio.play()
        .then(() => {
          if (musicButton) {
            musicButton.textContent = "Ⅱ Pause music";
          }
        })
        .catch(error => {
          console.log("Music playback error:", error);
        });
    }

    // Prevent opening repeatedly
    openInvite.disabled = true;

    // Scroll to the invitation
    invitation.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

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
      text: "You are warmly invited to the wedding of Tanay Mondal & Arpita Gayen on 29 January 2027.",
      url: location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(location.href);
        alert("Invitation link copied. Share it on WhatsApp!");
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        prompt("Copy and share this invitation link:", location.href);
      }
    }

  });
}


// ==========================================
// 4. BOTTOM MUSIC PLAY / PAUSE
// ==========================================

if (musicButton && audio) {

  musicButton.addEventListener("click", async () => {

    if (audio.paused) {

      try {
        await audio.play();
        musicButton.textContent = "Ⅱ Pause music";
      } catch (error) {
        alert("Unable to play music. Please check music/wedding.mp3.");
        console.log("Music playback error:", error);
      }

    } else {

      audio.pause();
      musicButton.textContent = "♫ Play music";

    }

  });

}
