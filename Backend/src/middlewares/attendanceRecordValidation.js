const {body} = require('express-validator');
const Member = require('../database/models/Member')

const isValidObjectId = (value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('Invalid ObjectId');
    }
    return true;
};

const AttendanceRecordValidation = [
    body('date').isISO8601().notEmpty().withMessage('Date must be a valid date format (YYYY-MM-DD)'),
    body('member').trim().notEmpty().withMessage('Member is required').custom(isValidObjectId).bail().custom(
        async (value) => {
            const exist = await Member.findById(value);
            if (!exist) {
            throw new Error('Role invalid');
            }
            return true;
        }
    )
]

module.exports = AttendanceRecordValidation;