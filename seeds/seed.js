const sequelize = require('../config/connection');
const { User, BlogPost } = require('../models');

const userData = require('./userData.json');
const blogPostData = require('./postData.json');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    // Seed users and capture the created users with individualHooks and returning: true
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    // Seed blog posts and associate them with random users
    for (const blogPost of blogPostData) {
      // Randomly select a user from the 'users' array
      const randomUser = users[Math.floor(Math.random() * users.length)];

      // Create the blog post and associate it with the selected user
      await BlogPost.create({
        ...blogPost,
        user_id: randomUser.id,
      });
    }

    console.log('Database seeded successfully');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    sequelize.close(); // Close the database connection when done
  }
};

seedDatabase();
