let table = require('cli-table')

let tableData = new table()

let enviromentVariables = {
	APPLICATION_PORT: {
		message: 'Required port no',
		optional: false,
	},
	APPLICATION_HOST: {
		message: 'Required host',
		optional: false,
	},
	APPLICATION_ENV: {
		message: 'Required node environment',
		optional: false,
	},
	ACCESS_TOKEN_SECRET: {
		message: 'Required access token secret',
		optional: false,
	},
	REFRESH_TOKEN_SECRET: {
		message: 'Required refresh token secret',
		optional: false,
	},
	APP_NAME: {
		message: 'Application Name',
		optional: false,
	},
	REGISTRATION_EMAIL_TEMPLATE_CODE: {
		message: 'Required registration email template code',
		optional: false,
	},
	OTP_EMAIL_TEMPLATE_CODE: {
		message: 'Required otp email template code',
		optional: false,
	},
	KAFKA_URL: {
		message: 'Required kafka connectivity url',
		optional: false,
	},
	KAFKA_GROUP_ID: {
		message: 'Required kafka group id',
		optional: false,
	},
	KAFKA_TOPIC: {
		message: 'Required kafka topic to consume from',
		optional: true,
	},
	NOTIFICATION_KAFKA_TOPIC: {
		message: 'Required kafka topic',
		optional: false,
	},
	CLOUD_STORAGE: {
		message: 'Required cloud storage type ex: AWS/GCP/AZURE',
		optional: false,
	},
	GCP_PATH: {
		message: 'Required gcp file path ex: gcp.json',
		optional: process.env.CLOUD_STORAGE === 'GCP' ? false : true,
	},
	DEFAULT_GCP_BUCKET_NAME: {
		message: 'Required gcp bucket name',
		optional: process.env.CLOUD_STORAGE === 'GCP' ? false : true,
	},
	GCP_PROJECT_ID: {
		message: 'Required gcp project id',
		optional: process.env.CLOUD_STORAGE === 'GCP' ? false : true,
	},
	AWS_ACCESS_KEY_ID: {
		message: 'Required aws access key id',
		optional: process.env.CLOUD_STORAGE === 'AWS' ? false : true,
	},
	AWS_SECRET_ACCESS_KEY: {
		message: 'Required aws secret access key',
		optional: process.env.CLOUD_STORAGE === 'AWS' ? false : true,
	},
	AWS_BUCKET_REGION: {
		message: 'Required aws bucket region',
		optional: process.env.CLOUD_STORAGE === 'AWS' ? false : true,
	},
	AWS_BUCKET_ENDPOINT: {
		message: 'Required aws bucket endpoint',
		optional: process.env.CLOUD_STORAGE === 'AWS' ? false : true,
	},
	DEFAULT_AWS_BUCKET_NAME: {
		message: 'Required aws bucket name',
		optional: process.env.CLOUD_STORAGE === 'AWS' ? false : true,
	},
	AZURE_ACCOUNT_NAME: {
		message: 'Required azure account name',
		optional: process.env.CLOUD_STORAGE === 'AZURE' ? false : true,
	},
	AZURE_ACCOUNT_KEY: {
		message: 'Required azure account key',
		optional: process.env.CLOUD_STORAGE === 'AZURE' ? false : true,
	},
	DEFAULT_AZURE_CONTAINER_NAME: {
		message: 'Required azure container name',
		optional: process.env.CLOUD_STORAGE === 'AZURE' ? false : true,
	},
	ACCESS_TOKEN_EXPIRY: {
		message: 'Required access token expiry',
		optional: false,
	},
	REFRESH_TOKEN_EXPIRY: {
		message: 'Required refresh token expiry',
		optional: false,
	},
	API_DOC_URL: {
		message: 'Required api doc url',
		optional: false,
	},
	INTERNAL_CACHE_EXP_TIME: {
		message: 'Internal Cache Expiry Time',
		optional: false,
	},
	REDIS_HOST: {
		message: 'Redis Host Url',
		optional: false,
	},
	KEY: {
		message: 'Key is missing for email encryption',
		optional: false,
	},
	IV: {
		message: 'iv is missing for email encryption',
		optional: false,
	},
	OCI_ACCESS_KEY_ID: {
		message: 'Required oci access key id',
		optional: process.env.CLOUD_STORAGE === 'OCI' ? false : true,
	},
	OCI_SECRET_ACCESS_KEY: {
		message: 'Required oci secret access key',
		optional: process.env.CLOUD_STORAGE === 'OCI' ? false : true,
	},
	OCI_BUCKET_REGION: {
		message: 'Required oci bucket region',
		optional: process.env.CLOUD_STORAGE === 'OCI' ? false : true,
	},
	OCI_BUCKET_ENDPOINT: {
		message: 'Required oci bucket endpoint',
		optional: process.env.CLOUD_STORAGE === 'OCI' ? false : true,
	},
	DEFAULT_OCI_BUCKET_NAME: {
		message: 'Required oci bucket name',
		optional: process.env.CLOUD_STORAGE === 'OCI' ? false : true,
	},
	ERROR_LOG_LEVEL: {
		message: 'Required Error log level',
		optional: false,
	},
	DISABLE_LOG: {
		message: 'Required disable log level',
		optional: false,
	},
	ADMIN_SECRET_CODE: {
		message: 'Required Admin secret code',
		optional: false,
	},
	DEFAULT_ORGANISATION_CODE: {
		message: 'Required default organisation code',
		optional: false,
		default: 'sl',
	},
	MENTORING_SERVICE_URL: {
		message: 'Required Mentoring Service Url',
		optional: false,
	},
	ADMIN_INVITEE_UPLOAD_EMAIL_TEMPLATE_CODE: {
		message: 'Required admin upload invitee email template code',
		optional: false,
	},
	DEFAULT_QUEUE: {
		message: 'Required default queue',
		optional: false,
	},
	DEFAULT_ROLE: {
		message: 'Required default role',
		optional: false,
	},
	SAMPLE_CSV_FILE_PATH: {
		message: 'Required sample csv file path',
		optional: false,
		default: 'sample/bulk_user_creation.csv',
	},
	ORG_ADMIN_INVITATION_EMAIL_TEMPLATE_CODE: {
		message: 'Required org admin invitation email template code',
		optional: false,
	},
	DEFAULT_ORG_ID: {
		message: 'Default organization ID, Run seeder `insertDefaultOrg` to obtain it.',
		optional: false,
	},
	PORTAL_URL: {
		message: 'Required portal url',
		optional: false,
	},
	SCHEDULER_SERVICE_HOST: {
		message: 'Required scheduler service host',
		optional: false,
	},
	SCHEDULER_SERVICE_BASE_URL: {
		message: 'Required scheduler service base url',
		optional: false,
	},
	REFRESH_VIEW_INTERVAL: {
		message: 'Interval to refresh views in milliseconds',
		optional: false,
		default: 540000,
	},
	EMAIL_ID_ENCRYPTION_KEY: {
		message: 'Required Email ID Encryption Key',
		optional: false,
	},
	EMAIL_ID_ENCRYPTION_IV: {
		message: 'Required Email ID Encryption IV',
		optional: false,
	},
	EMAIL_ID_ENCRYPTION_ALGORITHM: {
		message: 'Required Email ID Encryption Algorithm',
		optional: false,
		default: 'aes-256-cbc',
	},
	EVENT_ORG_LISTENER_URLS: {
		message: 'Required List Of Org Event Listener Urls',
		optional: false,
	},
	EVENT_ENABLE_ORG_EVENTS: {
		message: 'Required Enable Org Events Flag',
		optional: false,
	},
	GENERIC_INVITATION_EMAIL_TEMPLATE_CODE: {
		message: 'Required generic invitation email template code',
		optional: true,
		default: 'generic_invite',
	},
	ALLOWED_HOST: {
		message: 'Required CORS allowed host',
		optional: true,
		default: '*',
	},
	PASSWORD_POLICY_REGEX: {
		message: 'Required password policy',
		optional: true,
		default: '^.{8,}$',
	},
	PASSWORD_POLICY_MESSAGE: {
		message: 'Required password policy message',
		optional: true,
		default: 'Password must have at least 8 characters long',
	},
	DOWNLOAD_URL_EXPIRATION_DURATION: {
		message: 'Required downloadable url expiration time',
		optional: true,
		default: 3600000,
	},
	ALLOWED_IDLE_TIME: {
		message: 'Require allowed idle time',
		optional: true,
		default: 0,
	},
	CHANGE_PASSWORD_TEMPLATE_CODE: {
		message: 'Required change password email template code',
		optional: false,
	},
	CAPTCHA_ENABLE: {
		message: 'Required CAPTCHA ENABLE true or false',
		optional: false,
	},
	CAPTCHA_SERVICE: {
		message: 'Required CAPTCHA SERVICE',
		optional: true,
		default: 'googleRecaptcha',
	},
	RECAPTCHA_SECRET_KEY: {
		message: 'Required CAPTCHA SERVICE secret key',
		optional: false,
	},
	GOOGLE_RECAPTCHA_HOST: {
		message: 'Required CAPTCHA Host IP',
		optional: true,
		default: 'https://www.google.com',
	},
	GOOGLE_RECAPTCHA_URL: {
		message: 'Required CAPTCHA SERVICE API URL',
		optional: true,
		default: '/recaptcha/api/siteverify',
	},
	SIGNED_URL_EXPIRY_IN_MILLISECONDS: {
		message: 'Required signed url expiration time in milliseconds',
		optional: true,
		default: 3600000,
	},
	ALLOWED_ACTIVE_SESSIONS: {
		message: 'Require allowed active sessions',
		optional: true,
		default: 0,
	},
}

