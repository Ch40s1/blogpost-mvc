// const sequelize = require('../config/connection');
// const { User, BlogPost, BlogComment } = require('../models');
// const userData = require('./userData.json');
// const blogPostData = require('./postData.json');
// const commentData = require('./commentData.json');

// const seedDatabase = async () => {
//   try {
//     await sequelize.sync({ force: true });

//     // Create users
//     const users = await User.bulkCreate(userData, {
//       individualHooks: true,
//       returning: true,
//     });

//     // Create blog posts
//     const blogPosts = await BlogPost.bulkCreate(blogPostData, {
//       returning: true,
//     });

//     // Create comments (without associating them with blog posts)
//     const comments = await BlogComment.bulkCreate(commentData, {
//       returning: true,
//     });

//     console.log('Database seeded successfully');
//   } catch (err) {
//     console.error('Error seeding database:', err);
//   } finally {
//     sequelize.close();
//   }
// };

// seedDatabase();
