export default class Suggestion {
    id: string;
    from: string;
    to: string;
    bikePrice: string;
    carPrice?: string;
  
    constructor(id: string, from: string, to: string, bikePrice: string, carPrice?: string) {
      this.id = id;
      this.from = from;
      this.to = to;
      this.bikePrice = bikePrice;
      this.carPrice = carPrice;
    }
    static fromJSON(json: any): Suggestion {
        return new Suggestion(json.id, json.from, json.to, json.bikePrice, json.carPrice);
      }
}