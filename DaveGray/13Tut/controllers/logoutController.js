const usersDB = {
  users: require( '../model/users.json' ),
  setUsers: function (data) {this.users = data}
}

const fsPromise = require( 'fs' ).promises;
const path = require( 'path' );

const handleLogout = async ( req, res ) => { 
  // On client, also delete the access token

  const cookies = req.cookies;
  if ( !cookies?.jwt ) return res.sendStatus( 204 ); // No content

  const refreshToken = cookies.jwt;

  // Is refresh token in db?
  const foundUser = usersDB.users.find( person => person.refreshToken === refreshToken );
  if ( !foundUser ) {
    res.clearCookie( 'jwt', { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, secure: true } );
    return res.sendStatus( 204 );
  }
  
  // Delete refresh token in db
  const otherUsers = usersDB.users.filter( person => person.refreshToken !== foundUser.refreshToken );
  const currentUser = { ...foundUser, refreshToken: '' };
  usersDB.setUsers( [...otherUsers, currentUser ] );
  await fsPromise.writeFile(
    path.join( __dirname, '..', 'model', 'users.json' ),
    JSON.stringify( usersDB.users )
  );

  res.clearCookie( 'jwt', { maxAge: 24 * 60 * 60 * 100, sameSite: 'None', httpOnly: true, secure: true } ); // secure: true - only servers on https
  res.sendStatus( 204 );
}

module.exports = { handleLogout };