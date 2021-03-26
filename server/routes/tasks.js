'use strict';

const express = require('express');
const router = new express.Router();
const Task = require('../models/task');

router.get('/', async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.json({ tasks: tasks });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const task = await Task.create({
      title: req.body.title
    });
    res.json({ task: task });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const task = await Task.findById(id);
    res.json({ task: task });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { title: req.body.title },
      { new: true }
    );
    res.json({ task });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    await Task.findByIdAndDelete(id);
    res.json({});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
