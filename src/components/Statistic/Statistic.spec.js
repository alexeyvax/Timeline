import React from 'react';
import { mount } from 'enzyme';
import Statistic from './Statistic.jsx';
import mainData from '../../asset/mocks/PieChart';

describe('Project component', () => {
  describe('if isVisibleStatistic === false', () => {
    const onShowStatistic = jest.fn();
    const output = mount((
      <Statistic
        isVisibleStatistic={false}
        onShowStatistic={onShowStatistic}
        onHideStatistic={jest.fn()}
      />
    ));

    it('renders correctly .statistic', () => {
      const container = output.find('.statistic');
      expect(container.length).toBe(1);
    });

    describe('renders correctly buttons open, close', () => {
      it('open', () => {
        const textContent = 'Show statistic';
        const buttonOpen = output.find('.open');

        expect(buttonOpen.length).toBe(1);
        expect(buttonOpen.text()).toBe(textContent);
        expect(buttonOpen.props().disabled).toBe(false);

        buttonOpen.simulate('click');
        expect(onShowStatistic).toBeCalled();
      });

      it('close', () => {
        const textContent = 'Hide statistic';
        const buttonClose = output.find('.close');

        expect(buttonClose.length).toBe(1);
        expect(buttonClose.text()).toBe(textContent);
        expect(buttonClose.props().disabled).toBe(true);
      });
    });
  });

  describe('if isVisibleStatistic === true', () => {
    const statistic = [mainData];
    const onHideStatistic = jest.fn();
    const output = mount((
      <Statistic
        isVisibleStatistic={true}
        statistic={statistic}
        onShowStatistic={jest.fn()}
        onHideStatistic={onHideStatistic}
      />
    ));

    it('renders correctly .statistic', () => {
      const container = output.find('.statistic');
      expect(container.length).toBe(1);
    });

    describe('renders correctly buttons open, close', () => {
      it('open', () => {
        const textContent = 'Show statistic';
        const buttonOpen = output.find('.open');

        expect(buttonOpen.length).toBe(1);
        expect(buttonOpen.text()).toBe(textContent);
        expect(buttonOpen.props().disabled).toBe(true);
      });

      it('close', () => {
        const textContent = 'Hide statistic';
        const buttonClose = output.find('.close');

        expect(buttonClose.length).toBe(1);
        expect(buttonClose.text()).toBe(textContent);
        expect(buttonClose.props().disabled).toBe(false);

        buttonClose.simulate('click');
        expect(onHideStatistic).toBeCalled();
      });
    });

    describe('renders correctly .container', () => {
      const container = output.find('.container');

      it('renders correctly .container', () => {
        expect(container.length).toBe(1);
        expect(container.hasClass('show')).toBeTruthy();
      });

      it('renders correctly li', () => {
        const li = container.find('li');
        expect(li.length).toBe(1);
      });

      it('renders correctly .name', () => {
        const name = container.find('.employee-name');

        expect(name.length).toBe(1);
        expect(name.text()).toBe(`name: ${mainData.name}`);
      });

      it('renders correctly .count', () => {
        const count = container.find('.count');

        expect(count.length).toBe(1);
        expect(count.text()).toBe('count days and hours in current month');
      });

      describe('renders correctly .time', () => {
        it('test .time', () => {
          const time = container.find('.time');

          expect(time.length).toBe(1);
        });

        describe('test inner elements', () => {
          const firstProjectName = 'firstProject';
          const time = container.find('.time');

          it('test .name', () => {
            const name = time.find('.name');

            expect(name.length).toBe(1);
            expect(name.text()).toBe(firstProjectName);
          });

          it('test .value', () => {
            const value = time.find('.value');

            expect(value.length).toBe(1);
            expect(value.text()).toBe((
              `${mainData.data[firstProjectName].count}d — ${mainData.data[firstProjectName].hours}h`
            ));
          });
        });
      });

      describe('renders correctly .other-days', () => {
        it('test .other-days', () => {
          const otherDays = container.find('.other-days');

          expect(otherDays.length).toBe(1);
        });

        describe('test inner elements', () => {
          const otherDays = container.find('.other-days');

          it('test .name', () => {
            const name = otherDays.find('.name');

            expect(name.length).toBe(1);
            expect(name.text()).toBe('other days');
          });

          it('test .value', () => {
            const value = otherDays.find('.value');

            expect(value.length).toBe(1);
            expect(value.text()).toBe(`${mainData.otherDays.count}`);
          });
        });
      });
    });
  });
});
