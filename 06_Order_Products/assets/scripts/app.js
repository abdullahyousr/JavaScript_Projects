class Product {
// title = 'DEFAULT';
// imageUrl;
// price;
// description;

    constructor(title, imageUrl, desc, price){
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = desc;
    this.price = price;
    }    
}
class ElementAttribute {
    constructor(attrName, attrValue){
        this.name = attrName;
        this.value = attrValue;
    }
}

class Component {
    constructor(renderHookId, shouldRender = true){
        this.hookId = renderHookId;
        if(shouldRender){
            this.render();
        }
    }

    render(){}

    createRootElement(tag, cssClasses, attributes){
        const rootElement = document.createElement(tag);
        if(cssClasses){
            rootElement.className = cssClasses;
        }
        if(attributes && attributes.length > 0){
            for(const attr of attributes){
                rootElement.setAttribute(attr.name, attr.value);
            }
        }
        document.getElementById(this.hookId).append(rootElement);

        return rootElement;
    }
}

class ShoppingCart extends Component {
    items = [];

    set cartItems(value){
        this.items = value;
        this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(2)}</h2>`        
    }

    get totalAmount(){
        const sum = this.items.reduce(
            (preValue, curValue) => preValue + curValue.price, 
                0
            );
        return sum;
    }

    constructor(renderHookId){
        super(renderHookId);
    }

    addProduct(product){
        const updatedItems = [...this.items];   
        updatedItems.push(product);
        this.cartItems = updatedItems;
    }

    orderProducts(){
        console.log(this.items);
    }

    render(){
        const cartEl = this.createRootElement('section','cart');
        cartEl.innerHTML = `
        <h2>Total: \$${0}</h2>
        <button>Order Now!</button>
        `;
        const orderButton = cartEl.querySelector('button');
        orderButton.addEventListener('click', () => this.orderProducts());
        this.totalOutput = cartEl.querySelector('h2');
    }
}

class ProductItem extends Component{
    constructor(product, renderHoodId){
        super(renderHoodId, false);
        this.product = product;
        this.render();
    }

    addToCart(){
        App.addProductToCart(this.product);
    }
    render(){
        const prodEl = this.createRootElement('li', 'product-item');
        prodEl.innerHTML = `
        <div>
            <img src='${this.product.imageUrl}' alt='${this.product.title}'>
            <div class='product-item__content'>
                <h2>${this.product.title}</h2>
                <h3>${this.product.price}</h3>
                <p>${this.product.description}</p>
                <button>Add to Cart</button>
            </div>
        </div>
        `;
        const addCartButton = prodEl.querySelector('button');
        addCartButton.addEventListener('click', this.addToCart.bind(this));
    }
}
        
class ProductList extends Component{
    #products = [];

    constructor(renderHoodId){
        super(renderHoodId, false);
        this.render();
        this.fetchProducts();
    };

    fetchProducts(){
        this.#products = [
            new Product(
                'A pillow', 
                'https://images.pexels.com/photos/1248583/pexels-photo-1248583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 
                'A soft pillow', 
                10.4
            ),
            new Product(
                'A carpet',
                'https://media.istockphoto.com/id/839890612/photo/living-room-iii.jpg?s=612x612&w=0&k=20&c=q4lJGg0UCxb3kauen_5rT2jjCCFG-F8YqwhEOTgvpYY=',
                'A carpet which you might like or not',
                99.4
            )
        ];
        this.renderProductes();
    }
    
    renderProductes(){
        for(const prod of this.#products){
            new ProductItem(prod, 'prod-list');
        }
    }
    
    render(){
        this.createRootElement('ul', 'product-list', [new ElementAttribute('id', 'prod-list')]);
        if(this.#products && this.#products.length > 0) {
            this.renderProductes();
        }

    }
}
    
class Shop extends Component{
    constructor(){
        super();
    }
    render(){
        this.cart = new ShoppingCart('app');
        new ProductList('app');
    }
}

class App{
    static cart;

    static init(){
        const shop = new Shop();
        this.cart = shop.cart;
    }

    static addProductToCart(product){
        this.cart.addProduct(product);
    }
}


App.init();