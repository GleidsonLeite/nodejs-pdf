import express from 'express';
import ejs from 'ejs';
import path from 'path';
import pdf from 'html-pdf';

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
        console.log(error);
        return response.send('read file error');
      }
      const options = {
        height: '11.25in',
        width: '8.5in',
        header: {
          height: '20mm',
        },
        footer: {
          height: '20mm',
        },
      };

      // criar o pdf
      pdf.create(html, options).toFile('report.pdf', (err, data) => {
        if (err) {
          return response.send('Generate PDF error');
        }
        return response.send(html);
      });

      // Enviar para o navegador
    },
  );
});

app.listen(3000, () => {
  console.log('app started');
});
