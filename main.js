var app = new Vue({
    el: '#app',
    data: {
        brand: "Marca",
        product: 'Meias',
        description: 'Um par de meias',
        selectedVariant: 0,
        link: 'https://www.google.com/search?q=meias+azul',
        stockCount: 11,
        details: ["80% algodão", "20% poliester", "Confortável"],
        variants: [
            {
                variantId: 1,
                variantName: "Azul",
                variantColor: "blue",
                variantImage: "meia-azul.png",
                variantQuantity:10
            },
            {
                variantId: 2,
                variantName: "Branca",
                variantColor: "white",
                variantImage: "meia-branca.png",
                variantQuantity:0
            }
        ],
        sizes: ['P', 'M', 'G', 'GG'],
        cart: 0,
        onSale: true

    },
    methods: {
        addToCart(){
            this.cart += 1
        },
        updateProduct(index){
            this.selectedVariant = index
        },
        removeFromCart(){
            this.cart -= 1
        }
    },
    computed: {
        title(){
            return this.brand + ' ' + this.product
        },
        image(){
            return this.variants[this.selectedVariant].variantImage
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale() {
            if (this.onSale) {
                return this.title + ' está a venda!'
            } 
            return this.title + ' não está a venda!'
        }
    }
})