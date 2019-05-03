const knex = require('knex');
const router = require('express').Router();

const knexConfig = {
	client: 'sqlite3',
	connection: {
		filename: './data/project.db3'
	},
	useNullAsDefault: true
};

const db = knex(knexConfig);

router.post('/', (req, res) => {
	const action = req.body;

	if (action.name && action.notes && action.project_id) {
		db('actions')
			.insert(action, 'id')
			.then((id) => {
				db('actions').where({ id: ids[0] }).first().then((action) => {
					res.status(200).json(action);
				});
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	} else {
		res.status(400).json({ message: 'Please provide name, notes and ID of project.' });
	}
});
