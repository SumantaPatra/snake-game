
import './App.css';
import Snake from './components/snake';
import { useEffect, useState } from 'react';
import { getRandomFood } from './utils';
import { Food } from './components/food';
import { Score } from './components/score';

function App() {
  const initialState = {
    food: getRandomFood(),
    direction: "RIGHT",
    speed: 200,
    score:0,
    snakeDots: [[0, 0], [2, 0]]     
    }
  const [state,setState] = useState(initialState)

  function onKeyDown(e){
   switch(e.keyCode){
    case 37:
      setState((prevState)=>{
        if(prevState.direction !== "RIGHT"){
          return{
            ...prevState,
            direction:"LEFT"
           }
        }
        return {
          ...prevState
        }
       
      })
      break;
    case 38:
        setState((prevState)=>{
         if(prevState.direction !== "DOWN"){
          return {
            ...prevState,
            direction:"UP"
          }
         }
         return {
          ...prevState
         }
        })
      break;
    case 39:
        setState((prevState)=>{
          if(prevState.direction !== "LEFT"){
            return {
              ...prevState,
              direction:"RIGHT"
            }
          }
          return {
            ...prevState
          }
        })
      break;
    case 40:
        setState((prevState)=>{
          if(prevState.direction !== "UP"){
            return {
              ...prevState,
              direction:"DOWN"
            }
          }
          return {
            ...prevState
          }
        })
      break; 
   }
  }
  function gameOver(){
    alert(`score ${state.score}`)
    setState(initialState)
  }

  function checkOutofBounds(){
    let head = state.snakeDots[state.snakeDots.length-1]

    if(head[0] >= 100 || head[0] < 0 || head[1] >= 100 || head[1] < 0){
      gameOver()
    }
  }

  function eatFood(){

   let head = state.snakeDots[state.snakeDots.length-1]

   if(head[0] === state.food[0] && head[1] === state.food[1]){
      setState((prevState)=>{
        return {
          ...prevState,
          score:state.score+1,
          food:getRandomFood()
        }
      })
    increaseSnake()
    increaseSpeed()
   }

  }
  function increaseSpeed(){
    setState((prevState)=>{
      return{
        ...prevState,
        speed: state.speed - (state.score/ 10)
      }
    })
  }
  function increaseSnake(){
     let dots = [...state.snakeDots]
     dots.unshift([])
     setState((prevState)=>{
      return {
        ...prevState,
        snakeDots:dots
      }
     })
  }

  function checkColision(){
    
    let snake = [...state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        gameOver();
      }
    });

  }



  
  const moveSnake = ()=>{
    setState(prevState => {
      let head = prevState.snakeDots[prevState.snakeDots.length - 1];
      switch (prevState.direction) {
        case "RIGHT":
           head = [head[0] + 2, head[1]];
          break;
        case "LEFT": 
          head = [head[0]-2,head[1]]        
          break;
        case "UP":
          head = [head[0],head[1]-2]
          break;
        case "DOWN":
          head = [head[0],head[1]+2]
          break;
      }
      let dots = [...prevState.snakeDots];
      dots.push(head);
      dots.shift();
      
      return {
        ...prevState,
        snakeDots: dots
      };
    });
  
  }
  useEffect(()=>{
   const timer =  setInterval(()=>{
      moveSnake()
    },state.speed)

    document.onkeydown = onKeyDown;

    return (()=>{
      clearInterval(timer)
    })
  },[])

  useEffect(()=>{
    checkOutofBounds()
    checkColision()
    eatFood()
  })


  return (
    <div className='relative'>
    <div className='w-[600px] h-[500px] relative mx-auto my-12 flex flex-wrap border-[#dc042c] border-2' >
    <Score score={state.score}/>
    <Snake snakeDots={state.snakeDots}/>
     <Food dot = {state.food}/>
    </div>
    </div>
  );
}

export default App;
