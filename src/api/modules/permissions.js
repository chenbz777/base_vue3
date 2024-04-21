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
function destroy(id) {
  return request.delete(`/permissions/${id}`);
}

// 批量删除
function destroyBatch(data) {
  return request.post('/permissions/destroyBatch', data);
}

// 获取列表
function list(data) {
  return request.get('/permissions', data);
}

// 获取详情
function detail(data) {
  return request.get(`/permissions/${data.id}`, data);
}

export default {
  create,
  update,
  destroy,
  destroyBatch,
  list,
  detail
};