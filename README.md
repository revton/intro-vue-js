# Introdução ao Vue.js  #

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
details: ["80% algodão", "20% poliester", "Confortável"]
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

