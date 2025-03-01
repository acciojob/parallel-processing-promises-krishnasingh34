     const images = [ 
   { 
     url: "https://picsum.photos/id/237/200/300", 
     alt: "Image 1", 
   }, 
   { 
     url: "https://picsum.photos/id/238/200/300", 
     alt: "Image 2", 
   }, 
   { 
     url: "https://picsum.photos/id/239/200/300", 
     alt: "Image 3", 
   } 
  
 ]; 
  
 function downloadImages(images) { 
   const promises = images.map(image => { 
     return new Promise((resolve, reject) => { 
       const img = new Image(); 
       img.src = image.url; 
       img.alt = image.alt; 
       img.onload = () => { 
         resolve(img); 
       }; 
       img.onerror = () => { 
         reject(`Failed to load image's URL: ${image.url}`); 
       }; 
     }); 
   }); 
  
   Promise.all(promises) 
     .then(imgs => { 
       const output = document.getElementById('output'); 
                 output.innerHTML = null; 
       imgs.forEach(img => { 
         output.appendChild(img); 
       }); 
     }) 
     .catch(error => { 
       console.error(error); 
     }); 
 } 
  
 const button = document.getElementById('download-images-button'); 
 button.addEventListener('click', () => { 
   downloadImages(images); 
 });