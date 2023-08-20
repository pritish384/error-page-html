const spans = document.querySelectorAll('[data-text]');
const endSpan = document.getElementById('end');
const hrSpan = document.getElementById('hr');

function animateText(index, delay = 100) {
  const span = spans[index];
  const text = span.getAttribute('data-text');
  let currentText = '';
  let charIndex = 0;

  const interval = setInterval(() => {
    if (charIndex === text.length) {
      span.innerHTML = currentText;
      clearInterval(interval);

      // Remove blinking cursor
      const cursorSpan = span.querySelector('.blinking-cursor');
      if (cursorSpan) {
        cursorSpan.remove();
      }

      // Move to the next span if available
      if (index + 1 < spans.length) {
        animateText(index + 1);
      } else {
        // All animations are complete, remove hidden class from end span
        if (endSpan) {
          endSpan.classList.remove('hidden');
        }
      }

      // Add <hr> tag after hr span
      if (span === hrSpan && index + 1 < spans.length) {
        const hrElement = document.createElement('hr');

        span.parentElement.insertBefore(hrElement, span.nextSibling);
      }
    } else {
      currentText += text[charIndex];
      span.innerHTML = currentText + '<span class="blinking-cursor">&nbsp;</span>'; // Add blinking cursor
      charIndex++;
    }
  }, delay);
}

animateText(0);