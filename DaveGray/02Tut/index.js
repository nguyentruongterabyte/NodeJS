const fsPromises = require( 'fs' ).promises;
const path = require( 'path' );

const fileOps = async () => { 
  try { 
    const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf-8')
    console.log( data )
    await fsPromises.unlink( path.join( __dirname, 'files', 'starter.txt' ) );
    await fsPromises.writeFile( path.join( __dirname, 'files', 'promiseWrite.txt' ), data );
    await fsPromises.appendFile( path.join( __dirname, 'files', 'promiseWrite.txt' ), '\n\nRất vui được gặp bạn' );
    await fsPromises.rename( path.join( __dirname, 'files', 'promiseWrite.txt' ), path.join( __dirname, 'files', 'promiseComplete.txt' ) );
    const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'promiseComplete.txt'), 'utf-8')
    console.log( newData )
  } catch ( err ) {
    console.error( err );
  }
}

fileOps();

// console.log( 'Hello...' );

// fs.writeFile( path.join( __dirname, 'files', 'reply.txt' ), 'Rất vui được gặp bạn!', ( err ) => {
//   if ( err ) throw err;
//   console.log( 'Write completed' );
//   fs.appendFile( path.join( __dirname, 'files', 'reply.txt' ), '\n\nYes it is', ( err ) => {
//     if ( err ) throw err;
//     console.log( 'Append completed' );
    
//      fs.rename( path.join( __dirname, 'files', 'reply.txt' ), path.join(__dirname, 'files', 'newReply.txt'), ( err ) => {
//     if ( err ) throw err;
//     console.log( 'Rename completed' );
//   } )
//   } )
// } )


// exit on uncaught errors
process.on( 'uncaughtException', ( err ) => { 
  console.error( `There was an uncaught error: ${ err }` );
} )
