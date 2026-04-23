const rateLimit = require('express-rate-limit');

// General limiter — for all routes
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 40,
  message: {
    error: 'Too many requests from this IP, please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,

  //  Skip  GET requests
  skip: (req) => req.method === 'GET'
});
// (prevent spam orders)
const orderLimiter = rateLimit({
  windowMs: 60 * 1000,  // 1 minute
  max: 5,               // max 5 orders per minute
  message: {
    error: 'Too many orders placed. Please wait a minute before trying again.'
  }
});

// Cart limiter — prevent cart spam
const cartLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,   // in one minute max 20 allowed
  message: {
    error: 'Too many cart requests. Please slow down.'
  },
  skip: (req) => req.method === 'GET',  //  GET requests are NOT rate limited
});


module.exports = { generalLimiter, orderLimiter, cartLimiter };