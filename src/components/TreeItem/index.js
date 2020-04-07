import React, { useState } from "react";

export const TreeItem = ({
  title,
  id,
  children,
  addChildren,
  createChild,
  creatingChild,
  renderItems,
  hideChildren,
  hidingChildren,
}) => {
  const [childrenTitle, setChildrenTitle] = useState("");

  // Тут динамически задается стиль для сокрытия и открытия по клику на сам айтем

  const cls = ["tree-item__children", hideChildren ? "hide" : ""];

  // Хэндлер для создания дочернего айтема

  const createHandler = (e, id, childrenTitle) => {
    if (e.key === "Enter") {
      addChildren(id, childrenTitle);
      setChildrenTitle("");
    }
  };

  return (
    <li className="tree-item">
      <button
        onClick={() => createChild(id)}
        className="btn-floating small red"
      >
        +
      </button>
      <span onClick={() => hidingChildren(id)}>{title}</span>
      {creatingChild ? (
        <input
          value={childrenTitle}
          onChange={(e) => setChildrenTitle(e.target.value)}
          onKeyPress={(e) => createHandler(e, id, childrenTitle)}
          type="text"
          autoFocus
        />
      ) : null}
      <ul className={cls.join(" ")}>{renderItems(children)}</ul>
    </li>
  );
};
