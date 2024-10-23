/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Order management and operations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateOrder:
 *       type: object
 *       required:
 *         - deskNumber
 *         - order
 *       properties:
 *         deskNumber:
 *           type: number
 *           description: The desk number associated with the order
 *           example: 12
 *         order:
 *           type: array
 *           description: Array of menu items in the order
 *           items:
 *             type: object
 *             properties:
 *               menuId:
 *                 type: string
 *                 description: The ID of the menu item
 *                 example: 610d1f77bcf86cd799439011
 *               count:
 *                 type: number
 *                 description: The number of times the menu item is ordered
 *                 example: 2
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateOrder:
 *       type: object
 *       required:
 *         - deskNumber
 *         - order
 *       properties:
 *         id:
 *           type: number
 *           description: The id of upodated order
 *           example: 610d1f77bcf86cd799439011
 *         deskNumber:
 *           type: number
 *           description: The desk number associated with the order
 *           example: 12
 *         order:
 *           type: array
 *           description: Array of menu items in the order
 *           items:
 *             type: object
 *             properties:
 *               menuId:
 *                 type: string
 *                 description: The ID of the menu item
 *                 example: 610d1f77bcf86cd799439011
 *               count:
 *                 type: number
 *                 description: The number of times the menu item is ordered
 *                 example: 2
 */

/**
 * @swagger
 * /api/order/create-order:
 *  post:
 *      summary: create new order
 *      tags:
 *          -   Order
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateOrder'
 *      responses:
 *          201: 
 *              description: created
 */
/**
 * @swagger
 * /api/order/update-order:
 *  put:
 *      summary: update new order
 *      tags:
 *          -   Order
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateOrder'
 *      responses:
 *          200: 
 *              description: updated
 */

/**
 * @swagger
 * /api/order/get-all-orders:
 *  get:
 *      summary: get all orders
 *      tags:
 *          -   Order
 *      parameters:
 *          -   in: query
 *              required: false
 *              name: pageSize
 *          -   in: query
 *              required: false
 *              name: pageIndex
 *      responses:
 *          200: 
 *              description: successfully
 */
/**
 * @swagger
 * /api/order/delete-order:
 *  delete:
 *      summary: delete catergory
 *      tags:
 *          -   Order
 *      parameters:
 *          -   in: query
 *              required: true
 *              name: id
 *      responses:
 *          200: 
 *              description: successfully
 */


/**
 * @swagger
 * /api/order/change-order-status:
 *  patch:
 *      summary: change order status
 *      tags:
 *          -   Order
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          orderId:
 *                              type: string
 *                          status:
 *                              type: integer
 *                              enum:
 *                                  - 1
 *                                  - 2
 *                                  - 3
 *                                  - 4
 *      responses:
 *          '200':
 *              description: changed
 */
/**
 * @swagger
 * components:
 *     schemas:
 *         ChangeOrderStatusURL:
 *             type: object
 *             required:
 *                 -   orderId
 *                 -   status
 *                 -   icon
 *             properties:
 *                 orderId:
 *                     type: string
 *                 status:
 *                     type: integer
 *                     enum:
 *                         - 1
 *                         - 2
 *                         - 3
 *                         - 4
 */
