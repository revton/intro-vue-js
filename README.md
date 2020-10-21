# Introdução ao Vue.js 2 #

## Criando uma instância do Vue ##

- Criar arquivo index.html
```html
<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Introdução Vue.js</title>
    </head>

    <body>
        <div id="app">
            <h1>Produto1</h1>
        </div>

        <script src="main.js"></script>
    </body>
</html>
```

- [Vue.js - Introdução ](https://vuejs.org/v2/guide/)

- Incluir Vue.js ao projeto, via **CDN**
```html
<!-- development version, includes helpful console warnings -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="main.js"></script>
```

- Criar arquivo main.js
```js
var app = new Vue({
    el: '#app',
    data: {
        product: 'Meias'
    },
})
```

- Alterar no index.html dentro da div app
```html
<div id="app">
    {{ product }}
</div>
```

- Testar a reatividade do Vue.js usando o console do navegador
```js
app.product = 'Outro produto'
```

- Incluir a descrição do produto no index.html
```html
<h1>{{ product }}</h1>
<p>{{ description }}</p>
```

- Incluir no main.js
```js
data: {
    product: 'Meias',
    description: 'Um par de meias'
}
```

## Vinculando atributos (Data Bindings) ##

- Organizar a div **app**
- Incluir na página uma imagem, alterando primeiro o index.html
```html
<div id="app">
    <div class="product">
        <div class="product-image">
            <img src="" />
        </div>
        <div class="product-info">
            <h1>{{ product }}</h1>
            <p>{{ description }}</p>
        </div>
    </div>
</div>
```

- Incluir na raiz do projeto um arquivo de imagem, a
- Incluir no main.js
```js
data: {
    product: 'Meias',
    description: 'Um par de meias',
    image: 'meia-azul.png'
}
```

- Implementar o *data binding* no index.html
```html
<img v-bind:src="image" />
```
OU
```html
<img :src="image" />
```

- Incluir um link junto com as informações do produto no index.html
```html
<a v-bind:href="link" target="_blank">Mais produtos como esse</a>
```

- Incluir no main.js
```js
data: {
    product: 'Meias',
    description: 'Um par de meias',
    image: 'meia-azul.png',
    link: 'https://www.google.com/search?q=meias+azul'
}
```

## Renderização condicional ##

- Incluir os status do estoque do produto no index.html
```html
<p>Em estoque</p>
<p>Quase acabando</p>
<p>Acabou o estoque</p>
```

- Incluir campo para quantidade de estoque do produto no main.js
```js
data: {
    product: 'Meias',
    description: 'Um par de meias',
    image: 'meia-azul.png',
    link: 'https://www.google.com/search?q=meias+azul',
    stock_count: 11
}
```

- Incluir as condicionais de renderização no index.html
```html
<p v-if="stock_count > 10">Em estoque</p>
<p v-else-if="stock_count <= 10 && stock_count > 0">Quase acabando</p>
<p v-else>Acabou o estoque</p>
```

- Incluir botão para comprar com condicional index.html
```html
<button v-show="stock_count > 0">Comprar</button>
```

## Renderização de lista ##

- Incluir a lista para mostrar os detalhes do produto no index.html
```html
<ul>
    <li v-for="detail in details">{{ detail }}</li>
</ul>
```

- Incluir a lista no main.js
```js
details: ["80% algodão", "20% poliéster", "Confortável"]
```

- Incluir lista de variações do produto no index.html
```html
<div v-for="variant in variants" :key="variant.variantId">
    <p>{{ variant.variantColor }}</p>
</div>
```

- Incluir lista de variações do produto no main.js
```js
variants: [
    {
        variantId: 1,
        variantColor: "azul"
    },
    {
        variantId: 2,
        variantColor: "branca"
    }
]
```

- Incluir lista com os tamanhos no index.html
```html
<ul>
    <li v-for="size in sizes">{{ size }}</li>
</ul>
```

- Incluir lista com os tamanhos no main.js
```js
sizes: ['P', 'M', 'G', 'GG']
```

## Manipulando evento (Event Handling) ##

- Trocar botão para Adicionar ao carrinho em vez de comprar
- Incluir quantidade de produtos adicionados ao carrinho
```html
<button v-show="stock_count > 0" v-on:click="cart += 1">Adicionar ao Carrinho</button>
<div class="cart">
    <p>{{ cart }}</p>
</div>
```

- Implementar o click dentro de um método no main.js
```js
methods: {
    addToCart(){
        this.cart += 1
    }
}
```

- Fazer a chamada pelo evento de click no index.html
```html
<button v-show="stock_count > 0" v-on:click="addToCart">Adicionar ao Carrinho</button>
```

- Mudar imagem do produto, relacionando na variação de cor os caminhos para as imagens no main.js
```js
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
```

- Incluir método para alterar a imagem do produto no main.js
```js
updateProductImage(variantImage){
    this.image = variantImage
}
```

- Fazer a chamada pelo evento de mouseover no index.html
```html
<div v-for="variant in variants" :key="variant.variantId">
    <p @mouseover="updateProductImage(variant.variantId)">
        {{ variant.variantColor }}
    </p>
</div>
```

- Incluir método para remover produto do carrinho no main.js
```js
removeFromCart() {
    this.cart -= 1
}
```

- Incluir botão para remover produto do carrinho no index.html
```html
<button @click="removeFromCart">Remover do carrinho</button>
```

## Manipulando classe e estilo (Class & Style Binding) ##

- Altera como mostrar as variações de cores no index.html
```html
<div class="color-box"
    v-for="variant in variants" 
    :key="variant.variantId"
    :style="{ backgroundColor: variant.variantColor}"
    @mouseover="updateProductImage(variant.variantImage)"
    >
</div>
```

- Criar arquivo style.css
```css
.color-box {
    width: 40px;
    height: 40px;
    margin-top: 5px;
    border: 1px solid #d8d8d8;
}
```

- Desabilitar botão de adicionar produto ao carrinho quando não tiver em estoque no index.html
```html
<button :disabled="stockCount < 1" v-on:click="addToCart">Adicionar ao Carrinho</button>
```

- Incluir estilo para os botões no style.css
```css
button {
    margin-top: 30px;
    border: none;
    background-color: #1E95EA;
    color: white;
    height: 40px;
    width: 100px;
    font-size: 14px;
} 

.disabledButton {
    background-color: #d8d8d8;
}
```

- Incluir o evento para manipular a classe no arquivo index.html
```html
<button 
    :disabled="stockCount < 1" 
    v-on:click="addToCart"
    :class="{ disabledButton: stockCount < 1}"
    >
    Adicionar ao Carrinho
</button>
```

- Incluir o evento para manipular a classe no arquivo index.html
```html
<p v-else :class="{ outOfStock: stockCount < 1 }">Acabou o estoque</p>
```

- Incluir estilo para o texto Acabou o estoque no style.css
```css
.outOfStock {
    text-decoration: line-through;
}
```

## Dados Computados (Computed Propriedades)

- Incluir Marca ao produto no main.js
```js
data: {
    brand: "Marca",
    product: 'Meias',
    description: 'Um par de meias',
    image: 'meia-azul.png',
    link: 'https://www.google.com/search?q=meias+azul',
    stockCount: 11,
    details: ["80% algodão", "20% poliéster", "Confortável"],
    variants: [
        {
            variantId: 1,
            variantName: "Azul",
            variantColor: "blue",
            variantImage: "meia-azul.png"
        },
        {
            variantId: 2,
            variantName: "Branca",
            variantColor: "white",
            variantImage: "meia-branca.png"
        }
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    cart: 0
},
```

- Incluir o dado computado com o titulo do produto no main.js
```js
computed: {
    title(){
        return this.brand + ' ' + this.product
    }
}
```

- Trocar na tela para mostrar o titulo no index.html
```html
<div class="product-info">
    <h1>{{ title }}</h1>
    ...
```

- Alterar propriedade de image para pegar qual variação está selecionada, no main.js
- ~~image: "meia-azul.png"~~
```js
selectedVariant: 0,
```

- Alterar na tela para passar o índice em vez da imagem no index.html
```html
<div class="color-box"
    v-for="(variant, index) in variants" 
    :key="variant.variantId"
    :style="{ backgroundColor: variant.variantColor}"
    @mouseover="updateProduct(index)"
    >
</div>
```

- Alterar implementar para trocar image do produto
```js
updateProduct(index){
    this.selectedVariant = index
},
```

- Não temos mais a propriedade *image*
```html
<div class="product-image">
    <img v-bind:src="image" />
</div>
```

- Incluir um novo dado computado para atender esse campo no main.js
```js
image(){
    return this.variants[this.selectedVariant].variantImage
}
```

- Incluir quantidade do produto para a variação no main.js
```js
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
```

- Incluir um dado computado para verificar se tem estoque no main.js
```js
inStock(){
    return this.variants[this.selectedVariant].variantQuantity
}
```

- Alterar na tela para usar o dado computado no index.html
```html
<p v-if="inStock > 10">Em estoque</p>
<p v-else-if="inStock <= 10 && inStock > 0">Quase acabando</p>
<p v-else :class="{ outOfStock: !inStock }">Acabou o estoque</p>
<button 
    :disabled="!inStock" 
    v-on:click="addToCart"
    :class="{ disabledButton: !inStock}"
    >
    Adicionar ao Carrinho
</button>
```

- Incluir campo na tela para mostrar mensagem se produto está a venda no index.html
```html
<p>{{ sale }}</p>
```

- Incluir flag para identificar se produto está a venda no main.js
```js
onSale: true
```

- Incluir dado computado com a mensagem se produto está a venda
```js
sale() {
    if (this.onSale) {
        return this.title + ' está a venda!'
    } 
    return this.title + ' não está a venda!'
}
```

## Componentes ##

- Criar um componente para o produto no main.js
```js
Vue.components('product', {})
```

- Criar o template do componente produto pegando ho index.html e inserindo no main.js
```js
Vue.component('product', {
    template: `
    <div class="product">
        <div class="product-image">
            <img v-bind:src="image" />
        </div>
        <div class="product-info">
            <h1>{{ title }}</h1>
            <p>{{ description }}</p>
            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>

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
    ...
```

- Incluir os dados, métodos e dados computados dentro do components, mudando somente a forma de declarar *data* no main.js
```js
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
    }
}
```

- Inserir agora o componente na tela no index.html
```html
<div id="app">
    <product></product>
