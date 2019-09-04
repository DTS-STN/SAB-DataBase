const { getObjectId } = require('../../helpers/index');
const moment = require('moment');

const locations = [
  {
    id: getObjectId('3747'),
    locationId: '3747',
    locationName: 'North York PPT',
    locationAddress:
      'Joseph Shepard Building, 4900 Yonge Street, 3rd Floor, Suite 380, North York, Ontario, M2N6A4',
    locationCity: 'North York',
    locationProvince: 'Ontario',
    hours: '8:00-16:00',
    closures: [
      {
        periodStart: moment()
          .startOf('week')
          .add(7, 'days')
          .toDate(),
        periodEnd: moment()
          .endOf('week')
          .add(7, 'days')
          .toDate()
      }
    ],
    bioKitAmount: 2,
    bioKits: [
      {
        id: getObjectId('asd123'),
        bioKitId: 'asd123',
        accessible: true,
        available: true
      },
      {
        id: getObjectId('ftq789'),
        bioKitId: 'ftq789',
        accessible: true,
        available: true
      }
    ]
  },
  {
    id: getObjectId('3745'),
    locationId: '3745',
    locationName: 'Vancouver PPT',
    locationAddress:
      'Sinclair Centre, 757 Hastings Street West, Suite 100, Vancouver, British Columbia, V6C1A1',
    locationCity: 'Vancouver',
    locationProvince: 'Ontario',
    hours: '8:30-16:00',
    closures: [
      {
        periodStart: moment()
          .startOf('week')
          .add(7, 'days')
          .toDate(),
        periodEnd: moment()
          .endOf('week')
          .add(7, 'days')
          .toDate()
      }
    ],
    bioKitAmount: 2,
    bioKits: [
      {
        id: getObjectId('aer657'),
        bioKitId: 'aer657',
        accessible: true,
        available: true
      },
      {
        id: getObjectId('kot409'),
        bioKitId: 'kot409',
        accessible: true,
        available: true
      }
    ]
  },
  {
    id: getObjectId('3552'),
    locationId: '3552',
    locationAddress: '8 Queen Street',
    locationCity: 'Kapuskasing',
    locationProvince: 'Ontario',
    hours: '8:30-16:00',
    closures: [
      {
        periodStart: moment()
          .startOf('week')
          .add(7, 'days')
          .toDate(),
        periodEnd: moment()
          .endOf('week')
          .add(7, 'days')
          .toDate()
      }
    ],
    bioKitAmount: 2,
    bioKits: [
      {
        id: getObjectId('ter678'),
        bioKitId: 'ter678',
        accessible: true,
        available: true
      },
      {
        id: getObjectId('utr635'),
        bioKitId: 'utr635',
        accessible: true,
        available: true
      }
    ]
  }
  // {
  //   id: getObjectId('2879'),
  //   locationId: '2879',
  //   locationAddress:
  //     '200 René-Lévesque Boulevard West Suite 034, Guy-Favreau Complex',
  //   locationCity: 'Montreal',
  //   locationProvince: 'Quebec',
  //   hours: '8:30-16:00',
  //   closures: [
  //     {
  //       periodStart: moment()
  //         .startOf('week')
  //         .add(7, 'days')
  //         .toDate(),
  //       periodEnd: moment()
  //         .endOf('week')
  //         .add(7, 'days')
  //         .toDate()
  //     }
  //   ],
  //   bioKitAmount: 2,
  //   bioKits: [
  //     {
  //       id: getObjectId('tgo897'),
  //       bioKitId: 'tgo897',
  //       accessible: true,
  //       available: true
  //     },
  //     {
  //       id: getObjectId('jyu762'),
  //       bioKitId: 'jyu762',
  //       accessible: true,
  //       available: true
  //     }
  //   ]
  // }
  // {
  //   id: getObjectId('2504'),
  //   locationId: '2504',
  //   locationAddress:
  //     'Du Littoral Complex, Suite 101 2500 Montmorency Boulevard',
  //   locationCity: 'Quebec City',
  //   locationProvince: 'Quebec',
  //   hours: '8:30-16:00',
  //   closures: [
  //     {
  //       periodStart: moment()
  //         .startOf('week')
  //         .add(7, 'days')
  //         .toDate(),
  //       periodEnd: moment()
  //         .endOf('week')
  //         .add(7, 'days')
  //         .toDate()
  //     }
  //   ],
  //   bioKitAmount: 2,
  //   bioKits: [
  //     {
  //       id: getObjectId('gdf789'),
  //       bioKitId: 'gdf789',
  //       accessible: true,
  //       available: true
  //     },
  //     {
  //       id: getObjectId('lop645'),
  //       bioKitId: 'lop645',
  //       accessible: true,
  //       available: true
  //     }
  //   ]
  // },
  // {
  //   id: getObjectId('4754'),
  //   locationId: '4753',
  //   locationAddress: 'Canada Place, Floor Main 9700 Jasper Avenue',
  //   locationCity: 'Edmonton',
  //   locationProvince: 'Alberta',
  //   hours: '8:30-16:00',
  //   closures: [
  //     {
  //       periodStart: moment()
  //         .startOf('week')
  //         .add(7, 'days')
  //         .toDate(),
  //       periodEnd: moment()
  //         .endOf('week')
  //         .add(7, 'days')
  //         .toDate()
  //     }
  //   ],
  //   bioKitAmount: 2,
  //   bioKits: [
  //     {
  //       id: getObjectId('asr713'),
  //       bioKitId: 'asr713',
  //       accessible: true,
  //       available: true
  //     },
  //     {
  //       id: getObjectId('ity908'),
  //       bioKitId: 'ity908',
  //       accessible: true,
  //       available: true
  //     }
  //   ]
  // }
  // {
  //   id: getObjectId('4802'),
  //   locationId: '4802',
  //   locationAddress: 'Harry Hays Building, Suite 150 220 4th Avenue Southeast',
  //   locationCity: 'Calgary',
  //   locationProvince: 'Alberta',
  //   hours: '8:30-16:00',
  //   closures: [
  //     {
  //       periodStart: moment()
  //         .startOf('week')
  //         .add(7, 'days')
  //         .toDate(),
  //       periodEnd: moment()
  //         .endOf('week')
  //         .add(7, 'days')
  //         .toDate()
  //     }
  //   ],
  //   bioKitAmount: 2,
  //   bioKits: [
  //     {
  //       id: getObjectId('hyo907'),
  //       bioKitId: 'hyo907',
  //       accessible: true,
  //       available: true
  //     },
  //     {
  //       id: getObjectId('iut701'),
  //       bioKitId: 'iut701',
  //       accessible: true,
  //       available: true
  //     }
  //   ]
  // },
  // {
  //   id: getObjectId('4123'),
  //   locationId: '4802',
  //   locationAddress:
  //     'Portage Place Mall, Floor Ground, Unit 122 393 Portage Avenue',
  //   locationCity: 'Winnipeg',
  //   locationProvince: 'Manitoba',
  //   hours: '8:30-16:00',
  //   closures: [
  //     {
  //       periodStart: moment()
  //         .startOf('week')
  //         .add(7, 'days')
  //         .toDate(),
  //       periodEnd: moment()
  //         .endOf('week')
  //         .add(7, 'days')
  //         .toDate()
  //     }
  //   ],
  //   bioKitAmount: 2,
  //   bioKits: [
  //     {
  //       id: getObjectId('hty725'),
  //       bioKitId: 'hty725',
  //       accessible: true,
  //       available: true
  //     },
  //     {
  //       id: getObjectId('jku491'),
  //       bioKitId: 'jku491',
  //       accessible: true,
  //       available: true
  //     }
  //   ]
  // },
  // {
  //   id: getObjectId('1515'),
  //   locationId: '1515',
  //   locationAddress: '6206 Quinpool Road',
  //   locationCity: 'Halifax',
  //   locationProvince: 'Nova Scotia',
  //   hours: '8:30-16:00',
  //   closures: [
  //     {
  //       periodStart: moment()
  //         .startOf('week')
  //         .add(7, 'days')
  //         .toDate(),
  //       periodEnd: moment()
  //         .endOf('week')
  //         .add(7, 'days')
  //         .toDate()
  //     }
  //   ],
  //   bioKitAmount: 2,
  //   bioKits: [
  //     {
  //       id: getObjectId('req816'),
  //       bioKitId: 'req816',
  //       accessible: true,
  //       available: true
  //     },
  //     {
  //       id: getObjectId('olp860'),
  //       bioKitId: 'olp860',
  //       accessible: true,
  //       available: true
  //     }
  //   ]
  // },
  // {
  //   id: getObjectId('5823'),
  //   locationId: '5823',
  //   locationAddress: '1263 West Broadway',
  //   locationCity: 'Vancouver',
  //   locationProvince: 'British Columbia',
  //   hours: '8:30-16:00',
  //   closures: [
  //     {
  //       periodStart: moment()
  //         .startOf('week')
  //         .add(7, 'days')
  //         .toDate(),
  //       periodEnd: moment()
  //         .endOf('week')
  //         .add(7, 'days')
  //         .toDate()
  //     }
  //   ],
  //   bioKitAmount: 2,
  //   bioKits: [
  //     {
  //       id: getObjectId('ytr903'),
  //       bioKitId: 'ytr903',
  //       accessible: true,
  //       available: true
  //     },
  //     {
  //       id: getObjectId('uid890'),
  //       bioKitId: 'uid890',
  //       accessible: true,
  //       available: true
  //     }
  //   ]
  // },
  // {
  //   id: getObjectId('1640'),
  //   locationId: '1640',
  //   locationAddress: 'Heritage Court, Suite 110, 95 Foundry Street',
  //   locationCity: 'Moncton',
  //   locationProvince: 'New Brunswick',
  //   hours: '8:30-16:00',
  //   closures: [
  //     {
  //       periodStart: moment()
  //         .startOf('week')
  //         .add(7, 'days')
  //         .toDate(),
  //       periodEnd: moment()
  //         .endOf('week')
  //         .add(7, 'days')
  //         .toDate()
  //     }
  //   ],
  //   bioKitAmount: 2,
  //   bioKits: [
  //     {
  //       id: getObjectId('kli570'),
  //       bioKitId: 'kli570',
  //       accessible: true,
  //       available: true
  //     },
  //     {
  //       id: getObjectId('fdr429'),
  //       bioKitId: 'fdr429',
  //       accessible: true,
  //       available: true
  //     }
  //   ]
  // },
  // {
  //   id: getObjectId('1137'),
  //   locationId: '1137',
  //   locationAddress: '99 Churchill Avenue, Building 223',
  //   locationCity: "St. John's",
  //   locationProvince: 'Newfoundland and Labrador',
  //   hours: '8:30-16:00',
  //   closures: [
  //     {
  //       periodStart: moment()
  //         .startOf('week')
  //         .add(7, 'days')
  //         .toDate(),
  //       periodEnd: moment()
  //         .endOf('week')
  //         .add(7, 'days')
  //         .toDate()
  //     }
  //   ],
  //   bioKitAmount: 2,
  //   bioKits: [
  //     {
  //       id: getObjectId('hgi527'),
  //       bioKitId: 'hgi527',
  //       accessible: true,
  //       available: true
  //     },
  //     {
  //       id: getObjectId('ftq895'),
  //       bioKitId: 'ftq895',
  //       accessible: true,
  //       available: true
  //     }
  //   ]
  // },
  // {
  //   id: getObjectId('4901'),
  //   locationId: '4901',
  //   locationAddress: 'Greenstone Building, Floor Main, 5101 50th Avenue',
  //   locationCity: 'Yellowknife',
  //   locationProvince: 'Northwest Territories',
  //   hours: '8:30-16:00',
  //   closures: [
  //     {
  //       periodStart: moment()
  //         .startOf('week')
  //         .add(7, 'days')
  //         .toDate(),
  //       periodEnd: moment()
  //         .endOf('week')
  //         .add(7, 'days')
  //         .toDate()
  //     }
  //   ],
  //   bioKitAmount: 2,
  //   bioKits: [
  //     {
  //       id: getObjectId('ger624'),
  //       bioKitId: 'ger624',
  //       accessible: true,
  //       available: true
  //     },
  //     {
  //       id: getObjectId('lki713'),
  //       bioKitId: 'lki713',
  //       accessible: true,
  //       available: true
  //     }
  //   ]
  // },
  // {
  //   id: getObjectId('4936'),
  //   locationId: '4936',
  //   locationAddress: '933 Mivvik Street (P.O. Box 639), Floor Main',
  //   locationCity: 'Iqaluit',
  //   locationProvince: 'Nunavut',
  //   hours: '8:30-16:00',
  //   closures: [
  //     {
  //       periodStart: moment()
  //         .startOf('week')
  //         .add(7, 'days')
  //         .toDate(),
  //       periodEnd: moment()
  //         .endOf('week')
  //         .add(7, 'days')
  //         .toDate()
  //     }
  //   ],
  //   bioKitAmount: 2,
  //   bioKits: [
  //     {
  //       id: getObjectId('hyt714'),
  //       bioKitId: 'hyt714',
  //       accessible: true,
  //       available: true
  //     },
  //     {
  //       id: getObjectId('jai961'),
  //       bioKitId: 'jai961',
  //       accessible: true,
  //       available: true
  //     }
  //   ]
  // },
  // {
  //   id: getObjectId('1959'),
  //   locationId: '1959',
  //   locationAddress:
  //     'Jean Canfield Building, Floor Main, 191 Great George Street',
  //   locationCity: 'Charlottetown',
  //   locationProvince: 'Prince Edward Island',
  //   hours: '8:30-16:00',
  //   closures: [
  //     {
  //       periodStart: moment()
  //         .startOf('week')
  //         .add(7, 'days')
  //         .toDate(),
  //       periodEnd: moment()
  //         .endOf('week')
  //         .add(7, 'days')
  //         .toDate()
  //     }
  //   ],
  //   bioKitAmount: 2,
  //   bioKits: [
  //     {
  //       id: getObjectId('jie516'),
  //       bioKitId: 'jie516',
  //       accessible: true,
  //       available: true
  //     },
  //     {
  //       id: getObjectId('ket817'),
  //       bioKitId: 'ket817',
  //       accessible: true,
  //       available: true
  //     }
  //   ]
  // },
  // {
  //   id: getObjectId('4318'),
  //   locationId: '4318',
  //   locationAddress: 'Market Mall, Unit 120, 2325 Preston Avenue South',
  //   locationCity: 'Saskatoon',
  //   locationProvince: 'Saskatchewan',
  //   hours: '8:30-16:00',
  //   closures: [
  //     {
  //       periodStart: moment()
  //         .startOf('week')
  //         .add(7, 'days')
  //         .toDate(),
  //       periodEnd: moment()
  //         .endOf('week')
  //         .add(7, 'days')
  //         .toDate()
  //     }
  //   ],
  //   bioKitAmount: 2,
  //   bioKits: [
  //     {
  //       id: getObjectId('aft471'),
  //       bioKitId: 'aft471',
  //       accessible: true,
  //       available: true
  //     },
  //     {
  //       id: getObjectId('pol097'),
  //       bioKitId: 'pol097',
  //       accessible: true,
  //       available: true
  //     }
  //   ]
  // },
  // {
  //   id: getObjectId('5965'),
  //   locationId: '5965',
  //   locationAddress: 'Elijah Smith Building, Suite 125, 300 Main Street',
  //   locationCity: 'Whitehorse',
  //   locationProvince: 'Yukon',
  //   hours: '8:30-16:00',
  //   closures: [
  //     {
  //       periodStart: moment()
  //         .startOf('week')
  //         .add(7, 'days')
  //         .toDate(),
  //       periodEnd: moment()
  //         .endOf('week')
  //         .add(7, 'days')
  //         .toDate()
  //     }
  //   ],
  //   bioKitAmount: 2,
  //   bioKits: [
  //     {
  //       id: getObjectId('jir615'),
  //       bioKitId: 'jir615',
  //       accessible: true,
  //       available: true
  //     },
  //     {
  //       id: getObjectId('rtp527'),
  //       bioKitId: 'rtp527',
  //       accessible: true,
  //       available: true
  //     }
  //   ]
  // }
];

module.exports = locations;
