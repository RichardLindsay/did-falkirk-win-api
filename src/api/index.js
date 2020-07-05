const express = require('express');
const axios = require('axios');
const e = require('express');

const router = express.Router();

const BASE_URL = 'https://www.footballwebpages.co.uk/fixtures-results.json?';

router.get('/', async(req, res, next) => {
  try {
    const PARAMS = new URLSearchParams({
      team: '343',
      results: '1',
      fixtures: '0'
    });

    let { data } = await axios.get(`${BASE_URL}${PARAMS}`);

    let homeTeamNumber = data.matchesTeam.match[0].homeTeamNo;
    let homeTeamScore = data.matchesTeam.match[0].homeTeamScore;
    let awayTeamScore = data.matchesTeam.match[0].awayTeamScore;

    if (homeTeamNumber == 343) {
      if (homeTeamScore > awayTeamScore) {
        res.json({
          message: 'Yes.'
        });
      } else {
        res.json({
          message: 'No.'
        });
      }
    } else {
      if (awayTeamScore > homeTeamScore) {
        res.json({
          message: 'Yes.'
        });
      } else {
        res.json({
          message: 'No.'
        });
      }
    }
  } catch (error) {
    next(error);
  }

});

module.exports = router;