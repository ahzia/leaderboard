import { get } from 'lodash';
import './css/style.css';
import Game from './js/Game.js'

const displayList = (data) => {
  const section = document.getElementById('leaderboard');
  const list = document.createElement('ul');
  list.id = 'list';
  if(data!=[]){
  data.forEach((row) => {
    const { user, score } = row;
    const card = `<li class="" >
    <p>${user}: ${score}</p>
    </li>`;
    list.insertAdjacentHTML('beforeend', card);
  });}
  section.innerHTML = '';
  section.appendChild(list);
};
document.addEventListener('DOMContentLoaded', () => {
  const newGame = new Game('New Game');
  newGame.create().then(()=>{
    newGame.get().then(() =>{
      displayList(newGame.data);
    })
});
const submit = document.getElementById('submit');
const refresh = document.getElementById('refresh');
submit.addEventListener('click', (event)=>{
event.preventDefault();
const name = document.getElementById('name').value;
const score = document.getElementById('score').value;
newGame.save(name, score).then(() =>{
  newGame.get().then(() =>{
    displayList(newGame.data);
  });
});
});
refresh.addEventListener('click' , ()=>{
  newGame.get().then(() =>{
    displayList(newGame.data);
  });
})
});