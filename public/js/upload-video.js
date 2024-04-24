const form = document.querySelector( 'form' )
const error = document.querySelector( '.error-alert' )
const errorSpan = document.querySelector( '.error-span' )
const message = document.querySelector( '.success-alert' )
const messageSpan = document.querySelector( '.success-span' )

const fileInput = document.querySelector( "input[name=video]" )
const progressContainer = document.querySelector( '.progress-bar-container' )
const progressBar = document.querySelector( '.progress-bar-container .progress-bar' )
const percentSpan = document.querySelector( '.progress-bar-container .progress-track' )
const cancel = document.querySelector( '.progress-bar-container .cancel-btn' )
const fileNameContainer = document.querySelector( '.progress-bar-container .file-name' )
const submitBtn = document.querySelector( 'form button[type=submit]' )

form.onsubmit = async ( e ) => {
    e.preventDefault()


    if ( fileInput.files[ 0 ].type != 'video/mp4' ) {
        message.style.display = 'none'
        error.style.display = 'block'
        errorSpan.innerText = 'Upload video'
        return

    }

    const formData = new FormData( form )

    const xhr = new XMLHttpRequest()

    xhr.open( 'post', '/api/upload-video', true )

    xhr.responseType = 'json'

    fileNameContainer.innerText = fileInput.files[ 0 ].name

    submitBtn.style.pointerEvents = 'none'
    cancel.style.pointerEvents = 'auto'

    xhr.upload.addEventListener( "progress", ( e ) => {

        if ( e.lengthComputable ) {

            // progressContainer.classList.remove( 'active' )
            const percentage = ( e.loaded / e.total ) * 100

            progressContainer.style.display = 'block'
            progressBar.style.width = percentage + '%'
            percentSpan.innerText = percentage.toFixed( 2 ) + '%'

        }

    } )

    xhr.onreadystatechange = () => {
        if ( xhr.readyState == 4 && xhr.status == 200 ) {

            let response = xhr.response
            if ( response.status == 'success' ) {

                error.style.display = 'none'
                errorSpan.innerHTML = ''
                message.style.display = 'block'
                messageSpan.innerHTML = 'Link : <span class=link>' + response.link + '</span>'
                progressContainer.style.display = 'none'
                form.reset()
                submitBtn.style.pointerEvents = 'auto'
                cancel.style.pointerEvents = 'none'

            }

        }
    }

    xhr.onerror = () => {


        message.style.display = 'none'
        error.style.display = 'block'
        errorSpan.innerHTML = "Please Try again"
        form.reset()
        submitBtn.style.pointerEvents = 'auto'
        cancel.style.pointerEvents = 'none'
        progressContainer.style.display = 'none'

    }

    xhr.onabort = () => {

        message.style.display = 'none'
        error.style.display = 'block'
        errorSpan.innerHTML = "upload has been cancelled"
        form.reset()
        submitBtn.style.pointerEvents = 'auto'
        cancel.style.pointerEvents = 'none'
        progressContainer.style.display = 'none'

    }

    xhr.send( formData )



    cancel.onclick = () => {

        xhr.abort()

    }

}

message.onclick = () => {

    navigator.clipboard.writeText( message.querySelector( '.link' ).innerText )
    alert( 'copied' );

}

