const prisma = require("../config/db");

// CREATE LEAD
exports.createLead = async (req, res) => {
  try {
    const { name, phone, email, city, source, notes } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: "Name and phone are required" });
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        phone,
        email,
        city,
        source,
        notes,
      },
    });

    res.status(201).json({
      message: "Lead created successfully",
      lead,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL LEADS
exports.getLeads = async (req, res) => {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json(leads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET SINGLE LEAD
exports.getLeadById = async (req, res) => {
  try {
    const lead = await prisma.lead.findUnique({
      where: { id: req.params.id },
    });

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json(lead);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE LEAD
exports.updateLead = async (req, res) => {
  try {
    const { name, phone, email, city, status, source, assignedTo, notes } = req.body;

    const lead = await prisma.lead.update({
      where: { id: req.params.id },
      data: {
        name,
        phone,
        email,
        city,
        status,
        source,
        assignedTo,
        notes,
      },
    });

    res.json({
      message: "Lead updated successfully",
      lead,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE LEAD
exports.deleteLead = async (req, res) => {
  try {
    await prisma.lead.delete({
      where: { id: req.params.id },
    });

    res.json({ message: "Lead deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};