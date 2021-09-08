import _ from 'lodash';
import './style.css'
const leaderBoard = [
    {name:'ahmad',score:100},
    {name:'ahmad',score:100},
    {name:'ahmad',score:100},
    {name:'ahmad',score:100},
    {name:'ahmad',score:100}];
const displayList = () => {
  const section = document.getElementById('leaderboard');
  const list = document.createElement('ul');
  list.id = 'list';
  leaderBoard.forEach((row) => {
    const { name, score } = row;
    let card = `<li class="" >
    <p>${name}: ${score}</p>
    </li>`;
    list.insertAdjacentHTML('beforeend', card);
  });
  section.innerHTML = '';
  section.appendChild(list);
    };
document.addEventListener('DOMContentLoaded', () => {
    displayList();
    });