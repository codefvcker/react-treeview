import React, { useState } from "react";
import { TreeItem } from "../TreeItem";

export const Tree = () => {
  const [list, setList] = useState([]);
  const [hideTree, setHideTree] = useState(false);
  const [rootItemTitle, setRootItemTitle] = useState("");

  // Описание айтема

  const treeItem = {
    title: "",
    id: Date.now(),
    children: [],
    creatingChild: false,
    hideChildren: false,
  };

  // Добавление корневого айтема

  const addRootItem = (e, list) => {
    e.preventDefault();
    if (rootItemTitle.length) {
      treeItem.title = rootItemTitle;
      setList([...list, treeItem]);
      setHideTree(false);
      setRootItemTitle("");
    } else {
      alert("Type some text");
    }
  };

  // Отрисовка списка

  const renderItems = (list) =>
    list.map((item) => (
      <TreeItem
        addChildren={addChildren}
        createChild={createChild}
        key={item.id}
        id={item.id}
        title={item.title}
        children={item.children}
        creatingChild={item.creatingChild}
        renderItems={renderItems}
        hideChildren={item.hideChildren}
        hidingChildren={hidingChildren}
      />
    ));

  // Создание дочернего айтема (знаю что тут костыльно сейчас будет повторятся mapWrap)
  // mapWrap рекурсивно вызывается для того чтобы пробежать по чаилдам

  const createChild = (id) => {
    const mapWrap = (list) =>
      list.map((item) => {
        if (item.id === id) {
          item.creatingChild = true;
        } else if (item.children.length) {
          mapWrap(item.children);
        }
        return item;
      });

    const newList = mapWrap(list);

    setList(newList);
  };

  // Добавление дочернего айтема в список

  const addChildren = (id, childrenTitle) => {
    treeItem.title = childrenTitle;

    const mapWrap = (list) =>
      list.map((item) => {
        if (item.id === id) {
          item.creatingChild = false;
          item.hideChildren = false;
          item.children = [...item.children, treeItem];
        } else if (item.children.length) {
          mapWrap(item.children);
        }
        return item;
      });

    const newList = mapWrap(list);

    setList(newList);
  };

  // Функция позволяющая скрывать чайлдов по клику

  const hidingChildren = (id) => {
    const mapWrap = (list) =>
      list.map((item) => {
        if (item.id === id) {
          item.hideChildren = !item.hideChildren;
        } else if (item.children.length) {
          mapWrap(item.children);
        }
        return item;
      });

    const newList = mapWrap(list);

    setList(newList);
  };

  // Функция скрывающая все дерево по клику на кнопку
  // Кнопка динамически меняет состояние с Hide на Show

  const hideTreeHandler = (e) => {
    e.preventDefault();
    setHideTree(!hideTree);
  };

  return (
    <>
      <form onSubmit={(e) => addRootItem(e, list)}>
        <input
          value={rootItemTitle}
          onChange={(e) => setRootItemTitle(e.target.value)}
          type="text"
        />
        <button type="submit" className="btn">
          Add
        </button>
        <button onClick={(e) => hideTreeHandler(e)} className="btn">
          {hideTree ? "Show" : "Hide"}
        </button>
      </form>
      <ul className={hideTree ? "hide" : ""}>{renderItems(list)}</ul>
    </>
  );
};
