<template>
  <div>
    <el-autocomplete
      v-model="queryParam"
      :fetch-suggestions="querySearch"
      placeholder="请输入菜单名"
      valueKey="label"
      @select="handleSelect"
      clearable
      @clear="handleClear"
    >
      <template #suffix>
        <i v-show="!queryParam" class="el-input__icon el-icon-search"></i>
      </template>
    </el-autocomplete>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Data, MenuInfo, Callback } from './dataType'
export default defineComponent({
  setup() {
    const store = useStore()

    const router = useRouter()

    const menus: Array<MenuInfo> = store.state.menuNames

    const data = reactive<Data>({
      queryParam: '',
    })

    let callback: Callback | null = null

    const querySearch = (queryString: string, cb: Callback) => {
      let result: Array<MenuInfo> = []
      callback = cb
      if (queryString) {
        const searchResult = menus.filter((item: MenuInfo) =>
          item.label.includes(queryString)
        )
        if (searchResult.length) {
          result = searchResult
        } else {
          result = [
            {
              label: '暂无数据',
              path: '',
            },
          ]
        }
      } else {
        result = menus
      }
      cb(result)
    }

    const handleClear = () => {
      data.queryParam = ''
      callback && callback([])
    }

    const handleSelect = ({ path }: MenuInfo): void => {
      if (path) {
        router.push({
          path,
        })
      } else {
        handleClear()
      }
    }

    return {
      ...toRefs(data),
      querySearch,
      handleSelect,
      handleClear,
    }
  },
})
</script>

<style lang="scss" scoped>
</style>