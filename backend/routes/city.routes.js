const express = require("express");
const router = express.Router();
const CityController = require("../controllers/city.controller");

/**
 * @swagger
 * tags:
 *   name: Cities
 *   description: City management endpoints
 */

/**
 * @swagger
 * /cities:
 *   get:
 *     summary: Get all cities
 *     tags: [Cities]
 *     description: Retrieve a list of all cities in the system
 *     responses:
 *       200:
 *         description: List of cities retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/City'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", CityController.getAll);

/**
 * @swagger
 * /cities/{id}:
 *   get:
 *     summary: Get city by ID
 *     tags: [Cities]
 *     description: Retrieve a specific city by its unique identifier
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the city
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: City retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/City'
 *       404:
 *         description: City not found
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
router.get("/:id", CityController.getById);

// Commenting out unused routes for deployment version
// router.post("/", CityController.create); // Redundant for deployment version
// router.put("/:id", CityController.update); // Redundant for deployment version
// router.delete("/:id", CityController.delete); // Redundant for deployment version

module.exports = router;
