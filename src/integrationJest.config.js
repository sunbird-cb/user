module.exports = {
	rootDir: '.',
	roots: ['<rootDir>/'],
	setupFiles: ['dotenv/config'],
	//globalSetup: './__test__/databaseSetup.js',
	//globalTeardown: './__test__/databaseTeardown.js',
	setupFilesAfterEnv: ['./setupFileAfterEnv.js'],
	moduleNameMapper: {
		'@root/(.*)': '<rootDir>/$1',
		'@services/(.*)': '<rootDir>/services/$1',
		'@controllers/(.*)': '<rootDir>/controllers/$1',
		'@db/(.*)': '<rootDir>/db/$1',
		'@generics/(.*)': '<rootDir>/generics/$1',
		'@constants/(.*)': '<rootDir>/constants/$1',
		'@configs/(.*)': '<rootDir>/configs/$1',
		'@health-checks/(.*)': '<rootDir>/health-checks/$1',
	},
	//reporters: ['default', 'jest-html-reporters'],
}