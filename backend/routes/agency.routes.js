const express = require("express");
const router = express.Router();
const AgencyController = require("../controllers/agency.controller");

/**
 * @swagger
 * tags:
 *   name: Agencies
 *   description: Transportation agency management endpoints
 */

/**
 * @swagger
 * /agencies:
 *   get:
 *     summary: Get all agencies
 *     tags: [Agencies]
 *     description: Retrieve a list of all transportation agencies in the system
 *     responses:
 *       200:
 *         description: List of agencies retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Agency'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", AgencyController.getAll);

/**
 * @swagger
 * /agencies/{id}:
 *   get:
 *     summary: Get agency by ID
 *     tags: [Agencies]
 *     description: Retrieve a specific transportation agency by its unique identifier
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the agency
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Agency retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agency'
 *       404:
 *         description: Agency not found
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
router.get("/:id", AgencyController.getById);

// Commenting out unused routes for deployment version
// router.post("/", AgencyController.create); // Redundant for deployment version
// router.put("/:id", AgencyController.update); // Redundant for deployment version
// router.delete("/:id", AgencyController.delete); // Redundant for deployment version

module.exports = router;
