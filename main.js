var app = new Vue({
    el: '#app',
    data: {
        product: 'Meias',
        description: 'Um par de meias',
        image: 'meia-azul.png',
        link: 'https://www.google.com/search?q=meias+azul',
        stock_count: 11,
        details: ["80% algodão", "20% poliester", "Confortável"],
        variants: [
            {
                variantId: 1,
                variantColor: "azul",
                variantImage: "meia-azul.png"
            },
            {
                variantId: 2,
                variantColor: "branca",
                variantImage: "meia-branca.png"
            }
        ],
        sizes: ['P', 'M', 'G', 'GG'],
        cart: 0
    },
    methods: {
        addToCart(){
            this.cart += 1
        },
        updateProductImage(variantImage){
            this.image = variantImage
        },
        removeFromCart(){
            this.cart -= 1
        }
    }
})