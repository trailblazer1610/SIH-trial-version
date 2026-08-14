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
    amenities: ["Wifi", "Gym", "Mess"],
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
    amenities: ["AC", "Laundry", "Security"],
    grad: "grad-4",
  },
];

// ---------- State ----------
let currentGender = "all";
let currentSort = "review";
let currentSearch = "";

// ---------- DOM ----------
const hostelGrid = document.getElementById("hostelGrid");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const genderGroup = document.getElementById("genderGroup");
const sortGroup = document.getElementById("sortGroup");

const bedIcon = `<svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M3 18v-6a2 2 0 012-2h14a2 2 0 012 2v6"/><path d="M3 18h18M5 10V6h6v4"/><path d="M3 22v-2M21 22v-2"/></svg>`;

function render() {
  let list = HOSTELS.filter((h) => {
    const matchesGender = currentGender === "all" || h.gender === currentGender;
    const matchesSearch =
      currentSearch.trim() === "" ||
      h.college.toLowerCase().includes(currentSearch.toLowerCase()) ||
      h.name.toLowerCase().includes(currentSearch.toLowerCase());
    return matchesGender && matchesSearch;
  });

  list.sort((a, b) => {
    if (currentSort === "review") return b.rating - a.rating;
    if (currentSort === "distance") return a.distanceKm - b.distanceKm;
    if (currentSort === "mess") return b.messRating - a.messRating;
    return 0;
  });

  resultCount.textContent = `${list.length} found`;
  emptyState.hidden = list.length !== 0;

  hostelGrid.innerHTML = list
    .map(
      (h) => `
    <div class="hostel-card">
      <div class="card-banner ${h.grad}">
        <span class="gender-badge">${h.gender === "male" ? "Male Hostel" : "Female Hostel"}</span>
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
genderGroup.addEventListener("click", (e) => {
  const btn = e.target.closest(".chip");
  if (!btn) return;
  genderGroup.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
  btn.classList.add("active");
  currentGender = btn.dataset.gender;
  render();
});

sortGroup.addEventListener("click", (e) => {
  const btn = e.target.closest(".sort-chip");
  if (!btn) return;
  sortGroup.querySelectorAll(".sort-chip").forEach((c) => c.classList.remove("active"));
  btn.classList.add("active");
  currentSort = btn.dataset.sort;
  render();
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

// placeholder for hostel detail page — hook this up later
hostelGrid.addEventListener("click", (e) => {
  const btn = e.target.closest(".view-btn");
  if (!btn) return;
  alert("Hostel detail page coming soon — id: " + btn.dataset.id);
});

render();