document.getElementById('generate').addEventListener('click', generatePattern);
document.getElementById('clear').addEventListener('click', clearPattern);
document.getElementById('copy').addEventListener('click', copyPattern);
document.getElementById('show-code').addEventListener('click', showCode);

function generatePattern() {
    const patternType = document.getElementById('pattern-type').value;
    const size = parseInt(document.getElementById('pattern-size').value, 10);
    const animate = document.getElementById('animate').checked;
    const delay = parseFloat(document.getElementById('delay').value) * 1000;
    const output = document.getElementById('pattern-output');

    let pattern = '';

    switch (patternType) {
        case 'triangle':
            for (let i = 1; i <= size; i++) {
                pattern += '*'.repeat(i) + '\n';
            }
            break;
        case 'rectangle':
            for (let i = 1; i <= size; i++) {
                pattern += '*'.repeat(size) + '\n';
            }
            break;
        case 'hollow-rectangle':
            for (let i = 1; i <= size; i++) {
                if (i === 1 || i === size) {
                    pattern += '*'.repeat(size) + '\n';
                } else {
                    pattern += '*' + ' '.repeat(size - 2) + '*' + '\n';
                }
            }
            break;
    }

    if (animate) {
        output.innerText = '';
        let index = 0;
        const interval = setInterval(() => {
            if (index < pattern.length) {
                output.innerText += pattern[index];
                index++;
            } else {
                clearInterval(interval);
            }
        }, delay);
    } else {
        output.innerText = pattern;
    }
}

function clearPattern() {
    document.getElementById('pattern-output').innerText = '';
    document.getElementById('pattern-type').value = '';
    document.getElementById('pattern-size').value = '';
    document.getElementById('delay').value= '';
    document.getElementById('animate').checked= false;
    
}

function copyPattern() {
    const pattern = document.getElementById('pattern-output').innerText;
    navigator.clipboard.writeText(pattern).then(() => {
        alert('Pattern copied to clipboard!');
    });
}

function showCode() {
    const pattern = document.getElementById('pattern-output').innerText;
    const codeWindow = window.open('', '_blank');
    codeWindow.document.write('<html><head><title>Pattern Code</title></head><body><pre>' + pattern + '</pre></body></html>');
}
