const horses = [
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

let index = 0;

const nameEl = document.getElementById("horse-name");
const bioEl = document.getElementById("horse-bio");
const imageEl = document.getElementById("horse-image");
const likeBtn = document.getElementById("like");
const nopeBtn = document.getElementById("nope");
const matchList = document.getElementById("match-list");

function showHorse() {
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

  const horse = horses[index];
  if (liked) {
    const li = document.createElement("li");
    li.textContent = `It's a match with ${horse.name}!`;
    matchList.appendChild(li);
  }

  index += 1;
  showHorse();
}

likeBtn.addEventListener("click", () => swipe(true));
nopeBtn.addEventListener("click", () => swipe(false));

showHorse();
