import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useDrag, useDrop } from '../src';
import { Title, Card } from '@elonwu/web';

import './dnd.style.css';

export default {
  title: 'Hooks/dnd',
};

const DropBox = ({
  children,
  onDrop,
  onDragEnter,
  onDragOver,
  onDragLeave,
  ...rest
}) => {
  const dropRef = useRef();

  useDrop(dropRef, { onDrop, onDragEnter, onDragOver, onDragLeave });

  return (
    <div ref={dropRef} {...rest}>
      {children}
    </div>
  );
};

const DragBox = ({
  children,
  // drag 相关
  onDragStart,
  onDragEnd,

  // drop 相关
  onDragOver,
  onDragLeave,
  onDrop,

  ...rest
}) => {
  const ref = useRef();

  useDrag(ref, { onDragStart, onDragEnd });
  useDrop(ref, { onDragOver, onDragLeave, onDrop });

  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
};

export const DndTODOStoty = () => {
  const [groups, setGroups] = useState([
    {
      key: 'todo',
      title: '未开始',
      list: [
        { id: 1, content: 'xxx1' },
        { id: 2, content: 'xxx2' },
      ],
    },
    {
      key: 'working',
      title: '进行中',
      list: [
        { id: 5, content: 'xxx5' },
        { id: 6, content: 'xxx6' },
      ],
    },
    {
      key: 'xxxx',
      title: 'xxx',
      list: [
        { id: 7, content: 'xxx7' },
        { id: 8, content: 'xxx8' },
      ],
    },
    {
      key: 'complete',
      title: '已结束',
      list: [
        { id: 3, content: 'xxx3' },
        { id: 4, content: 'xxx4' },
      ],
    },
  ]);

  return (
    <div
      style={{
        width: '100vw',
        overflow: 'auto',
        display: 'grid',
        gap: 12,
        gridAutoFlow: 'column',
        placeContent: 'flex-start',
      }}
    >
      {groups.map((group) => (
        <Group key={group.key} group={group} setGroups={setGroups} />
      ))}
    </div>
  );
};

const Group = ({ group: { key: type, title, list }, setGroups }) => {
  const onItemDragStart = useCallback(
    (e, { target, setDataTransfer }, id, type) => {
      target.classList.add('dragging');
      setDataTransfer({ data: { id, type } });
    },
    [],
  );
  const onItemDragEnd = useCallback((e, { target }) => {
    target.classList.remove('dragging');
  }, []);

  const onDragOverItem = useCallback((e, { target }, id, type) => {
    target.classList.add('hovering');
  }, []);

  const onDragLeaveItem = useCallback((e, { target }, id, type) => {
    target.classList.remove('hovering');
  }, []);

  const onDropToItem = useCallback((e, { target, data }, id, type) => {
    // 去除 hovering
    target.classList.remove('hovering');

    // 不再触发 Group 的 drop 事件
    e.stopPropagation();

    const prevType = data.type,
      nextType = type,
      prevId = data?.id,
      nextId = id;

    if (!prevType || !nextType || !prevId || !nextId) return;

    setGroups((prevGroups) => {
      const result = prevGroups.slice();

      // 找到之前的列表和元素
      const prevGroup = result.find((g) => g.key === prevType);
      const moveItem = prevGroup.list.find((el) => el.id === prevId);

      // 从之前的列表中去除元素
      prevGroup.list = prevGroup.list.filter((el) => el.id !== prevId);

      // 修改之后的列表
      const nextGroup = result.find((g) => g.key === nextType);
      const anchorIndex = nextGroup.list.findIndex((el) => el.id === nextId);
      nextGroup.list = nextGroup.list
        .slice(0, anchorIndex)
        .concat(moveItem, nextGroup.list.slice(anchorIndex));

      return result;
    });
  }, []);

  const onDropToGroup = useCallback((e, { target, data }, type) => {
    const prevType = data.type,
      nextType = type,
      id = data?.id;

    target.classList.remove('groupHovering');

    if (!prevType || !nextType || !id) return;

    setGroups((prevGroups) => {
      const result = prevGroups.slice();

      // 找到之前的列表和元素
      const prevGroup = result.find((g) => g.key === prevType);
      const item = prevGroup.list.find((el) => el.id === id);

      // 从之前的列表中去除元素
      prevGroup.list = prevGroup.list.filter((el) => el.id !== id);

      // 修改之后的列表
      const nextGroup = result.find((g) => g.key === nextType);
      nextGroup.list = nextGroup.list.concat(item);

      return result;
    });
  }, []);

  const onDragEnterGroup = useCallback((e, { target }) => {
    target.classList.add('groupHovering');
  }, []);

  const onDragLeaveGroup = useCallback((e, { target }) => {
    target.classList.remove('groupHovering');
  }, []);

  return (
    <DropBox
      className="group"
      // drop 相关
      onDrop={(e, extra) => onDropToGroup(e, extra, type)}
      onDragEnter={onDragEnterGroup}
      onDragLeave={onDragLeaveGroup}
    >
      <Title>{title}</Title>

      {list.map(({ id, content }) => (
        <DragBox
          key={id}
          // drag 相关
          onDragStart={(e, extra) => onItemDragStart(e, extra, id, type)}
          onDragEnd={onItemDragEnd}
          // drop 相关
          onDragOver={(e, extra) => onDragOverItem(e, extra, id, type)}
          onDragLeave={(e, extra) => onDragLeaveItem(e, extra, id, type)}
          onDrop={(e, extra) => onDropToItem(e, extra, id, type)}
          style={{
            transition: 'all .2s ease',
          }}
        >
          <div
            className="content"
            style={{
              background: '#fff',
              border: '1px solid #ededed',
              borderRadius: 8,
              padding: 16,
            }}
          >
            {content}
          </div>
        </DragBox>
      ))}
    </DropBox>
  );
};
