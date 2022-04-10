//- Get the token sent through the frontend and validate it using jwt.verify()
//-
//- Logic:
//-   . if the token valid: go ahead and serve the request
//-   . else: return a response using json object to signal error

//-- Get the 'verify' function from jsonwebtoken
const { verify } = require('jsonwebtoken');

//- Create a middleware (a function with req, res, and next)
//-   . req: get stuff from the request
//-   . res: send stuff back
//-   . next: allow the request to move forward
const validateToken = (req, res, next) => {
  //-- get the access token being passed in the header
  const accessToken = req.header('accessToken');

  //-- if there is no access token being sent with the request,
  //--   send back an error object
  if (!accessToken) {
    return res.json({ error: 'User not logged in!' });
  }

  //-- if there is a token, verify that it is valid
  try {
    //-- Verify using the secret string.
    //-- If the token is verified, it will return the object that is used to
    //-- create the token. So validToken will have info about username and password
    const validToken = verify(accessToken, 'importantsecret');

    //-- Store the user info in the request
    req.user = validToken;

    //-- If the token is valid then move forward with the request
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken };