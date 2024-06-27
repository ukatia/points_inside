const { createServer } = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  // read json file
  const data = require('./coordinatesystem.json');
  res.end(`Number of points inside logo: ${calculateNumberofPoints(data).toString()}`);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


function calculateNumberofPoints(data) {
    let count =0;
    const coords = data.coords;

    const circle1Coords = [250, 150];
    const circle2Coords = [410, 150];

    const outerRadius = 75;
    // inner_radius = outer_radius - 20
    const innerRadius = 55;

    coords.forEach(coord => {
        //if point inside line (number 1 of logo), increase counter
        if (coord[0] >= 145 && coord[0] <=(145+20) && coord[1] >= 75 && coord[1] <= 225 ) {
            count++;
        } else // if point inside circle1 or circle2 (number 0 of logo)
        {
            const distanceCircle1 = calculateDistance(coord[0], circle1Coords[0], coord[1], circle1Coords[1]);
            const distanceCircle2 = calculateDistance(coord[0], circle2Coords[0], coord[1], circle2Coords[1]);
            if ((distanceCircle1 >= innerRadius && distanceCircle1 <=  outerRadius) || (distanceCircle2 >= innerRadius && distanceCircle2 <=  outerRadius)) {
                count++;
            }
        }
    })

    return count;
}

function calculateDistance(x1, x2, y1, y2)  {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}