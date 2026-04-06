const express = require('express');
const router = express.Router();
const leadController = require('../controllers/lead.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/', protect, leadController.createLead);
router.get('/', protect, leadController.getLeads);
router.get('/:id', protect, leadController.getLeadById);
router.put('/:id', protect, leadController.updateLead);
router.delete('/:id', protect, leadController.deleteLead);

module.exports = router;
