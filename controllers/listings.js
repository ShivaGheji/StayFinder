const Listing = require("../models/listinds.js");
const maptilerClient = require("@maptiler/client");
const mapToken = process.env.MAP_TOKEN;
maptilerClient.config.apiKey = mapToken;

// All Listings
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("./listings/listing.ejs", { allListings });
};

// Add new listing form
module.exports.renderNewForm = (req, res) => {
  res.render("./listings/new.ejs");
};

// create lisitng
module.exports.createListing = async (req, res) => {
  const result = await maptilerClient.geocoding.forward(
    req.body.listing.location
  );

  let { path, filename } = req.file;
  const newListing = new Listing(req.body.listing);
  newListing.image = {
    filename: filename,
    url: path,
  };
  newListing.owner = req.user._id;

  newListing.geometry = result.features[0].geometry;

  let savedListing = await newListing.save();
  req.flash("success", "New Listing Added");
  res.redirect("/listings");
};

// show listing
module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const result = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!result) {
    req.flash("error", "Listing does not exits!");
    res.redirect("/listings");
  }
  // const answer = await maptilerClient.geocoding.forward(result.location);
  // result.geometry = answer.features[0].geometry;
  // const ans = await result.save();
  // console.log(ans);
  res.render("./listings/show.ejs", { listing: result });
};

// edit listing form
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const result = await Listing.findById(id);
  if (!result) {
    req.flash("error", "Listing does not exits!");
    res.redirect("/listings");
  }

  let lowQualityImage = result.image.url.replace("/upload", "/upload/w_250");
  res.render("./listings/edit.ejs", { listing: result, lowQualityImage });
};

// update listing
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file !== "undefined") {
    let { path, filename } = req.file;
    listing.image = {
      filename: filename,
      url: path,
    };
    await listing.save();
  }

  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
};

// destroy listing
module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
};
