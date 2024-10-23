/**
 * @swagger
 * tags:
 *  name: User
 *  description: action on auth user
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateUser:
 *              type: object
 *              required:
 *                  -   email
 *                  -   password
 *                  -   name
 *                  -   icon
 *              properties:
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *                  name:
 *                      type: string
 *          LoginUser:
 *              type: object
 *              required:
 *                  -   email
 *                  -   password
 *                  -   icon
 *              properties:
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *          AddAdminRole:
 *              type: object
 *              required:
 *                  -   userId
 *                  -   icon
 *              properties:
 *                  userId:
 *                      type: string
 * 
 */

/**
 * @swagger
 * /api/user/register-user:
 *  post:
 *      summary: register new user
 *      tags:
 *          -   User
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateUser'
 *      responses:
 *          201: 
 *              description: created
 */

/**
 * @swagger
 * /api/user/login-user:
 *  post:
 *      summary: login user
 *      tags:
 *          -   User
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/LoginUser'
 *      responses:
 *          200: 
 *              description: login succsefully
 */
/**
 * @swagger
 * /api/user/add-admin-role:
 *  post:
 *      summary: add admin role to user
 *      tags:
 *          -   User
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/AddAdminRole'
 *      responses:
 *          200: 
 *              description: login succsefully
 */
/**
 * @swagger
 * /api/user/add-user-role:
 *  post:
 *      summary: add normal role to user
 *      tags:
 *          -   User
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/AddAdminRole'
 *      responses:
 *          200: 
 *              description: add user role
 */

/**
 * @swagger
 * /api/user/get-all-users:
 *  get:
 *      summary: get all users
 *      tags:
 *          -   User
 *      responses:
 *          200: 
 *              description: successfully
 */
/**
 * @swagger
 * /api/user/logout-user:
 *  get:
 *      summary: log out user
 *      tags:
 *          -   User
 *      responses:
 *          200: 
 *              description: successfully logged out
 */
/**
 * @swagger
 * /api/user/get-current-user:
 *  get:
 *      summary: get current user data
 *      tags:
 *          -   User
 *      responses:
 *          200: 
 *              description: gets user data successfully
 */
/**
 * @swagger
 * /api/user/delete-user:
 *  delete:
 *      summary: delete user
 *      tags:
 *          -   User
 *      parameters:
 *          -   in: query
 *              required: true
 *              name: id
 *      responses:
 *          200: 
 *              description: successfully
 */