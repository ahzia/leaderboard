import './css/style.css';
import Game from './js/Game.js';

const displayList = (data) => {
  const section = document.getElementById('leaderboard');
  const list = document.createElement('ul');
  list.id = 'list';
  if (data !== []) {
    data.forEach((row) => {
      const { user, score } = row;
      const card = `<li class="" >
    <p>${user}: ${score}</p>
    </li>`;
      list.insertAdjacentHTML('beforeend', card);
    });
  }
  section.innerHTML = '';
  section.appendChild(list);
};

const setMessage = (message) => {
  const errorLabel = document.getElementById('error');
  errorLabel.innerHTML = message;
};

document.addEventListener('DOMContentLoaded', () => {
  const gameName = 'New Game 123';
  const newGame = new Game(gameName);
  const gameId = localStorage.getItem('gameId');
  if (gameId === null) {
    setMessage('Wait - Creating the Game');
    newGame.create().then(() => {
      setMessage('Wait - Loading data');
      newGame.get().then(() => {
        displayList(newGame.data);
        setMessage('');
      });
    });
  } else {
    newGame.setId(gameId);
    setMessage('Wait - Loading data');
    newGame.get().then(() => {
      displayList(newGame.data);
      setMessage('');
    });
  }
  const submit = document.getElementById('submit');
  const refresh = document.getElementById('refresh');
  submit.addEventListener('click', (event) => {
    event.preventDefault();
    const name = document.getElementById('name');
    const score = document.getElementById('score');
    if (name.value === '' || score.value === '') {
      setMessage('Name and Score is Required');
    } else {
      setMessage('Wait - Saving data');
      newGame.save(name.value, score.value).then(() => {
        newGame.get().then(() => {
          displayList(newGame.data);
          name.value = '';
          score.vlaue = '';
          setMessage('Saved');
        });
      });
    }
  });
  refresh.addEventListener('click', () => {
    setMessage('Wait - Loading data');
    newGame.get().then(() => {
      setMessage('');
      displayList(newGame.data);
    });
  });
});