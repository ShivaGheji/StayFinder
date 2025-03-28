const Review = require("../models/review.js");
const Listing = require("../models/listinds.js");

// New Review
module.exports.createReview = async (req, res) => {
  const { id } = req.params;
  let listing = await Listing.findById(id);
  let newReview = new Review(req.body.reviews);
  newReview.author = req.user._id;

  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  req.flash("success", "Review Added");
  res.redirect(`/listings/${listing._id}`);
};

// destroy review
module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted");
  res.redirect(`/listings/${id}`);
};
