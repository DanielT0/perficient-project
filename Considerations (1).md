
## API
# Considerations
- The project must be hosted in a git repository, it is recommended to keep a change history for each branch, example: "feat/auth-method". (gitHub, gitLab)
- NodeJs (express)
- Unit test for each end point (Jest, Mocha)
- To consume the services provided by the API, you must provide a Url (DigitalOcean, Docker) [recurso guia](https://www.youtube.com/watch?v=g3IiU6pmruY)
- (optional) Deployment with  Heroku only if not able to doing with DigitalOcean
- (optional) Pagination (mongoose-paginate-v2)
- Good practices and use of standards (Clean Code, SOLID) will be evaluated within the project.

  _The respective EndPoints and their parameters are listed below to access each one._
## Documentation

## Headers
* **Required**

 _Some requests when consuming the API it is necessary to add the access `Token`_
 
* **Error Response:**

* **Code:** `401`  <br />
    **Content:** 
     
      
      { "error": "Token Invalid" }
  OR
* **Code:** `401`  <br />
    **Content:** 
     
      
      { "error": "Token Expired" }
  OR
* **Code:** `401`  <br />
    **Content:** 
      
       
       { "error": "Token not found" }
       
## Authentication 
_The purpose is to obtain an access token for calling the web services_
* **URL**

  `/login`

* **Method:**
  
  `POST`
  
*  **Header**

    *`Content-Type - application/json `  
 
*   **Required:**

      `No parameters`
     

*   **Optional:**
 
       `No parameters`
      
*  **Body**
   

       {"email": "user@example.com","password": "secure"} 



* **Success Response:**
  
* **Code:** `200`  <br />
    
      
      
       {
          "id": 1,
          "first_name": "John",
          "last_name": "Doe",
          "email": "user@example.com",
          "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvbG9naW4iLCJpYXQiOjE2MDkzNDYwNjgsImV4cCI6MTYwOTM0OTY2OCwibmJmIjoxNjA5MzQ2MDY4LCJqdGkiOiI3czdHQ2NHZEl1SjFMMjlYIiwic3ViIjo1LCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.G__gZ68KMnmeCh_2bWLPX_7O5pzW0t0amhwWK3YtRd8",
          "age": 24,
          "image": "IMAGE",
          "description": "Description text"
       }
  
 
 
* **Error Response:**

  
* **Code:** `401`  <br />
     
      
       
       { "error": "Error in user or password" }
     
     



## Create User

_This endpoint create the user_

* **URL**

  `/users`

* **Method:**
  
  `POST`
  
*  **Header**

    * `Content-Type`  -  `application/json ` 
    * `Token = [string]` 
 
*   **Required:**

     * `first_name = [string]`  
     * `last_name  = [string]`
     * `email  = [string]`
     * `age  = [integer]`
     * `password  = [string]`
     

*   **Optional:**
 
     * `image = [string]`  
     * `description = [string]`  
 
*  **Body**


       {
            "first_name": "First Name",
            "last_name": "Last Name",
            "email": "email@example.com",
            "password": "SECRET",
            "age": 42,
            "image": "IMAGE",
            "description": "Description text"
       } 



* **Success Response:**
  
* **Code:** `201` <br />
    **Content:**
      
      
       {
           "id": 2,
           "first_name": "First Name",
           "last_name": "Last Name",
           "email": "email@example.com",
           "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvbG9naW4iLCJpYXQiOjE2MDkzNDYwNjgsImV4cCI6MTYwOTM0OTY2OCwibmJmIjoxNjA5MzQ2MDY4LCJqdGkiOiI3czdHQ2NHZEl1SjFMMjlYIiwic3ViIjo1LCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.G__gZ68KMnmeCh_2bWLPX_7O5pzW0t0amhwWK3YtRd8",
           "age": 42,
           "image": "IMAGE",
           "description": "Description text"
       }
     
* **Error Response:**
 * **Code:** `422`  <br />
     **Content:** 

      
       [
          {
              "first_name": [
                  "The first name field is required."
              ],
              "last_name": [
                  "The last name field is required."
              ],
              "email": [
                  "The email field is required."
              ],
              "age": [
                  "The age field is required."
              ],
              "password": [
                  "The password field is required."
              ]
          }
       ]
  
 ## Edit User
 
 _This endpoint can be edit the user_
 
 * **URL**
 
   `/users`
 
 * **Method:**
   
   `PUT`
   
 *  **Header**
 
    * `Content-Type`  -  `application/json ` 
  
 *   **Required:**
 
     * `first_name = [string]`  
     * `last_name  = [string]`
     * `email  = [string]`
     * `age  = [integer]`
     * `password  = [string]`
     * `image = [string]`  
     * `description = [string]`
      
 
 *   **Optional:**
  
      `No parameters`

*  **Body**
 
       
       {
             "first_name": "First Name",
             "last_name": "Last Name",
             "email": "email@example.com",
             "password": "SECRET",
             "age": 42,
             "image": "IMAGE",
             "description": "Description text"
       } 
 
 
* **Success Response:**
  
* **Code:** `201` <br />
    **Content:**
    
       {
                 "id": 2,
                 "first_name": "First Name",
                 "last_name": "Last Name",
                 "email": "email@example.com",
                 "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvbG9naW4iLCJpYXQiOjE2MDkzNDYwNjgsImV4cCI6MTYwOTM0OTY2OCwibmJmIjoxNjA5MzQ2MDY4LCJqdGkiOiI3czdHQ2NHZEl1SjFMMjlYIiwic3ViIjo1LCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.G__gZ68KMnmeCh_2bWLPX_7O5pzW0t0amhwWK3YtRd8",
                 "age": 42,
                 "image": "IMAGE",
                 "description": "Description text"
       }


* **Error Response:**
 * **Code:** `404`  <br />
     **Content:** 

      
       { "error": "User not found" }
  
 
## Partially Edit User
 
 _In this endpoint the user data is replaced with the data contained in the body._
 
 * **URL**
 
   `/users/{id}`
 
 * **Method:**
   
   `PATCH`
   
 *  **Header**
 
     * `Content-Type`  -  `application/json ` 
    
  
 *   **Required:**
 
       * `id =[integer]`
      
 
 *   **Optional:**
  
      * `email  = [string]`
      * `password  = [string]`
      * `image  = [string]`
      * `description  = [string]`
      * `first_name = [string]`  
      * `last_name  = [string]`
      * `age  = [integer]`

  
*  **Body**
 
       
       {
         "first_name": "Steven",
         "last_name": "Smith",
         "age": 26,
       } 
 
 
 
 * **Success Response:**
   
 * **Code:** `200`  <br />
     **Content:** 
       
       
        {
          "id": 2,
          "first_name": "Steven",
          "last_name": "Smith",
          "age": 26,
          "email": "email@example.com",
          "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvbG9naW4iLCJpYXQiOjE2MDkzNDYwNjgsImV4cCI6MTYwOTM0OTY2OCwibmJmIjoxNjA5MzQ2MDY4LCJqdGkiOiI3czdHQ2NHZEl1SjFMMjlYIiwic3ViIjo1LCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.G__gZ68KMnmeCh_2bWLPX_7O5pzW0t0amhwWK3YtRd8",
          "image": "IMAGE",
          "description": "Description text"
        }

* **Error Response:**
 * **Code:** `404`  <br />
     **Content:** 

      
       { "error": "User not found" }
  
  
 ## List users
  
  _Endpoint getting the  list of users in a paginated._
  
  * **URL**
  
    `/users`
  
  * **Method:**
    
    `GET`
    
  *  **Header**
  
     * `Content-Type`  -  `application/json ` 
     
   
  *   **Required:**
  
       `No parameters`
       
  
  *   **Optional:**
   
       `No parameters`
       
       
  *  **Body**
  
       
       {}
  
  
  * **Success Response:**
    
 * **Code:** `200`  <br />
     **Content:** 
    
        {
            "totalItems":10,
           "data": [
               {
                   "id": 4,
                   "first_name": "John",
                   "last_name": "Doe",
                   "email": "user@example.com",
                   "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvbG9naW4iLCJpYXQiOjE2MDkyODYxMTUsImV4cCI6MTYwOTI4OTcxNSwibmJmIjoxNjA5Mjg2MTE1LCJqdGkiOiI0ZVRWNmtYZklhcmgySVQ0Iiwic3ViIjo0LCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.yK4LywJso7Hl1Ahpl7j-6WcUFdjb36aVwo5R69sYmmk",
                   "age": 24,
                   "image": "IMAGE",
                   "description": "Description text"
               },
               {
                   "id": 5,
                   "first_name": "John",
                   "last_name": "Doe",
                   "email": "user11@example.com",
                   "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvbG9naW4iLCJpYXQiOjE2MDkzNDYwNjgsImV4cCI6MTYwOTM0OTY2OCwibmJmIjoxNjA5MzQ2MDY4LCJqdGkiOiI3czdHQ2NHZEl1SjFMMjlYIiwic3ViIjo1LCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.G__gZ68KMnmeCh_2bWLPX_7O5pzW0t0amhwWK3YtRd8",
                   "age": 26,
                   "image": "IMAGE",
                   "description": "Description text5"
               },
               {
                   "id": 6,
                   "first_name": "John2",
                   "last_name": "Doe3",
                   "email": "use2r@example.com",
                   "token": null,
                   "age": 26,
                   "image": "IMAGE",
                   "description": "Description text5"
               },
               {
                   "id": 7,
                   "first_name": "Steven",
                   "last_name": "Smith",
                   "email": "example@example.com",
                   "token": null,
                   "age": 26,
                   "image": "IMAGE",
                   "description": "Description text"
               }
           ],
               "current_page": 0,
               "totalPages": 2,
               "totalItems": 4
        }
       
## List user
  
  _Endpoint getting the  data of user._
  
  * **URL**
  
    `/users/{id}`
  
  * **Method:**
    
    `GET`
    
  *  **Header**
  
     * `Content-Type`  -  `application/json ` 
     
   
*   **Required:**
  
        * `id =[integer]`
       
  
*   **Optional:**
   
       `No parameters`
       
       
*  **Body**
  
        
        {}
  
  
* **Success Response:**
 * **Code:** `200`  <br />
      **Content:** 
        
        
       {
           "totalItems":10,
           "data": [
               {
                   "id": 4,
                   "first_name": "John",
                   "last_name": "Doe",
                   "email": "user@example.com",
                   "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvbG9naW4iLCJpYXQiOjE2MDkyODYxMTUsImV4cCI6MTYwOTI4OTcxNSwibmJmIjoxNjA5Mjg2MTE1LCJqdGkiOiI0ZVRWNmtYZklhcmgySVQ0Iiwic3ViIjo0LCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.yK4LywJso7Hl1Ahpl7j-6WcUFdjb36aVwo5R69sYmmk",
                   "age": 24,
                   "image": "IMAGE",
                   "description": "Description text"
               },
               {
                   "id": 5,
                   "first_name": "John",
                   "last_name": "Doe",
                   "email": "user11@example.com",
                   "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvbG9naW4iLCJpYXQiOjE2MDkzNDYwNjgsImV4cCI6MTYwOTM0OTY2OCwibmJmIjoxNjA5MzQ2MDY4LCJqdGkiOiI3czdHQ2NHZEl1SjFMMjlYIiwic3ViIjo1LCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.G__gZ68KMnmeCh_2bWLPX_7O5pzW0t0amhwWK3YtRd8",
                   "age": 26,
                   "image": "IMAGE",
                   "description": "Description text5"
               },
               {
                   "id": 6,
                   "first_name": "John2",
                   "last_name": "Doe3",
                   "email": "use2r@example.com",
                   "token": null,
                   "age": 26,
                   "image": "IMAGE",
                   "description": "Description text5"
               },
               {
                   "id": 7,
                   "first_name": "Steven",
                   "last_name": "Smith",
                   "email": "example@example.com",
                   "token": null,
                   "age": 26,
                   "image": "IMAGE",
                   "description": "Description text"
               }
           ],
            "current_page": 0,
            "totalPages": 2,
            "totalItems": 4
       }
       
* **Error Response:**
 * **Code:** `404`  <br />
     **Content:** 

      
       { "error": "User not found" }
## Delete User
 
 _This endpoint can be edit the user_
 
 * **URL**
 
   `/users/{id}`
 
 * **Method:**
   
   `DELETE`
   
 *  **Header**
 
    * `Content-Type`  -  `application/json ` 
  
 *   **Required:**
 
      * `id = [integer]`
      
 
 *   **Optional:**
  
      `No parameters`
  
*  **Body**
 
       
       {}
       
* **Success Response:**
 * **Code:** `200`  <br />
     **Content:** 

      
       { "message": "User deleted succesfull" }
       
* **Error Response:**
 * **Code:** `404`  <br />
     **Content:** 

      
       { "error": "User not found" }
  

  
 



