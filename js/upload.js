const MAX_SIZE = 5 * 1024 * 1024 //5Mb
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif']

let currentUrl = '';

function showStatus(message, type){
    const status = document.getElementById('upload-status')
    if(!status) return;

    status.textContent = message
    status.className = `upload-status ${type}`
    status.style.display = 'block'

    if(type === 'success'){
        setTimeout(()=>{status.style.display = 'none'}, 5000)
    }
}


function validateFile(file){
    if(!ALLOWED_TYPES.includes(file.type)){
        showStatus('Please use JPG, PNG or GIF format', 'error')
        return false;
    }
     if(file.size > MAX_SIZE){
        showStatus('Photo is too large! Maximum: 5 MB', 'error')
        return false;
     }

     return true;
}


async function handleFile(file){
    if(!file || !validateFile(file)) return;

    showStatus('Processing your photo...', 'info')

    try{
        const base64 = await fileToBase64(file)
        const success = saveImage(file.name, base64, file.size)

        if(success) {
            showStatus('Photo uploaded successfully!', 'success')
        

        const input = document.getElementById('current-upload-input')
        if(input){
            input.value = base64.substring(0, 50) + '...'
            currentUrl = base64

        }
        document.getElementById('fileInput').value = ''
    }else{
        showStatus('Something went wrong. Try again', 'error')
    }
    }
    catch(error){
        showStatus('Upload error: ' + error.message, 'error')
        
    }
}

async function copyUrl(){
    if(!currentUrl) return;

    try{
        await navigator.clipboard.writeText(currentUrl)
        showStatus('Link copied!', 'success')

        const btn = document.getElementById('copy-button')
        const oldText = btn.textContent
        btn.textContent = '✓ Copied' 
        setTimeout(()=> btn.textContent = oldText, 2000)
    } catch{ 
        showStatus('Could not copy link', 'error')
    }
}

// Остальной код остается без изменений
document.addEventListener('DOMContentLoaded', () => {
    const dropArea = document.getElementById('drop-area')
    const fileInput = document.getElementById('fileInput')
    const browseBtn = document.querySelector('.send_file button')
    const copyBtn = document.getElementById('copy-button')

    dropArea.addEventListener('dragover', (e)=>{
        e.preventDefault();
        dropArea.classList.add('dragover')
    })

    dropArea.addEventListener('dragleave', (e)=>{
        dropArea.classList.remove('dragover')
    })

    dropArea.addEventListener('drop', (e)=>{
        e.preventDefault()
        dropArea.classList.add('dragover')
        if (e.dataTransfer.files[0]){
            handleFile(e.dataTransfer.files[0])
        }
    })

    fileInput.addEventListener('change', (e) => {
        if(e.target.files[0]){
            handleFile(e.target.files[0])
        }
    })

    browseBtn.addEventListener('click', (e) =>{
        e.preventDefault();
        e.stopPropagation();
        dropArea.classList.remove('dragover')
        fileInput.click()
    })

    if (copyBtn) {
        copyBtn.addEventListener('click', copyUrl)
    }
})