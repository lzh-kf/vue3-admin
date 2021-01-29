const fs = require("fs")

const { templateMap, rl } = require('./const')

let filePath = null

let apiFilePath = null

const filename = __filename.replace('\\template\\createView.js', '')

const customTemplateMap = {
    "{{apiFilePath}}": '',
    "{{moduleName}}": '',
}

function inputFilePath () {
    console.log('创建页面文件...')
    console.log(`文件路径形式：比如输入login会自动在src/views文件夹下生成login/index.vue`)
    rl.question("请输入生成文件路径? ", (path) => {
        if (path) {
            filePath = path
            console.log(`api文件查询路径规则：比如输入login会自动寻找src/apis/login/index.ts`)
            rl.question("请输入引入的api路径? ", (path) => {
                if (path) {
                    apiFilePath = path
                    customTemplateMap['{{apiFilePath}}'] = path
                    checkFile()
                } else {
                    rl.close()
                }
            });
        } else {
            rl.close();
        }
    });
}

async function checkFile () {
    try {
        // 如果读取失败 说明文件不存在，如果不存在，则直接创建文件
        await fs.readFileSync(`${filename}/views/${filePath}/index.vue`)
        rl.question("该页面文件已存在，确认是否覆盖y/n? ", (value) => {
            if (value === 'y') {
                createFile()
            } else {
                rl.close()
            }
        });
    } catch (error) {
        createFile()
    }
}

async function createFile () {
    console.log('生成文件中...')
    const templateData = await fs.readFileSync(`${filename}/template/view.ts`)
    const dataType = await fs.readFileSync(`${filename}/template/dataType.ts`)
    try {
        await createDir();
        await fs.writeFileSync(`${filename}/views/${filePath}/index.vue`, replaceTemplate(templateData.toString()))
        await fs.writeFileSync(`${filename}/views/${filePath}/dataType.ts`, dataType.toString().replace(/`/g, ""))
        console.log('生成成功')
    } catch (error) {
        console.log('生成失败：', error)
    } finally {
        rl.close()
    }
}

async function createDir () {
    const dirPaths = filePath.split('/')
    for (let i = 0; i < dirPaths.length; i++) {
        const currentDirPath = dirPaths.slice(0, i + 1).join('/')
        try {
            await fs.mkdirSync(`${filename}/views/${currentDirPath}`)
        } catch (error) {
            // 如果异常说明文件夹已存在，则直接结束本次循环
            continue
        }
    }
    return true
}

function replaceTemplate (templateData) {
    const beforeName = apiFilePath.split('/').pop()
    const tempData = { ...templateMap, ...customTemplateMap }
    for (const [key, value] of Object.entries(tempData)) {
        let flag = true
        while (flag) {
            if (key === '{{moduleName}}') {
                templateData = templateData.replace(key, beforeName)
                flag = templateData.includes(key)
            }
            else if (key === '{{apiFilePath}}') {
                templateData = templateData.replace(key, value)
                flag = templateData.includes(key)
            } else {
                templateData = templateData.replace(key, beforeName + value)
                flag = templateData.includes(key)
            }
        }
    }
    return templateData.replace(/`/g, "")
}

inputFilePath()