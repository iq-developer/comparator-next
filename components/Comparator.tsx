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
  const [finished, setFinished] = useState(false);

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

    const rect = (e.target as HTMLButtonElement).getBoundingClientRect();

    const endButton = {
      id: buttonId,
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    const newLine: Line =
      startButton.x < endButton.x
        ? {
            start: startButton,
            end: endButton,
          }
        : {
            start: endButton,
            end: startButton,
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

  const handleUpdateLines = (connected?: 'start' | 'end') => {
    const top1 = document.getElementById('top1')!.getBoundingClientRect();
    const top2 = document.getElementById('top2')!.getBoundingClientRect();
    const bottom1 = document.getElementById('bottom1')!.getBoundingClientRect();
    const bottom2 = document.getElementById('bottom2')!.getBoundingClientRect();

    const autoLines: Line[] = [
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

    console.log('initialLines:', autoLines);

    if (connected === 'start') {
      const averageStartY = (autoLines[0].start.y + autoLines[1].start.y) / 2;
      const connectedStartLines: Line[] = [
        {
          start: {
            ...autoLines[0].start,
            y: averageStartY,
          },
          end: {
            ...autoLines[0].end,
          },
        },
        {
          start: {
            ...autoLines[1].start,
            y: averageStartY,
          },
          end: {
            ...autoLines[1].end,
          },
        },
      ];
      setLines(connectedStartLines);
      return;
    }

    if (connected === 'end') {
      const averageEndY = (autoLines[0].end.y + autoLines[1].end.y) / 2;
      const connectedEndLines: Line[] = [
        {
          start: {
            ...autoLines[0].start,
          },
          end: {
            ...autoLines[0].end,
            y: averageEndY,
          },
        },
        {
          start: {
            ...autoLines[1].start,
          },
          end: {
            ...autoLines[1].end,
            y: averageEndY,
          },
        },
      ];
      console.log('connectedEndLines:', connectedEndLines);

      // Calculate the center of the lines
      const centerX = (autoLines[0].start.x + autoLines[1].end.x) / 2;
      const centerY = (autoLines[0].start.y + autoLines[1].end.y) / 2;

      console.log('centerX:', centerX);
      console.log('centerY:', centerY);

      //TODO: Refactor this

      // Apply scaleFactor 7 times (each 100 msec)
      const applyScale = (
        lines: Line[],
        scaleFactor: number,
        times: number
      ) => {
        if (times === 0) return lines;

        const scaledLines = lines.map((line) => ({
          start: {
            id: line.start.id,
            x: centerX + (line.start.x - centerX) * scaleFactor,
            y: centerY + (line.start.y - centerY) * scaleFactor,
          },
          end: {
            id: line.end.id,
            x: centerX + (line.end.x - centerX) * scaleFactor,
            y: centerY + (line.end.y - centerY) * scaleFactor,
          },
        }));

        setTimeout(() => {
          setLines(scaledLines);
          applyScale(scaledLines, scaleFactor, times - 1);
        }, 50);
      };

      applyScale(connectedEndLines, 0.8, 7);
      return;
    }

    setLines(autoLines);
  };

  const handleSwitchLines = () => {
    if (lines.length === 0) {
      handleUpdateLines();
    } else {
      setLines([]);
    }
  };

  const handlePlayAnimation = () => {
    const calculateDistance = (
      point1: { x: number; y: number },
      point2: { x: number; y: number }
    ) => {
      return Math.abs(point1.y - point2.y);
    };

    const startPoint1 = lines[0].start;
    const endPoint1 = lines[0].end;
    const startPoint2 = lines[1].start;
    const endPoint2 = lines[1].end;

    if (!startPoint1 || !endPoint1 || !startPoint2 || !endPoint2) return;

    const distance1 = calculateDistance(startPoint1, startPoint2);
    const distance2 = calculateDistance(endPoint1, endPoint2);

    if (distance1 > distance2) {
      handleUpdateLines('end');
    } else if (distance1 < distance2) {
      handleUpdateLines('start');
    } else {
      console.log('Distances are equal');
    }

    // Apply opacity 0 to lines
    const svgLines = document.querySelectorAll('line');
    svgLines.forEach((line) => {
      line.style.transition = 'opacity 0.5s';
      line.style.opacity = '0';
    });

    // Change color of ComparatorSign after 0.5 sec
    setTimeout(() => {
      setFinished(true);
    }, 500);
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
        <div className="grid grid-cols-3 h-1/6  pt-5">
          <BlockGenerator stack={leftStack} setStack={setLeftStack} />
          <Controls
            handlePlayAnimation={handlePlayAnimation}
            handleSwitchLines={handleSwitchLines}
            lines={lines}
            hidden={leftStack === 0 && rightStack === 0}
          />
          <BlockGenerator stack={rightStack} setStack={setRightStack} />
        </div>

        <div className="grid grid-cols-3 h-5/6">
          <div className="flex flex-col-reverse items-center justify-center">
            <LineStarter
              handleMouseDown={handleMouseDown}
              lines={lines}
              id="bottom1"
              hidden={leftStack === 0 && rightStack === 0}
            />
            {[...Array(leftStack)].map((_, index) => (
              <Block
                key={index}
                handleRemoveBlock={() => setLeftStack(leftStack - 1)}
              />
            ))}
            <LineStarter
              handleMouseDown={handleMouseDown}
              lines={lines}
              id="top1"
              hidden={leftStack === 0 && rightStack === 0}
            />
          </div>
          <div className="flex items-center justify-center">
            <ComparatorSign
              leftStack={leftStack}
              rightStack={rightStack}
              finished={finished}
            />
          </div>
          <div className="flex flex-col-reverse items-center justify-center">
            <LineStarter
              handleMouseDown={handleMouseDown}
              lines={lines}
              id="bottom2"
              hidden={leftStack === 0 && rightStack === 0}
            />
            {[...Array(rightStack)].map((_, index) => (
              <Block
                key={index}
                handleRemoveBlock={() => setRightStack(rightStack - 1)}
              />
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
