export default class NearbyLocation {
    description: string;
    place_id: string;
    reference: string;
    matchedSubstrings: { length: number; offset: number }[];
    structured_formatting: {main_text: string;
       main_text_matched_substrings: { length: number; offset: number }[];
      secondary_text: string; 
      secondary_text_matched_substrings: { length: number; offset: number }[]};
    terms: { offset: number; value: string }[];
  
    constructor(description: string, place_id: string, reference: string, matchedSubstrings: { length: number; offset: number }[], structured_formatting: {main_text: string;
      main_text_matched_substrings: { length: number; offset: number }[];
      secondary_text: string; 
      secondary_text_matched_substrings: { length: number; offset: number }[]}, terms: { offset: number; value: string }[]) {
      this.description = description;
      this.matchedSubstrings = matchedSubstrings;
      this.structured_formatting = structured_formatting;
      this.terms = terms;
      this.place_id = place_id;
      this.reference = reference;
    }
  
    static fromJSON(json: any): NearbyLocation {
      return new NearbyLocation(json.description, json.place_id, json.reference, json.matched_substrings, json.structured_formatting, json.terms);
    }
    
  }