//@desc Algoritmo che calcola il grado di similitudine tra due stringhe, restituisce la percentuale di uguaglianza
const jaccardSimilarity = (str1, str2) => {
    const set1 = new Set(str1);
    const set2 = new Set(str2);

    const intersection = new Set(
        [...set1].filter(character => set2.has(character))
    );

    const union = new Set([...set1, ...set2]);

    return parseInt((intersection.size / union.size) * 100);
}

module.exports = { jaccardSimilarity }
