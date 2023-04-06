const router = require('express').Router();
const { Employee, TimeOff, User } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Check if user is logged in
    if (req.session.loggedIn) {
      // redirect to schedule if logged in, schedule is default logged in view
      return res.redirect('/schedule');
    }

    // render homepage handlebar as default unauthenticated view
    res.render('homepage', {
      // does not need to check for logged in status, this is default logged out view
      // loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET schedule page (TEMPLATE CODE)
router.get('/schedule', (req, res) => {
  // TEMP!! ↓ ---------------------------------------------------------------------------- ↓
  try {
    // TODO: Fetch schedule data from the database and pass it to the template
    const scheduleData = [
      { date: '2023-04-03', event: 'Event 1' },
      { date: '2023-04-04', event: 'Event 2' },
      { date: '2023-04-05', event: 'Event 3' },
      { date: '2023-04-06', event: 'Event 4' },
      { date: '2023-04-07', event: 'Event 5' },
    ];
  // TEMP!! ↑ ----------------------------------------------------------------------------- ↑
  // render schedule handlebar and pass schedule data
    res.render('schedule', {
      schedule: scheduleData,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET profile page (TEMPLATE CODE)
router.get('/profile', withAuth, async (req, res) => {
  // TEMP!! ↓ ------------------------------------------------------------------------------ ↓
  try {
    const userData = await User.findByPk(req.session.userId, {
      attributes: ['firstName', 'lastName', 'email', 'username'],
    });

    if (!userData) {
      throw new Error('User data not found');
    }

    const user = userData.get({ plain: true });
  // TEMP!! ↑ ------------------------------------------------------------------------------ ↑
  // render profile handlebar and pass user specific data
    res.render('profile', {
      user,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    if (err.name === 'SequelizeDatabaseError') {
      res.status(500).send('Error retrieving user data from database');
    } else {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

// GET availability page (TEMPLATE CODE)
router.get('/availability', withAuth, async (req, res) => {
  // TEMP!! ↓ ------------------------------------------------------------------------------- ↓
  try {
    const availabilityData = await Availability.findAll({
      where: { userId: req.session.userId },
      attributes: ['id', 'startDate', 'endDate', 'notes'],
      order: [['startDate', 'ASC']],
    });
  // TEMP!! ↑ ------------------------------------------------------------------------------- ↑
    // render availibility handlebar (to modify, WIP)
    res.render('availability', {
      availability: availabilityData,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET sick calls page (TEMPLATE CODE)
router.get('/sick-calls', withAuth, async (req, res) => {
  // TEMP!! ↓ -------------------------------------------------------------------------------- ↓
  try {
    const sickCallData = await SickCall.findAll({
      where: { userId: req.session.userId },
      attributes: ['id', 'startDate', 'endDate', 'notes'],
      order: [['startDate', 'ASC']],
    });
  // TEMP!! ↑ -------------------------------------------------------------------------------- ↑
  // render sick call handlebar to submit a sick day notice
    res.render('sick-calls', {
      sickCalls: sickCallData,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET PTO page (TEMPLATE CODE)
router.get('/pto', withAuth, async (req, res) => {
  // TEMP!! ↓ ---------------------------------------------------------------------------------- ↓
  try {
    const ptoData = await PTO.findAll({
      where: { userId: req.session.userId },
      attributes: ['id', 'startDate', 'endDate', 'notes'],
      order: [['startDate', 'ASC']],
    });
  // TEMP!! ↑ ---------------------------------------------------------------------------------- ↑
  // render PTO handlebar to submit time off
    res.render('pto', {
      pto: ptoData,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// login route that redirects to '/' if logged in, renders the login handlebar if not logged in
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
// render login handlebar
  res.render('login');
});

module.exports = router;
