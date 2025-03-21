import configDefault from './config.default';
import configProd from './config.prod';
import configDev from './config.dev';


/**
 * 配置合并逻辑
 * 1. 取默认配置
 * 2. 根据环境变量 NODE_ENV 区分环境(开发/生产)
 * 3. 根据当前域名区分环境
 * 
 * 优先级：域名配置 > 生产配置 > 开发配置 > 默认配置
 */

const config = configDefault;

if (process.env.NODE_ENV === 'development') {
  Object.assign(config, configDev);
}

if (process.env.NODE_ENV === 'production') {
  Object.assign(config, configProd);
}

const importModules = import.meta.glob('./*.js', { eager: true });

for (const path in importModules) {
  const module = importModules[path];

  const moduleName = path.split('/').pop().replace('.js', '');

  if (moduleName.includes(window.location.hostname)) {
    Object.assign(config, module.default);
  }
}

export default config;