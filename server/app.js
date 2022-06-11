var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var gamesPerDateRouter = require('./routes/gamesPerDate');
var gamePerIdRouter = require('./routes/gamePerId');
var gameStatisticsIdRouter = require('./routes/gameStatisticsPerId');
var gamePlayersPerIdRouter = require('./routes/gamePlayersPerId');
var gamesTodayRouter = require('./routes/gamesToday');
var searchPlayerFirstnameRouter = require('./routes/searchPlayerFirstname');
var searchPlayerLastnameRouter = require('./routes/searchPlayerLastname');
var searchTeamLogoRouter = require('./routes/searchTeamLogo');
var teamsRouter = require('./routes/teams');
var standingsRouter = require('./routes/standingsAPI');
var seasonsRouter = require('./routes/seasonsAPI');
var playerInfoRouter = require('./routes/playerPerId');
var playerStatisticsRouter = require('./routes/playerStatisticsPerIdAndSeason');
var teamsRouter = require('./routes/teams');
var gamesPartitePerSquadraRouter = require('./routes/gamesPartitePerSquadra');
var gamesPerTeamAndSeasonRouter = require('./routes/gamesPerTeamAndSeason');
var playersStatisticsPerTeamAndSeasonRouter = require('./routes/playersStatisticsPerTeamAndSeason');
var standingsRouter = require('./routes/standingsAPI'); // <- manage standings
var seasonsRouter = require('./routes/seasonsAPI'); // <- manage seasons

var teamInfoRouter = require('./routes/teamInfoAPI'); // <- manage team info

var app = express();

// per ammettere richieste API da altre applicazioni
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/gamesPerDate', gamesPerDateRouter);
app.use('/gamePerId', gamePerIdRouter);
app.use('/gameStatisticsPerId', gameStatisticsIdRouter);
app.use('/gamePlayersPerId', gamePlayersPerIdRouter);

app.use('/searchPlayerFirstname', searchPlayerFirstnameRouter);
app.use('/searchPlayerLastname', searchPlayerLastnameRouter);
app.use('/searchTeamLogo', searchTeamLogoRouter);
app.use('/teams', teamsRouter);
app.use('/gamesPerTeamAndSeason', gamesPerTeamAndSeasonRouter);
app.use('/playersStatisticsPerTeamAndSeason', playersStatisticsPerTeamAndSeasonRouter);

// map standings Path
app.use('/gamesToday', gamesTodayRouter);
app.use('/standings', standingsRouter);
app.use('/seasons', seasonsRouter);
app.use('/playerInfo', playerInfoRouter);
app.use('/playerStats', playerStatisticsRouter);
app.use('/teams', teamsRouter);
app.use('/gamesPartitePerSquadra', gamesPartitePerSquadraRouter);


// map team info Path
app.use('/teamInfo', teamInfoRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {title: 'Errore'});
});


module.exports = app;