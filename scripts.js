window.onload = function() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = currentYear;
  }

  // Matrix Rain Animation
  const canvas = document.getElementById('matrixCanvas');
  if (!canvas) {
    console.error('Matrix canvas not found. Skipping animation.');
    return;
  }
  const ctx = canvas.getContext('2d');
  const header = document.querySelector('header');

  if (!header) {
    console.error('Header element not found. Cannot size canvas correctly. Skipping animation.');
    return;
  }

  let fontSize = 15;
  let columns = 0;
  let drops = [];
  // Characters for the rain (Katakana, numbers, English alphabet)
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍｦｲｸｺｿﾁﾄﾉﾌﾔﾖﾙﾚﾛﾝ';
  const charArray = chars.split('');

  function setupCanvas() {
    if (!header || !canvas) return;

    canvas.width = header.offsetWidth;
    canvas.height = header.offsetHeight;

    columns = Math.floor(canvas.width / fontSize);
    drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }
  }

  function drawMatrix() {
    if (!ctx || !canvas) return;

    // Clear the canvas with a semi-transparent black to create the fading trail
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00FF00'; // Green color for the text
    ctx.font = `${fontSize}px 'Source Code Pro', monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = charArray[Math.floor(Math.random() * charArray.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      // Reset drop to the top if it has reached the bottom and with a random chance
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setupCanvas(); // Initial setup
  window.addEventListener('resize', setupCanvas); // Adjust canvas on window resize

  if (canvas && ctx && header) {
    setInterval(drawMatrix, 33); // Start the animation, adjust interval for speed
  }
};