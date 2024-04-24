const multer = require( "multer" )

function videoMulter () {

    const storage = multer.diskStorage( {
        destination: ( req, file, cb ) => {

            cb( null, './public/uploads' )

        },
        filename: ( req, file, cb ) => {
            cb( null, file.originalname )
        }
    } )

    const upload = multer( { storage: storage } )
    return upload

}

module.exports = videoMulter