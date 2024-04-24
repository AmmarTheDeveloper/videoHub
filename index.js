const path = require( 'path' )
const express = require( 'express' );
const app = express();
const uploadVideoMulter = require( './services/multer/uploadVideoMulter' )
const { renderUploadVideoPage, uploadVideo, AllVideos, deleteVideo } = require( './controllers/upload-video' )

app.set( "view engine", "ejs" );
app.use( express.static( path.resolve( __dirname, "public" ) ) )

app.get( '/', renderUploadVideoPage )
app.get( '/all-videos', AllVideos )

app.post( '/api/upload-video', uploadVideoMulter().single( "video" ), uploadVideo )
app.delete( '/api/delete-video/:id', deleteVideo )


app.listen( 9090 );