'use client';

import React, { useState, MouseEvent } from 'react';
import Block from './Block';

interface Line {
  start: { id: string; x: number; y: number };
  end: { id: string; x: number; y: number };
}

const Comparator: React.FC = () => {
  const [startButton, setStartButton] = useState<{
    id: string;
    x: number;
    y: number;
  } | null>(null);
  const [lines, setLines] = useState<Line[]>([]);

  const handleMouseDown = (e: MouseEvent<HTMLButtonElement>) => {
    const buttonId = e.target.id;
    if (startButton || !buttonId) return;

    const rect = e.target.getBoundingClientRect();
    setStartButton({
      id: buttonId,
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  };

  const handleMouseUp = (e: MouseEvent<HTMLDivElement>) => {
    if (!startButton) return;

    const buttonId = e.target.id;
    if (!buttonId || buttonId === startButton.id) {
      setStartButton(null);
      return;
    }

    const isCorrectLine =
      (startButton.id === 'top1' && buttonId === 'top2') ||
      (startButton.id === 'bottom1' && buttonId === 'bottom2') ||
      (startButton.id === 'top2' && buttonId === 'top1') ||
      (startButton.id === 'bottom2' && buttonId === 'bottom1');

    if (!isCorrectLine) {
      setStartButton(null);
      return;
    }

    if (lines.length > 0) {
      alert('Correct!');
    }

    const rect = e.target.getBoundingClientRect();
    const newLine: Line = {
      start: startButton,
      end: {
        id: buttonId,
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      },
    };

    setLines([...lines, newLine]);
    setStartButton(null);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!startButton) return;

    const line = document.getElementById('in-progress-line')!;
    line.setAttribute('x2', e.clientX.toString());
    line.setAttribute('y2', e.clientY.toString());
  };

  const handleSwitchLines = () => {
    if (lines.length === 0) {
      const top1 = document.getElementById('top1')!.getBoundingClientRect();
      const top2 = document.getElementById('top2')!.getBoundingClientRect();
      const bottom1 = document
        .getElementById('bottom1')!
        .getBoundingClientRect();
      const bottom2 = document
        .getElementById('bottom2')!
        .getBoundingClientRect();

      const initialLines: Line[] = [
        {
          start: {
            id: 'top1',
            x: top1.left + top1.width / 2,
            y: top1.top + top1.height / 2,
          },
          end: {
            id: 'top2',
            x: top2.left + top2.width / 2,
            y: top2.top + top2.height / 2,
          },
        },
        {
          start: {
            id: 'bottom1',
            x: bottom1.left + bottom1.width / 2,
            y: bottom1.top + bottom1.height / 2,
          },
          end: {
            id: 'bottom2',
            x: bottom2.left + bottom2.width / 2,
            y: bottom2.top + bottom2.height / 2,
          },
        },
      ];

      setLines(initialLines);
    } else {
      setLines([]);
    }
  };

  const handlePlayAnimation = () => {
    console.log('start lines animation');
  };

  const isButtonDisabled = (id: string) => {
    return lines.some((line) => line.start.id === id || line.end.id === id);
  };

  return (
    <div
      className="flex justify-center flex-col items-center h-screen bg-gray-100"
      role="application"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {lines.map((line, index) => (
          <line
            key={index}
            x1={line.start.x}
            y1={line.start.y}
            x2={line.end.x}
            y2={line.end.y}
            stroke="#0ea5e9"
            strokeWidth="8"
          />
        ))}
        {startButton && (
          <line
            id="in-progress-line"
            x1={startButton.x}
            y1={startButton.y}
            x2={startButton.x}
            y2={startButton.y}
            stroke="#0ea5e9"
            strokeWidth="8"
          />
        )}
      </svg>

      <div className="w-[700px] h-[600px] bg-white grid grid-cols-3">
        <div className="flex items-center justify-center">
          <input
            type="text"
            value="1"
            className="w-20 h-10 border-2 border-gray-300 rounded-md text-center font-bold"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={handleSwitchLines}
            className={`w-24 h-10  hover:bg-sky-600 rounded-md m-1 ${
              lines.length === 0 ? 'bg-sky-500' : 'bg-gray-400'
            }`}
          >
            {lines.length === 0 ? 'Show lines' : 'Hide lines'}
          </button>

          <button
            onClick={handlePlayAnimation}
            disabled={lines.length === 0}
            className={`w-10 h-10  rounded-full m-1 ${
              lines.length === 0 ? 'bg-gray-300' : 'bg-sky-500 hover:bg-sky-600'
            }`}
          >
            ►
          </button>
        </div>
        <div className="flex items-center justify-center">
          <input
            type="text"
            value="10"
            className="w-20 h-10 border-2 border-gray-300 rounded-md text-center font-bold"
          />
        </div>
        <div className="flex flex-col-reverse items-center justify-center ">
          <button
            id="bottom1"
            className={`w-10 h-10 bg-white hover:bg-sky-200 border-dashed border-gray-300 border-2 rounded-full m-1 text-gray-300 text-xl ${
              isButtonDisabled('bottom1') ? 'opacity-0' : ''
            }`}
            onMouseDown={handleMouseDown}
            disabled={isButtonDisabled('bottom1')}
          >
            ⇢
          </button>
          <Block />
          <button
            id="top1"
            className={`w-10 h-10 bg-white hover:bg-sky-200 border-dashed border-gray-300 border-2 rounded-full m-1 text-gray-300 text-xl ${
              isButtonDisabled('top1') ? 'opacity-0' : ''
            }`}
            onMouseDown={handleMouseDown}
            disabled={isButtonDisabled('top1')}
          >
            ⇢
          </button>
        </div>
        <div className="flex items-center justify-center text-9xl text-gray-400">
          {' '}
          &lt;{' '}
        </div>
        <div className="flex flex-col-reverse items-center justify-center">
          <button
            id="bottom2"
            className={`w-10 h-10 bg-white hover:bg-sky-200 border-dashed border-gray-300 border-2 rounded-full m-1 text-gray-300 text-xl ${
              isButtonDisabled('bottom2') ? 'opacity-0 ' : ''
            }`}
            onMouseDown={handleMouseDown}
            disabled={isButtonDisabled('bottom2')}
          >
            ⇠
          </button>
          <Block />
          <Block />
          <Block />
          <Block />
          <Block />
          <Block />
          <Block />
          <Block />
          <Block />
          <Block />
          <button
            id="top2"
            className={`w-10 h-10 bg-white hover:bg-sky-200 border-dashed border-gray-300 border-2 rounded-full m-1 text-gray-300 text-xl ${
              isButtonDisabled('top2') ? 'opacity-0' : ''
            }`}
            onMouseDown={handleMouseDown}
            disabled={isButtonDisabled('top2')}
          >
            ⇠
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comparator;
