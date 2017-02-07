/**
 * Created by Administrator on 2017/1/25/0025.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var imageSchema = new Schema({
    name: String,
    type: String,
    creator: {
        type: ObjectId,
        ref: 'User'
    },
    meta: {
        create_at: {
            type: Date,
            default: Date.now()
        },
        update_at: {
            type: Date,
            default: Date.now()
        }
    }
});

module.exports = imageSchema;