const User = require("../models/User"); // Import the User model
const Listing = require("../models/Listing"); // Import the Listing model (if not already importe

const createListing = async (req, res) => {
  try {
    // Enhanced logging
    console.log("Request files:", req.files);
    console.log("Request body:", req.body);

    // Process uploaded files
    const images = req.files?.map(file => ({
      url: file.path,
      filename: file.filename
    })) || [];

    // Validate required fields
    const requiredFields = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      city: req.body.city,
      country: req.body.country,
      propertyType: req.body.propertyType,
      availableFrom: req.body.availableFrom,
      availableTo: req.body.availableTo,
      maxGuests: req.body.maxGuests,
      amenities: req.body.amenities
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([field]) => field);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Parse and validate amenities
    let amenities = [];
    try {
      amenities = typeof req.body.amenities === 'string' 
        ? JSON.parse(req.body.amenities)
        : req.body.amenities;
      
      if (!Array.isArray(amenities)) {
        throw new Error('Amenities must be an array');
      }
    } catch (e) {
      return res.status(400).json({
        success: false,
        message: 'Invalid amenities format'
      });
    }

    // Validate images
    if (images.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one image is required'
      });
    }

    // Create listing
    const listing = await Listing.create({
      title: req.body.title.trim(),
      description: req.body.description.trim(),
      price: parseFloat(req.body.price),
      city: req.body.city.trim(),
      country: req.body.country.trim(),
      propertyType: req.body.propertyType.trim(),
      availableFrom: new Date(req.body.availableFrom),
      availableTo: new Date(req.body.availableTo),
      maxGuests: parseInt(req.body.maxGuests),
      amenities: amenities.map(a => a.trim()),
      images: images,
      user: req.user._id
    });

    return res.status(201).json({
      success: true,
      data: listing
    });

  } catch (error) {
    console.error("Listing creation error:", error);
    return res.status(400).json({
      success: false,
      message: error.message || 'Failed to create listing'
    });
  }
};
// Update an existing listing (only by the user who created it)
const updateListing = async (req, res) => {
  try {
    const { id } = req.params;

    // Debug: Log the listing ID and request user
    console.log("Listing ID:", id);
    console.log("Authenticated User:", req.user);

    // Find the listing and populate the user field
    const listing = await Listing.findById(id).populate("user");
    if (!listing) {
      return res.status(404).json({ message: "Listing not found." });
    }

    // Debug: Log the fetched listing
    console.log("Fetched Listing:", listing);
    console.log("Listing User:", listing.user);

    // Debug: Compare user IDs
    console.log("Listing User ID:", listing.user?._id?.toString());
    console.log("Authenticated User ID:", req.user?._id?.toString());
    console.log("Are IDs equal?", listing.user?._id?.toString() === req.user?._id?.toString());

    // Check if the authenticated user is the owner of the listing OR an admin
    if (
      !listing.user || // Ensure listing.user exists
      !req.user || // Ensure req.user exists
      (listing.user._id.toString() !== req.user._id?.toString() && // User is not the owner
        req.user.role !== "admin") // User is not an admin
    ) {
      return res.status(403).json({ message: "You are not authorized to update this listing." });
    }

    // Extract fields from the request body
    const {
      title,
      price,
      description,
      city,
      country,
      propertyType,
      availableFrom,
      availableTo,
      maxGuests,
      amenities,
    } = req.body;

    // Debug: Log the request body
    console.log("Request Body:", req.body);

    // Validate required fields
    if (
      !title ||
      !price ||
      !description ||
      !city ||
      !country ||
      !propertyType ||
      !availableFrom ||
      !availableTo ||
      !maxGuests ||
      !amenities
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Validate price and maxGuests
    if (isNaN(price) || price <= 0) {
      return res.status(400).json({ message: "Price must be a valid positive number." });
    }
    if (isNaN(maxGuests) || maxGuests <= 0) {
      return res.status(400).json({ message: "Max guests must be a valid positive number." });
    }

    // Validate dates
    const availableFromDate = new Date(availableFrom);
    const availableToDate = new Date(availableTo);
    if (isNaN(availableFromDate.getTime())) {
      return res.status(400).json({ message: "Invalid availableFrom date." });
    }
    if (isNaN(availableToDate.getTime())) {
      return res.status(400).json({ message: "Invalid availableTo date." });
    }

    // Parse amenities (if sent as a JSON string)
    let parsedAmenities;
    try {
      parsedAmenities = JSON.parse(amenities);
    } catch (error) {
      return res.status(400).json({ message: "Invalid amenities format." });
    }

    // Debug: Log the parsed amenities
    console.log("Parsed Amenities:", parsedAmenities);

    // Handle image upload (if a new image is provided)
    let imageUrl = listing.image; // Retain the old image if no new one is uploaded
    if (req.file) {
      imageUrl = req.file.path; // Update with the new image URL
    }

    // Debug: Log the image URL
    console.log("Image URL:", imageUrl);

    // Debug: Log the update operation
    console.log("Updating Listing with ID:", id);

    // Update the listing
    const updatedListing = await Listing.findByIdAndUpdate(
      id,
      {
        title,
        price,
        description,
        city,
        country,
        propertyType,
        availableFrom: availableFromDate,
        availableTo: availableToDate,
        maxGuests,
        amenities: parsedAmenities,
        image: imageUrl, // Use the updated or existing image URL
      },
      { new: true } // Return the updated document
    );

    // Debug: Log the updated listing
    console.log("Updated Listing:", updatedListing);

    res.status(200).json({ message: "Listing updated successfully", updatedListing });
  } catch (error) {
    console.error("Update Listing Error:", error);
    res.status(500).json({ message: "Failed to update listing", error: error.message });
  }
};

// Delete a listing (only by the user who created it)
const deleteListing = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the listing
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found." });
    }

    // Check if the authenticated user is the owner of the listing OR an admin
    if (
      !req.user || // Ensure req.user exists
      (listing.user.toString() !== req.user._id?.toString() && // User is not the owner
        req.user.role !== "admin") // User is not an admin
    ) {
      return res.status(403).json({ message: "You are not authorized to delete this listing." });
    }

    // Delete the listing
    await Listing.findByIdAndDelete(id);
    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    console.error("Delete Listing Error:", error);
    res.status(500).json({ message: "Failed to delete listing", error: error.message });
  }
};

// Get all listings
const getListings = async (req, res) => {
  try {
    const listings = await Listing.find().populate({
      path: "user",
      select: "name email", // Populate only the name and email fields
    });
    res.status(200).json(listings);
  } catch (error) {
    console.error("Get Listings Error:", error);
    res.status(500).json({ message: "Failed to fetch listings", error: error.message });
  }
};

// Get a single listing by ID
const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate({
      path: "user",
      select: "name email", // Populate only the name and email fields
    });

    if (!listing) {
      return res.status(404).json({ message: "Listing not found." });
    }

    res.status(200).json(listing);
  } catch (error) {
    console.error("Get Listing Error:", error);
    res.status(500).json({ message: "Failed to fetch listing", error: error.message });
  }
};

module.exports = {
  createListing,
  getListings,
  getListingById,
  updateListing,
  deleteListing,
};