import React from 'react';
import { mount } from 'enzyme';
import Cell from './Cell.jsx';
import { emptyData, weekendData, filledData } from '../../../asset/mocks/Cell';

describe('CurrentProject', () => {
  const id = 'test-id';
  const isRemoveTrue = true;
  const isRemoveFalse = false;
  const onChooseStatus = jest.fn();
  const onSaveHours = jest.fn();

  describe('renders correctly with empty data', () => {
    const output = mount((
      <Cell
        id={id}
        data={emptyData}
        isRemove={isRemoveFalse}
        onChooseStatus={onChooseStatus}
        onSaveHours={onSaveHours}
      />
    ));

    it('renders correctly element .cell', () => {
      const cell = output.find('.cell');
      expect(cell.length).toBe(1);
    });

    it("element .cell hasn't class .weekend", () => {
      const cell = output.find('.cell');
      expect(cell.hasClass('weekend')).toBeFalsy();
    });

    it("element .cell hasn't class .remove", () => {
      const cell = output.find('.cell');
      expect(cell.hasClass('remove')).toBeFalsy();
    });
  });

  describe('renders correctly with weekend data', () => {
    const output = mount((
      <Cell
        id={id}
        data={weekendData}
        isRemove={isRemoveFalse}
        onChooseStatus={onChooseStatus}
        onSaveHours={onSaveHours}
      />
    ));

    it('renders correctly element .cell', () => {
      const cell = output.find('.cell');
      expect(cell.length).toBe(1);
    });

    it('element .cell has class .weekend', () => {
      const cell = output.find('.cell');
      expect(cell.hasClass('weekend')).toBeTruthy();
    });

    it("element .cell hasn't class .remove", () => {
      const cell = output.find('.cell');
      expect(cell.hasClass('remove')).toBeFalsy();
    });
  });

  describe('renders correctly with filled data', () => {
    const expectBackgroundColor = 'background-color: rgb(222, 222, 222);';
    const output = mount((
      <Cell
        id={id}
        data={filledData}
        isRemove={isRemoveFalse}
        onChooseStatus={onChooseStatus}
        onSaveHours={onSaveHours}
      />
    ));

    it('renders correctly element .cell', () => {
      const cell = output.find('.cell');
      expect(cell.length).toBe(1);
    });

    it('check style in element .cell', () => {
      const cell = output.find('.cell');

      expect(cell.get(0).props.style.backgroundColor).toEqual(filledData.color);
      expect(cell.html().match(/style="([^"]*)"/)[1]).toEqual(expectBackgroundColor);
    });
  });

  describe('renders correctly inner elements', () => {
    const output = mount((
      <Cell
        id={id}
        data={filledData}
        isRemove={isRemoveFalse}
        onChooseStatus={onChooseStatus}
        onSaveHours={onSaveHours}
      />
    ));

    it('element .cell', () => {
      const cell = output.find('.cell');
      expect(cell.length).toBe(1);
    });

    it('element .hint with data.status', () => {
      const hint = output.find('.hint');
      expect(hint.length).toBe(1);
    });

    it('element button', () => {
      const button = output.find('button');

      expect(button.length).toBe(1);
      button.simulate('click');
      expect(onChooseStatus).toHaveBeenCalled();
    });
  });

  describe('change state correctly when button onDoubleClick event called', () => {
    it('if isRemove to be true', () => {
      const output = mount((
        <Cell
          id={id}
          data={filledData}
          isRemove={isRemoveTrue}
          onChooseStatus={onChooseStatus}
          onSaveHours={onSaveHours}
        />
      ));

      const button = output.find('button');
      button.simulate('doubleClick');

      const { isEdit } = output.state();
      expect(isEdit).toBe(false);
    });

    it('if isRemove to be false', () => {
      const output = mount((
        <Cell
          id={id}
          data={filledData}
          isRemove={isRemoveFalse}
          onChooseStatus={onChooseStatus}
          onSaveHours={onSaveHours}
        />
      ));

      const button = output.find('button');
      button.simulate('doubleClick');

      const { isEdit } = output.state();
      expect(isEdit).toBe(true);
    });
  });

  describe('renders correctly element input', () => {
    const output = mount((
      <Cell
        id={id}
        data={filledData}
        isRemove={isRemoveFalse}
        onChooseStatus={onChooseStatus}
        onSaveHours={onSaveHours}
      />
    ));

    it('when isEdit mode activated', () => {
      const button = output.find('button');
      button.simulate('doubleClick');

      const { isEdit } = output.state();
      expect(isEdit).toBe(true);

      const input = output.find('input');
      expect(input.length).toBe(1);
    });

    it('when isEdit mode disabled', () => {
      const input = output.find('input');
      expect(input.length).toBe(1);
    });
  });
});
