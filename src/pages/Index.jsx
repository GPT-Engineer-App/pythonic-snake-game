import React, { useState, useEffect, useRef } from "react";

const Index = () => {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const interval = setInterval(() => {
      if (gameOver) return;

      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };

        if (head.x === food.x && head.y === food.y) {
          setFood({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) });
        } else {
          newSnake.pop();
        }

        if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 || newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          return prevSnake;
        }

        newSnake.unshift(head);
        return newSnake;
      });

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "black";
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = "red";
      context.fillRect(food.x * 20, food.y * 20, 20, 20);

      context.fillStyle = "green";
      snake.forEach(segment => context.fillRect(segment.x * 20, segment.y * 20, 20, 20));
    }, 100);

    return () => clearInterval(interval);
  }, [direction, food, gameOver, snake]);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowUp":
        if (direction.y === 0) setDirection({ x: 0, y: -1 });
        break;
      case "ArrowDown":
        if (direction.y === 0) setDirection({ x: 0, y: 1 });
        break;
      case "ArrowLeft":
        if (direction.x === 0) setDirection({ x: -1, y: 0 });
        break;
      case "ArrowRight":
        if (direction.x === 0) setDirection({ x: 1, y: 0 });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div>
        <h1 className="text-3xl text-center">Snake Game</h1>
        <canvas ref={canvasRef} width="400" height="400" className="border border-black" />
        {gameOver && <p className="text-center text-red-500">Game Over</p>}
      </div>
    </div>
  );
};

export default Index;