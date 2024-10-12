const Admin = require("../Model/addAdmin");

// Add a new admin
const addNewAdmin = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin with this email already exists" });
    }

    // Create a new admin
    const newAdmin = new Admin({ name, email });
    await newAdmin.save();

    res.status(201).json({ message: "Admin created successfully", admin: newAdmin });
  } catch (error) {
    res.status(500).json({ message: "Error creating admin", error: error.message });
  }
};

// Get all admins
const getAdmin = async (req, res) => {
  try {
    const admins = await Admin.find();  
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving admins", error: error.message });
  }
};

// Remove an admin by ID
const removeAdmin = async (req, res) => {
  try {
    const adminId = req.params.id;

    const deletedAdmin = await Admin.findByIdAndDelete(adminId);
    if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Admin removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error removing admin", error: error.message });
  }
};

module.exports = {
  addNewAdmin,
  getAdmin,
  removeAdmin
};
