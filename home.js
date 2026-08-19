// ---------- Dummy hostel data (Greater Noida colleges) ----------
// Replace this with a real API/database call later.
const HOSTELS = [
  {
    id: 1,
    name: "Sunrise Residency",
    college: "GL Bajaj Institute of Technology & Management",
    gender: "male",
    price: 8000,
    rating: 4.3,
    distanceKm: 0.5,
    messRating: 4.0,
    gym: false,
    noRestriction: false,
    amenities: ["Wifi", "Mess", "Laundry"],
    grad: "grad-1",
  },
  {
    id: 2,
    name: "Green Valley PG",
    college: "KCC Institute of Technology & Management",
    gender: "female",
    price: 9500,
    rating: 4.6,
    distanceKm: 0.8,
    messRating: 4.4,
    gym: false,
    noRestriction: false,
    amenities: ["AC", "Mess", "CCTV"],
    grad: "grad-2",
  },
  {
    id: 3,
    name: "Campus View Hostel",
    college: "Noida Institute of Engineering & Technology (NIET)",
    gender: "male",
    price: 7200,
    rating: 4.1,
    distanceKm: 1.2,
    messRating: 3.8,
    gym: true,
    noRestriction: true,
    amenities: ["Wifi", "Gym", "Mess", "No Entry Restriction"],
    grad: "grad-3",
  },
  {
    id: 4,
    name: "Elite Girls PG",
    college: "Galgotias University",
    gender: "female",
    price: 10000,
    rating: 4.7,
    distanceKm: 0.3,
    messRating: 4.5,
    gym: false,
    noRestriction: false,
    amenities: ["AC", "Laundry", "Security"],
    grad: "grad-4",
  },
  {
    id: 5,
    name: "Maple Boys Hostel",
    college: "Shiv Nadar University",
    gender: "male",
    price: 6800,
    rating: 4.0,
    distanceKm: 1.5,
    messRating: 3.9,
    gym: true,
    noRestriction: true,
    amenities: ["Wifi", "Gym", "No Entry Restriction"],
    grad: "grad-3",
  },
  {
    id: 6,
    name: "Rose Petal Girls PG",
    college: "Amity University",
    gender: "female",
    price: 8800,
    rating: 4.5,
    distanceKm: 0.6,
    messRating: 4.2,
    gym: true,
    noRestriction: false,
    amenities: ["AC", "Gym", "Mess", "CCTV"],
    grad: "grad-2",
  },
];

// ---------- State ----------
let girlsMode = false;
let currentSort = "review";
let currentSearch = "";
const filters = {
  gym: false,
  noRestriction: false,
  maxFee: 15000,
};

// ---------- DOM ----------
const hostelGrid = document.getElementById("hostelGrid");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const girlsModeToggle = document.getElementById("girlsModeToggle");
const dropdownToggle = document.getElementById("dropdownToggle");
const dropdownPanel = document.getElementById("dropdownPanel");
const gymFilterEl = document.getElementById("gymFilter");
const noRestrictionFilterEl = document.getElementById("noRestrictionFilter");
const feeRangeEl = document.getElementById("feeRange");
const feeValueEl = document.getElementById("feeValue");
const resetFiltersBtn = document.getElementById("resetFilters");
const applyFiltersBtn = document.getElementById("applyFilters");

const bedIcon = `<svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M3 18v-6a2 2 0 012-2h14a2 2 0 012 2v6"/><path d="M3 18h18M5 10V6h6v4"/><path d="M3 22v-2M21 22v-2"/></svg>`;

function badgeText(h) {
  if (h.gender === "male") return "Male Hostel";
  return girlsMode ? "💗 Girls Hostel" : "Female Hostel";
}

