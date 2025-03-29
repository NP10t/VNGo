export default class Message {
    id: string;
    sender: string;
    text: string;
    time: string;
    
    constructor(id: string, sender: string, text: string, time: string) {
        this.id = id;
        this.sender = sender;
        this.text = text;
        this.time = time;
    }
    static fromJSON(json: any): Message {
        return new Message(json.id, json.sender, json.text, json.time);
      }
}