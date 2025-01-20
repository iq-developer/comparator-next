'use client';

import React, { useState, MouseEvent, useEffect } from 'react';
import Block from './Block';
import BlockGenerator from './BlockGenerator';
import Controls from './Controls';
import LineStarter from './LineStarter';
import ComparatorSign from './ComparatorSign';
import type { Line } from '../types';

const Comparator: React.FC = () => {
  // State
  const [startButton, setStartButton] = useState<{
    id: string;
    x: number;
    y: number;
  } | null>(null);
  const [lines, setLines] = useState<Line[]>([]);
  const [leftStack, setLeftStack] = useState<number>(0);
  const [rightStack, setRightStack] = useState<number>(0);

  // Handlers
  const handleMouseDown = (e: MouseEvent<HTMLButtonElement>) => {
    const buttonId = (e.target as HTMLButtonElement).id;
    if (startButton || !buttonId) return;

    const rect = (e.target as HTMLButtonElement).getBoundingClientRect();
    setStartButton({
      id: buttonId,
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  };

  const handleMouseUp = (e: MouseEvent<HTMLDivElement>) => {
    if (!startButton) return;

    const buttonId = (e.target as HTMLButtonElement).id;
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

    const rect = (e.target as HTMLButtonElement).getBoundingClientRect();
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

  const handleUpdateLines = () => {
    const top1 = document.getElementById('top1')!.getBoundingClientRect();
    const top2 = document.getElementById('top2')!.getBoundingClientRect();
    const bottom1 = document.getElementById('bottom1')!.getBoundingClientRect();
    const bottom2 = document.getElementById('bottom2')!.getBoundingClientRect();

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
  };

  const handleSwitchLines = () => {
    if (lines.length === 0) {
      handleUpdateLines();
    } else {
      setLines([]);
    }
  };

  const handlePlayAnimation = () => {
    console.log('start lines animation');
  };

  useEffect(() => {
    if (lines.length === 0) return;
    handleUpdateLines();
  }, [leftStack, rightStack]);

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

      <div className="w-[700px] h-[600px] bg-white flex flex-col bg">
        <div className="grid grid-cols-3 h-1/5  pt-10">
          <BlockGenerator stack={leftStack} setStack={setLeftStack} />
          <Controls
            handlePlayAnimation={handlePlayAnimation}
            handleSwitchLines={handleSwitchLines}
            lines={lines}
            hidden={leftStack === 0 && rightStack === 0}
          />
          <BlockGenerator stack={rightStack} setStack={setRightStack} />
        </div>

        <div className="grid grid-cols-3 h-4/5">
          <div className="flex flex-col-reverse items-center justify-center">
            <LineStarter
              handleMouseDown={handleMouseDown}
              lines={lines}
              id="bottom1"
              hidden={leftStack === 0 && rightStack === 0}
            />
            {[...Array(leftStack)].map((_, index) => (
              <Block key={index} />
            ))}
            <LineStarter
              handleMouseDown={handleMouseDown}
              lines={lines}
              id="top1"
              hidden={leftStack === 0 && rightStack === 0}
            />
          </div>
          <div className="flex items-center justify-center">
            <ComparatorSign leftStack={leftStack} rightStack={rightStack} />
          </div>
          <div className="flex flex-col-reverse items-center justify-center">
            <LineStarter
              handleMouseDown={handleMouseDown}
              lines={lines}
              id="bottom2"
              hidden={leftStack === 0 && rightStack === 0}
            />
            {[...Array(rightStack)].map((_, index) => (
              <Block key={index} />
            ))}
            <LineStarter
              handleMouseDown={handleMouseDown}
              lines={lines}
              id="top2"
              hidden={leftStack === 0 && rightStack === 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comparator;
