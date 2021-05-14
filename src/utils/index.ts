import NProgress from 'nprogress'
import { ElLoading } from 'element-plus'
interface Child {
  name: string;
  path: string;
  menuName: string;
  menuId: number;
  parentId: number;
}

interface Menu {
  children?: Array<Child>;
  name: string;
  path: string;
  menuName: string;
  menuId: number;
  parentId: number;
}

interface Result {
  path: string;
  name: string;
  menuId: number;
  parentId: number;
}

function findParentElement(
  data: Array<Menu>,
  parentId: number,
  tempdata: Array<Menu>
): Array<Result> {
  const result = []
  const { length } = data
  for (let i = 0; i < length; i++) {
    const item = data[i]
    if (item.menuId === parentId) {
      result.unshift({
        path: item.path,
        name: item.menuName,
        menuId: item.menuId,
        parentId: item.parentId
      })
      if (item.parentId !== 0) {
        result.unshift(...findParentElement(tempdata, item.parentId, tempdata))
      } else {
        break
      }
    } else if (item.children && item.children.length) {
      result.unshift(...findParentElement(item.children, parentId, tempdata))
    }
  }
  return result
}

interface Fn<T = any> {
  (value?: T): void;
}

interface FullScreenLoading {
  isFirstLoad: boolean;
  loadingInstance: any | undefined;
  time: number;
  open: Fn;
  close: Fn;
}

let fullScreenLoading: FullScreenLoading | null = {
  isFirstLoad: false,
  loadingInstance: undefined,
  time: 1500,
  open(time: number) {
    NProgress.configure({ showSpinner: false })
    NProgress.start()
    if (!this.isFirstLoad) {
      if (time) {
        this.time = time
      }
      this.loadingInstance = ElLoading.service({
        lock: true,
        text: '拼命加载中...',
        spinner: 'el-icon-loading',
        background: '#fff'
      })
    }
  },
  close() {
    if (this.loadingInstance) {
      this.isFirstLoad = true
      setTimeout(() => {
        NProgress.done()
        const app: any = document.querySelector('#app')
        if (app) {
          app.style.display = 'block'
        }
        this.loadingInstance.close()
        // 销毁
        fullScreenLoading = null
      }, this.time)
    }
  }
}

export { findParentElement, Menu, Result, fullScreenLoading }
