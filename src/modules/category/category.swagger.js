/**
 * @swagger
 * tags:
 *  name: Category
 *  description: Category Module and Routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateCategory:
 *              type: object
 *              required:
 *                  -   title
 *                  -   svgIcon
 *                  -   icon
 *              properties:
 *                  title:
 *                      type: string
 *                  svgIcon:
 *                      type: string
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          ToggleStatus:
 *              type: object
 *              required:
 *                  -   categoryId
 *                  -   icon
 *              properties:
 *                  categoryId:
 *                      type: string
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          UpdateCategory:
 *              type: object
 *              required:
 *                  -   id
 *                  -   title
 *                  -   svgIcon
 *              properties:
 *                  id:
 *                      type: string
 *                  title:
 *                      type: string
 *                  svgIcon:
 *                      type: string
 */


/**
 * @swagger
 * /api/category/create-category:
 *  post:
 *      summary: Create a new category 
 *      tags:
 *          - Category
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                              description: The title of the category post
 *                          isActive:
 *                              type: boolean
 *                              description: The status of the category post
 *      responses:
 *          201:
 *              description: category created successfully
 */

/**
 * @swagger
 * /api/category/update-category:
 *  put:
 *      summary: update category 
 *      tags:
 *          - Category
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: string
 *                              description: The id of will be updated category
 *                          title:
 *                              type: string
 *                              description: The title of the category post
 *                          isActive:
 *                              type: boolean
 *                              description: The status of the category post
 *      responses:
 *          201:
 *              description: category created successfully
 */

/**
 * @swagger
 * /api/category/get-all-categories:
 *  get:
 *      summary: get all categories
 *      tags:
 *          -   Category
 *      parameters:
 *          -   in: query
 *              required: false
 *              name: pageSize
 *          -   in: query
 *              required: false
 *              name: pageIndex
 *          -   in: query
 *              required: false
 *              name: search
 *      responses:
 *          200: 
 *              description: successfully
 */

/**
 * @swagger
 * /api/category/get-category-byId:
 *  get:
 *      summary: get category by id
 *      tags:
 *          -   Category
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
 * /api/category/delete-category:
 *  delete:
 *      summary: delete catergory
 *      tags:
 *          -   Category
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
 * /api/category/toggle-category-status:
 *  patch:
 *      summary: toggle status
 *      tags:
 *          -   Category
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ToggleStatus'
 *      responses:
 *          201: 
 *              description: created
 */