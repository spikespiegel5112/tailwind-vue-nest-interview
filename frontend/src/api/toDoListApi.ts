// import { getCurrentInstance, ComponentInternalInstance } from "vue";
import service from '@/utils/service'
import { baseURL } from '@/utils/service'
// import { getCurrentInstance, ComponentInternalInstance } from 'vue'
// const currentInstance = getCurrentInstance() as ComponentInternalInstance;
// const global = currentInstance.appContext.config.globalProperties;

export const getToDoListRequest = () => {
  return service({
    url: '/todolist/get',
    method: 'GET'
  })
}

export const toDoListGetFromRedisRequest = () => {
  return service({
    url: '/todolist/getFromRedis',
    method: 'GET'
  })
}

export const createToDoListRequest = (params: any) => {
  return service({
    url: '/todolist/create',
    method: 'POST',
    data: params
  })
}

export const updateToDoListRequest = (data: any) => {
  return service({
    url: `/todolist/update`,
    method: 'PUT',
    data
  })
}

export const todolistUpdateToRedisRequest = (data: any) => {
  return service({
    url: `/todolist/updateToRedis`,
    method: 'PUT',
    data
  })
}

export const toDoListDeleteRequest = (data: any) => {
  return service({
    url: `/todolist/delete`,
    method: 'DELETE',
    data
  })
}

export const toDoListDeleteFromRedisRequest = (data: any) => {
  return service({
    url: `/todolist/deleteToDoListFromRedis`,
    method: 'DELETE',
    data
  })
}

export const synchronizeDataRequest = () => {
  return service({
    url: `/todolist/synchronizeData`,
    method: 'POST'
  })
}

export const synchronizeDataToRedisRequest = (payload: any[]) => {
  return service({
    url: `/todolist/synchronizeDataToRedis`,
    method: 'POST',
    data: payload
  })
}
