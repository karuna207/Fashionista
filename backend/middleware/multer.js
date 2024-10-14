import multer from "multer";

const storage=multer.diskStorage({
    filename:function (req,file,callback) {
        callback(null,file.originalname)
    }
}) 

const upload=multer({storage}); 

export default upload; 



// Here’s a breakdown of each line of the code:

// 1. **`import multer from "multer";`**  
//    This line imports the `multer` library, which is a Node.js middleware used for handling `multipart/form-data`, primarily for uploading files. It allows handling file uploads easily in Express.js or similar frameworks.
// 2. **`const storage = multer.diskStorage({`**  
//    This line defines a `storage` configuration object by calling `multer.diskStorage()`. This is used to configure how and where the uploaded files should be stored on the server. In this case, files will be saved on disk (local storage).

// 3. **`filename: function (req, file, callback) {`**  
//    This line defines the `filename` property inside the `storage` object. The `filename` function is used to control what the uploaded file will be named once stored on the disk. It takes in three arguments:
//    - `req`: The incoming request object.
//    - `file`: The file being uploaded (contains information like original filename, file size, etc.).
//    - `callback`: A callback function that should be called with the generated filename.

// 4. **`callback(null, file.originalname)`**  
//    Inside the `filename` function, the `callback` is called with two arguments:
//    - The first argument (`null`) indicates there is no error.
//    - The second argument (`file.originalname`) is the name that the uploaded file will be saved as, which in this case is the original name of the file being uploaded.

// 5. **`})`**  
//    This closes the configuration object for the `multer.diskStorage()` method.

// 6. **`const upload = multer({ storage });`**  
//    This line creates an instance of `multer` and configures it with the `storage` object defined earlier. This `upload` object is now ready to handle file uploads, and it will store files with their original names on the server.

// 7. **`export default upload;`**  
//    This line exports the `upload` object so it can be used in other parts of the application. Any route in the Express application that requires file uploading can import and use this `upload` middleware.

// In summary, the code configures a file upload middleware using `multer` that saves uploaded files to disk with their original filenames.