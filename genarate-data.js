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
                    "https://cdn.shopify.com/s/files/1/0265/5728/4445/products/1a_72f2474e-7e99-45e6-96e5-ddda5fc59906_370x.jpg?v=1601366130"
                ],
                image_library: [
                    "https://cdn.shopify.com/s/files/1/0265/5728/4445/products/1_c2307dbf-d624-4bcd-b3de-99a7963f7496_900x900.jpg?v=1601366129",
                    "https://cdn.shopify.com/s/files/1/0265/5728/4445/products/3_900x900.jpg?v=1601438639",
                    "https://cdn.shopify.com/s/files/1/0265/5728/4445/products/4_9a093079-3a93-4b20-a79c-04f3f8f0a143_900x900.jpg?v=1601438790",
                    "https://cdn.shopify.com/s/files/1/0265/5728/4445/products/4c_900x900.jpg?v=1601438791",
                    "https://cdn.shopify.com/s/files/1/0265/5728/4445/products/4d_900x900.jpg?v=1601438791"
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


