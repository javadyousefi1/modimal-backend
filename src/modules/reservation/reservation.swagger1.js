/**
 * @swagger
 * tags:
 *  name: Reservation
 *  description: Reservation Module and Routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateReservation:
 *              type: object
 *              required:
 *                  -   name
 *                  -   phone
 *                  -   date
 *                  -   text
 *                  -   deskNumber
 *                  -   icon
 *              properties:
 *                  name:
 *                      type: string
 *                  phone:
 *                      type: string
 *                  date:
 *                      type: string
 *                  deskNumber:
 *                      type: number
 *                  text:
 *                      type: string
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          UpdateReservation:
 *              type: object
 *              required:
 *                  -   id
 *                  -   name
 *                  -   phone
 *                  -   date
 *                  -   text
 *                  -   deskNumber
 *                  -   icon
 *              properties:
 *                  id:
 *                      type: string
 *                  name:
 *                      type: string
 *                  phone:
 *                      type: string
 *                  date:
 *                      type: string
 *                  deskNumber:
 *                      type: number
 *                  text:
 *                      type: string
 */

/**
 * @swagger
 * /api/reservation/create-reservation:
 *  post:
 *      summary: create new reservation
 *      tags:
 *          -   Reservation
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateReservation'
 *      responses:
 *          201: 
 *              description: created
 */

/**
 * @swagger
 * /api/reservation/update-reservation:
 *  put:
 *      summary: update new reservation
 *      tags:
 *          -   Reservation
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateReservation'
 *      responses:
 *          201: 
 *              description: updated
 */



/**
 * @swagger
 * /api/category/create-category:
 *  post:
 *      summary: Create a new category post
 *      tags:
 *          - Category
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                              description: The title of the category post
 *                          isActive:
 *                              type: boolean
 *                              description: The status of the category post
 *                          file:
 *                              type: string
 *                              format: binary
 *                              description: The file image for the category post (must be a valid image file)
 *      responses:
 *          201:
 *              description: category created successfully
 */

/**
 * @swagger
 * /api/reservation/get-all-reservations:
 *  get:
 *      summary: get all reservation
 *      tags:
 *          -   Reservation
 *      parameters:
 *          -   in: query
 *              required: false
 *              name: pageSize
 *          -   in: query
 *              required: false
 *              name: pageIndex
 *          -   in: query
 *              required: false
 *              name: date
 *      responses:
 *          200: 
 *              description: successfully
 */

/**
 * @swagger
 * /api/reservation/get-reservation-byId:
 *  get:
 *      summary: get reservation by id
 *      tags:
 *          -   Reservation
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
 * /api/reservation/delete-reservation:
 *  delete:
 *      summary: delete reservation
 *      tags:
 *          -   Reservation
 *      parameters:
 *          -   in: query
 *              required: true
 *              name: id
 *      responses:
 *          200: 
 *              description: successfully
 */
