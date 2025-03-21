import configDefault from './config.default';
import configProd from './config.prod';
import configDev from './config.dev';


const importModules = import.meta.glob('./*.js', { eager: true });

const config = configDefault;

if (process.env.NODE_ENV === 'development') {
  Object.assign(config, configDev);
}

if (process.env.NODE_ENV === 'production') {
  Object.assign(config, configProd);
}

for (const path in importModules) {
  const module = importModules[path];

  const moduleName = path.split('/').pop().replace('.js', '');

  if (moduleName.includes(window.location.hostname)) {
    Object.assign(config, module.default);
  }
}

export default config;