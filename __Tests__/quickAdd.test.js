const request = require('supertest');
const path = require('path');
const chalk = require('chalk');
const app = require('../index');

describe('Seed multiple prospects with images', () => {
  const seedData = [
    { name: 'Acme Corp', contact: 'acme@example.com', image: 'sample1.jpg' },
    { name: 'Globex Inc', contact: 'globex@example.com', image: 'sample2.jpg' },
    { name: 'Initech', contact: 'contact@initech.com', image: 'sample3.jpg' },
    { name: 'Umbrella Corp', contact: 'hq@umbrella.com', image: 'sample4.jpg' }
  ];

  it('adds multiple prospects and displays them', async () => {
    for (const prospect of seedData) {
      const filePath = path.resolve(__dirname, 'fixtures', prospect.image);
      await request(app)
        .post('/v1/prospects')
        .field('name', prospect.name)
.field('contact', prospect.contact)
.attach('image', path.resolve(__dirname, 'fixtures', prospect.image))
        .expect(201);
    }

    const res = await request(app)
      .get('/v1/prospects')
      .expect(200);

    console.log(chalk.blue.bold('\n=== Seeded Prospects ==='));
    console.table(
      res.body.map(p => ({
        ID: p.id,
        Name: p.name,
        Contact: p.contact,
        Image: p.image || '(none)'
      }))
    );

    expect(res.body.length).toBeGreaterThanOrEqual(seedData.length);
  });
});