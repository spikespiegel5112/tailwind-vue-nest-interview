import Sequelize from 'sequelize';
import sequelize from '../util/database';

const ChatModel = sequelize.define('Chat', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  chatId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  conversationNumber: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  guestUserId: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  welinkUserId: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

export default ChatModel;
