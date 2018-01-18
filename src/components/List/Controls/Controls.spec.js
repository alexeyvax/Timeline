import React from 'react';
import { mount } from 'enzyme';
import Controls from './Controls.jsx';
import { dataWithColor } from '../../../asset/mocks/List';

describe('Controls', () => {
  const edit = jest.fn();
  const save = jest.fn();
  const cancel = jest.fn();
  const remove = jest.fn();

  describe('renders correctly Controls with isEdit mode disabled', () => {
    const isEdit = false;
    const output = mount((
      <Controls
        data={dataWithColor}
        isEdit={isEdit}
        edit={edit}
        save={save}
        cancel={cancel}
        remove={remove}
      />
    ));

    it('constrols container isExist', () => {
      const container = output.find('.controls-item');
      expect(container.length).toBe(1);
    });

    describe('check inner elements', () => {
      it('button .edit isExist', () => {
        const textContent = 'Edit';
        const button = output.find('.edit');

        expect(button.length).toBe(1);
        expect(button.text()).toBe(textContent);
        expect(button.props().disabled).toBeFalsy();

        button.simulate('click');
        expect(edit).toBeCalled();
      });

      it('button .save isExist', () => {
        const textContent = 'Save';
        const button = output.find('.save');

        expect(button.length).toBe(1);
        expect(button.text()).toBe(textContent);
        expect(button.props().disabled).toBeTruthy();
      });

      it('button .cancel isExist', () => {
        const textContent = 'Cancel';
        const button = output.find('.cancel');

        expect(button.length).toBe(1);
        expect(button.text()).toBe(textContent);
        expect(button.props().disabled).toBeTruthy();
      });

      it('button .remove isExist', () => {
        const textContent = 'Remove';
        const button = output.find('.remove');

        expect(button.length).toBe(1);
        expect(button.text()).toBe(textContent);
        expect(button.props().disabled).toBeFalsy();

        button.simulate('click');
        expect(remove).toBeCalledWith(dataWithColor._id);
      });
    });
  });

  describe('renders correctly Controls with isEdit mode active', () => {
    const isEdit = true;
    const output = mount(<Controls
        data={dataWithColor}
        isEdit={isEdit}
        edit={edit}
        save={save}
        cancel={cancel}
        remove={remove}
      />);

    it('constrols container isExist', () => {
      const container = output.find('.controls-item');
      expect(container.length).toBe(1);
    });

    describe('check inner elements', () => {
      it('button .edit isExist', () => {
        const textContent = 'Edit';
        const button = output.find('.edit');

        expect(button.length).toBe(1);
        expect(button.text()).toBe(textContent);
        expect(button.props().disabled).toBeTruthy();
      });

      it('button .save isExist', () => {
        const textContent = 'Save';
        const button = output.find('.save');

        expect(button.length).toBe(1);
        expect(button.text()).toBe(textContent);
        expect(button.props().disabled).toBeFalsy();

        button.simulate('click');
        expect(save).toBeCalledWith(dataWithColor._id);
      });

      it('button .cancel isExist', () => {
        const textContent = 'Cancel';
        const button = output.find('.cancel');

        expect(button.length).toBe(1);
        expect(button.text()).toBe(textContent);
        expect(button.props().disabled).toBeFalsy();

        button.simulate('click');
        expect(cancel).toBeCalled();
      });

      it('button .remove isExist', () => {
        const textContent = 'Remove';
        const button = output.find('.remove');

        expect(button.length).toBe(1);
        expect(button.text()).toBe(textContent);
        expect(button.props().disabled).toBeFalsy();

        button.simulate('click');
        expect(remove).toBeCalledWith(dataWithColor._id);
      });
    });
  });
});
