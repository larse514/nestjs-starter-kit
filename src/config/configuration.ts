export default () => ({
  environment: process.env.NODE_ENV,
  helloVariable: process.env.HELLO_VARIABLE,
  logLevel: process.env.LOG_LEVEL,
  serviceName: 'starter-kit',
});
