//- Get the token sent through the frontend and validate it using jwt.verify()
//-
//- Logic:
//-   . if the token valid: go ahead and serve the request
//-   . else: return a response using json object to signal error
const { verify } = require('jsonwebtoken');

//- Create a middleware (a function with req, res, and next)
//-   . req: get stuff from the request
//-   . res: send stuff back
//-   . next: allow the request to move forward
const validateToken = (req, res, next) => {
  //-- get the access token being passed in the header
  const accessToken = req.header('accessToken');

  //-- if user are not logged in (no access token found),
  //--   send back an error object
  if (!accessToken) {
    console.log(accessToken);
    return res.json({ error: 'User not logged in!' });
  }

  //-- if there is a token, verify that it is valid
  try {
    //-- compare with the secret string
    const validToken = verify(accessToken, 'importantsecret');

    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken };