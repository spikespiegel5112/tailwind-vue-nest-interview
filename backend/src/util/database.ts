import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('todo-list', 'todo-list', '8jxETniXpfzrXNSt', {
  dialect: 'mysql',
  host: 'baobaojs.com',
  timezone: '+08:00',
});

// const sequelize = new Sequelize(
//   "chat",
//   "app_chat",
//   "mSQzv/RMxMHnn",
//   {
//     dialect: "mysql",
//     host: "10.9.9.232",
//     timezone: "+08:00",
//   }
// );

sequelize.sync({
  force: false,
});

export default sequelize;
