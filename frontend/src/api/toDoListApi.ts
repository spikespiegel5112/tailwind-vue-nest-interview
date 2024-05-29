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

export const deleteToDoListRequest = (data: any) => {
  return service({
    url: `/todolist/delete`,
    method: 'DELETE',
    data
  })
}
