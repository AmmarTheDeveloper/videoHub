const deleteBtns = document.querySelectorAll( ".delete-btn" );
deleteBtns.forEach( ( btn ) => {
    btn.onclick = deleteFile;
} );

async function deleteFile () {
    let file = this.dataset.file;
    let isSure = confirm(
        `Are you sure you want to delete this file \n filename :  ${ file } .`
    );

    if ( !isSure ) return;

    try {
        const request = await fetch( `/api/delete-video/${ file }`, {
            method: "delete",
        } );
        const response = await request.json();
        console.log( response );
        if ( response.status == "success" ) {
            location.reload();
            return alert( "File deleted successfully" );
        } else {
            return alert( "Something went wrong." );
        }
    } catch ( error ) {
        alert( "Something went wrong." );
    }
}