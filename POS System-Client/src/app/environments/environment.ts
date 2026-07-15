export const environment = {
  production: false,
  // Point this at wherever your Express app actually mounts the routers
  // (CustomerRoute, ProductRoute, OrderRoute, UserRoute). index.js in the
  // backend repo doesn't currently call app.use() to mount them under a
  // prefix — mount them (e.g. app.use('/api/customer', customerRoute)) and
  // match that prefix here.
  apiBaseUrl: 'http://localhost:3000/api'
};
