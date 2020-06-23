const express = require('express');
const router = express.Router();

// Report Model
const Report = require('../../models/Report');

// @route   GET api/reports
// @desc    GET All unresolved reports for mod consideration
// @access  Private only to Moderation and Admin team
router.get('/', (req, res) => {
  // Only outputs Unresolved results
  
  // resolved: {eq: false} finds and returns reports that have not been resolved
  Report.find({resolved: {$eq: false}})
    .sort({ date: 1 }) // 1 = Ascending/False, -1 = Descending/True
    .then(reports => {
      // console.log(reports)
      res.json(reports)
    })
});

// router.get('/:id', (req, res) => {
//   Report.findById('')
// })

// @route   POST api/reports
// @desc    POST a user report
// @access  Public
router.post('/', (req, res) => {
  const { guildId, user, userId, reason, reportedBy, reportedById } = req.body
  
  const newReport = Report({
    guildId: guildId,
    user: user,
    userId: userId,
    reason: reason,
    reportedBy: reportedBy,
    reportedById: reportedById,
  });

  newReport.save().then(report => res.json(report));
});

// @route   PUT api/reports
// @desc    PUT Resolves a user Report
// @access  Private only to moderation team
router.put('/:id', (req, res) => {
  Report.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then(report => {
      // console.log(`Response: `, report)
      res.send(report)
    })
    .catch(err => {console.log(`Error!\n`,err)})
});

module.exports = router;