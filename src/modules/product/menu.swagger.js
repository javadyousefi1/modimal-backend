/**
 * @swagger
 * tags:
 *  name: Product
 *  description: Product Module and Routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          ToggleStatusMenu:
 *              type: object
 *              required:
 *                  -   menuId
 *                  -   icon
 *              properties:
 *                  menuId:
 *                      type: string
 */


/**
 * @swagger
 * /api/product/create-product:
 *  post:
 *      summary: Create a new product 
 *      tags:
 *          - Product
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                              description: The title of the product 
 *                          text:
 *                              type: string
 *                              description: The main text content of the product 
 *                          price:
 *                              type: number
 *                              description: the price of the product 
 *                          offPrice:
 *                              type: number
 *                              description: the off price of the product 
 *                          isActive:
 *                              type: boolean
 *                              description: status of the product 
 *                          categoryId:
 *                              type: string
 *                              description: The category ID associated with the product 
 *                          file:
 *                              type: array
 *                              items:
 *                                  type: string
 *                                  format: binary
 *                              description: An array of file objects for the product
 *                          color:
 *                              type: array
 *                              items:
 *                                  type: string
 *                              description: An array of color options for the product
 *                          size:
 *                              type: array
 *                              items:
 *                                  type: string
 *                              description: An array of size options for the product
 *      responses:
 *          201:
 *              description: Product created successfully
 */


/**
 * @swagger
 * /api/product/update-product:
 *  put:
 *      summary: update a new product 
 *      tags:
 *          - Product
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: string
 *                              description: the updated item ID
 *                          title:
 *                              type: string
 *                              description: The title of the product 
 *                          text:
 *                              type: string
 *                              description: The main text content of the product 
 *                          price:
 *                              type: number
 *                              description: the price of the product 
 *                          offPrice:
 *                              type: number
 *                              description: the off price of the product 
 *                          isActive:
 *                              type: boolean
 *                              description: status of the product 
 *                          categoryId:
 *                              type: string
 *                              description: The category ID associated with the product 
 *                          file:
 *                              type: string
 *                              format: binary
 *                              description: The file image for the product  (must be a valid image file)
 *      responses:
 *          201:
 *              description: Product created successfully
 */

/**
 * @swagger
 * /api/product/get-all-products:
 *  get:
 *      summary: get all products
 *      tags:
 *          -   Product
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
 * /api/product/get-product-byId:
 *  get:
 *      summary: get product by id
 *      tags:
 *          -   Product
 *      parameters:
 *          -   in: query
 *              required: false
 *              name: id
 *      responses:
 *          200: 
 *              description: successfully
 */


/**
 * @swagger
 * /api/product/delete-product:
 *  delete:
 *      summary: delete product
 *      tags:
 *          -   Product
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
 * /api/product/toggle-product-status:
 *  patch:
 *      summary: toggle product status
 *      tags:
 *          -   Product
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ToggleStatusMenu'
 *      responses:
 *          201: 
 *              description: created
 */