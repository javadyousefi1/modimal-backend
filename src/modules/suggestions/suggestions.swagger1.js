/**
 * @swagger
 * suggestions:
 *  name: Menu
 *  description: Menu Module and Routes
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
 * /api/suggestion/create-suggestion:
 *  post:
 *      summary: create new suggestion
 *      tags:
 *          -   Suggestions
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateSuggestions'
 *      responses:
 *          201: 
 *              description: created
 */

/**
 * @swagger
 * /api/suggestion/get-all-suggestions:
 *  get:
 *      summary: get all suggestionss
 *      tags:
 *          -   Suggestions
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
 * /api/suggestion/delete-suggestion:
 *  delete:
 *      summary: delete catergory
 *      tags:
 *          -   Suggestions
 *      parameters:
 *          -   in: query
 *              required: true
 *              name: id
 *      responses:
 *          200: 
 *              description: successfully
 */