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
                variantColor: "azul"
            },
            {
                variantId: 2,
                variantColor: "branca"
            }
        ],
        sizes: ['P', 'M', 'G', 'GG']
    }
})