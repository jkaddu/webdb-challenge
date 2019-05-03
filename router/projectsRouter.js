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

router.get('/:id/actions', (req, res) => {
	db('projects')
		.where({ id: req.params.id })
		.first()
		.then((project) => {
			if (project) {
				res.status(200).json(project);
			} else {
				res.status(404).json({ message: 'Project not found.' });
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.post('/', (req, res) => {
	if (!req.body.name || !req.body.description) {
		res.status(400).json({ message: 'Please provide a name and description.' });
	} else {
		db('projects')
			.insert(req.body, 'id')
			.then((ids) => {
				db('projects').where({ id: ids[0] }).first().then((project) => {
					res.status(200).json(project);
				});
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	}
});

module.exports = router;
