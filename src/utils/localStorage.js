// 赋值(标识, 值, 过期时间 => 单位s)
const set = (key, value, expirationTime) => {

  if (!key) {
    return false;
  }

  if (expirationTime) {
    // 设置了过期时间 => 重新计算过期时间

    const currentTime = new Date();

    currentTime.setSeconds(currentTime.getSeconds() + expirationTime);

    localStorage.setItem(key, JSON.stringify({
      value,
      expirationTime: currentTime.getTime()
    }));
  } else if (get(key)) {
    // 没有过期时间，并且数据存在 => 仅更换value

    const data = get(key);

    if (data) {
      localStorage.setItem(key, JSON.stringify({
        value,
        expirationTime: data.expirationTime
      }));
    }
  } else {
    // 没有过期时间，数据也不存在 => 新增数据
    localStorage.setItem(key, JSON.stringify({
      value,
      expirationTime: -1
    }));
  }

};

const getValueByKey = (key) => {
  if (!key) {
    return null;
  }

  const value = localStorage.getItem(key);

  if (!value) {
    return null;
  }

  try {
    const data = JSON.parse(value);

    // 判断是否存在过期时间
    if ((data.expirationTime !== -1) && (Date.now() > data.expirationTime)) {

      del(key);

      return null;
    }

    return data.value;
  } catch (e) {
    // 解析失败 => 说明是原生数据
    return value;
  }
};

const getAll = () => {
  const allLocalStorage = {};

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    const value = getValueByKey(key);

    if (value !== null) {
      allLocalStorage[key] = value;
    }
  }

  return allLocalStorage;
};

const get = (key) => {
  // 获取所有数据, 目的是为了清空过期数据
  getAll();

  return getValueByKey(key);
};

const del = (key) => {

  if (!key) {
    return false;
  }

  localStorage.removeItem(key);

  return true;
};

const delAll = () => {

  localStorage.clear();

  return true;
};


export default {
  set,
  get,
  del,
  delAll,
  getAll
};