import React from 'react';
import { mount } from 'enzyme';
import Project from './Project.jsx';
import { PROJECT } from '../../../constants';
import { dataWithColor, value } from '../../../asset/mocks/List';

describe('Project component', () => {
  const warning = false;
  const handleChange = jest.fn();
  const onSetCurrentProject = jest.fn();

  describe('renders correctly span with isEdit mode disable', () => {
    const isEdit = false;
    const output = mount((
      <Project
        type={PROJECT}
        data={dataWithColor}
        isEdit={isEdit}
        value={value}
        warning={warning}
        handleChange={handleChange}
        onSetCurrentProject={onSetCurrentProject}
      />
    ));

    it('renders correctly span', () => {
      const span = output.find('.project-container');
      expect(span.length).toBe(1);
    });

    it('call func onSetCurrentProject', () => {
      const span = output.find('.project-container');

      expect(span.length).toBe(1);
      span.simulate('click');
      expect(onSetCurrentProject).toBeCalledWith(dataWithColor);
    });

    describe('renders correctly inner elements', () => {
      const expectBackgroundColor = 'background-color: rgb(222, 222, 222);';

      it('element .color', () => {
        const color = output.find('.color');

        expect(color.length).toBe(1);
        expect(color.get(0).props.style.backgroundColor).toEqual(dataWithColor.color);
        expect(color.html().match(/style="([^"]*)"/)[1]).toEqual(expectBackgroundColor);
      });

      it('renders correctly element .description', () => {
        const description = output.find('.description');

        expect(description.length).toBe(1);
        expect(description.hasClass(`${PROJECT}-name`)).toBeTruthy();
        expect(description.text()).toEqual(dataWithColor.name);
      });
    });
  });

  describe('renders correctly span with isEdit mode active', () => {
    const isEdit = true;
    const output = mount((
      <Project
        type={PROJECT}
        data={dataWithColor}
        isEdit={isEdit}
        value={value}
        warning={warning}
        handleChange={handleChange}
        onSetCurrentProject={onSetCurrentProject}
      />
    ));

    it('renders correctly span', () => {
      const span = output.find('.project-container');
      expect(span.length).toBe(1);
    });

    it('call func onSetCurrentProject', () => {
      const span = output.find('.project-container');

      expect(span.length).toBe(1);
      span.simulate('click');
      // expect(onSetCurrentProject).toBeCalledWith(data);
    });

    it('renders correctly input', () => {
      const input = output.find('input');

      expect(input.length).toBe(1);
      expect(input.props().value).toBe(value);
    });
  });
});