function render() {
  let list = HOSTELS.filter((h) => {
    const matchesGender = girlsMode ? h.gender === "female" : true;
    const matchesGym = !filters.gym || h.gym;
    const matchesRestriction = !filters.noRestriction || h.noRestriction;
    const matchesFee = h.price <= filters.maxFee;
    const matchesSearch =
      currentSearch.trim() === "" ||
      h.college.toLowerCase().includes(currentSearch.toLowerCase()) ||
      h.name.toLowerCase().includes(currentSearch.toLowerCase());
    return matchesGender && matchesGym && matchesRestriction && matchesFee && matchesSearch;
  });

  list.sort((a, b) => {
    if (currentSort === "review") return b.rating - a.rating;
    if (currentSort === "distance") return a.distanceKm - b.distanceKm;
    if (currentSort === "feeLow") return a.price - b.price;
    if (currentSort === "feeHigh") return b.price - a.price;
    return 0;
  });

  resultCount.textContent = `${list.length} found`;
  emptyState.hidden = list.length !== 0;

  hostelGrid.innerHTML = list
    .map(
      (h) => `
    <div class="hostel-card">
      <div class="card-banner ${h.grad}">
        <span class="gender-badge">${badgeText(h)}</span>
        ${bedIcon}
      </div>
      <div class="card-body">
        <div class="card-top">
          <h3>${h.name}</h3>
          <span class="rating">★ ${h.rating}</span>
        </div>
        <p class="near">Near ${h.college}</p>
        <div class="tags">
          ${h.amenities.map((a) => `<span class="tag">${a}</span>`).join("")}
        </div>
        <div class="card-foot">
          <span class="price">₹${h.price.toLocaleString("en-IN")}<small>/mo</small></span>
          <span class="distance">${h.distanceKm} km away</span>
        </div>
        <button class="view-btn" data-id="${h.id}">View details</button>
      </div>
    </div>
  `
    )
    .join("");
}

// ---------- Events ----------

// Girls Portal toggle — flips theme + restricts results to female hostels
girlsModeToggle.addEventListener("change", (e) => {
  girlsMode = e.target.checked;
  document.body.classList.toggle("girls-mode", girlsMode);
  render();
});

// Sort & Filter dropdown open/close
dropdownToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  dropdownPanel.hidden = !dropdownPanel.hidden;
});
document.addEventListener("click", (e) => {
  if (!dropdownPanel.hidden && !e.target.closest("#filterDropdown")) {
    dropdownPanel.hidden = true;
  }
});

// Sort options (radio group)
document.querySelectorAll('input[name="sortOpt"]').forEach((radio) => {
  radio.addEventListener("change", (e) => {
    currentSort = e.target.value;
    render();
  });
});

// Amenity filters
gymFilterEl.addEventListener("change", (e) => {
  filters.gym = e.target.checked;
  render();
});
noRestrictionFilterEl.addEventListener("change", (e) => {
  filters.noRestriction = e.target.checked;
  render();
});

// Max fee range slider
feeRangeEl.addEventListener("input", (e) => {
  filters.maxFee = Number(e.target.value);
  feeValueEl.textContent = `₹${filters.maxFee.toLocaleString("en-IN")}`;
  render();
});

// Reset filters back to defaults
resetFiltersBtn.addEventListener("click", () => {
  currentSort = "review";
  filters.gym = false;
  filters.noRestriction = false;
  filters.maxFee = 15000;

  document.querySelector('input[name="sortOpt"][value="review"]').checked = true;
  gymFilterEl.checked = false;
  noRestrictionFilterEl.checked = false;
  feeRangeEl.value = 15000;
  feeValueEl.textContent = "₹15,000";

  render();
});

// Apply just closes the panel — filters already live-apply as you change them
applyFiltersBtn.addEventListener("click", () => {
  dropdownPanel.hidden = true;
});

searchBtn.addEventListener("click", () => {
  currentSearch = searchInput.value;
  render();
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    currentSearch = searchInput.value;
    render();
  }
});

// live-filter as you type too
searchInput.addEventListener("input", () => {
  currentSearch = searchInput.value;
  render();
});

// Elite Girls PG (id 4) has a live detail/review/room-availability trial.
// Other cards will get the same treatment once the backend is connected.
hostelGrid.addEventListener("click", (e) => {
  const btn = e.target.closest(".view-btn");
  if (!btn) return;
  if (btn.dataset.id === "4") {
    window.location.href = "hostel detail.html";
  } else {
    alert("Full detail page coming soon for this hostel — try Elite Girls PG for a live preview!");
  }
});

render();