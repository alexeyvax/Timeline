import React from 'react';
import { mount } from 'enzyme';
import Item from './Item.jsx';
import Controls from '../Controls/Controls.jsx';
import { PROJECT } from '../../../constants';
import { dataWithColor, dataWithEmptyName } from '../../../asset/mocks/List';

describe('Project component', () => {
  const edit = jest.fn();
  const cancel = jest.fn();
  const save = jest.fn();
  const remove = jest.fn();
  const onSetCurrentProject = jest.fn();

  describe('renders correctly span with isEdit mode disable', () => {
    const output = mount((
      <Item
        type={PROJECT}
        data={dataWithColor}
        save={save}
        remove={remove}
        onSetCurrentProject={onSetCurrentProject}
      >
        <Controls
          data={dataWithColor}
          isEdit={false}
          edit={edit}
          save={save}
          cancel={cancel}
          remove={remove}
        />
      </Item>
    ));

    it('renders correctly span', () => {
      const li = output.find(`.${PROJECT}-item`);
      expect(li.length).toBe(1);
    });

    describe('change correctly state and check buttons work', () => {
      it('change state - isEdit, button - edit', () => {
        const button = output.find('.edit');

        expect(button.length).toBe(1);
        button.simulate('click');

        const { isEdit } = output.state();
        expect(isEdit).toBe(true);
      });

      it('change isEdit, value, warning states and button - cancel', () => {
        const button = output.find('.cancel');

        expect(button.length).toBe(1);
        button.simulate('click');

        const { isEdit, value, warning } = output.state();

        expect(isEdit).toBe(false);
        expect(warning).toBe(false);
        expect(value).toBe(dataWithColor.name);
      });

      describe('change isEdit, warning states and button - save', () => {
        const button = output.find('.edit');

        it('button is exist', () => {
          expect(button.length).toBe(1);
        });

        button.simulate('click');
        const buttonSave = output.find('.save');

        it('buttonSave is exist', () => {
          expect(buttonSave.length).toBe(1);
        });

        buttonSave.simulate('click');
        const { isEdit, value } = output.state();

        it('if data.name filled', () => {
          expect(save).toBeCalledWith(PROJECT, value, dataWithColor._id);
          expect(isEdit).toBe(false);
        });
      });

      describe('button - remove', () => {
        const button = output.find('.remove');

        it('button is exist', () => {
          expect(button.length).toBe(1);
        });

        button.simulate('click');

        it('if data.name filled', () => {
          expect(remove).toBeCalledWith(PROJECT, dataWithColor._id);
        });
      });
    });
  });

  describe('if data.name empty', () => {
    const output = mount((
      <Item
        type={PROJECT}
        data={dataWithEmptyName}
        save={save}
        remove={remove}
        onSetCurrentProject={onSetCurrentProject}
      >
        <Controls
          data={dataWithEmptyName}
          isEdit={false}
          edit={edit}
          save={save}
          cancel={cancel}
          remove={remove}
        />
      </Item>
    ));

    const buttonEdit = output.find('.edit');

    it('buttonEdit is exist', () => {
      expect(buttonEdit.length).toBe(1);
    });
    buttonEdit.simulate('click');

    it('if data.name empty', () => {
      const buttonSave = output.find('.save');
      expect(buttonSave.length).toBe(1);

      buttonSave.simulate('click');

      const { warning } = output.state();
      expect(warning).toBe(true);
    });
  });
});
