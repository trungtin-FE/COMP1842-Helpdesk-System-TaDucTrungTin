const ResponseModel = require("../models/Response");

exports.getResponseById = async (req, res) => {
  try {
    const response = await ResponseModel.findById(req.params.id);
    if (!response) {
      return res.status(404).json({ message: "Response record not found" });
    }
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllResponses = async (req, res) => {
  try {
    const query = req.query.q;
    let filter = {};

    if (query && query.trim() !== "") {
      filter = {
        $or: [
          { key: { $regex: query, $options: "i" } }, // regex: Regular Expression
          { value: { $regex: query, $options: "i" } }, // i: insensitive
        ],
      };
    }

    const responses = await ResponseModel.find(filter).sort({ createdAt: -1 });
    res.status(200).json(responses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createResponse = async (req, res) => {
  try {
    const { key, value, priority } = req.body;

    const existing = await ResponseModel.findOne({ key: key.trim() });

    if (existing) {
      return res.status(400).json({
        message: `The key "${key}" already exists. Please use a different name.`,
      });
    }

    const newResponse = new ResponseModel({
      key: key.trim(),
      value,
      priority,
    });

    const savedResponse = await newResponse.save();
    res.status(201).json(savedResponse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateResponse = async (req, res) => {
  try {
    const updatedResponse = await ResponseModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.status(200).json(updatedResponse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteResponse = async (req, res) => {
  try {
    await ResponseModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
