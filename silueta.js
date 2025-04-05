const fs = require('fs');
const readline = require('readline');

function calcularAgua(heights) {
    const n = heights.length;
    if (n === 0) return 0;

    const leftMax = new Array(n).fill(0);
    const rightMax = new Array(n).fill(0);
    let agua = 0;

    leftMax[0] = heights[0];
    for (let i = 1; i < n; i++) {
        leftMax[i] = Math.max(leftMax[i - 1], heights[i]);
    }

    rightMax[n - 1] = heights[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        rightMax[i] = Math.max(rightMax[i + 1], heights[i]);
    }

    for (let i = 0; i < n; i++) {
        agua += Math.max(0, Math.min(leftMax[i], rightMax[i]) - heights[i]);
    }

    return agua;
}

function processarEntrada(linhas) {
    const numCasos = parseInt(linhas[0]);
    let i = 1;

    for (let c = 0; c < numCasos; c++) {
        const tamanho = parseInt(linhas[i]); // só pra seguir o formato, não é usado diretamente
        const alturas = linhas[i + 1].split(' ').map(Number);
        const resultado = calcularAgua(alturas);
        console.log(resultado);
        i += 2;
    }
}

function main() {
    const args = process.argv.slice(2);

    if (args.length > 0) {
        // Leitura de arquivo (ex: node solucao.js entrada.txt)
        const filePath = args[0];
        try {
            const conteudo = fs.readFileSync(filePath, 'utf-8');
            const linhas = conteudo.split('\n').map(l => l.trim()).filter(Boolean);
            processarEntrada(linhas);
        } catch (err) {
            console.error('Erro ao ler o arquivo:', err.message);
        }
    } else {
        // Leitura via stdin (teclado ou redirecionamento)
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const input = [];
        rl.on('line', (line) => {
            if (line.trim() === '') return;
            input.push(line.trim());
        });

        rl.on('close', () => {
            processarEntrada(input);
        });
    }
}

main();
