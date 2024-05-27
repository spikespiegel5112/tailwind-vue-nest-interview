// import { getCurrentInstance, ComponentInternalInstance } from "vue";
import service from '@/utils/service'
import { baseURL } from '@/utils/service'
// import { getCurrentInstance, ComponentInternalInstance } from 'vue'
// const currentInstance = getCurrentInstance() as ComponentInternalInstance;
// const global = currentInstance.appContext.config.globalProperties;

export const getToDoListRequest = () => {
  return service({
    url: baseURL + '/todolist/get',
    method: 'GET'
  })
}

export const createToDoListRequest = (params: any) => {
  return service({
    url: baseURL + '/todolist/create',
    method: 'POST',
    data: params
  })
}
