"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoRepeatRandomizer = void 0;
var card_1 = require("./card");
var NoRepeatRandomizer = /** @class */ (function () {
    function NoRepeatRandomizer(_repository) {
        this._repository = _repository;
        this._leftOver = Array.from(Array(_repository.count).keys());
    }
    NoRepeatRandomizer.prototype.reset = function () {
        this._leftOver = Array.from(Array(this._repository.count).keys());
    };
    NoRepeatRandomizer.prototype.getNext = function () {
        var index = Math.floor(Math.random() * this._leftOver.length);
        var card = this._repository.getCard(index);
        this._leftOver.splice(index, 1);
        return new card_1.Card(card.point1, card.point3);
    };
    return NoRepeatRandomizer;
}());
exports.NoRepeatRandomizer = NoRepeatRandomizer;
//# sourceMappingURL=no-repeat-randomizer.js.map