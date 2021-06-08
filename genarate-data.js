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
                image: [
                    "https://cdn.shopify.com/s/files/1/0265/5728/4445/products/2a_1dae4acc-3f60-44d2-a5cd-d85d36709d25_370x.jpg?v=1601437702",
                    "https://cdn.shopify.com/s/files/1/0265/5728/4445/products/1a_72f2474e-7e99-45e6-96e5-ddda5fc59906_370x.jpg?v=1601366130",
                    "https://cdn.shopify.com/s/files/1/0265/5728/4445/products/3a_370x.jpg?v=1601438639"
                ],
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


