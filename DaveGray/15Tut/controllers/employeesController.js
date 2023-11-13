const Employee = require('../model/Employee');

const getAllEmployees = async( req, res ) => {
  const employees = await Employee.find();
  if ( !employees ) return res.sendStatus( 204 ).json( { 'message': 'No employees found.' } );
  res.json( employees );
}

const createNewEmployee = async( req, res ) => { 

  if ( !req?.body?.firstname || !req?.body?.lastname ) {
    return res.status( 400 ).json( { 'message': 'First and last names are required.' } );
  }

  try {
    const result = await Employee.create( {
      firstname: req.body.firstname,
      lastname: req.body.lastname
    } );

    res.sentStatus(201).json( result );
  }
  catch ( err ) {
    console.log( err );
  }
}

const updateEmployee = async ( req, res ) => {
  if ( !req?.body?.id ) {
    return res.sentStatus( 400 ).json({'message': 'ID parameter is required.' } );
  }

  const employee = await Employee.findOne;
  if ( !employee ) {
    return res.sendStatus( 400 ).json( { 'message': `Employee ID ${ req.body.id } not found.` } );
  }
  if ( req.body.firstname ) employee.firstname = req.body.firstname;
  if ( req.body.lastname ) employee.lastname = req.body.lastname;
  const filteredArray = data.employees.filter( emp => emp.id !== parseInt( req.body.id ) );
  const unsortedArray = [ ...filteredArray, employee ];
  data.setEmployees( unsortedArray.sort( ( a, b ) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0 ) );
  await fsPromises.writeFile( path.join( __dirname, '..', 'model', 'employees.json' ), JSON.stringify( data.employees ) );
  res.json( data.employees );
}

const deleteEmployee =  async( req, res ) => { 
  const employee = data.employees.find( emp => emp.id === parseInt( req.body.id ) );
  if (!employee ) {
    return res.status( 400 ).json( {'message': `Employee ID ${ req.body.id } not found.` } );
  }
  const filteredArray = data.employees.filter( emp => emp.id !== parseInt( req.body.id ) );
  data.setEmployees( [ ...filteredArray ] );
  await fsPromises.writeFile( path.join( __dirname, '..', 'model', 'employees.json' ), JSON.stringify( data.employees ) );
  res.json(data.employees);
}

const getEmployee = ( req, res ) => {
  const employee = data.employees.find( emp => emp.id === parseInt( req.params.id ) );
  if (!employee ) {
    return res.status( 400 ).json( {'message': `Employee ID ${ req.params.id } not found.` } );
  }
  res.json( employee );
}

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee
}