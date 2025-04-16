/*const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  propertyType: { type: String, required: true },
  image: { type: String, default: "" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to user
  createdAt: { type: Date, default: Date.now },
  availableFrom: { type: Date, required: true },
  availableTo: { type: Date, required: true },
  maxGuests: { type: Number, default: 1 },
  amenities: [{ type: String }],
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
  review: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

module.exports = mongoose.model("Listing", listingSchema);
*/
const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  propertyType: { type: String, required: true },
  images: { 
    type: [{
      url: String,
      filename: String
    }], 
    required: true,
    validate: {
      validator: function(array) {
        return array.length >= 1 && array.length <= 4;
      },
      message: 'Property must have between 1 and 4 images'
    }
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  availableFrom: { type: Date, required: true },
  availableTo: { type: Date, required: true },
  maxGuests: { type: Number, default: 1 },
  amenities: [{ type: String }],
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

module.exports = mongoose.model("Listing", listingSchema);