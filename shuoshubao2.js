const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')
const chalk = require('chalk')
const tinify = require('tinify')
tinify.key = 'KckuU929qtv_nPK_czL6HKfcAJO9FCKm'
let files = [...glob.sync('img-src/**/*.png'), ...glob.sync('img-src/**/*.jpg')]

// console.log(files)

const timeInfo = `tinify 共处理${files.length}个文件, 共耗时`
console.time(timeInfo)

const tinifyImg = src => new Promise((resolve, reject) => {
    const srcImg = path.resolve(__dirname, `./${src}`)
    const targetImg = path.resolve(__dirname, `img-compress/${src.split('/').slice(1).join('/')}`)
    fs.ensureFileSync(targetImg)
    tinify.fromFile(srcImg).toFile(targetImg, err => {
        if(err) {
            reject(err)
        } else {
            console.log(`成功压缩 ${chalk.blue(src)}`)
            resolve();
        }
    })
})
Promise.all(files.map(v => tinifyImg(v)))
.then(() => console.timeEnd(timeInfo))
.catch(e => {
    console.log(e)
})
