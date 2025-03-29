import NearbyLocation from '@/models/nearbyLocation';
import Suggestion from '@/models/suggestion';
import Voucher from '@/models/voucher';
import Message from '@/models/message';

export class MockDao {
  private static instance: MockDao;

  private constructor() {}

  static getInstance(): MockDao {
    if (!MockDao.instance) {
      MockDao.instance = new MockDao();
    }
    return MockDao.instance;
  }

  getSuggestions(): Suggestion[] {
    const json = [
      {
        id: '1',
        from: 'KTX Khu B, ĐHQG-HCM',
        to: 'Nhà Văn hóa Sinh Viên',
        bikePrice: '23,000 VND',
      },
      {
        id: '2',
        from: 'Sân bóng Trí Hải',
        to: 'Landmark 81',
        bikePrice: '50,000 VND',
        carPrice: '150,000 VND',
      },
    ];

    return json.map(Suggestion.fromJSON);
  }

  getVouchers(): Voucher[] {
    const json = [
      { id: '1', image: require('@/assets/images/voucher.png'), description: 'Highland: Giảm giá 20% cho cước xe từ 10k' },
      { id: '2', image: require('@/assets/images/voucher.png'), description: 'Highland: Giảm giá 40% cho cước xe từ 20k' },
      { id: '3', image: require('@/assets/images/voucher.png'), description: 'Highland: Giảm giá 60% cho cước xe từ 30k' },
      { id: '4', image: require('@/assets/images/voucher.png'), description: 'Highland: Giảm giá 80% cho cước xe từ 50k' },
    ];

    return json.map(Voucher.fromJSON);
  }

