// ---------- Dummy floor-wise room data (Elite Girls PG) ----------
// Replace this with a real API/database call later.
const FLOORS = [
  {
    label: "Ground Floor",
    rooms: [
      { no: "G1", type: "AC", sharing: 2, price: 12000, available: true },
      { no: "G2", type: "AC", sharing: 2, price: 12000, available: false },
      { no: "G3", type: "Non-AC", sharing: 3, price: 8000, available: true },
      { no: "G4", type: "Non-AC", sharing: 3, price: 8000, available: true },
      { no: "G5", type: "Non-AC", sharing: 2, price: 9500, available: false },
      { no: "G6", type: "AC", sharing: 3, price: 10500, available: true },
    ],
  },
  {
    label: "1st Floor",
    rooms: [
      { no: "101", type: "AC", sharing: 2, price: 12000, available: false },
      { no: "102", type: "AC", sharing: 3, price: 10500, available: true },
      { no: "103", type: "Non-AC", sharing: 2, price: 9500, available: true },
      { no: "104", type: "Non-AC", sharing: 3, price: 8000, available: true },
      { no: "105", type: "Non-AC", sharing: 3, price: 8000, available: false },
      { no: "106", type: "AC", sharing: 2, price: 12000, available: true },
    ],
  },
  {
    label: "2nd Floor",
    rooms: [
      { no: "201", type: "AC", sharing: 2, price: 12000, available: true },
      { no: "202", type: "AC", sharing: 3, price: 10500, available: false },
      { no: "203", type: "Non-AC", sharing: 2, price: 9500, available: false },
      { no: "204", type: "Non-AC", sharing: 3, price: 8000, available: true },
      { no: "205", type: "Non-AC", sharing: 3, price: 8000, available: true },
      { no: "206", type: "AC", sharing: 2, price: 12000, available: true },
    ],
  },
  {
    label: "3rd Floor",
    rooms: [
      { no: "301", type: "Non-AC", sharing: 3, price: 8000, available: true },
      { no: "302", type: "Non-AC", sharing: 3, price: 8000, available: true },
      { no: "303", type: "AC", sharing: 2, price: 12000, available: false },
      { no: "304", type: "AC", sharing: 3, price: 10500, available: true },
    ],
  },
  {
    label: "4th Floor",
    rooms: [
      { no: "401", type: "Non-AC", sharing: 2, price: 9500, available: true },
      { no: "402", type: "AC", sharing: 2, price: 12000, available: true },
      { no: "403", type: "Non-AC", sharing: 3, price: 8000, available: false },
    ],
  },
];

const floorsContainer = document.getElementById("floors");
const roomModal = document.getElementById("roomModal");
const closeRoomModal = document.getElementById("closeRoomModal");
const modalRoomNo = document.getElementById("modalRoomNo");
const modalStatus = document.getElementById("modalStatus");
const modalDetails = document.getElementById("modalDetails");
const modalCta = document.getElementById("modalCta");

function renderFloors() {
  floorsContainer.innerHTML = FLOORS.map((floor) => {
    const availableCount = floor.rooms.filter((r) => r.available).length;
    return `
      <div class="floor-block">
        <p class="floor-title">${floor.label} <span class="count">— ${availableCount} of ${floor.rooms.length} available</span></p>
        <div class="room-row">
          ${floor.rooms
            .map(
              (r) => `
            <button class="room-box ${r.available ? "available" : "full"}" data-no="${r.no}">
              ${r.no}
              <span class="tiny">${r.available ? "Open" : "Full"}</span>
            </button>
          `
            )
            .join("")}
        </div>
      </div>
    `;
  }).join("");
}

function openModal(room) {
  modalRoomNo.textContent = "Room " + room.no;
  modalStatus.textContent = room.available ? "Available" : "Currently full";
  modalDetails.innerHTML = `
    <div class="row"><span>Type</span><span>${room.type}</span></div>
    <div class="row"><span>Sharing</span><span>${room.sharing} seater</span></div>
    <div class="row"><span>Rent</span><span>₹${room.price.toLocaleString("en-IN")}/mo</span></div>
    <div class="row"><span>Status</span><span>${room.available ? "Available" : "Full"}</span></div>
  `;
  modalCta.disabled = !room.available;
  modalCta.textContent = room.available ? "Enquire about this room" : "Room currently full";
  roomModal.hidden = false;
}

floorsContainer.addEventListener("click", (e) => {
  const btn = e.target.closest(".room-box");
  if (!btn) return;
  const roomNo = btn.dataset.no;
  const room = FLOORS.flatMap((f) => f.rooms).find((r) => r.no === roomNo);
  if (room) openModal(room);
});

closeRoomModal.addEventListener("click", () => (roomModal.hidden = true));
roomModal.addEventListener("click", (e) => {
  if (e.target === roomModal) roomModal.hidden = true;
});

modalCta.addEventListener("click", () => {
  if (!modalCta.disabled) alert("Enquiry sent! (placeholder — connect this to your backend later)");
});

renderFloors();