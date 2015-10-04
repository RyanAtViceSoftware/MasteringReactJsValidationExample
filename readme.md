# Mastering ReactJs Validation Sample with the React Validation Mixin 
This code is sample code from the book Mastering ReactJs by Ryan Vice and Adam Horton and shows how to do field and form level validaitons using ReactJs with the React Validation Mixin.

### To run this code
1) Execute from command prompt (Windows) or terminal (Mac)
    ```
    npm install
    ```

2) Open index.html in a browser

### To build this code
1) Execute from command prompt (Windows) or terminal (Mac)
    ```
    npm install watchify -g
    ```

2) Execute from command prompt (Windows) or terminal (Mac)
    ```
    watchify -t reactify app.jsx -o dist/bundle.js -v
    ```
    
This will run watchify and will rebuild dist/bundle.js anytime you change the code in app.jsx.