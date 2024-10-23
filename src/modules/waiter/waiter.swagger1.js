/**
 * @swagger
 * waiter:
 *  name: Waiter
 *  description: Waiter Module and Routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateWaiter:
 *              type: object
 *              required:
 *                  -   deskNumber
 *              properties:
 *                  deskNumber:
 *                      type: number
 */


/**
 * @swagger
 * /api/waiter/create-waiter:
 *  post:
 *      summary: create new waiter
 *      tags:
 *          -   Waiter
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateWaiter'
 *      responses:
 *          201: 
 *              description: created
 */

/**
 * @swagger
 * /api/waiter/get-all-waiters:
 *  get:
 *      summary: get all waiters
 *      tags:
 *          -   Waiter
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
 * /api/waiter/delete-waiter:
 *  delete:
 *      summary: delete catergory
 *      tags:
 *          -   Waiter
 *      parameters:
 *          -   in: query
 *              required: true
 *              name: id
 *      responses:
 *          200: 
 *              description: successfully
 */