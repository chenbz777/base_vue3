import request from '@/utils/request';

// 添加权限
function create(data) {
  return request.post('/permissions', data);
}

// 修改权限
function update(data) {
  return request.put(`/permissions/${data.id}`, data);
}

// 删除权限
function remove(id) {
  return request.delete(`/permissions/${id}`);
}

// 获取权限列表
function list(data) {
  return request.get('/permissions', data);
}

// 获取权限详情
function detail(data) {
  return request.get(`/permissions/${data.id}`, data);
}

export default {
  create,
  update,
  remove,
  list,
  detail
};