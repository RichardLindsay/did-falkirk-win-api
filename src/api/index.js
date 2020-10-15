const express = require('express');
const axios = require('axios');

const router = express.Router();

const BASE_URL = 'https://football-web-pages1.p.rapidapi.com/fixtures-results.json?';

router.get('/', async(req, res, next) => {
  try {
    const PARAMS = new URLSearchParams({
      team: '343'
    });

    let { data } = await axios.get(`${BASE_URL}${PARAMS}`, {
      headers: {
        'x-rapidapi-key': `${process.env.API_KEY}`
      }
    });

    let matches = data["fixtures-results"].matches;
    let pastMatches = matches.filter(x => Date.parse(x.date) < new Date()).reverse();

    let homeTeamNumber = pastMatches[0]["home-team"].id;
    let homeTeamScore = pastMatches[0]["home-team"].score;
    let awayTeamScore = pastMatches[0]["away-team"].score;

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