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
	const project = req.body;

	if (project.name && project.description) {
		db('projects')
			.insert(project, 'id')
			.then((id) => {
				db('projects').where({ id: ids[0] }).first().then((project) => {
					res.status(200).json(project);
				});
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	} else {
		res.status(400).json({ message: 'Please provide name and description.' });
	}
});
