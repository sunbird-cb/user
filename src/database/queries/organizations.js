'use strict'
const model = require('../models/index')
const { Op } = require('sequelize')

exports.create = async (data) => {
	try {
		return await model.organizations.create(data)
	} catch (err) {
		console.log(err)
	}
}