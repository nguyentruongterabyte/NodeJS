const usersDB = {
  users: require( '../model/users.json' ),
  setUsers: function (data) {this.users = data}
}

const bcrypt = require( 'bcrypt' );

const jwt = require( 'jsonwebtoken' );
const fsPromises = require('fs').promises;
const path = require( 'path' );

const handleLogin = async ( req, res ) => { 
  const { user, pwd } = req.body;
  if ( !user || !pwd ) return res.sendStatus( 400 ).json( { 'message': 'Please provide user and password'})
  const foundUser = usersDB.users.find( person => person.username === user );
  if ( !foundUser ) return res.sendStatus( 401 ); // Unauthorized
  // evaluate password
  const match = await bcrypt.compare( pwd, foundUser.password );
  if ( match ) {
    const roles = Object.values( foundUser.roles );
    // create JWTs
    const accessToken = jwt.sign(
      {
        "userInfo":
        {
          "username": foundUser.username,
          "roles": roles
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30s' }
    );
    const refreshToken = jwt.sign(
      { "username": foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );
    // Saving refresh token with current user
    const otherUsers = usersDB.users.filter( person => person.username !== foundUser.username );
    const currentUsers = { ...foundUser, refreshToken }
    usersDB.setUsers( [ ...otherUsers, currentUsers ] );
    await fsPromises.writeFile(
      path.join( __dirname, '..', 'model', 'users.json' ),
      JSON.stringify( usersDB.users )
    );
    res.cookie('jwt', refreshToken, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'None', secure: true })
    res.json( {accessToken} )
  } else {
    res.sendStatus( 401 ); // Unauthorized
  }
}

module.exports = { handleLogin };