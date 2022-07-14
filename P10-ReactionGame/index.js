const btn1 = document.getElementById("start");

const randomNumberGenerator = (start, end) => {
  const number = start + Math.floor(Math.random() * (end - start + 1));
  return number;
};

let startTime, currTime, avgTime;

const getDiff = (startTime, endTime) => {
  let ans = endTime - startTime + "ms";
  return ans;
};

const showShape = () => {
  if (startTime != undefined) {
    currTime = new Date();
    const TimeTaken = document.getElementById("time-taken");
    TimeTaken.innerHTML = getDiff(startTime, currTime);
    startTime = currTime;
  } else {
    startTime = new Date();
  }
  const main = document.getElementById("main");
  const parentWidth = main.offsetWidth;
  const parentHeight = main.offsetHeight;

  const shape = document.getElementById("shape");

  // setting the height and width of the new shape
  shape.style.height = `${randomNumberGenerator(50, parentWidth * 0.3)}px`;
  shape.style.width = shape.style.height;

  // setting the border radius of new shape
  var borderRadius = randomNumberGenerator(0, 50);
  shape.style.borderRadius = `${borderRadius}%`;

  //setting the top and let (that is the position) of the new shape
  var left = randomNumberGenerator(0, parentWidth * 0.7);
  var top = randomNumberGenerator(0, parentHeight - shape.offsetHeight);
  shape.style.top = top + "px";
  shape.style.left = left + "px";

  // setting the colors of the shape
  const color = `rgb(${randomNumberGenerator(0, 255)}, ${randomNumberGenerator(
    0,
    255
  )}, ${randomNumberGenerator(0, 255)} )`;
  shape.style.backgroundColor = color;

  shape.style.display = "block";

  const btn1 = document.getElementById("start");
  btn1.disabled = true;
};

btn1.addEventListener("click", showShape);

const shape = document.getElementById("shape");
shape.addEventListener("click", showShape);

//reset button to reset the game
const btn2 = document.getElementById("reset");
btn2.addEventListener("click", () => {
  shape.style.display = "none";
  btn1.disabled = false;
  const TimeTaken = document.getElementById("time-taken");
  TimeTaken.innerHTML = "";
});
