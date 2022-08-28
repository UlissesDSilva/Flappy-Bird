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

const teste = new pairOfBarries(700, 200, 58)

document.querySelector('[flappy]').appendChild(teste.element)


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