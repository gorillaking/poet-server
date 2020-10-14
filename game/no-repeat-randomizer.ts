import { Card } from "./card";
import { CardRepository } from "./card-repository";

export class NoRepeatRandomizer{
  private _leftOver: number[];

  constructor(private _repository: CardRepository) {
    this._leftOver = Array.from(Array(_repository.count).keys());
  }

  reset(): void{
    this._leftOver = Array.from(Array(this._repository.count).keys());
  }

  getNext(): Card{
    let index = Math.floor(Math.random() * this._leftOver.length);
    let card = this._repository.getCard(index);
    this._leftOver.splice(index, 1);

    return new Card(card.point1, card.point3);
  }
}