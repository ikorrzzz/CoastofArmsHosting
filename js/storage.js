const STORAGE_KEY = 'uploadedImages'

function getAllImages(){
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
}

function saveImage(name, url, size){
    try{
        const images = getAllImages()

        const newImage = {
            id: Date.now(),
            name: name,
            url: url,
            size: size,
            date: new Date().toISOString
        }
        
        images.push(newImage)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(images))
        return true;
    }
    catch(error){
    if(error.name === 'QuotaExceededError'){
        alert('Недостаточно места. Удалите старые изображения')
    }
    return false
        
    }

}

function deleteImage(id){
    const images = getAllImages()
    const filered = images.filter(img => img.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filered));
}


function fileToBase64(file){
    return new Promise((resolve, reject) =>{
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(file)
    })
}

