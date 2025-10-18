let imageData = [];

function getRotationDeg(img) {
  const styles = window.getComputedStyle(img);
  const transform = styles.transform;

  if (transform === "none") return 0;

  const values = transform.match(/matrix\((.+)\)/)[1].split(", ");
  const a = parseFloat(values[0]);
  const b = parseFloat(values[1]);

  return Math.atan2(b, a) * (180 / Math.PI);
}

function rotateImage(img) {
  const currentRotationAngle = getRotationDeg(img);
  img.style.transform = `rotate(${currentRotationAngle + 45}deg)`;
}

function saveAnalytics(img) {
  const imgId = img.src.split("/").pop().split("-")[0];

  imageData.push({
    imageId: imgId,
    rotationDeg: getRotationDeg(img),
    timestamp: new Date().toISOString(),
  });

  return imageData;
}

function sendAnalytics(analyticsData) {
  if (!analyticsData.length) return;

  fetch("http://localhost:5000/save-analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(analyticsData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Analytics saved:", data);
      imageData = [];
    })
    .catch((error) => console.error("Error saving analytics:", error));
}

function setupImageAnalytics() {
  const images = document.querySelectorAll(".img");

  images.forEach((img) => {
    img.addEventListener("click", () => {
      rotateImage(img);
      saveAnalytics(img);
    });
  });

  window.addEventListener('beforeunload', () => sendAnalytics(imageData));

  setInterval(() => sendAnalytics(imageData), 10 * 1000);
}

export { setupImageAnalytics };