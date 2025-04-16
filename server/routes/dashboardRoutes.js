const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const { protect} = require("../middlewares/authMiddleware");
// Get Dashboard Stats  
router.get("/stats",protect, dashboardController.getDashboardStats);
/*router.post(
    "/",
    protect,
    upload.single("image"),
    listingController.createListing
  );
router.put(
    "/:id",
    protect,
    upload.single("image"),
    listingController.updateListing
  );
   router.delete("/:id", protect, listingController.deleteListing);
*/
 module.exports = router;