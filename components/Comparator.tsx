'use client';

import React, { useState, MouseEvent, TouchEvent, useEffect } from 'react';
import Block from './Block';
import BlockGenerator from './BlockGenerator';
import Controls from './Controls';
import LineStarter from './LineStarter';
import ComparatorSign from './ComparatorSign';
import type { Line } from '../types';
import { TouchBackend } from 'react-dnd-touch-backend';
import { DndProvider } from 'react-dnd';
import { Dustbin } from './Dustbin';
import AddBlockPlace from './AddBlockPlace';

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
  const [isLabelMode, setIsLabelMode] = useState(true);

  // Handlers
  const handleMouseDown = (
    e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>
  ) => {
    const buttonId = (e.target as HTMLButtonElement).id;
    if (startButton || !buttonId) return;

    const rect = (e.target as HTMLButtonElement).getBoundingClientRect();
    setStartButton({
      id: buttonId,
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  };

  const handleMouseUp = (
    e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>
  ) => {
    if (!startButton) return;

    const target =
      e.type === 'touchend'
        ? document.elementFromPoint(
            (e as TouchEvent<HTMLButtonElement>).changedTouches[0].clientX,
            (e as TouchEvent<HTMLButtonElement>).changedTouches[0].clientY
          )
        : (e.target as HTMLButtonElement);

    if (!target || !target.id || target.id === startButton.id) {
      setStartButton(null);
      return;
    }

    const isCorrectLine =
      (startButton.id === 'top1' && target.id === 'top2') ||
      (startButton.id === 'bottom1' && target.id === 'bottom2') ||
      (startButton.id === 'top2' && target.id === 'top1') ||
      (startButton.id === 'bottom2' && target.id === 'bottom1');

    if (!isCorrectLine) {
      setStartButton(null);
      return;
    }

    const rect = target.getBoundingClientRect();

    const endButton = {
      id: target.id,
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

  const handleMouseMove = (
    e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>
  ) => {
    if (!startButton) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const line = document.getElementById('in-progress-line')!;
    line.setAttribute('x2', clientX.toString());
    line.setAttribute('y2', clientY.toString());
  };

  const handleUpdateLines = (connected?: 'start' | 'end' | 'equal') => {
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

    const centerX = (autoLines[0].start.x + autoLines[0].end.x) / 2;
    const centerY = (autoLines[0].start.y + autoLines[1].start.y) / 2;

    const applyScale = (lines: Line[], scaleFactor: number, times: number) => {
      if (times === 0) return lines;

      const minYDistance = leftStack === rightStack ? 14 : 26;

      const scaledLines = lines.map((line) => {
        const scaledStartY = centerY + (line.start.y - centerY) * scaleFactor;
        const limitedStartY =
          Math.abs(centerY - scaledStartY) < minYDistance && scaledStartY !== 0
            ? line.start.y
            : scaledStartY;

        const scaledEndY = centerY + (line.end.y - centerY) * scaleFactor;
        const limitedEndY =
          Math.abs(centerY - scaledEndY) < minYDistance && scaledEndY !== 0
            ? line.end.y
            : scaledEndY;

        return {
          start: {
            id: line.start.id,
            x: centerX + (line.start.x - centerX) * scaleFactor,
            y: limitedStartY,
          },
          end: {
            id: line.end.id,
            x: centerX + (line.end.x - centerX) * scaleFactor,
            y: limitedEndY,
          },
        };
      });

      setTimeout(() => {
        setLines(scaledLines);
        applyScale(scaledLines, scaleFactor, times - 1);
      }, 50);
    };

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

      applyScale(connectedStartLines, 0.75, 7);
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

      applyScale(connectedEndLines, 0.75, 7);
      return;
    }

    if (connected === 'equal') {
      applyScale(autoLines, 0.75, 7);
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
      handleUpdateLines('equal');
    }

    const svgLines = document.querySelectorAll('line');
    svgLines.forEach((line) => {
      line.style.transition = 'opacity 0.5s';
      line.style.opacity = '0';
      line.style.transitionTimingFunction = 'ease-in';
    });

    setTimeout(() => {
      setFinished(true);
      setLines([]);
    }, 400);
  };

  useEffect(() => {
    if (lines.length === 0) return;
    handleUpdateLines();
  }, [leftStack, rightStack]);

  useEffect(() => {
    if (lines.length === 0) return;
    setFinished(false);
  }, [lines]);

  return (
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      <div
        className="flex justify-center flex-col items-center h-screen bg-gray-100"
        role="application"
        onMouseMove={handleMouseMove}
        onMouseUp={() => setStartButton(null)}
        onTouchMove={handleMouseMove}
        onTouchEnd={() => setStartButton(null)}
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
            <BlockGenerator
              stack={leftStack}
              setStack={setLeftStack}
              isLabelMode={isLabelMode}
            />
            <Controls
              handlePlayAnimation={handlePlayAnimation}
              handleSwitchLines={handleSwitchLines}
              lines={lines}
              hidden={leftStack === 0 && rightStack === 0}
              isLabelMode={isLabelMode}
              setIsLabelMode={() => setIsLabelMode(!isLabelMode)}
            />
            <BlockGenerator
              stack={rightStack}
              setStack={setRightStack}
              isLabelMode={isLabelMode}
            />
          </div>

          <div className="grid grid-cols-3 h-5/6">
            <div className="flex flex-col-reverse items-center justify-center">
              <LineStarter
                handleMouseDown={handleMouseDown}
                handleMouseUp={handleMouseUp}
                lines={lines}
                id="bottom1"
                hidden={leftStack === 0 && rightStack === 0}
              />
              {[...Array(leftStack)].map((_, index) => (
                <Block
                  key={index}
                  handleRemoveBlock={() => setLeftStack(leftStack - 1)}
                  handleAddBlock={() =>
                    setLeftStack(leftStack < 10 ? leftStack + 1 : leftStack)
                  }
                  finished={finished}
                />
              ))}
              {leftStack === 0 && (
                <AddBlockPlace
                  handleAddBlock={() =>
                    setLeftStack(leftStack < 10 ? leftStack + 1 : leftStack)
                  }
                  position="left"
                />
              )}
              <LineStarter
                handleMouseDown={handleMouseDown}
                handleMouseUp={handleMouseUp}
                lines={lines}
                id="top1"
                hidden={leftStack === 0 && rightStack === 0}
              />
            </div>
            <div className=" relative flex items-center justify-center">
              <ComparatorSign
                leftStack={leftStack}
                rightStack={rightStack}
                finished={finished}
              />
              <Dustbin />
            </div>
            <div className="flex flex-col-reverse items-center justify-center">
              <LineStarter
                handleMouseDown={handleMouseDown}
                handleMouseUp={handleMouseUp}
                lines={lines}
                id="bottom2"
                hidden={leftStack === 0 && rightStack === 0}
              />
              {[...Array(rightStack)].map((_, index) => (
                <Block
                  key={index}
                  handleRemoveBlock={() => setRightStack(rightStack - 1)}
                  handleAddBlock={() =>
                    setRightStack(rightStack < 10 ? rightStack + 1 : rightStack)
                  }
                  finished={finished}
                />
              ))}
              {rightStack === 0 && (
                <AddBlockPlace
                  handleAddBlock={() =>
                    setRightStack(rightStack < 10 ? rightStack + 1 : rightStack)
                  }
                  position="right"
                />
              )}
              <LineStarter
                handleMouseDown={handleMouseDown}
                handleMouseUp={handleMouseUp}
                lines={lines}
                id="top2"
                hidden={leftStack === 0 && rightStack === 0}
              />
            </div>
          </div>
        </div>

        <div className="absolute text-gray-400 bottom-0 right-1">v 1.3</div>
      </div>
    </DndProvider>
  );
};

export default Comparator;
