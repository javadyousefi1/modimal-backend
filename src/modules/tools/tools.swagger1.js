/**
 * @swagger
 * tags:
 *  name: Tools
 *  description: Tools Module and Routes
 */

/**
 * @swagger
 * /api/Tools/decrease-image-resolution:
 *  post:
 *      summary: decrease image resolution
 *      tags:
 *          - Tools
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          image:
 *                              type: string
 *                              format: binary
 *                              description: The file image for the category post (must be a valid image file)
 *                          persent:
 *                              type: number
 *                              description: a number between 20 until 80
 *      responses:
 *          201:
 *              description: category created successfully
 */
