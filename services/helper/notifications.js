const moment = require("moment-timezone");
const common = require('../../constants/common');

const sessionData = require("../../db/sessions/queries");
const notificationData = require("../../db/notification-template/query");
const sessionAttendesData = require("../../db/sessionAttendees/queries");
const sessionsHelper = require("./sessions");
const ObjectId = require('mongoose').Types.ObjectId;

const kafkaCommunication = require('../../generics/kafka-communication');

module.exports = class Notifications {

    static async sendNotificationBefore1Hour() {
        try {


            let currentDateutc = moment().utc().format(common.UTC_DATE_TIME_FORMAT);
            var dateEndTime = moment(currentDateutc).add(61, 'minutes').format(common.UTC_DATE_TIME_FORMAT);
            var dateStartTime = moment(currentDateutc).add(60, 'minutes').format(common.UTC_DATE_TIME_FORMAT);

            let sessions = await sessionData.findSessions({
                status: "published",
                deleted: false,
                startDateUtc: {
                    $gte: dateStartTime,
                    $lt: dateEndTime
                }
            });

            let emailTemplate = await notificationData.findOneEmailTemplate(common.MENTOR_SESSION_REMAINDER_EMAIL_CODE);

            if (emailTemplate && sessions && sessions.length > 0) {

                const mentorIds = [];
                sessions.forEach(session => {
                    mentorIds.push(session.userId.toString());
                });
                const userAccounts = await sessionsHelper.getAllAccountsDetail(mentorIds);
                if (userAccounts && userAccounts.result.length > 0) {
                    await Promise.all(sessions.map(async function (session) {

                        let emailBody = emailTemplate.body.replace("{sessionTitle}", session.title);
                        var foundElement = userAccounts.result.find(e => e._id === session.userId);

                        if (foundElement && foundElement.email.address && foundElement.name) {
                            emailBody = emailBody.replace("{name}", foundElement.name);
                            const payload = {
                                type: 'email',
                                email: {
                                    to: foundElement.email.address,
                                    subject: emailTemplate.subject,
                                    body: emailBody
                                }
                            };
                            await kafkaCommunication.pushEmailToKafka(payload);
                        }

                    }));
                }

            }
        } catch (error) {
            throw error;
        }
    }

    static async sendNotificationBefore15mins() {
        try {
            let currentDateutc = moment().utc().format(common.UTC_DATE_TIME_FORMAT);

            var dateEndTime = moment(currentDateutc).add(16, 'minutes').format(common.UTC_DATE_TIME_FORMAT);
            var dateStartTime = moment(currentDateutc).add(15, 'minutes').format(common.UTC_DATE_TIME_FORMAT);

            let data = await sessionData.findSessions({
                status: "published",
                deleted: false,
                startDateUtc: {
                    $gte: dateStartTime,
                    $lt: dateEndTime
                }
            });

            let allAttendess = [];
            let attendeesInfo = [];

            let emailTemplate = await notificationData.findOneEmailTemplate(common.MENTEE_SESSION_REMAINDER_EMAIL_CODE);

            if (emailTemplate && data && data.length > 1) {
                await Promise.all(data.map(async function (session) {
                    const sessionAttendees = await sessionAttendesData.findAllSessionAttendees({
                        sessionId: ObjectId(session._id)
                    });
                    if (sessionAttendees && sessionAttendees.length > 0) {

                        sessionAttendees.forEach(attendee => {
                            allAttendess.push(attendee.userId.toString());
                            attendeesInfo.push({
                                userId: attendee.userId.toString(),
                                title: session.title
                            })
                        });
                    }
                }));

            }
            const attendeesAccounts = await sessionsHelper.getAllAccountsDetail(allAttendess);

            if (attendeesAccounts.result && attendeesAccounts.result.length > 0) {

                attendeesInfo.forEach(async function (attendee) {

                    let emailBody = emailTemplate.body.replace("{sessionTitle}", attendee.title);
                    var foundElement = attendeesAccounts.result.find(e => e._id === attendee.userId);
                    if (foundElement && foundElement.email.address && foundElement.name) {

                        emailBody = emailBody.replace("{name}", foundElement.name);
                        const payload = {
                            type: 'email',
                            email: {
                                to: foundElement.email.address,
                                subject: emailTemplate.subject,
                                body: emailBody
                            }
                        };
                        await kafkaCommunication.pushEmailToKafka(payload);
                    }
                });
            }
        } catch (error) {
            throw error;
        }
    }
}