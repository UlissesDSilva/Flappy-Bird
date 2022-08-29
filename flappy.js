function newElement(tagName, className) {
  const element = document.createElement(tagName);
  element.className = className;

  return element;
}

function barrier(reverse = false) {
  this.element = newElement("div", "barrier");

  const body = newElement("div", "body");
  const edge = newElement("div", "edge");

  this.element.appendChild(reverse ? body : edge);
  this.element.appendChild(reverse ? edge : body);

  this.setHeight = (height) => body.style.height = `${height}px`;
}

function pairOfBarries(height, opening, x) {
  this.element = newElement("div", "pair-of-barries");
  this.higher = new barrier(true);
  this.bottom = new barrier(false);

  this.element.appendChild(this.higher.element);
  this.element.appendChild(this.bottom.element);

  this.drawOpening = () => {
    const heightHigher = Math.random() * (height - opening);
    const heighBottom = height - opening - heightHigher;
    this.higher.setHeight(heightHigher);
    this.bottom.setHeight(heighBottom);
  }

  this.getX = () => parseInt(this.element.style.left.split('px')[0]);
  this.setX = x => this.element.style.left = `${x}px`;
  this.getWidth = () => this.element.clientWidth;

  this.drawOpening();
  this.setX(x);
}

function barriers(height, opening, width, space, notifyPoint) {
  this.pairs = [
    new pairOfBarries(height, opening, width),
    new pairOfBarries(height, opening, width + space),
    new pairOfBarries(height, opening, width + space * 2),
    new pairOfBarries(height, opening, width + space * 3)
  ]

  const displacement = 3;
  
  this.animate = () => {
    this.pairs.forEach(pair => {
      pair.setX(pair.getX() - displacement);

      //When the berrier leaves the screen
      if (pair.getX() < -pair.getWidth()) {
        pair.setX(pair.getX() + space * this.pairs.length);
        pair.drawOpening();
      }

      const middle = width / 2;
      const crossedTheMiddle = pair.getX() + displacement >= middle && pair.getX() < middle;
      crossedTheMiddle ?? notifyPoint()
      
    })
  }
}

const barreiras = new barriers(700, 200, 1200, 400, 0)
const area = document.querySelector('[flappy]')

barreiras.pairs.forEach(pair => area.appendChild(pair.element))

// setInterval(() => {
//   barreiras.animate()
// }, 20)


{/* <img src="./imgs/passaro.png" alt="bird" class="bird">
    <div class="pair-of-barries">
      <div class="barrier">
        <div class="body"></div>
        <div class="edge"></div>
      </div>

      <div class="barrier">
        <div class="edge"></div>
        <div class="body"></div>
      </div>
    </div>
    <div class="progress">100</div> */}