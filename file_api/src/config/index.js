module.exports = {
  production: {
    jwtSecret: 'secret',
    port: process.env.FILE_SERVER_PORT,
    privateKey: '',
    certificate: ''
  },
  development: {
    jwtSecret: 'secret',
    port: 80
  }
}
