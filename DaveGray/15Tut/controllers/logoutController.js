const User = require( '../model/User' );

const handleLogout = async ( req, res ) => { 
  // On client, also delete the access token

  const cookies = req.cookies;
  if ( !cookies?.jwt ) return res.status( 204 ); // No content

  const refreshToken = cookies.jwt;

  // Is refresh token in db?
  const foundUser = await User.findOne( { refreshToken } ).exec();;
  if ( !foundUser ) {
    res.clearCookie( 'jwt', { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, secure: true } );
    return res.status( 204 );
  }
  
  // Delete refresh token in db
  foundUser.refreshToken = '';
  const result = await foundUser.save();
  console.log( result );

  res.clearCookie( 'jwt', { maxAge: 24 * 60 * 60 * 100, sameSite: 'None', httpOnly: true, secure: true } ); // secure: true - only servers on https
  res.sendStatus( 204 );
}

module.exports = { handleLogout };