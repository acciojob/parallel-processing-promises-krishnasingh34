//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const errorDiv = document.getElementById("error");
const loading = document.getElementById("loading");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];
btn.addEventListener("click", downloadImages)
function downloadImage(link){
        return new Promise((resolve, reject)=>{
            if(link.startsWith('https')){
                setTimeout(()=>{
                    resolve({
                        image:link,
                        message: 'Image downloaded successfully'
                    })
                },3000)
            }
            else{
                setTimeout(()=>{
                    reject(`Image could not be downloaded ${link}`)
                },3000)
            }
        })
       }
function downloadImages() {
  loading.style.display = "block";
  output.innerHTML = "";
  errorDiv.innerHTML = "";
       let arr=[]
       for(let img of images){
        arr.push(downloadImage(img.url))
       }
       Promise.all(arr)
       .then(res =>{
        for(let t of res){
            let img = document.createElement('img')
            img.src = t.image
            output.append(img)
        }
       })
       .catch(err =>{
        errorDiv.innerText = err;
       })
	  .finally(() => {
      loading.style.display = "none"
    });