</div>
```

- Incluir propriedade no componente para identificar se o usuário é *premium* no main.js
```js
Vue.component('product', {
    props:{
        premium:{
            type: Boolean,
            required: true
        }
    },
    template: `
        <div class="product">
            ...
            <div class="product-info">
                <h1>{{ title }}</h1>
                <p>{{ description }}</p>
                <ul>
                    <li v-for="detail in details">{{ detail }}</li>
                </ul>
                <p>Usuário é premium: {{ premium }}</p>
        ...       
        
var app = new Vue({
    el: '#app',
    data:{
        premium: true
    }
})
```

- Passar o valor da propriedade no componente na tela, no index.html
```html
<product :premium="premium"></product>
```

- Vamos mudar o uso dessa propriedade para apresentar o valor do frete, no main.js vamos criar um dado computado e trocar por onde aparece se usuário é premium
```js
template: `
...
<p>Valor do frete: R$ {{ shipping }}</p>
`
computed: {
    ...
    shipping(){
        if (this.premium){
            return "0,00"
        }
        return "10,00"
    }
}
```

- Criar um componente para os detalhes do produto no main.js
```js
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
```

- Inserir o uso dentro do componente do produto no main.js
```js
Vue.component('product', {
    template: `
        <div class="product">
            ...
            <div class="product-info">
                <h1>{{ title }}</h1>
                <p>{{ description }}</p>
                <product-detail :details="details"></product-detail>
```

## Comunicação de eventos ##

- Adicionar texto antes do componente de produto, no index.html
```html
<div class="cart">
    <p>Carrinho ({{ cart }})</p>
</div>
```

- Trocar implementação da função de adicionar item ao carrinho, no main.js
```js
addToCart(){
    this.$emit('add-to-cart')
},
```

- Aplicar o evento ao elemento product no index.html
```html
<product :premium="premium" @add-to-card="updateCart"></product>
```

- Adicionar variável com a quantidade do carrinho e método para atualizar o carrinho, no main.js
```js
var app = new Vue({
    el: '#app',
    data:{
        premium: true,
        cart: 0
    },
    methods: {
        updateCart(){
            this.cart += 1
        }
    }
})
```

- Trocar a variável cart para array, onde vai ser adicionado os ids dos produtos, no main.js
```js
cart: []
```

- Trocar o valor do cart para mostrar o tamanho do array, no index.html
```html
<div class="cart">
    <p>Carrinho ({{ cart.length }})</p>
</div>
```

- Adicionar o parâmetro na função para adicionar o ids no array, no main.js 
```js
updateCart(id){
    this.cart.push(id)
}
```
- Passar o id do produto para a método, no main.js
```js
addToCart(){
    this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
},
```

- Trocar implementação da função de remover item ao carrinho, no main.js
```js
removeFromCart(){
    this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
}
```

- Aplicar o evento ao elemento product no index.html
```html
<product :premium="premium" @add-to-card="updateCart"></product>
```

- Adicionar método para atualizar o carrinho ao remover produto, no main.js
```js
removeItem(id) {
    for(var i = this.cart.length - 1; i >= 0; i--) {
        if (this.cart[i] === id) {
            this.cart.splice(i, 1)
        }
    }
}
```

## Formulário

- Adicionar um componente para avaliação do produto, no main.js
```js
Vue.component('product-review', {
    template: `
        <input>
    `,
    data() {
        return {
            name: null
        }
    }
})
```

- Adicionar ao template do componente produto a tag, no main.js
```html
<product-review></product-review> 
```

- Mudar o template do componente product-review, no main.js
```html
<form class="review-form" @submit.prevent="onSubmit">
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
        
    <p>
        <input type="submit" value="Submit">  
    </p>    
</form>
```

- Criar os campos usados no modelo do componente, no main.js
```js
data() {
    return {
        name: null,
        review: null,
        rating: null
    }
}
```

- Criar método para tratar os valores após o submit do formulário, no main.js
```js
onSubmit() {
      let productReview = {
        name: this.name,
        review: this.review,
        rating: this.rating
      }
      this.$emit('review-submitted', productReview)
      this.name = null
      this.review = null
      this.rating = null
    }
```

- Inserir no componente o atributo *review-submitted* para informar qual método deve ser chamado para adicionar a avaliação do produto, no main.js
```html
<product-review @review-submitted="addReview"></product-review> 
```

- Criar o método para adicionar revisão e o array dentro do componente do produto que vai receber, no main.js
```js
reviews: []
```

```js
addReview(productReview){
    this.reviews.push(productReview)
}
```

- Criar uma lista para visualizar as avaliações adicionadas, no main.js
```html
<div>
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
```

- Criar validação para o formulário de avaliação, no main.js
```js
data() {
    return {
        name: null,
        review: null,
        rating: null,
        errors: []
    }
},
```

```js
onSubmit() {
    if(this.name && this.review && this.rating) {
        let productReview = {
            name: this.name,
            review: this.review,
            rating: this.rating
        }
        this.$emit('review-submitted', productReview)
        this.name = null
        this.review = null
        this.rating = null
    } else {
        if(!this.name) this.errors.push("Nome é obrigatório'.")
        if(!this.review) this.errors.push("Avaliação é obrigatório.")
        if(!this.rating) this.errors.push("Nota é obrigatório.")
    }
    
}
```

```html
<p v-if="errors.length">
    <b>Por favor, corrija os seguintes erro(s):</b>
    <ul>
        <li v-for="error in errors">{{ error }}</li>
    </ul>
</p>    
```

- Criar um campo para perguntar se recomenda o produto, no main.js
```html
<p>Você recomendaria esse produto?</p>
<label>
    <input type="radio" value="Sim" v-model="recommend"/>
    Sim
</label>
<label>
    <input type="radio" value="Não" v-model="recommend"/>
    Não
</label>
```

```js
data() {
    return {
        name: null,
        review: null,
        rating: null,
        recommend: null,
        errors: []
    }
},
```

- Validar o novo campo, no main.js
```js
methods: {
    onSubmit() {
        if(this.name && this.review && this.rating && this.recommend) {
            let productReview = {
                name: this.name,
                review: this.review,
                rating: this.rating,
                recommend: this.recommend
            }
            this.$emit('review-submitted', productReview)
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
```
