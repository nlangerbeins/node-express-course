const { people } = require('../data');

// GET
const addPerson = (req, res) => {
  res.status(200).json({ success: true, data: people });
};

// GET
const getPerson = (req, res) => {
  const { id } = req.params;

  const person = people.find((person) => person.id === parseInt(id));
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person found with id ${id}` });
  }

  res.status(200).json({ success: true, data: person });
};

// POST
const getPeople = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: 'Please provide a name' });
  }
  people.push({ id: people.length + 1, name: name });
  res.status(201).json({ success: true, name: name });
};

// PUT
const updatePerson = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const person = people.find((person) => person.id === parseInt(id));
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person found with id ${id}` });
  }

  person.name = name;

  res.status(200).json({ success: true, data: person });
};

// DELETE
const deletePerson = (req, res) => {
  const { id } = req.params;

  const person = people.find((person) => person.id === parseInt(id));
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person found with id ${id}` });
  }

  const newPeople = people.filter((person) => person.id !== parseInt(id));

  res.status(200).json({ success: true, data: newPeople });
};

module.exports = {
  addPerson,
  getPeople,
  getPerson,
  updatePerson,
  deletePerson,
};
