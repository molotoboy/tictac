/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";

const BoardConfigForm = ({ onSubmit, onChange, newBoardConfig, error }) => (
  <form onSubmit={onSubmit}>
    <label>
      <span>Ширина</span>
      <input
        type="number"
        name="boardW"
        value={newBoardConfig.boardW}
        onChange={onChange}
      />
    </label>
    <br />
    <label>
      <span>Высота</span>
      <input
        type="number"
        name="boardH"
        value={newBoardConfig.boardH}
        onChange={onChange}
      />
    </label>
    <br />
    <label>
      <span>Цель</span>
      <input
        type="number"
        name="goal"
        value={newBoardConfig.goal}
        onChange={onChange}
      />
    </label>
    <br />
    {error && <div style={{ color: `red` }}>{error}</div>}
    <br />
    <input type="submit" name="submit" value="Изменить" disabled={!!error} />
  </form>
);

export default BoardConfigForm;
