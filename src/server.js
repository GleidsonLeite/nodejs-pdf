import express from 'express';
import ejs from 'ejs';
import path from 'path';
import puppeteer from 'puppeteer';

const app = express();

const passengers = [
  {
    name: 'Joyce',
    flightNumber: 7895,
    time: '18h00',
  },
  {
    name: 'Brock',
    flightNumber: 7895,
    time: '18h00',
  },
  {
    name: 'Eve',
    flightNumber: 7895,
    time: '18h00',
  },
];

app.get('/', (request, response) => {
  const currentDirectory = path.resolve('.', 'src');
  const filePath = path.join(currentDirectory, 'print.ejs');
  ejs.renderFile(
    filePath,
    {
      passengers,
    },
    (error, html) => {
      if (error) {
        return response.send('read file error');
      }
      return response.send(html);
    },
  );
});

app.get('/pdf', async (request, response) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:3000', {
    waitUntil: 'networkidle0',
  });

  const pdf = await page.pdf({
    printBackground: true,
    format: 'letter',
    margin: {
      top: '20px',
      bottom: '40px',
      left: '20px',
      right: '20px',
    },
  });

  await browser.close();

  response.contentType('application/pdf');

  return response.send(pdf);
});

app.listen(3000, () => {
  console.log('app started');
});
