const image = document.getElementById('image')
let index = 0
let images = []


function changeImage(){
    if(images.length === 0) return;
    image.style.opacity = 0;
    setTimeout(()=>{
        image.src = images[index]
        image.style.opacity = 1
        index = (index + 1) % images.length
    }, 800)
}

function startSlideShow(){
    if(images.length === 0){
        return
    }
    changeImage();
    setInterval(changeImage, 5000)

}


function loadImages(){
    fetch('images.json')
    .then(response => response.json())
    .then(data => {
        images = data
        startSlideShow();
    })
    .catch(()=> startSlideShow())
}

loadImages()