import configDefault from './config.default';


const importModules = import.meta.glob('./*.js', { eager: true });

const config = configDefault;

for (const path in importModules) {
  const module = importModules[path];

  const moduleName = path.split('/').pop().replace('.js', '');

  if (moduleName.includes(window.location.hostname)) {
    Object.assign(config, module.default);
  }
}

export default config;