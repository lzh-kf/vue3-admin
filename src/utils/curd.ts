/* eslint-disable */ 

import { ElMessage } from "element-plus";
import { reactive, watch } from "vue";
import { Config, Param } from '@/utils/base';

interface Data {
    pagination: {
        pageNum: number;
        pageSize: number;
    };
    pageSizes: Array<number>;
    list: Array<{
        [key: string]: unknown;
    }>;
    total: number;
    isCreated: boolean;
    visible: boolean;
    loading: boolean;
}

const getHandleFn = (config: Config) => {

    const baseData: Data = reactive({
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

    const handleQueryParam = (): Param => {
        // 非分页
        if (config.isNotPagination) {
            return config.queryParam || {}
        } else {
            if (config.queryParam) {
                return {
                    ...config.queryParam,
                    ...baseData.pagination
                }
            } else {
                return baseData.pagination
            }
        }
    }

    const handleQuery = (): void => {
        baseData.loading = true
        config.handleQuery(handleQueryParam()).then(res => {
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

    const handleSuccessEvent = (response: any) => {
        ElMessage({
            message: response.data.message,
            type: "success"
        });
        handleQuery()
        handleDialog(false)
    }

    const handleAdd = (params: Param): void => {
        config.handleAdd(params).then(handleSuccessEvent)
    }

    const handleDel = (params: Param): void => {
        config.handleDel(params).then(res => {
            ElMessage({
                message: res.data.message,
                type: "success"
            });
            handleQuery()
        })
    }

    const handleUpdate = (params: Param): void => {
        config.handleUpdate(params).then(handleSuccessEvent)
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