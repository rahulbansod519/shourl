const YAML = require('yaml')
const fs = require('fs')
const path = require('path')

const redirectFile = fs.readFileSync(path.join(__dirname, 'redirect.yaml'), 'utf-8')
// console.log(redirectFile)
const redirects = YAML.parse(redirectFile)
// console.log(redirects)

const templateHtml = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf-8')

//loop through all urls and genrate an html page

for (let [slug, url] of Object.entries(redirects)){
    console.log('Generating html page for', slug)

    const html = templateHtml.replaceAll('https://example.com',url)
    // console.log(html)

    //folder for each slug
    const folderPath = path.join(__dirname, 'out', slug)
    fs.mkdirSync(folderPath, {recursive: true})

    //create an index.html in each directory
    fs.writeFileSync(path.join(folderPath, 'index.html'), html)
    
}
