const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const errorDiv = document.getElementById("error");
const loading = document.getElementById("loading");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(link) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = link;

    img.onload = () => resolve({ image: link, message: "Image loaded successfully" });
    img.onerror = () => reject(`Failed to load image: ${link}`);
  });
}

function downloadImages() {
  loading.style.display = "block";
  output.innerHTML = "";
  errorDiv.innerHTML = "";

  const downloadPromises = images.map((img) => downloadImage(img.url));

  Promise.all(downloadPromises)
    .then((res) => {
      res.forEach((t) => {
        const img = document.createElement("img");
        img.src = t.image;
        output.appendChild(img);
      });
    })
    .catch((err) => {
      errorDiv.innerText = err;
    })
    .finally(() => {
      loading.style.display = "none";
    });
}

btn.addEventListener("click", downloadImages);
