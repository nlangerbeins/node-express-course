const express = require('express');
const router = express.Router();

const {
  addPerson,
  getPeople,
  getPerson,
  updatePerson,
  deletePerson,
} = require('../controllers/people');

router.route('/').get(addPerson).post(getPeople);
router.route('/:id', getPerson).put(updatePerson).delete(deletePerson);

module.exports = router;
