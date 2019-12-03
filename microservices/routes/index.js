const users = require('./users');
const transactions = require('./transactions');

const routers = [users, transactions];

module.exports = (app) => {
  routers.forEach(router => app.use(router));
}