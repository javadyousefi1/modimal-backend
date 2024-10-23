/**
 * @swagger
 * tags:
 *  name: Menu
 *  description: Menu Module and Routes
 */

/**
 * @swagger
 * tags:
 *  name: MenuComments
 *  description: MenuComments Module and Routes
 */
/**
 * @swagger
 * tags:
 *  name: MenuLikes
 *  description: MenuLikes Module and Routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateMenu:
 *              type: object
 *              required:
 *                  -   title
 *                  -   categoryId
 *                  -   text
 *                  -   tags
 *                  -   readingDuration
 *                  -   icon
 *              properties:
 *                  title:
 *                      type: string
 *                  readingDuration:
 *                      type: number
 *                  categoryId:
 *                      type: string
 *                  text:
 *                      type: string
 *                  tags:
 *                      type: array
 *                      items:
 *                          type: string
 *          AddComment:
 *              type: object
 *              required:
 *                  -   menuId
 *                  -   comment
 *                  -   icon
 *              properties:
 *                  menuId:
 *                      type: string
 *                  comment:
 *                      type: string
 *          LikeMenu:
 *              type: object
 *              required:
 *                  -   menuId
 *                  -   icon
 *              properties:
 *                  menuId:
 *                      type: string
 *          ReplyComment:
 *              type: object
 *              required:
 *                  -   menuId
 *                  -   commentId
 *                  -   reply
 *                  -   icon
 *              properties:
 *                  menuId:
 *                      type: string
 *                  commentId:
 *                      type: string
 *                  reply:
 *                      type: string
 *          VerifyComment:
 *              type: object
 *              required:
 *                  -   menuId
 *                  -   commentId
 *                  -   icon
 *              properties:
 *                  menuId:
 *                      type: string
 *                  commentId:
 *                      type: string
 *          DeleteComment:
 *              type: object
 *              required:
 *                  -   menuId
 *                  -   commentId
 *                  -   icon
 *              properties:
 *                  menuId:
 *                      type: string
 *                  commentId:
 *                      type: string
 */

/**
 * @swagger
 * /api/menu/create-menu:
 *  post:
 *      summary: Create a new menu post
 *      tags:
 *          - Menu
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                              description: The title of the menu post
 *                          readingDuration:
 *                              type: number
 *                              description: The estimated reading duration in minutes
 *                          categoryId:
 *                              type: string
 *                              description: The category ID associated with the menu post
 *                          text:
 *                              type: string
 *                              description: The main text content of the menu post
 *                          tags:
 *                              type: array
 *                              items:
 *                                  type: string
 *                              description: Tags associated with the menu post
 *                          file:
 *                              type: string
 *                              format: binary
 *                              description: The file image for the menu post (must be a valid image file)
 *      responses:
 *          201:
 *              description: Menu created successfully
 */

/**
 * @swagger
 * /api/menu/like-menu:
 *  post:
 *      summary: like or unlike menu
 *      tags:
 *          -   MenuLikes
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/LikeMenu'
 *      responses:
 *          201: 
 *              description: likeed or unliked
 */
/**
 * @swagger
 * /api/menu/add-comment:
 *  post:
 *      summary: add comment on menu
 *      tags:
 *          -   MenuComments
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/AddComment'
 *      responses:
 *          201: 
 *              description: created a comment
 */
/**
 * @swagger
 * /api/menu/reply-comment:
 *  post:
 *      summary: reply comment on menu
 *      tags:
 *          -   MenuComments
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ReplyComment'
 *      responses:
 *          201: 
 *              description: reply a comment
 */
/**
 * @swagger
 * /api/menu/verify-comment:
 *  post:
 *      summary: verify comment on menu
 *      tags:
 *          -   MenuComments
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/VerifyComment'
 *      responses:
 *          201: 
 *              description: verify a comment
 */
/**
 * @swagger
 * /api/menu/delete-comment:
 *  delete:
 *      summary: delete comment on menu
 *      tags:
 *          -   MenuComments
 *      parameters:
 *          -   in: query
 *              required: true
 *              name: menuId
 *          -   in: query
 *              required: true
 *              name: commentId
 *      responses:
 *          201: 
 *              description: delete a comment
 */
/**
 * @swagger
 * /api/menu/get-all-menus:
 *  get:
 *      summary: get all menus
 *      tags:
 *          -   Menu
 *      responses:
 *          200: 
 *              description: successfully
 */
/**
 * @swagger
 * /api/menu/delete-menu:
 *  delete:
 *      summary: delete menu
 *      tags:
 *          -   Menu
 *      parameters:
 *          -   in: query
 *              required: true
 *              name: id
 *      responses:
 *          200: 
 *              description: successfully
 */