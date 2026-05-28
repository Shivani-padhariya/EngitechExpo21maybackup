// Run once: marks all blogs as 'published'
// Usage: node publishAllBlogs.js
require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const mongoose = require('mongoose');
const Blog = require('./models/Blog');

async function run() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected.');

  const result = await Blog.updateMany(
    { status: { $ne: 'published' } },
    { $set: { status: 'published' } }
  );

  console.log(`✅ Updated ${result.modifiedCount} blogs to published`);

  const total = await Blog.countDocuments({ status: 'published' });
  console.log(`📚 Total published blogs: ${total}`);

  await mongoose.disconnect();
}

run().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
