const baseHorses = [
  {
    name: "Comet, 6",
    bio: "Trail lover. Enjoys apples and long gallops on the beach.",
    image:
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Daisy, 8",
    bio: "Dressage queen. Looking for someone with calm energy.",
    image:
      "https://images.unsplash.com/photo-1494253109108-2e30c049369b?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Thunder, 5",
    bio: "Fast, funny, and obsessed with carrots.",
    image:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Willow, 7",
    bio: "Quiet pasture vibes. Loves sunset trots.",
    image:
      "https://images.unsplash.com/photo-1553284966-19b8815c7817?auto=format&fit=crop&w=900&q=80",
  },
];

const horseNames = [
  "Maple", "Rusty", "Nova", "Blaze", "Juniper", "Skye", "Clover", "Biscuit", "Echo", "Pepper",
  "Cinnamon", "Mocha", "Sable", "Ivy", "Apollo", "River", "Star", "Bandit", "Hazel", "Milo",
];
const horseHobbies = [
  "loves moonlit canters", "never skips carrot hour", "collects fancy saddle blankets", "likes muddy trail adventures",
  "is a pasture philosopher", "practices dramatic whinnies", "prefers early morning rides", "hosts hay-bale picnics",
  "enjoys synchronized trotting", "is always first to the water trough",
];
const horseImages = [
  "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1494253109108-2e30c049369b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1553284966-19b8815c7817?auto=format&fit=crop&w=900&q=80",
];

const extraHorses = Array.from({ length: 100 }, (_, i) => {
  const age = (i % 12) + 3;
  const name = horseNames[i % horseNames.length];
  const hobby = horseHobbies[i % horseHobbies.length];

  return {
    name: `${name}, ${age}`,
    bio: `${name} ${hobby}. Looking for a swipe buddy #${i + 1}.`,
    image: horseImages[i % horseImages.length],
  };
});

const horses = [...baseHorses, ...extraHorses];

let index = 0;
let pointerStartX = null;

const SWIPE_THRESHOLD = 90;
const nameEl = document.getElementById("horse-name");
const bioEl = document.getElementById("horse-bio");
const imageEl = document.getElementById("horse-image");
const likeBtn = document.getElementById("like");
const nopeBtn = document.getElementById("nope");
const matchList = document.getElementById("match-list");
const cardEl = document.getElementById("horse-card");

function showHorse() {
  cardEl.classList.remove("swipe-left", "swipe-right");
  cardEl.style.removeProperty("--drag-x");

  if (index >= horses.length) {
    nameEl.textContent = "No more horses nearby";
    bioEl.textContent = "Refresh to start swiping again.";
    imageEl.src = "https://placehold.co/900x600/e2e8f0/475569?text=Stable+is+empty";
    likeBtn.disabled = true;
    nopeBtn.disabled = true;
    return;
  }

  const horse = horses[index];
  nameEl.textContent = horse.name;
  bioEl.textContent = horse.bio;
  imageEl.src = horse.image;
}

function swipe(liked) {
  if (index >= horses.length) return;

  cardEl.classList.add(liked ? "swipe-right" : "swipe-left");

  const horse = horses[index];
  if (liked) {
    const li = document.createElement("li");
    li.textContent = `It's a match with ${horse.name}!`;
    matchList.appendChild(li);
  }

  index += 1;
  setTimeout(showHorse, 140);
}

function handleSwipeDistance(deltaX) {
  if (Math.abs(deltaX) < SWIPE_THRESHOLD) {
    cardEl.style.removeProperty("--drag-x");
    return;
  }

  swipe(deltaX > 0);
}

cardEl.addEventListener("pointerdown", (event) => {
  if (index >= horses.length) return;
  pointerStartX = event.clientX;
  cardEl.setPointerCapture(event.pointerId);
});

cardEl.addEventListener("pointermove", (event) => {
  if (pointerStartX === null) return;
  const deltaX = event.clientX - pointerStartX;
  cardEl.style.setProperty("--drag-x", `${deltaX}px`);
});

cardEl.addEventListener("pointerup", (event) => {
  if (pointerStartX === null) return;
  const deltaX = event.clientX - pointerStartX;
  pointerStartX = null;
  handleSwipeDistance(deltaX);
});

cardEl.addEventListener("pointercancel", () => {
  pointerStartX = null;
  cardEl.style.removeProperty("--drag-x");
});

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") swipe(true);
  if (event.key === "ArrowLeft") swipe(false);
});

likeBtn.addEventListener("click", () => swipe(true));
nopeBtn.addEventListener("click", () => swipe(false));

showHorse();
