const User = require('./user');
const BlogPost = require('./blogpost');
const BlogComment = require('./blogcomment');

// Define associations
User.hasMany(BlogPost, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

BlogPost.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(BlogComment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

BlogComment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

BlogPost.hasMany(BlogComment, {
  foreignKey: 'blogpost_id',
  as: 'comments',
});


BlogComment.belongsTo(BlogPost, {
  foreignKey: 'blogpost_id',
  onDelete: 'CASCADE'
});

module.exports = { User, BlogPost, BlogComment };
