const sequelize = require('../config/connection');
const { User, BlogPost } = require('../models');

const userData = require('./userData.json');
const blogPostData = require('./postData.json');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    // Seed blog posts and associate them with random users
    for (const blogPost of blogPostData) {
      await BlogPost.create(blogPost);
    }

    console.log('Database seeded successfully');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    sequelize.close(); // Close the database connection when done
  }
};

seedDatabase();
