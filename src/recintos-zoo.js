class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
        ];

        this.animaisValidos = [
            { especie: 'LEAO', tamanho: 3, bioma: 'savana', carnivoro: true },
            { especie: 'LEOPARDO', tamanho: 2, bioma: 'savana', carnivoro: true },
            { especie: 'CROCODILO', tamanho: 3, bioma: 'rio', carnivoro: true },
            { especie: 'MACACO', tamanho: 1, bioma: 'savana ou floresta', carnivoro: false },
            { especie: 'GAZELA', tamanho: 2, bioma: 'savana', carnivoro: false },
            { especie: 'HIPOPOTAMO', tamanho: 4, bioma: 'savana ou rio', carnivoro: false }
        ];
    }

    analisaRecintos(tipoAnimal, quantidade) {
        const animal = this.animaisValidos.find(a => a.especie.toUpperCase() === tipoAnimal.toUpperCase());
        if (!animal) {
            return { erro: "Animal inválido" };
        }
    
        if (isNaN(quantidade) || quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: "Quantidade inválida" };
        }
    
        let recintosViaveis = [];
    
        this.recintos.forEach(recinto => {
            if (!this.biomaCompativel(animal.bioma, recinto.bioma)) {
                return;
            }
    
            let espacoOcupado = recinto.animais.reduce((espaco, a) => espaco + a.quantidade * this.getTamanhoAnimal(a.especie), 0);
            let temCarnivoro = recinto.animais.some(a => this.animaisValidos.find(av => av.especie.toUpperCase() === a.especie.toUpperCase()).carnivoro);
            let temNaoCarnivoro = recinto.animais.some(a => !this.animaisValidos.find(av => av.especie.toUpperCase() === a.especie.toUpperCase()).carnivoro);
    
            if (animal.especie === 'HIPOPOTAMO' && recinto.bioma !== 'savana e rio' && recinto.animais.length > 0) {
                return;
            }
    
            if (animal.carnivoro && temNaoCarnivoro) {
                return;
            }
    
            if (!animal.carnivoro && temCarnivoro) {
                return;
            }
    
            if (animal.especie === 'MACACO' && (recinto.animais.length === 0 && quantidade === 1)) {
                return;
            }
    
            if (recinto.animais.length > 0 && !this.isMesmaEspecie(recinto.animais[0].especie, animal.especie)) {
                espacoOcupado += 1;
            }
    
            const espacoLivre = recinto.tamanhoTotal - espacoOcupado;
    
            if (espacoLivre >= quantidade * animal.tamanho) {
                const espacoAposInclusao = espacoLivre - quantidade * animal.tamanho;
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoAposInclusao} total: ${recinto.tamanhoTotal})`);
            }
        });
    
        recintosViaveis.sort((a, b) => {
            const numeroA = parseInt(a.match(/Recinto (\d+)/)[1]);
            const numeroB = parseInt(b.match(/Recinto (\d+)/)[1]);
            return numeroA - numeroB;
        });
    
        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }
    
        return { recintosViaveis };
    }

    biomaCompativel(biomaAnimal, biomaRecinto) {
        const biomasAnimal = biomaAnimal.toLowerCase().split(' ou ');
        return biomasAnimal.some(b => biomaRecinto.toLowerCase().includes(b.trim()));
    }

    isMesmaEspecie(especie1, especie2) {
        return especie1.toUpperCase() === especie2.toUpperCase();
    }

    getTamanhoAnimal(especie) {
        const animal = this.animaisValidos.find(a => a.especie.toUpperCase() === especie.toUpperCase());
        return animal ? animal.tamanho : 0;
    }
}

const resultado = new RecintosZoo().analisaRecintos('MACACO', 2);
console.log(resultado);

export { RecintosZoo as RecintosZoo };