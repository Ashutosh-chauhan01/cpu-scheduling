document.addEventListener('DOMContentLoaded', () => {
    const algorithmSelect = document.getElementById('algorithm');
    const visualizeBtn = document.getElementById('visualize-btn');
    const visualizationDiv = document.getElementById('visualization');
    const processesInput = document.getElementById('processes');

    visualizeBtn.addEventListener('click', () => {
        const selectedAlgorithm = algorithmSelect.value;
        const processes = parseProcesses(processesInput.value);
        visualizeAlgorithm(selectedAlgorithm, processes);
    });

    function parseProcesses(input) {
        return input.split(';').map(p => {
            const [id, burst, arrival] = p.split(',');
            return { id, burst: parseInt(burst), arrival: parseInt(arrival) };
        });
    }

    function visualizeAlgorithm(algorithm, processes) {
        visualizationDiv.innerHTML = '';
        switch (algorithm) {
            case 'fcfs':
                fcfs(processes);
                break;
            case 'sjf':
                sjf(processes);
                break;
            case 'rrs':
                rrs(processes);
                break;
            case 'ljf':
                ljf(processes);
                break;
            case 'priority':
                priority(processes);
                break;
            case 'lrtf':
                lrtf(processes);
                break;
            case 'srtf':
                srtf(processes);
                break;
            default:
                visualizationDiv.innerHTML = `<p>Unknown algorithm: ${algorithm.toUpperCase()}</p>`;
        }
    }

    function createProcessElement(process, color) {
        const processElem = document.createElement('div');
        processElem.className = 'process';
        processElem.style.backgroundColor = color;
        processElem.innerText = `${process.id} (${process.burst})`;
        return processElem;
    }

    function fcfs(processes) {
        processes.sort((a, b) => a.arrival - b.arrival);
        processes.forEach(process => {
            const color = getRandomColor();
            const processElem = createProcessElement(process, color);
            visualizationDiv.appendChild(processElem);
        });
    }

    function sjf(processes) {
        processes.sort((a, b) => a.burst - b.burst);
        processes.forEach(process => {
            const color = getRandomColor();
            const processElem = createProcessElement(process, color);
            visualizationDiv.appendChild(processElem);
        });
    }

    function rrs(processes) {
        const timeQuantum = 2; // You can adjust this value
        let time = 0;
        while (processes.length > 0) {
            const process = processes.shift();
            const color = getRandomColor();
            const processElem = createProcessElement(process, color);
            visualizationDiv.appendChild(processElem);
            time += Math.min(process.burst, timeQuantum);
            if (process.burst > timeQuantum) {
                process.burst -= timeQuantum;
                processes.push(process);
            }
        }
    }

    function ljf(processes) {
        processes.sort((a, b) => b.burst - a.burst);
        processes.forEach(process => {
            const color = getRandomColor();
            const processElem = createProcessElement(process, color);
            visualizationDiv.appendChild(processElem);
        });
    }

    function priority(processes) {
        // For simplicity, assume processes have a 'priority' attribute
        processes.sort((a, b) => a.priority - b.priority);
        processes.forEach(process => {
            const color = getRandomColor();
            const processElem = createProcessElement(process, color);
            visualizationDiv.appendChild(processElem);
        });
    }

    function lrtf(processes) {
        processes.sort((a, b) => b.burst - a.burst);
        processes.forEach(process => {
            const color = getRandomColor();
            const processElem = createProcessElement(process, color);
            visualizationDiv.appendChild(processElem);
        });
    }

    function srtf(processes) {
        processes.sort((a, b) => a.burst - b.burst);
        processes.forEach(process => {
            const color = getRandomColor();
            const processElem = createProcessElement(process, color);
            visualizationDiv.appendChild(processElem);
        });
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});
