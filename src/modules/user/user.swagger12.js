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
 *                  -   password
 *                  -   userName
 *                  -   icon
 *              properties:
 *                  password:
 *                      type: string
 *                  userName:
 *                      type: string
 *          LoginUser:
 *              type: object
 *              required:
 *                  -   userName
 *                  -   password
 *                  -   token
 *                  -   icon
 *              properties:
 *                  userName:
 *                      type: string
 *                  password:
 *                      type: string
 *                  token:
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
 * /api/user//get-current-user:
 *  get:
 *      summary: get current user
 *      tags:
 *          -   User
 *      responses:
 *          200: 
 *              description: login succsefully
 */

/**
 * @swagger
 * /api/user/register-user:
 *  post:
 *      summary: registrer user
 *      tags:
 *          -   User
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateUser'
 *      responses:
 *          200: 
 *              description: login succsefully
 */
