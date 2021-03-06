'use strict';

module.exports = (options) => {
  const checkName = 'hof-cookie-check';
  const cookieName = (options || {})['cookie-name'] || checkName;
  const paramName = (options || {})['param-name'] || checkName;

  return (req, res, next) => {
    if (req.cookies && Object.keys(req.cookies).length) {
      next();
    } else if (req.query[paramName] !== undefined) {
      let err = new Error('Cookies required');
      err.code = 'NO_COOKIES';
      next(err, req, res, next);
    } else {
      res.cookie(cookieName, 1);
      res.redirect(req.originalUrl + '?' + encodeURIComponent(paramName));
    }
  };
};
