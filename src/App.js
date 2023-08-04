import { useEffect, useState } from 'react';
import './App.css';
// import Axios from 'axios';
import reloadIcon from './assets/icons8-reload-24.png';

function App() {
  const [datas, setDatas] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [correctAns, setCorrectAns] = useState([]);
  const [score, setScore] = useState(0);
  const [quesNumber, setQuesNumber] = useState(0);
  const [styling, setStyling] = useState([{
    visibility: 'visible'
  }, {
    visibility: 'hidden'
  }])
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple');
      const json = await response.json();
      setDatas(json.results);
    }
    fetchData();

  }, [])

  useEffect(() => {
    if (datas.length > 0) {
      let temp = [];
      let arr = [];
      let correctAnsArr = []
      for (let i = 0; i < datas.length; i++) {
        correctAnsArr.push(datas[i].correct_answer)
        temp = [datas[i].correct_answer, ...datas[i].incorrect_answers];
        shuffle(temp)
        arr.push(temp)
      }

      function shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex !== 0) {

          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;

          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }

        return array;
      }

      setCorrectAns(correctAnsArr)
      setAnswers(arr)
    }
  }, [datas])

  useEffect(() => {
    if (count === 5) {
      setStyling([{
        visibility: 'hidden'
      }, {
        visibility: 'visible'
      }])
    }
  }, [count, styling])

  // console.log(datas);
  // console.log(correctAns);

  const scoreHandler = (e, i, answer) => {
    if (correctAns[i] === answer) {
      setScore(score + 1)
    }
    if (i < 4) {
      setQuesNumber(quesNumber + 1)
    }
    setCount(count + 1)
  }

  // Play again reload is here
  const gameReloadHandler = ()=>{
    console.log('Hello');
    window.location.reload(true)
  }

  return (
    <div className="App">
      <h1 className='heading'>Quiz App</h1>
      <div className='card'>
        {(datas.length > 0) ? (
          <div className='questionBox' style={styling[0]}>
            <p className='quesNumber'>Question: {quesNumber + 1}<small>/5</small></p>
            <p className='question'>{datas[quesNumber].question}</p>
          </div>
        ) : (<></>)}
        {(answers.length > 0) ? (
          <div className='answerBox' style={styling[0]}>
            <p className='answer' onClick={(e) => scoreHandler(e, quesNumber, answers[quesNumber][0])}>{answers[quesNumber][0]}</p>
            <p className='answer' onClick={(e) => scoreHandler(e, quesNumber, answers[quesNumber][1])} >{answers[quesNumber][1]}</p>
            <p className='answer' onClick={(e) => scoreHandler(e, quesNumber, answers[quesNumber][2])} >{answers[quesNumber][2]}</p>
            <p className='answer' onClick={(e) => scoreHandler(e, quesNumber, answers[quesNumber][3])} >{answers[quesNumber][3]}</p>
          </div>
        ) : (<></>)}
        <div className='scoreBox' style={styling[1]}>
          <p className='scoreShow' >You scored {score} out of 5</p>
          <button className='playAgain-button' onClick={(e)=>gameReloadHandler()}>
            <span>
              Play Again
            </span>
            <img src={reloadIcon} alt='reloadIcon' />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
