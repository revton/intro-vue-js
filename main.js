Vue.component('product-detail', {
    props: {
        details:{
            type: Array,
            required: true
        }
    },
    template: `
    <ul>
        <li v-for="detail in details">{{ detail }}</li>
    </ul>
    `
})

Vue.component('product', {
    props:{
        premium:{
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
        <div class="product-image">
            <img v-bind:src="image" />
        </div>
        <div class="product-info">
            <h1>{{ title }}</h1>
            <p>{{ description }}</p>
            <product-detail :details="details"></product-detail>
            <p>Valor do frete: R$ {{ shipping }}</p>

            <div class="color-box"
                v-for="(variant, index) in variants" 
                :key="variant.variantId"
                :style="{ backgroundColor: variant.variantColor}"
                @mouseover="updateProduct(index)"
                >
            </div>

            <ul>
                <li v-for="size in sizes">{{ size }}</li>
            </ul>

            <p v-if="inStock > 10">Em estoque</p>
            <p v-else-if="inStock <= 10 && inStock > 0">Quase acabando</p>
            <p v-else :class="{ outOfStock: !inStock }">Acabou o estoque</p>
            <p>{{ sale }}</p>
            <button 
                :disabled="!inStock" 
                v-on:click="addToCart"
                :class="{ disabledButton: !inStock}"
                >
                Adicionar ao Carrinho
            </button>
            <button @click="removeFromCart">Remover do carrinho</button>
            <div class="cart">
                <p>{{ cart }}</p>
            </div>
            <a v-bind:href="link" target="_blank">Mais produtos como esse</a>
        </div>
    </div>
    `,
    data(){
        return {
            brand: "Marca",
            product: 'Meias',
            description: 'Um par de meias',
            selectedVariant: 0,
            link: 'https://www.google.com/search?q=meias+azul',
            stockCount: 11,
            details: ["80% algodão", "20% poliéster", "Confortável"],
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
    
        }
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
        },
        shipping(){
            if (this.premium){
                return "0,00"
            }
            return "10,00"
        }
    }
})

var app = new Vue({
    el: '#app',
    data:{
        premium: true
    }
})