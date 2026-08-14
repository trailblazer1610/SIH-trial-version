// Placeholder for the "View Photos" flow — swap this out once
// the Google Drive folder is connected (fetch images, render a real gallery).
const viewPhotosBtn = document.getElementById("viewPhotosBtn");
const photoModal = document.getElementById("photoModal");
const closePhotoModal = document.getElementById("closePhotoModal");

viewPhotosBtn.addEventListener("click", () => {
  photoModal.hidden = false;
});

closePhotoModal.addEventListener("click", () => {
  photoModal.hidden = true;
});

photoModal.addEventListener("click", (e) => {
  if (e.target === photoModal) photoModal.hidden = true;
});