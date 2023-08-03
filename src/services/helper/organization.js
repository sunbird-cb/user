const httpStatusCode = require('@generics/http-status')
const common = require('@constants/common')
const organizationQueries = require('@database/queries/organizations')
const utils = require('@generics/utils')

module.exports = class OrganizationsHelper {
	/**
	 * Create Organization.
	 * @method
	 * @name create
	 * @param {Object} bodyData
	 * @returns {JSON} - Organization creation data.
	 */

	static async create(bodyData) {
		try {
			let organization = await organizationQueries.findOne({ code: bodyData.code })

			if (organization) {
				return common.failureResponse({
					message: 'ORGANIZATION_ALREADY_EXISTS',
					statusCode: httpStatusCode.not_acceptable,
					responseCode: 'CLIENT_ERROR',
				})
			}

			let createOrg = await organizationQueries.create(bodyData)
			const cacheKey = common.redisOrgPrefix + createOrg.id.toString()
			await utils.internalDel(cacheKey)
			// await KafkaProducer.clearInternalCache(cacheKey)
			let result = {
				organization: createOrg,
			}

			return common.successResponse({
				statusCode: httpStatusCode.created,
				message: 'ORGANIZATION_CREATED_SUCCESSFULLY',
				createOrg,
			})
		} catch (error) {
			throw error
		}
	}

	/**
	 * Update Organization
	 * @method
	 * @name update
	 * @param {Object} bodyData
	 * @returns {JSON} - Update Organization data.
	 */

	static async update(id, bodyData) {
		try {
			const rowsUpdated = await organizationQueries.update({ id: id }, bodyData)
			if (rowsUpdated == 0) {
				return common.failureResponse({
					message: 'ORGANIZATION_NOT_FOUND',
					statusCode: httpStatusCode.bad_request,
					responseCode: 'CLIENT_ERROR',
				})
			}

			const cacheKey = common.redisOrgPrefix + id.toString()
			await utils.internalDel(cacheKey)
			// await KafkaProducer.clearInternalCache(cacheKey)
			return common.successResponse({
				statusCode: httpStatusCode.accepted,
				message: 'ORGANIZATION_UPDATED_SUCCESSFULLY',
			})
		} catch (error) {
			throw error
		}
	}
}