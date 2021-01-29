const fs = require("fs")

const { templateMap, rl } = require('./const')

let filePath = null

const filename = __filename.replace('\\template\\createApi.js', '')

function inputFilePath () {
    console.log('创建api文件...')
    console.log(`文件路径形式：比如输入login会自动在src/apis文件夹下生成login/index.ts`)
    rl.question("请输入生成文件路径? ", (path) => {
        if (path) {
            filePath = path
            checkFile()
        } else {
            rl.close()
        }
    })
}

async function checkFile () {
    try {
        // 如果读取失败 说明文件不存在，如果不存在，则直接创建文件
        await fs.readFileSync(`${filename}/apis/${filePath}/index.ts`)
        rl.question("该api文件已存在，确认是否覆盖y/n? ", (value) => {
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
    const templateData = await fs.readFileSync(`${filename}/template/api.ts`)
    try {
        await createDir()
        await fs.writeFileSync(`${filename}/apis/${filePath}/index.ts`, replaceTemplate(templateData.toString()))
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
            await fs.mkdirSync(`${filename}/apis/${currentDirPath}`)
        } catch (error) {
            // 如果异常说明文件夹已存在，则直接结束本次循环
            continue
        }
    }
    return true;
}

function replaceTemplate (templateData) {
    const beforeName = filePath.split('/').pop()
    for (const [key, value] of Object.entries(templateMap)) {
        let flag = true
        while (flag) {
            templateData = templateData.replace(key, beforeName + value)
            flag = templateData.includes(key)
        }
    }
    return templateData.replace(/`/g, "")
}

inputFilePath()