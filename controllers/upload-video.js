const path = require( 'path' )
const fs = require( 'fs' )

const renderUploadVideoPage = ( req, res ) => {
    res.render( "upload" );
}

function uploadVideo ( req, res ) {

    if ( !req.file ) {

        res.send( { status: 'error' } )
        return
    }

    const videoName = req.file.filename
    const link = `https://${ req.hostname }:9090/uploads/${ videoName }`

    res.status( 200 ).json( { status: 'success', link } )

}

async function AllVideos ( req, res ) {

    try {
        const files = await fs.promises.readdir( "public/uploads" );
        res.render( "allVideos", { files } );

    } catch ( error ) {
        res.status( 500 ).json( { status: "error", message: "Internal server error" } )
        console.log( "error occured", error );
    }

}

const deleteVideo = async ( req, res ) => {
    try {
        let file = req.params.id
        await fs.promises.unlink( `public/uploads/${ file }` )
        res.status( 200 ).json( { status: "success" } )
    } catch ( error ) {
        console.log( error )
        res.status( 500 ).json( { status: "error" } )
    }

}

module.exports = { renderUploadVideoPage, uploadVideo, AllVideos, deleteVideo }