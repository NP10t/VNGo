export default class Voucher {
    id: string;
    image: any;
    description: string;
  
    constructor(id: string, image: any, description: string) {
      this.id = id;
      this.image = image;
      this.description = description;
    }
  
    static fromJSON(json: any): Voucher {
      return new Voucher(json.id, json.image, json.description);
    }
  }