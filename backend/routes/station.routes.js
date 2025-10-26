const express = require("express");
const router = express.Router();
const StationController = require("../controllers/station.controller");
const StationRelationshipController = require("../controllers/station.relationship.controller");

/**
 * @swagger
 * tags:
 *   name: Stations
 *   description: Bus station management and relationship endpoints
 */

/**
 * @swagger
 * /stations:
 *   get:
 *     summary: Get all stations
 *     tags: [Stations]
 *     description: Retrieve a list of all bus stations in the system
 *     responses:
 *       200:
 *         description: List of stations retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Station'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", StationController.getAll);

/**
 * @swagger
 * /stations/{id}:
 *   get:
 *     summary: Get station by ID
 *     tags: [Stations]
 *     description: Retrieve a specific bus station by its unique identifier
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the station
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Station retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Station'
 *       404:
 *         description: Station not found
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
router.get("/:id", StationController.getById);

/**
 * @swagger
 * /stations/{id}/connections:
 *   get:
 *     summary: Get stations connected to a specific station
 *     tags: [Stations]
 *     description: Retrieve all stations that are connected to the specified station
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the station
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Connected stations retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Station'
 *       404:
 *         description: Station not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get(
  "/:id/connections",
  StationRelationshipController.getStationsByConnection
);

/**
 * @swagger
 * /stations/connect/{stationAId}/{stationBId}:
 *   get:
 *     summary: Check if two stations are connected
 *     tags: [Stations]
 *     description: Check whether there is a direct connection between two stations
 *     parameters:
 *       - in: path
 *         name: stationAId
 *         required: true
 *         description: Unique identifier of the first station
 *         schema:
 *           type: string
 *       - in: path
 *         name: stationBId
 *         required: true
 *         description: Unique identifier of the second station
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Connection status retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 connected:
 *                   type: boolean
 *                   description: Whether the stations are connected
 *                   example: true
 *       404:
 *         description: One or both stations not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get(
  "/connect/:stationAId/:stationBId",
  StationRelationshipController.doStationsConnect
);

// Commenting out unused routes for deployment version
// router.post("/", StationController.create); Redundant for deployment version
// router.put("/:id", StationController.update); // Redundant for deployment version
// router.delete("/:id", StationController.delete); // Redundant for deployment version

module.exports = router;
