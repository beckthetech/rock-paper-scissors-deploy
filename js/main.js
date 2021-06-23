/*----- constants -----*/
// variables that are not going to be re-assigned
const lookupRPS = ['r', 'p', 's'];

const rps = {
	r: {
		beats: 's',
		imgUrl: 'imgs/rock.png',
	},
	p: {
		beats: 'r',
		imgUrl: 'imgs/paper.png',
	},
	s: {
		beats: 'p',
		imgUrl: 'imgs/scissors.png',
	},
};

const beepAudio = new Audio(
	'http://soundbible.com/mp3/Robot_blip-Marianne_Gagnon-120342607.mp3'
);
const goAudio = new Audio(
	'http://soundbible.com/mp3/shooting_star-Mike_Koenig-1132888100.mp3'
);

/*----- app's state (variables) -----*/
// data at a given moment in time
let scores, results, winner;

/*----- cached element references -----*/
// html elements to be manipulated
const pScoreEl = document.querySelector('#player h2');
const tScoreEl = document.querySelector('#middle h2');
const cScoreEl = document.querySelector('#computer h2');

const pResultEl = document.querySelector('#player div div');
const cResultEl = document.querySelector('#computer div div');

const countdownEl = document.querySelector('#middle div');

/*----- event listeners -----*/
// button to "play" the game
document.querySelector('button').addEventListener('click', countDown);

/*----- functions -----*/
function initialize() {
	// initialize our data to start the game
	scores = {
		p: 0,
		c: 0,
		t: 0,
	};
	results = {
		p: 'r',
		c: 'r',
	};
	winner = null;
	render();
}

function getRandomIdx() {
	return Math.floor(Math.random() * 3);
}

function startRound() {
	// randomly select results for player and computer
	results.p = lookupRPS[getRandomIdx()];
	results.c = lookupRPS[getRandomIdx()];
	winner = getWinner();
	scores[winner]++;
	render();
}

function countDown() {
	let count = 3;
	beepAudio.play();
	countdownEl.textContent = count;
	countdownEl.style.border = '4px solid black';
	let timerId = setInterval(() => {
		count--;
		if (count) {
			beepAudio.play();
			countdownEl.textContent = count;
		} else {
			clearInterval(timerId);
			goAudio.play();
			countdownEl.textContent = '';
			countdownEl.style.border = '4px solid white';
			startRound();
		}
	}, 1000);
}

function getWinner() {
	return results.p === results.c
		? 't'
		: rps[results.p].beats === results.c
		? 'p'
		: 'c';
}

function render() {
	// this function will be called whenever state is changed
	// renders the apps state
	pScoreEl.textContent = scores.p;
	cScoreEl.textContent = scores.c;
	tScoreEl.textContent = scores.t;

	pResultEl.style.backgroundImage = `url(${rps[results.p].imgUrl})`;
	cResultEl.style.backgroundImage = `url(${rps[results.c].imgUrl})`;

	pResultEl.parentElement.style.border =
		winner === 'p' ? '10px solid darkgrey' : '10px solid white';
	cResultEl.parentElement.style.border =
		winner === 'c' ? '10px solid darkgrey' : '10px solid white';
}

initialize();