  getNearbyLocations(): NearbyLocation[] {
    const json = [
            {
                "description": "Ga Sài Gòn, Đường Nguyễn Thông, Phường 9, District 3, Ho Chi Minh City, Vietnam",
                "matched_substrings": [
                    {
                        "length": 6,
                        "offset": 0
                    }
                ],
                "place_id": "ChIJEzZ08OovdTERysQyj9kI4bU",
                "reference": "ChIJEzZ08OovdTERysQyj9kI4bU",
                "structured_formatting": {
                    "main_text": "Ga Sài Gòn",
                    "main_text_matched_substrings": [
                        {
                            "length": 6,
                            "offset": 0
                        }
                    ],
                    "secondary_text": "Đường Nguyễn Thông, Phường 9, District 3, Ho Chi Minh City, Vietnam"
                },
                "terms": [
                    {
                        "offset": 0,
                        "value": "Ga Sài Gòn"
                    },
                    {
                        "offset": 12,
                        "value": "Đường Nguyễn Thông"
                    },
                    {
                        "offset": 32,
                        "value": "Phường 9"
                    },
                    {
                        "offset": 42,
                        "value": "District 3"
                    },
                    {
                        "offset": 54,
                        "value": "Ho Chi Minh City"
                    },
                    {
                        "offset": 72,
                        "value": "Vietnam"
                    }
                ],
                "types": [
                    "point_of_interest",
                    "establishment"
                ]
            },
            {
                "description": "GA ĐÀ NẴNG, Hải Phòng, Tân Chính, Thanh Khê District, Da Nang, Vietnam",
                "matched_substrings": [
                    {
                        "length": 10,
                        "offset": 0
                    }
                ],
                "place_id": "ChIJkXF_HvsZQjER5Y_jvOMH8oY",
                "reference": "ChIJkXF_HvsZQjER5Y_jvOMH8oY",
                "structured_formatting": {
                    "main_text": "GA ĐÀ NẴNG",
                    "main_text_matched_substrings": [
                        {
                            "length": 10,
                            "offset": 0
                        }
                    ],
                    "secondary_text": "Hải Phòng, Tân Chính, Thanh Khê District, Da Nang, Vietnam"
                },
                "terms": [
                    {
                        "offset": 0,
                        "value": "GA ĐÀ NẴNG"
                    },
                    {
                        "offset": 12,
                        "value": "Hải Phòng"
                    },
                    {
                        "offset": 23,
                        "value": "Tân Chính"
                    },
                    {
                        "offset": 34,
                        "value": "Thanh Khê District"
                    },
                    {
                        "offset": 54,
                        "value": "Da Nang"
                    },
                    {
                        "offset": 63,
                        "value": "Vietnam"
                    }
                ],
                "types": [
                    "point_of_interest",
                    "establishment"
                ]
            },
            {
                "description": "Tan Son Nhat International Airport, Truong Son Street, Tân Bình, Ho Chi Minh City, Vietnam",
                "matched_substrings": [
                    {
                        "length": 12,
                        "offset": 0
                    }
                ],
                "place_id": "ChIJnZ-oGhEpdTER8ycbqsCc8Ng",
                "reference": "ChIJnZ-oGhEpdTER8ycbqsCc8Ng",
                "structured_formatting": {
                    "main_text": "Tan Son Nhat International Airport",
                    "main_text_matched_substrings": [
                        {
                            "length": 12,
                            "offset": 0
                        }
                    ],
                    "secondary_text": "Truong Son Street, Tân Bình, Ho Chi Minh City, Vietnam"
                },
                "terms": [
                    {
                        "offset": 0,
                        "value": "Tan Son Nhat International Airport"
                    },
                    {
                        "offset": 36,
                        "value": "Truong Son Street"
                    },
                    {
                        "offset": 55,
                        "value": "Tân Bình"
                    },
                    {
                        "offset": 65,
                        "value": "Ho Chi Minh City"
                    },
                    {
                        "offset": 83,
                        "value": "Vietnam"
                    }
                ],
                "types": [
                    "point_of_interest",
                    "establishment",
                    "airport"
                ]
            },
            {
                "description": "Saint George, GA, USA",
                "matched_substrings": [
                    {
                        "length": 3,
                        "offset": 0
                    },
                    {
                        "length": 2,
                        "offset": 14
                    }
                ],
                "place_id": "ChIJ1cWtZCyb5YgRF66eLIgtahs",
                "reference": "ChIJ1cWtZCyb5YgRF66eLIgtahs",
                "structured_formatting": {
                    "main_text": "Saint George",
                    "main_text_matched_substrings": [
                        {
                            "length": 3,
                            "offset": 0
                        }
                    ],
                    "secondary_text": "GA, USA",
                    "secondary_text_matched_substrings": [
                        {
                            "length": 2,
                            "offset": 0
                        }
                    ]
                },
                "terms": [
                    {
                        "offset": 0,
                        "value": "Saint George"
                    },
                    {
                        "offset": 14,
                        "value": "GA"
                    },
                    {
                        "offset": 18,
                        "value": "USA"
                    }
                ],
                "types": [
                    "geocode",
                    "political",
                    "locality"
                ]
            },
            {
                "description": "Saints + Council, Peachtree Street Northeast, Atlanta, GA, USA",
                "matched_substrings": [
                    {
                        "length": 3,
                        "offset": 0
                    },
                    {
                        "length": 2,
                        "offset": 55
                    }
                ],
                "place_id": "ChIJ5YavCSYF9YgRLVrGI40hSu4",
                "reference": "ChIJ5YavCSYF9YgRLVrGI40hSu4",
                "structured_formatting": {
                    "main_text": "Saints + Council",
                    "main_text_matched_substrings": [
                        {
                            "length": 3,
                            "offset": 0
                        }
                    ],
                    "secondary_text": "Peachtree Street Northeast, Atlanta, GA, USA",
                    "secondary_text_matched_substrings": [
                        {
                            "length": 2,
                            "offset": 37
                        }
                    ]
                },
                "terms": [
                    {
                        "offset": 0,
                        "value": "Saints + Council"
                    },
                    {
                        "offset": 18,
                        "value": "Peachtree Street Northeast"
                    },
                    {
                        "offset": 46,
                        "value": "Atlanta"
                    },
                    {
                        "offset": 55,
                        "value": "GA"
                    },
                    {
                        "offset": 59,
                        "value": "USA"
                    }
                ],
                "types": [
                    "restaurant",
                    "food",
                    "establishment",
                    "point_of_interest"
                ]
            }
        ];

      return json.map(NearbyLocation.fromJSON)
    }


    getMessages(): Message[] {
        const json = [
          { id: "1", sender: "driver", text: "Where are you now?", time: "10:39 AM, 13/09/2024" },
          { id: "2", sender: "user", text: "I am standing next to you", time: "10:39 AM, 13/09/2024" },
        ];
    
        return json.map(Message.fromJSON);
      }
}
