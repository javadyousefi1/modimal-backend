/**
 * @swagger
 * tags:
 *  name: FrontOffice
 *  description: FrontOffice Module and Routes
 */


/**
 * @swagger
 * /api/frontoffice/get-all-categories:
 *  get:
 *      summary: get all categories
 *      tags:
 *          -   FrontOffice
 *      responses:
 *          200: 
 *              description: successfully
 */
/**
 * @swagger
 * /api/frontoffice/get-all-menus-by-category:
 *  get:
 *      summary: get all categories
 *      tags:
 *          -   FrontOffice
 *      parameters:
 *          -   in: query
 *              required: true
 *              name: categoryId
 *      responses:
 *          200: 
 *              description: successfully
 */


/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateSuggestions:
 *              type: object
 *              required:
 *                  -   subject
 *                  -   text
 *                  -   icon
 *              properties:
 *                  subject:
 *                      type: string
 *                  text:
 *                      type: string
 */


/**
 * @swagger
 * /api/frontoffice/create-suggest:
 *  post:
 *      summary: create new suggestion
 *      tags:
 *          -   FrontOffice
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateSuggestions'
 *      responses:
 *          201: 
 *              description: created
 */
