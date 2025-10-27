const express = require("express");
const router = express.Router();
const CountryController = require("../controllers/country.controller");

/**
 * @swagger
 * tags:
 *   name: Countries
 *   description: Country management endpoints
 */

/**
 * @swagger
 * /countries:
 *   get:
 *     summary: Get all countries
 *     tags: [Countries]
 *     description: Retrieve a list of all countries in the system
 *     responses:
 *       200:
 *         description: List of countries retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Country'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", CountryController.getAll);

/**
 * @swagger
 * /countries/{id}:
 *   get:
 *     summary: Get country by ID
 *     tags: [Countries]
 *     description: Retrieve a specific country by its unique identifier
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the country
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Country retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Country'
 *       404:
 *         description: Country not found
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
router.get("/:id", CountryController.getById);

// Commenting out unused routes for deployment version
// router.post("/", CountryController.create); // Redundant for deployment version
// router.put("/:id", CountryController.update); // Redundant for deployment version
// router.delete("/:id", CountryController.delete); // Redundant for deployment version

module.exports = router;
