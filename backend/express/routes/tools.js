const {ValidationError} = require('sequelize');
const db = require('../../models');
const { getIdParam } = require('../helpers');

async function getAll(req, res) {
	const tools = await db.Tool.findAll();
	res.status(200).json(tools);
};

async function getById(req, res) {
	const id = getIdParam(req);
	const tool = await db.Tool.findByPk(id);
	if (tool) {
		res.status(200).json(tool);
	} else {
		res.status(404).send('Not found');
	}
};

async function create(req, res) {
	try {
		await db.Tool.create(req.body);
		res.status(201).end();
	} catch (e) {
		console.log(e);
		if(e instanceof ValidationError){
            res.status(400)
				.send('Captured validation error. ' + e.errors.map((item) => item.path +' - '+item.message).join('; '));
        } else {
			res.status(400).send('Bad request');
		}
	}
};

async function update(req, res) {
	const id = getIdParam(req);
	if (req.body.id === id || null === req.body.id) {
		const result = await db.Tool.update(req.body, {
			where: {
				id: id
			}
		});
		if (result[0] == 0) {
			res.status(404).send('Not found');
		}
		res.status(200).end();
	} else {
		res.status(400).send(`Bad request. Param ID (${id}) does not match body ID (${req.body.id}).`);
	}
};

async function remove(req, res) {
	const id = getIdParam(req);
	const result = await db.Tool.destroy({
		where: {
			id: id
		}
	});
	console.log(result);
	if (result == 0) {
		res.status(404).send('Not found');
	} else {
		res.status(200).end();
	}
};

module.exports = {
	getAll,
	getById,
	create,
	update,
	remove,
};
