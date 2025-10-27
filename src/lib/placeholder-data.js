export const entities = [
  { id: '1', name: 'Greenwood University', type: 'College', status: 'Activated', registeredOn: '2023-01-15', linkExpiry: '2024-08-10' },
  { id: '2', name: 'Innovate Inc.', type: 'Organization', status: 'Activated', registeredOn: '2023-02-20', linkExpiry: '2024-12-01' },
  { id: '3', name: 'Oakridge College', type: 'College', status: 'Suspended', registeredOn: '2022-11-05', linkExpiry: '2024-09-20' },
  { id: '4', name: 'Tech Solutions LLC', type: 'Organization', status: 'Deactivated', registeredOn: '2023-03-10', linkExpiry: '2025-01-15' },
  { id: '5', name: 'Mapleleaf Institute', type: 'College', status: 'Activated', registeredOn: '2023-05-22', linkExpiry: '2024-08-01' },
  { id: '6', name: 'Future Forward', type: 'Organization', status: 'Activated', registeredOn: '2023-08-15', linkExpiry: '2025-02-28' },
  { id: '7', name: 'Pinecrest Academy', type: 'College', status: 'Suspended', registeredOn: '2021-09-30', linkExpiry: '2024-11-11' },
  { id: '8', name: 'QuantumLeap Corp', type: 'Organization', status: 'Activated', registeredOn: '2024-01-05', linkExpiry: '2025-03-01' },
];

export const collegeStats = {
  'Greenwood University': [
    { year: 2021, students: 450 },
    { year: 2022, students: 620 },
    { year: 2023, students: 850 },
    { year: 2024, students: 980 },
  ],
  'Oakridge College': [
    { year: 2021, students: 300 },
    { year: 2022, students: 410 },
    { year: 2023, students: 550 },
    { year: 2024, students: 630 },
  ],
  'Mapleleaf Institute': [
    { year: 2022, students: 200 },
    { year: 2023, students: 450 },
    { year: 2024, students: 700 },
  ],
  'Pinecrest Academy': [
      { year: 2021, students: 150 },
      { year: 2022, students: 250 },
      { year: 2023, students: 350 },
      { year: 2024, students: 450 },
  ]
};

export const organizationStats = {
  'Innovate Inc.': [
    { year: 2022, postings: 15 },
    { year: 2023, postings: 25 },
    { year: 2024, postings: 40 },
  ],
  'Tech Solutions LLC': [
    { year: 2023, postings: 5 },
    { year: 2024, postings: 12 },
  ],
  'Future Forward': [
    { year: 2023, postings: 30 },
    { year: 2024, postings: 55 },
  ],
  'QuantumLeap Corp': [
    { year: 2024, postings: 22 },
  ]
};

export const auditLogs = [
  { id: 'log1', timestamp: '2024-07-20 10:00:00', entity: 'Oakridge College', action: 'Status changed to Suspended', user: 'admin', reason: 'Policy violation review.' },
  { id: 'log2', timestamp: '2024-07-19 14:30:00', entity: 'Tech Solutions LLC', action: 'Status changed to Deactivated', user: 'admin', reason: 'Account expired.' },
  { id: 'log3', timestamp: '2024-07-18 09:00:00', entity: 'Innovate Inc.', action: 'Invite link generated', user: 'admin', reason: '' },
  { id: 'log4', timestamp: '2024-06-15 11:45:00', entity: 'Greenwood University', action: 'Entity Activated', user: 'system', reason: 'Initial registration.' },
  { id: 'log5', timestamp: '2024-06-10 16:20:00', entity: 'Pinecrest Academy', action: 'Status changed to Suspended', user: 'admin', reason: 'Awaiting documentation.' },
];

export const invites = [
    { id: 'inv1', link: 'https://super.app/invite/a1b2c3d4', entityName: 'New Horizon College', status: 'Active', expiresAt: '2024-09-15', createdAt: '2024-07-15' },
    { id: 'inv2', link: 'https://super.app/invite/e5f6g7h8', entityName: 'Creative Minds', status: 'Used', expiresAt: '2024-08-01', createdAt: '2024-07-01' },
    { id: 'inv3', link: 'https://super.app/invite/i9j0k1l2', entityName: 'Legacy University', status: 'Expired', expiresAt: '2024-06-30', createdAt: '2024-05-30' },
];
