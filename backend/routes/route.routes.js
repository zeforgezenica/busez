const express = require("express");
const router = express.Router();
const RouteController = require("../controllers/route.controller");

/**
 * @swagger
 * tags:
 *   name: Routes
 *   description: Bus route management endpoints
 */

/**
 * @swagger
 * /routes:
 *   get:
 *     summary: Get all routes
 *     tags: [Routes]
 *     description: Retrieve a list of all bus routes in the system
 *     responses:
 *       200:
 *         description: List of routes retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Route'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", RouteController.getAll);

/**
 * @swagger
 * /routes/{id}:
 *   get:
 *     summary: Get route by ID
 *     tags: [Routes]
 *     description: Retrieve a specific bus route by its unique identifier
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the route
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Route retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Route'
 *       404:
 *         description: Route not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", RouteController.getById);

// Commenting out unused routes for deployment version
// router.post("/", RouteController.create); // Redundant for deployment version
// router.put("/:id", RouteController.update); // Redundant for deployment version
// router.delete("/:id", RouteController.delete); // Redundant for deployment version

module.exports = router;
