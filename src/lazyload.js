export function setupLazyLoad() {
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

    if (document.querySelectorAll(".lazy").length === 0) {
      document.removeEventListener("scroll", lazyLoad);
    }
  }

  document.addEventListener("scroll", lazyLoad);
  lazyLoad();
}