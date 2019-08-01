const { getObjectId } = require('../../helpers/index');
const { moment } = require('moment');

const locations = [
  {
    id: getObjectId('location1'),
    locationId: 'SC-0001',
    locationAddress: 'Elgin 100 - City hall',
    locationCity: 'Ottawa',
    locationProvinceId: '9',
    locationProvince: 'Ontario',
    locationProvinceFr: 'Ontario',
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
    bioKits: [
      {
        id: getObjectId('asd123'),
        bioKitId: 'asd123',
        timeSlots: [
          {
            time: '8:00',
            closed: false
          },
          {
            time: '8:15',
            closed: false
          },
          {
            time: '8:30',
            closed: false
          }
        ]
      },
      {
        id: getObjectId('ftq789'),
        bioKitId: 'ftq789',
        timeSlots: [
          {
            time: '8:00',
            closed: false
          },
          {
            time: '8:15',
            closed: false
          },
          {
            time: '8:30',
            closed: false
          }
        ]
      }
    ]
  },
  {
    id: getObjectId('location1'),
    locationId: 'PC-0002',
    locationAddress: '85 Meadowlands Dr E',
    locationCity: 'Ottawa',
    locationProvinceId: '9',
    locationProvince: 'Ontario',
    locationProvinceFr: 'Ontario',
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
    bioKits: [
      {
        id: getObjectId('aer657'),
        bioKitId: 'aer657',
        timeSlots: [
          {
            time: '8:00',
            closed: false
          },
          {
            time: '8:15',
            closed: false
          },
          {
            time: '8:30',
            closed: false
          }
        ]
      },
      {
        id: getObjectId('kot409'),
        bioKitId: 'kot409',
        timeSlots: [
          {
            time: '8:00',
            closed: false
          },
          {
            time: '8:15',
            closed: false
          },
          {
            time: '8:30',
            closed: false
          }
        ]
      }
    ]
  }
];

module.exports = locations;