let success = true

module.exports = function () {
	Object.keys(enviromentVariables).forEach((eachEnvironmentVariable) => {
		let tableObj = {
			[eachEnvironmentVariable]: 'PASSED',
		}

		let keyCheckPass = true

		if (
			enviromentVariables[eachEnvironmentVariable].optional === true &&
			enviromentVariables[eachEnvironmentVariable].requiredIf &&
			enviromentVariables[eachEnvironmentVariable].requiredIf.key &&
			enviromentVariables[eachEnvironmentVariable].requiredIf.key != '' &&
			enviromentVariables[eachEnvironmentVariable].requiredIf.operator &&
			validRequiredIfOperators.includes(enviromentVariables[eachEnvironmentVariable].requiredIf.operator) &&
			enviromentVariables[eachEnvironmentVariable].requiredIf.value &&
			enviromentVariables[eachEnvironmentVariable].requiredIf.value != ''
		) {
			switch (enviromentVariables[eachEnvironmentVariable].requiredIf.operator) {
				case 'EQUALS':
					if (
						process.env[enviromentVariables[eachEnvironmentVariable].requiredIf.key] ===
						enviromentVariables[eachEnvironmentVariable].requiredIf.value
					) {
						enviromentVariables[eachEnvironmentVariable].optional = false
					}
					break
				case 'NOT_EQUALS':
					if (
						process.env[enviromentVariables[eachEnvironmentVariable].requiredIf.key] !=
						enviromentVariables[eachEnvironmentVariable].requiredIf.value
					) {
						enviromentVariables[eachEnvironmentVariable].optional = false
					}
					break
				default:
					break
			}
		}

		if (enviromentVariables[eachEnvironmentVariable].optional === false) {
			if (!process.env[eachEnvironmentVariable] || process.env[eachEnvironmentVariable] == '') {
				success = false
				keyCheckPass = false
			} else if (
				enviromentVariables[eachEnvironmentVariable].possibleValues &&
				Array.isArray(enviromentVariables[eachEnvironmentVariable].possibleValues) &&
				enviromentVariables[eachEnvironmentVariable].possibleValues.length > 0
			) {
				if (
					!enviromentVariables[eachEnvironmentVariable].possibleValues.includes(
						process.env[eachEnvironmentVariable]
					)
				) {
					success = false
					keyCheckPass = false
					enviromentVariables[eachEnvironmentVariable].message += ` Valid values - ${enviromentVariables[
						eachEnvironmentVariable
					].possibleValues.join(', ')}`
				}
			}
		}

		if (
			(!process.env[eachEnvironmentVariable] || process.env[eachEnvironmentVariable] == '') &&
			enviromentVariables[eachEnvironmentVariable].default &&
			enviromentVariables[eachEnvironmentVariable].default != ''
		) {
			process.env[eachEnvironmentVariable] = enviromentVariables[eachEnvironmentVariable].default
		}

		if (!keyCheckPass) {
			if (enviromentVariables[eachEnvironmentVariable].message !== '') {
				tableObj[eachEnvironmentVariable] = enviromentVariables[eachEnvironmentVariable].message
			} else {
				tableObj[eachEnvironmentVariable] = `FAILED - ${eachEnvironmentVariable} is required`
			}
		}

		tableData.push(tableObj)
	})

	console.log(tableData.toString())

	return {
		success: success,
	}
}
