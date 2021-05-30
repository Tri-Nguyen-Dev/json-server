const faker = require('faker')
const fs = require('fs')

faker.locale = "vi";


function randomListCategory(n) {
    if (n <= 0) return []

    const listCategory = []
    for (var i = 0; i <= n; i++) {
        listCategory.push({
            id: faker.datatype.uuid(),
            name: faker.commerce.department(),
            createdAt: Date.now(),
            updatedAt: Date.now()
        })
    }
    return listCategory
}

function randomListProduct(listCategory, n) {
    if (n <= 0 && !listCategory) return []

    const listProduct = []

    listCategory.forEach((category) => {
        for (var i = 0; i <= n; i++) {
            listProduct.push({
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                price: Number.parseFloat(faker.commerce.price()),
                description: faker.commerce.productDescription(),
                image: faker.image.image(),
                categoryId: category.id,
                createdAt: Date.now(),
                updatedAt: Date.now()
            })
        }
    })

    return listProduct
}

(() => {
    const listCategory = randomListCategory(5)
    const listProduct = randomListProduct(listCategory, 5)
    const db = {
        categories: listCategory,
        products: listProduct
    }

    fs.writeFile("db.json", JSON.stringify(db), () => {
        console.log("Genarate data succcessfully")
    })
})()


