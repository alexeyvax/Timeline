/* disable line because it usage in the tests */
import { configure } from 'enzyme'; // eslint-disable-line
import Adapter from 'enzyme-adapter-react-15'; // eslint-disable-line

configure({ adapter: new Adapter() });
