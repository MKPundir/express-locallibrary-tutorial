var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

// Schema declaration
var BookInstanceSchema = new Schema({
    book: {type: Schema.Types.ObjectId, ref: 'Book', required: true},
    imprint: {type: String, required: true},
    status: {type: String, required: true, enums: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance'},
    due_back: {type: Date, default: Date.now},
});

// virtual for formated date
BookInstanceSchema.virtual('due_back_formatted').get(function(){
    return moment(this.due_back).format('MMMM Do, YYYY');
});

// Virtual for bookinstance url
BookInstanceSchema.virtual('url').get(function(){
    return '/catalog/bookinstance/' + this._id;
});

// Exporting bookinstance model
module.exports = mongoose.model('BookInstance', BookInstanceSchema);