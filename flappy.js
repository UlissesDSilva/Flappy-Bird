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

      if(crossedTheMiddle) notifyPoint()
      
    })
  }
}

function bird(gameHeight) {
  let flying = false;

  this.element = newElement('img', 'bird');
  this.element.src = 'imgs/passaro.png';

  this.getPositionY = () => parseInt(this.element.style.bottom.split('px')[0]);
  this.setPositionY = (y) => this.element.style.bottom = `${y}px`;

  window.onkeydown = (e) => flying = true;
  window.onkeyup = (e) => flying = false;

  this.animate = () => {
    const newY = this.getPositionY() + (flying ? 8 : -5);
    const maxHeight = gameHeight - this.element.clientHeight;

    if(newY <= 0) {
      this.setPositionY(0);
    } else if(newY >= maxHeight) {
      this.setPositionY(maxHeight);
    } else {
      this.setPositionY(newY);
    }
  }

  this.setPositionY(gameHeight / 2)
}

function progress() {
  this.element = newElement('span', 'progress')

  this.updatePoints = (points) => {
    this.element.innerHTML = points;
  }

  this.updatePoints(0);
}

function FlappyBBbird() {
  let point = 0;
  const area = document.querySelector('[flappy]')
  const gameHeight = area.clientHeight
  const gameWidth = area.clientWidth

  const passaro = new bird(gameHeight);
  const progresso = new progress();
  const updatePoints = () => progresso.updatePoints(++point);
  const barreiras = new barriers(gameHeight, 200, gameWidth, 400, updatePoints);

  area.appendChild(passaro.element)
  area.appendChild(progresso.element)
  barreiras.pairs.forEach(pair => area.appendChild(pair.element))

  this.start = () => {
    const timer = setInterval(() => {
      barreiras.animate()
      passaro.animate()
    }, 20)
  }
}

new FlappyBBbird().start()


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