![GA Logo](https://raw.githubusercontent.com/karinas98/MusicLibraryProject/main/469f976e-1432-11e5-8199-6ac91363302b.png) 

# Artist & Design E-Commerce - Shop & Buy

##Deployment Link
https://shop-and-buy.netlify.app

##Timeline
3 Weeks - Solo Project

## Project Brief
Build a full stack application by making my own backend and front-end
Use Python Django API & using Django REST Framework to serve the data from Postgres database
Consume my API with a separate front-end, built with React
Implement thoughtful user wireframes
Complete & Launch a final & functioning product

## Project Overview
For this project, I wanted to find an idea that I can build on and easily increase its complexity. I’ve always had some interest towards how to build an e-commerce site and this project is a starting point for that. My idea around the theme was to give a voice and space to upcoming artists and designers to show their work and potentially sell a few pieces to those that value quality handmade products. This is why the application is an exclusive site that you need to register and create a profile for. Once that is done, you are able to create a new ad, write product reviews, see your favourite’s list and add items to the cart. You also have a personal profile where all your created products can be found and where you can delete and update your listing.

## Planning & Wireframing
What I wanted to achieve with this wireframe is to create a full prototype to understand the user experience and all functionalities. By doing so, I could then take it page by page and really grasp what needs to happen. 

![](https://github.com/karinas98/project4_frontend/blob/9ac4d69b9d5ea96c90e4ae55a6f4a01d7bd9cc75/Screenshot%202023-06-02%20at%2011.06.38.png)

## Road Map

### Backend
The first part of this project was to build a Python API backend. I first planned out the apps and models for each that I would be needing for this project. That entailed an app for products, categories, reviews, favourites, cart and JWT authentication.  For each of these apps created, I then tested out with Django and Postman if my data could be accessed and created. 

### Front-end

Once the Backend was ready, I then started planning out my front-end. My first step was establishing all the necessary routes and navbar needed throughout my application and making sure that they all work. 

Once that was done, I got started on adding the navbar to all the routes. 
Since this is an exclusive site and you need to be registered or logged in to access the content. I made it so that all navigation icons navigate to the registration page if a token is not found and if so, a logout and feed is added. 

```javascript
const NavBar = () => {
  const navigationLinks = [
    { img: ProfileIcon, slug: "/profile" },
    { img: HeartIcon, slug: "/favorites" },
    { img: CartIcon, slug: "/cart" },
    { title: "Logout", slug: "/" },
  ];
  const navigationLogout = [
    { img: ProfileIcon, slug: "/register" },
    { img: HeartIcon, slug: "/register" },
    { img: CartIcon, slug: "/register" },
  ];
```
```javascript
 {loggedIn ? (
          <ul className="main-nav">
            <div>
              <Link className="nav-feed" to={"/feed"}>
                My Feed
              </Link>
            </div>
            <div>
              <Link className="navtitle" to={"/"}>
                Shop & Buy
              </Link>
            </div>
            <div className="right-nav">
              {navigationLinks.map((link, idx) => (
                <li className="navbar" key={idx}>
                  <Link className="navicons" to={link.slug}>
                    <img width="25px" src={link.img}></img>
                    <p onClick={onLogout}>{link.title}</p>
                  </Link>
                </li>
              ))}
            </div>
          </ul>
        ) : (
          <ul className="init-nav">
            <div>
              <Link className="navtitle" to={"/"}>
                Shop&Buy
              </Link>
            </div>
            <div className="right-nav">
              {navigationLogout.map((link, idx) => (
                <li className="navbar" key={idx}>
                  <Link className="navicons" to={link.slug}>
                    <img width="25px" src={link.img}></img>
                  </Link>
```
Afterwards, I started working on the application’s feed and the functionality for the users to create an ad. To create the ad, I needed to target the changes in input to then post the data into the products API to then fetch and display on the feed. This is where the onChange function comes in. 

```javascript
const onChange = (e) => {
    setCreateProduct({ ...createProduct, [e.target.name]: e.target.value });
    setButtonActive(true);
  };
  ```
  When creating an ad, the user also needs to select a category and add an image. To do so, I created a new state and fetched the categories data to get back the name of the categories and not just the index number. I then mapped through all the categories to have them appear as a drop down selection. 
  
  ```javascript
  <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
          <Form.Select
            className="input"
            placeholder="Category"
            name="category"
            value={createProduct.category}
            onChange={onChange}
          >
            {getCategories.map((elem, idx) => (
              <option key={idx}>{elem.name}</option>
            ))}
          </Form.Select>
        </Form.Group>
  ```
As for the image, I used Cloudinary to give the ability to upload an image of their choice. I then posted the data through the same handleCreateUser function making sure that the price comes back as a number and that the targeted category name was connected to the category id within the products data, using the find method. 
  ```javascript
 const handleCreateUser = async (e) => {
    e.preventDefault();
    const imageData = new FormData();
    imageData.append("file", file);
    imageData.append("upload_preset", REACT_APP_CLOUDINARY_UPLOAD_PRESET);
    try {
      // if success, we get back info about the stored image

      delete axios.defaults.headers.common["Authorization"];

      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        imageData
      );

      axios.defaults.headers.common["Authorization"] = localStorage.getItem(
        "token"
      )
        ? `Bearer ${localStorage.getItem("token")}`
        : "";

      const apiData = {
        ...createProduct,
        price: parseFloat(createProduct.price),
        category: [
          getCategories.find((i) => i.name === createProduct.category).id,
        ],
        img_url: cloudinaryResponse.data.public_id,
      };
      console.log("CALLING API", apiData);
      await axios.post(`${DEV_API_URL}/products/`, apiData);
      navigate("/feed");
    } catch (e) {
      console.log(e);
    }
  };
 ```
 I then worked on the user profile page. This section needed to be well thought out because I wanted to get access to the current users information and products. To do so, I needed to target the current token in the local storage and import the “getLoggedInuser” function to my profile page and fetch the data with post from the “authentication app”
 
 ```javascript
 export const getLoggedInUser = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  const middle = token.split(".")[1];
  const decodedString = window.atob(middle);
  const decodedObject = JSON.parse(decodedString);
  console.log(decodedObject);
  console.log(decodedObject.sub);
  return decodedObject.sub;
};
 ```
  ```javascript
 const ownerprofile = await axios
          .post(`${DEV_API_URL}/auth/${loggedInUser}/`)
          .then((res) => setProfileData(res.data));
 ```
 Then to get the products that the current user has posted, I can filter through all the products and select only the one that has the same user id as the current user.
 ```javascript
   const userItems = {
    ...userProducts,
    owner: userProducts.filter((i) => i.owner.id === profileData.id),
  };
 ```
 
 ## Challenges & Wins

### Cart Page
The cart page was a challenge for me to figure out since I had to go back to the backend and add a cart app. I then fetched the date for the authentication user data, products and cart model. With the data received I filtered out the cart and products state so that the page and products are adapted to the current user only.

I then calculated each item’s price on the cart using the reduce method and displayed the total result on the page. By doing so, each item added to cart will be automatically calculated in the cart total.

  ```javascript
const userItems = {
    ...myCart,
    owner: myCart.filter((i) => i.owner.id === profileData.id),
  };

  const cartItems = {
    ...products,
    product: products.filter((i) => i.id === myCart.id),
  };

  //Total Calculation
  const result = products.reduce(
    (total, currentValue) => (total = total + parseInt(currentValue.price)),
    0
  );
  ```
  ## Final Look
  
  
