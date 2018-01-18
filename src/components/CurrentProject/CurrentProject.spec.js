import React from 'react';
import { mount } from 'enzyme';
import CurrentProject from './CurrentProject.jsx';
import { dataWithColor } from '../../asset/mocks/List';

describe('CurrentProject', () => {
  const dataIsNull = null;
  const isRemoveTrue = true;
  const isRemoveFalse = false;
  const onReset = jest.fn();
  const onClearDay = jest.fn();

  describe('renders correctly with empty data', () => {
    const textContent = "project isn't selected";
    const output = mount((
      <CurrentProject
        data={dataIsNull}
        isRemove={isRemoveFalse}
        onReset={onReset}
        onClearDay={onClearDay}
      />
    ));

    it('renders correctly element .empty', () => {
      const empty = output.find('.empty');

      expect(empty.length).toBe(1);
      expect(empty.text()).toBe(textContent);
    });

    describe('check element .clear-day -> isRemove mode disable', () => {
      const clearDay = output.find('.clear-day');

      it("element .clear-day hasn't class .removeButton", () => {
        expect(clearDay.hasClass('removeButton')).toBeFalsy();
      });
    });
  });

  describe('renders correctly with filled data', () => {
    const expectBackgroundColor = 'background-color: rgb(222, 222, 222);';
    const textResetButton = 'reset current project';
    const output = mount((
      <CurrentProject
        data={dataWithColor}
        isRemove={isRemoveTrue}
        onReset={onReset}
        onClearDay={onClearDay}
      />
    ));

    const container = output.find('.container');

    it('renders correctly element .container', () => {
      expect(container.length).toBe(1);
    });

    it('renders correctly element .color', () => {
      const color = container.find('.color');

      expect(container.length).toBe(1);
      expect(color.get(0).props.style.backgroundColor).toEqual(dataWithColor.color);
      expect(color.html().match(/style="([^"]*)"/)[1]).toEqual(expectBackgroundColor);
    });

    it('renders correctly element .description', () => {
      const description = container.find('.description');

      expect(description.length).toBe(1);
      expect(description.text()).toEqual(dataWithColor.name);
    });

    it('renders correctly element .resetButton', () => {
      const resetButton = output.find('.resetButton');

      expect(resetButton.length).toBe(1);
      expect(resetButton.text()).toEqual(textResetButton);

      resetButton.simulate('click');
      expect(onReset).toHaveBeenCalled();
    });
  });

  describe('renders correctly with isRemove mode active', () => {
    const textContent = 'delete mode is activated';
    const output = mount((
      <CurrentProject
        data={dataIsNull}
        isRemove={isRemoveTrue}
        onReset={onReset}
        onClearDay={onClearDay}
      />
    ));

    it('renders correctly element .remove', () => {
      const remove = output.find('.remove');

      expect(remove.length).toBe(1);
      expect(remove.text()).toBe(textContent);
    });
  });

  describe('check element .clear-day', () => {
    describe('isRemove mode active', () => {
      const textButton = 'Clear day';
      const output = mount((
        <CurrentProject
          data={dataIsNull}
          isRemove={isRemoveTrue}
          onReset={onReset}
          onClearDay={onClearDay}
        />
      ));

      const clearDay = output.find('.clear-day');

      it('renders correctly with element .clear-day', () => {
        expect(clearDay.length).toBe(1);
      });

      it('element .clear-day has class .removeButton', () => {
        expect(clearDay.hasClass('removeButton')).toBeTruthy();
      });

      it('renders correctly with element button', () => {
        const button = clearDay.find('button');

        expect(button.length).toBe(1);
        expect(button.text()).toBe(textButton);
      });

      it('check called func', () => {
        const button = clearDay.find('button');

        button.simulate('click');
        expect(onClearDay).toBeCalled();
      });
    });
  });
});
