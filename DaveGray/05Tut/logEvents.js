const { format, parseISO } = require( 'date-fns' );
const { v4: uuid } = require( 'uuid' );
const fs = require( 'fs' );
const fsPromises = require( 'fs' ).promises;
const path = require( 'path' );

const logEvents = async ( message, logName ) => {
  const currentDate = new Date();

  const dateTime = `${ format(
    currentDate
    , 'yyyyMMdd hh:mm:ss') }`;
  const logItem = `${ dateTime }\t${ uuid() }\t${ message }`;
  console.log( logItem );
  try { 

    if ( !fs.existsSync( path.join( __dirname, 'logs' ) ) ) {
      await fsPromises.mkdir( path.join( __dirname, 'logs' ) );
    }
    await fsPromises.appendFile( path.join( __dirname, 'logs', logName ), logItem + '\n' );
  } catch ( err ) {
    console.error( err );
  }
}

module.exports = logEvents