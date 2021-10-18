import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useDrag, useDrop } from '../src';
import { Title } from '@elonwu/web';

export default {
  title: 'Hooks/DragAndDrop',
};

export const DndStory = () => {
  const [tasks, setTasks] = useState([1, 2, 3, 4, 5]);
  const [completes, setCompletes] = useState([6]);

  const onCompleteDrop = useCallback((e, { target, data }) => {
    target.style.background = '#f5f5f5';

    if (data?.type === 'incomplete') {
      setTasks((prev) => prev.filter((el) => el !== data?.li));

      setCompletes((prev) => prev.concat(data?.li));
    }
  }, []);

  const onInCompleteDrop = useCallback((e, { target, data }) => {
    target.style.background = '#f5f5f5';
    if (data?.type === 'complete') {
      setTasks((prev) => prev.concat(data?.li));
      setCompletes((prev) => prev.filter((el) => el !== data?.li));
    }
  }, []);

  const onDropToInCompleteItem = useCallback(
    (data, dropI) => {
      console.log({ data, dropI });

      const dropIndex = completes.findIndex((el) => el === dropI);

      if (dropIndex < 0) return;

      let item;
      if (data?.type === 'incomplete') {
        item = tasks.find((el) => el === data?.li);
      } else if (data?.type === 'complete') {
        item = completes.find((el) => el === data?.li);
      }
    },
    [tasks, completes],
  );

  const onDropToCompleteItem = useCallback(
    (data, dropI) => {
      console.log({ data, dropI });

      const dropIndex = completes.findIndex((el) => el === dropI);

      if (dropIndex < 0) return;

      let item;
      if (data?.type === 'incomplete') {
        item = tasks.find((el) => el === data?.li);
      } else if (data?.type === 'complete') {
        item = completes.find((el) => el === data?.li);
      }
    },
    [tasks, completes],
  );

  const onDragOver = (e, { target }) => {
    target.style.background = 'lightblue';
  };
  const onDragLeave = (e, { target }) => {
    target.style.background = '#f5f5f5';
  };

  return (
    <div
      style={{
        display: 'grid',
        gap: 24,
        gridTemplateColumns: 'repeat(2, 1fr)',
      }}
    >
      {/* 未完成 */}
      <div>
        <Title>未完成</Title>
        <DropBox
          onDrop={onInCompleteDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
        >
          {tasks.map((li) => (
            <DragBox
              key={li}
              onDragStart={(e, { target, setDataTransfer }) => {
                target.classList.add('dragging');
                setDataTransfer({ data: { li, type: 'incomplete' } });
              }}
              onDrop={(e, { target, data }) => {
                onDropToInCompleteItem(data, li);
              }}
            >
              {li}
            </DragBox>
          ))}
        </DropBox>
      </div>

      {/* 完成 */}
      <div>
        <Title>完成</Title>
        <DropBox
          onDrop={onCompleteDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
        >
          {completes.map((li) => (
            <DragBox
              key={li}
              onDragStart={(e, { target, setDataTransfer }) => {
                target.classList.add('dragging');
                setDataTransfer({ data: { li, type: 'complete' } });
              }}
              onDrop={(e, { target, data }) => {
                onDropToCompleteItem(data?.li, li);
              }}
            >
              {li}
            </DragBox>
          ))}
        </DropBox>
      </div>
    </div>
  );
};

const DropBox = ({
  children,
  onDrop,
  onDragEnter,
  onDragOver,
  onDragLeave,
}) => {
  const dropRef = useRef();

  useDrop(dropRef, { onDrop, onDragEnter, onDragOver, onDragLeave });

  return (
    <div
      ref={dropRef}
      style={{
        background: '#f5f5f5',
        border: '1px solid #ededed',
        borderRadius: 8,
        padding: 16,
        width: 400,
        height: 400,

        display: 'grid',
        gap: 12,
        placeContent: 'flex-start stretch',
        // placeItems: 'flex-start stretch',
        overflow: 'auto',
      }}
    >
      {children}
    </div>
  );
};

const DragBox = ({ children, onDragStart, onDrop }) => {
  const ref = useRef();

  useDrag(ref, { onDragStart });
  useDrop(ref, { onDrop });

  return (
    <div
      ref={ref}
      style={{
        background: '#fff',
        border: '1px solid #ededed',
        borderRadius: 8,
        padding: 16,
        transition: 'all .2s ease',
      }}
    >
      {children}
    </div>
  );
};
