const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Listing = require('../models/Listing');
const fakeListings = require('../data/fakeListings');
const MONGODB_URI="mongodb://localhost:27017/mydb"
// Load environment variables from .env file
dotenv.config();

if (!MONGODB_URI) {
  console.error("MongoDB URI is missing. Set the MONGODB_URI in your .env file.");
  process.exit(1);
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Function to seed listings into the database
/*const seedListings = async () => {
  try {
    // Connect to MongoDB using the URI from the .env file
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');

    // Delete all existing listings to avoid duplicates
    await Listing.deleteMany();
 
    // Insert fake listings into the database
    await Listing.insertMany(fakeListings);
    console.log('Fake listings seeded successfully!');
  } catch (error) {
    console.error('Error seeding listings:', error);
  } finally {
    // Disconnect from MongoDB after operation
    mongoose.disconnect();
    console.log('MongoDB connection closed.');
  }
};

// Run the seedListings function to populate the database
seedListings();
*/
const updateListingsWithUserId = async () => {
  try {
    const userId = "67b86f7ecdfd19fdd7252899"; // Specific user ID

    // Update all listings to associate them with the specific user
    const result = await Listing.updateMany(
      {}, // Match all documents
      { $set: { user: userId } } // Set the user field
    );

    console.log(`${result.modifiedCount} listings updated successfully.`);
  } catch (error) {
    console.error("Error updating listings:", error);
  }
};



// Run the function
updateListingsWithUserId();