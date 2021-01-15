/* eslint-disable */

import { ElMessage } from "element-plus";
import { reactive, watch } from "vue";
import { Config, Param, Pagination } from '@/utils/base';
import loadsh from 'lodash';

interface Data {
    pagination: Pagination;
    pageSizes: Array<number>;
    list: Array<{
        [key: string]: any;
    }>;
    total: number;
    isCreated: boolean;
    visible: boolean;
    loading: boolean;
}

const getHandleFn = (config: Config) => {

    const baseData = reactive<Data>({
        pagination: {
            pageNum: 1,
            pageSize: 10,
        },
        pageSizes: [10, 20, 30, 40],
        list: [],
        total: 0,
        isCreated: true,
        visible: false,
        loading: false
    })

    const handleDialog = (value: boolean) => {
        baseData.visible = value
    }

    const getQueryParam = (): Param => {
        // 非分页
        if (config.isNotPagination) {
            return config.queryParam || {}
        } else {
            if (loadsh.isEmpty(config.queryParam)) {
                return baseData.pagination
            } else {
                return {
                    ...config.queryParam,
                    ...baseData.pagination
                }
            }
        }
    }

    const handleQuery = (): void => {
        baseData.loading = true
        config.handleQuery(getQueryParam()).then((res: any) => {
            // 自定义处理返回函数
            if (config.customHandle) {
                config.customHandle(baseData, res)
            } else {
                const { list, count } = res.data;
                baseData.list = list;
                baseData.total = count;
            }
        }).finally(() => {
            baseData.loading = false
        })
    }

    const handleSuccessCallback = (response: any) => {
        ElMessage({
            message: response.data.message,
            type: "success"
        });
        handleQuery()
        handleDialog(false)
    }

    const handleAdd = (params: Param): void => {
        config.handleAdd(params).then(handleSuccessCallback)
    }

    const handleDel = (params: Param): void => {
        config.handleDel(params).then((res: any) => {
            ElMessage({
                message: res.data.message,
                type: "success"
            });
            handleQuery()
        })
    }

    const handleUpdate = (params: Param): void => {
        config.handleUpdate(params).then(handleSuccessCallback)
    }

    const handleSizeChange = (size: number) => {
        baseData.pagination.pageSize = size
        baseData.pagination.pageNum = 1
    }

    const handleCurrentChange = (current: number) => {
        baseData.pagination.pageNum = current
    }

    // 监听分页参数变化执行查询函数
    watch(baseData.pagination, () => {
        handleQuery()
    })

    return {
        baseData,
        handleAdd,
        handleDel,
        handleUpdate,
        handleQuery,
        handleSizeChange,
        handleCurrentChange,
        handleDialog,
    }
}

export default getHandleFn