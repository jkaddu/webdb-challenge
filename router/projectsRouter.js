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

router.get('/', (req, res) => {
	db('projects')
		.then((project) => {
			res.status(200).json(project);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.get('/project/:id', (req, res) => {
	const { id } = req.params;
	db('projects')
		.where({ id: id })
		.first()
		.then((project) => {
			db('actions').where({ project_id: id }).then((action) => {
				project.action = action;
				return res.status(200).json(project);
			});
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
