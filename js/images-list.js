//Получим иконку для файла

function getFileIcon(filename){
    const ext = filename.split('.').pop().toLowerCase()
    const icons = {'jpg': '📷', 'png': '📷', 'jpeg': '📷', 'gif': '🎥'}
    return icons[ext] || '🗂️'
}


//Создание эдемент изображения

function createImageItem(image){
    const item = document.createElement('div')
    item.className = 'image-item'
    item.dataset.id = image.id

    const shotUrl = image.url.substring(0, 50) + '...'
    const icon = getFileIcon(image.name)

    item.innerHTML = `
    
    <div class = 'image-name'>
        <div class = 'image-icon'>${icon}</div>
        <span title = "${image.name}">${image.name}</span>
    </div>

    <div class = "image-url-wrapper">
    <a href = "${image.url}" class = "image-url" target = "_blank" title = "${image.url}">${shotUrl}</a>
    </div>

    <div class = "image-delete">
    <button class = 'delete-btn' onclick ="deleteImageById(${image.id})">
    🗑️
    </button>
    </div>

    `
    return item
 }

 function showImages(){
    const images = getAllImages()
    const list = document.getElementById('images-list')
    const empty = document.getElementById('empty-state')

    if(images.length === 0){
        list.innerHTML = '';
        empty.style.display = 'block'
        return
    }
    empty.style.display = 'none'

    list.innerHTML = ''
    images.forEach(image => {
        list.appendChild(createImageItem(image))
    });
 }



function deleteImageById(id){
    const list = document.getElementById('images-list')
    deleteImage(id)
    const item = document.querySelector(`[data-id="${id}"]`)
    const empty = document.getElementById('empty-state')

    console.log(item)
    if(item){
        item.style.display = 'none'
       if(getAllImages().length === 0){
         empty.style.display = 'block'
       }

    }
}



 document.addEventListener('DOMContentLoaded', showImages)