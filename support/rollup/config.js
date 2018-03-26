import factory from './factory';
import packageConfig from '../../package.json';

const configurations = [...factory(packageConfig)];

export default configurations;
