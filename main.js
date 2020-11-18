var eventBus = new Vue()

Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
        <p v-if="errors.length">
            <b>Por favor, corrija os seguintes erro(s):</b>
            <ul>
                <li v-for="error in errors">{{ error }}</li>
            </ul>
        </p>    

        <p>
            <label for="name">Nome:</label>
            <input id="name" v-model="name" placeholder="Nome">
        </p>

        <p>
            <label for="review">Avaliação:</label>      
            <textarea id="review" v-model="review"></textarea>
        </p>

        <p>
            <label for="rating">Nota:</label>
            <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
            </select>
        </p>

        <p>Você recomendaria esse produto?</p>
        <label>
            <input type="radio" value="Sim" v-model="recommend"/>
            Sim
        </label>
        <label>
            <input type="radio" value="Não" v-model="recommend"/>
            Não
        </label>
            
        <p>
            <input type="submit" value="Submit">  
        </p>    

    </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommend: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if(this.name && this.review && this.rating && this.recommend) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend
                }
                eventBus.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
                this,recommend = null
            } else {
                if(!this.name) this.errors.push("Nome é obrigatório'.")
                if(!this.review) this.errors.push("Avaliação é obrigatório.")
                if(!this.rating) this.errors.push("Nota é obrigatório.")
                if(!this.recommend) this.errors.push("Recomendação é obrigatório.")
            }
            
        }

    }
})

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
            <a v-bind:href="link" target="_blank">Mais produtos como esse</a>

            <product-tabs :reviews="reviews"></product-tabs>

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
            onSale: true,
            reviews: []
    
        }
    },
    methods: {
        addToCart(){
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct(index){
            this.selectedVariant = index
        },
        removeFromCart(){
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
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
    },
    mounted(){
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
    }
})

Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: false
        }
    },
    template: `
        <div>
            <span class="tab"
                :class="{ activeTab: selectedTab == tab}"
                v-for="(tab, index) in tabs" 
                :key="index"
                @click="selectedTab = tab">
                {{ tab }}</span>

            <div v-show="selectedTab == 'Avaliações'">
                <h2>Avaliações</h2>
                <p v-if="!reviews.length">Não há avaliações ainda.</p>
                <ul>
                    <li v-for="review in reviews">
                        <p>{{ review.name }}</p>
                        <p>Rating: {{ review.rating }}</p>
                        <p>{{ review.review }}</p>
                    </li>
                </ul>
            </div>
    
            <product-review 
                v-show="selectedTab == 'Faça uma avaliação'">
            </product-review> 
        </div>        
    `,
    data() {
        return {
            tabs:["Avaliações", "Faça uma avaliação"],
            selectedTab: "Avaliações"
        }
    }
})

var app = new Vue({
    el: '#app',
    data:{
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id){
            this.cart.push(id)
        },
        removeItem(id) {
            for(var i = this.cart.length - 1; i >= 0; i--) {
              if (this.cart[i] === id) {
                 this.cart.splice(i, 1)
              }
            }
          }
    }
})