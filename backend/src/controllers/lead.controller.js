const prisma = require('../config/db');

exports.createLead = async (req, res) => {
  try {
    const { name, phone, email, city, source, notes } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: 'Name and phone are required' });
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

    return res.status(201).json({
      message: 'Lead created successfully',
      lead,
    });
  } catch (error) {
    console.error('Create lead error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.getLeads = async (req, res) => {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return res.json(leads);
  } catch (error) {
    console.error('Get leads error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.getLeadById = async (req, res) => {
  try {
    const lead = await prisma.lead.findUnique({
      where: { id: req.params.id },
    });

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    return res.json(lead);
  } catch (error) {
    console.error('Get lead by id error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.updateLead = async (req, res) => {
  try {
    const { name, phone, email, city, status, source, assignedTo, notes } = req.body;

    const lead = await prisma.lead.update({
      where: { id: req.params.id },
      data: {
        ...(name !== undefined ? { name } : {}),
        ...(phone !== undefined ? { phone } : {}),
        ...(email !== undefined ? { email } : {}),
        ...(city !== undefined ? { city } : {}),
        ...(status !== undefined ? { status } : {}),
        ...(source !== undefined ? { source } : {}),
        ...(assignedTo !== undefined ? { assignedTo } : {}),
        ...(notes !== undefined ? { notes } : {}),
      },
    });

    return res.json({
      message: 'Lead updated successfully',
      lead,
    });
  } catch (error) {
    console.error('Update lead error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteLead = async (req, res) => {
  try {
    await prisma.lead.delete({
      where: { id: req.params.id },
    });

    return res.json({ message: 'Lead deleted successfully' });
  } catch (error) {
    console.error('Delete lead error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
