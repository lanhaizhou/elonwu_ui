import { useState, useEffect } from 'react';
import { SelectProps, IOptions } from '.';

const useSelect = ({
  options = [],
  multiple,
  onChange,
  defaultValue,
}: SelectProps) => {
  const [selectData, setSelectData] = useState([...options]);
  const [selectedAll, setSelectedAll] = useState(false); // 默认不全选中

  // 初始化值
  useEffect(() => {
    const newState = selectData.map((item) => {
      let selected = false;
      if (Array.isArray(defaultValue)) {
        selected = defaultValue.includes(item.value) ? true : false;
      } else {
        selected = item.value === defaultValue ? true : false;
      }
      return {
        ...item,
        selected,
      };
    });
    setSelectData(newState);
  }, []);

  const handleClickItem = (item: IOptions, index: number) => {
    let newState = [...selectData];
    const { selected, disabled } = item;
    if (disabled) return;
    newState[index].selected = !selected;
    if (multiple) {
      const valueSelected = newState.filter((i) => i.selected);
      const values = valueSelected.map((i) => i.value);
      onChange && onChange(values, valueSelected);
      if (!newState[index].selected) {
        setSelectedAll(false);
      }
      // 检查是否已经全部selected
      const notDisabled = newState.filter((item) => !item?.disabled);
      const isAllSelected = notDisabled.every((item) => item?.selected);
      setSelectedAll(isAllSelected);
    } else {
      if (newState[index].selected) {
        newState = newState.map((i) => {
          return {
            ...i,
            selected: newState[index].value === i.value ? true : false,
          };
        });
        onChange &&
          onChange(item.value, { label: item.label, value: item.value });
      } else {
        onChange && onChange('', '');
      }
    }

    setSelectData(newState);
  };

  const handleClickAll = () => {
    setSelectedAll(!selectedAll);
    let newState = [...selectData];
    if (!selectedAll) {
      newState = [...selectData].map((item) => {
        return {
          ...item,
          selected: item?.disabled ? false : true,
        };
      });
    } else {
      newState = [...selectData].map((item) => {
        return {
          ...item,
          selected: false,
        };
      });
    }

    const valueSelected = newState.filter((i) => i.selected);
    const values = valueSelected.map((i) => i.value);
    onChange && onChange(values);
    setSelectData(newState);
  };

  return {
    selectData,
    selectedAll,
    handleClickItem,
    handleClickAll,
  };
};

export default useSelect;
