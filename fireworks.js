const max_fireworks = 7, max_sparkles = 50;
let canvas = document.getElementById('fireworks');
let context = canvas.getContext('2d');
let fireworks = [];
 
for (let i = 0; i < max_fireworks; i++) {
  let firework = {
    sparkles: []
  };
  for (let n = 0; n < max_sparkles; n++) {
    let sparkle = {
      vx: Math.random() * 5 + .5,
      vy: Math.random() * 5 + .5,
      weight: Math.random() * .3 + .03,
      red: Math.floor(Math.random() * 2),
      green: Math.floor(Math.random() * 2),
      blue: Math.floor(Math.random() * 2)
    };
    if (Math.random() > .5) sparkle.vx = -sparkle.vx;
    if (Math.random() > .5) sparkle.vy = -sparkle.vy;
    firework.sparkles.push(sparkle);
  }
  fireworks.push(firework);
  resetFirework(firework);
}
window.requestAnimationFrame(explode);
 
function resetFirework(firework) {
  firework.x = Math.floor(Math.random() * canvas.width);
  firework.y = canvas.height;
  firework.age = 0;
  firework.phase = 'fly';
}
 
function explode() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  fireworks.forEach((firework,index) => {
    if (firework.phase == 'explode') {
        firework.sparkles.forEach((sparkle) => {
        for (let i = 0; i < 10; i++) {
          let trailAge = firework.age + i;
          let x = firework.x + sparkle.vx * trailAge;
          let y = firework.y + sparkle.vy * trailAge + sparkle.weight * trailAge * sparkle.weight * trailAge;
          let fade = i * 20 - firework.age * 2;
          let r = Math.floor(sparkle.red * fade);
          let g = Math.floor(sparkle.green * fade);
          let b = Math.floor(sparkle.blue * fade);
          context.beginPath();
          context.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',1)';
          context.rect(x, y, 4, 4);
          context.fill();
        }
      });
      firework.age++;
      if (firework.age > 100 && Math.random() < .05) {
        resetFirework(firework);
      }
    } else {
      firework.y = firework.y - 10;
      for (let sparkle = 0; sparkle < 15; sparkle++) {
        context.beginPath();
        context.fillStyle = 'rgba(' + index * 50 + ',' + sparkle * 17 + ',0,1)';
        context.rect(firework.x + Math.random() * sparkle - sparkle / 2, firework.y + sparkle * 4, 4, 4);
        context.fill();
      }
      if (Math.random() < .001 || firework.y < 200) firework.phase = 'explode';
    }
  });
  window.requestAnimationFrame(explode);
}

function end() {context = null; return;}