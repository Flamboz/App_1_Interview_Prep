import "./style.scss";

const env = import.meta.env.VITE_ENVIRONMENT;
const header = document.getElementById('env-header');
if (header) {
  header.textContent = env === 'prod' ? 'Hello from PROD' : 'Hello from DEV';
}


// Image rotation and analytics
function getRotationDeg(img) {
  const styles = window.getComputedStyle(img);
  const transform = styles.transform;

  if (transform === "none") return 0;

  const values = transform.match(/matrix\((.+)\)/)[1].split(", ");
  const a = parseFloat(values[0]);
  const b = parseFloat(values[1]);

  const angle = Math.atan2(b, a) * (180 / Math.PI);
  return angle;
}

function rotateImage(img) {
  const currentRotationAngle = getRotationDeg(img);
  img.style.transform = `rotate(${currentRotationAngle + 45}deg)`;
}

function sendAnalytics(img) {
  const imgId = img.src.split("/").pop().split("-")[0];

  fetch("http://localhost:5000/save-analytics", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      imageId: imgId,
      rotationDeg: getRotationDeg(img),
      timestamp: new Date().toISOString(),
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Analytics saved:", data);
    })
    .catch((error) => {
      console.error("Error saving analytics:", error);
    });
}

const images = document.querySelectorAll(".img");
images.forEach((img) => {
  img.addEventListener("click", () => {
    rotateImage(img);
    sendAnalytics(img);
  });
});

function lazyLoad() {
  const lazyImages = document.querySelectorAll(".lazy");
  const scrollTop = window.pageYOffset;
  const windowHeight = window.innerHeight;

  lazyImages.forEach((img) => {
    if (img.offsetTop < scrollTop + windowHeight + 300) {
      img.src = img.dataset.src;
      img.srcset = img.dataset.srcset;
      img.classList.remove("lazy");
    }
  });

  if (lazyImages.length <= 0) {
    document.removeEventListener("scroll", lazyLoad);
  }
}

document.addEventListener("scroll", lazyLoad);
