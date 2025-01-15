 1 : API Simulation  = https://jsonbin.io/quick-store/   "jsonbin" api gave me CORS error so i decided to use another api from MockApi

 2 : i'm using React+Vite for it 
 3 : a -  Products: Store fetched product data.
     b -Visible Products: Manage products currently visible in the viewport.
     c -Page Number: Track the current batch being fetched.
 4 :  Implement Lazy Loading    -
 a - Use the IntersectionObserver API to detect when the user scrolls near the bottom of the visible products.  
 b- Render the next batch of 8 products progressively as they enter the viewport. 
  5 : Infinite Scrolling   - Once all 48 products are rendered, fetch the next batch of 48 products via the API.
                             Append the new data to the existing product list and continue rendering progressively.
 6 : Error Handling: used try catch
 7 : Performance Optimization  : used UseCallback
                         
                                       
