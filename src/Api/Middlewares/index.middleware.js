const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { generalRateLimiter, rateLimiterWithWhitelist } = require('../../config/Setting/rateLimiter.config.js');
const securityConfig = require('../../config/Setting/security.config.js');
const { requestLogger } = require('../../config/Setting/logger.config.js');
const { logRequestDetails, logResponseDetails } = require('./loggingMiddleware.js.js');

module.exports = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(helmet());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'yourSecretKey',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      },
    })
  );

  app.use(generalRateLimiter);
  app.use(rateLimiterWithWhitelist);
  app.use(securityConfig);

  app.use(requestLogger);
  app.use(logRequestDetails);
  app.use(logResponseDetails);

  app.use((err, req, res, next) => {
    errorLogger.error(`${err.status || 500} - ${err.message}`);
    res.status(500).send('Internal Server Error');
  });

  return app;
};
