// meta analysis input JSON source files
// acute blood
const FOXO1_AC_INPUT = require('./input/acute_blood/FOXO1');
const ID1_AC_INPUT = require('./input/acute_blood/ID1');
const PPARGC1A_AC_INPUT = require('./input/acute_blood/PPARGC1A');
const SMAD3_AC_INPUT = require('./input/acute_blood/SMAD3');
const VEGFA_AC_INPUT = require('./input/acute_blood/VEGFA');
// acute muscle
const FOXO1_AM_INPUT = require('./input/acute_muscle/FOXO1');
const ID1_AM_INPUT = require('./input/acute_muscle/ID1');
const PPARGC1A_AM_INPUT = require('./input/acute_muscle/PPARGC1A');
const SMAD3_AM_INPUT = require('./input/acute_muscle/SMAD3');
const VEGFA_AM_INPUT = require('./input/acute_muscle/VEGFA');
// longterm muscle
const FOXO1_LM_INPUT = require('./input/longterm_muscle/FOXO1');
const SMAD3_LM_INPUT = require('./input/longterm_muscle/SMAD3');

export const metaAnalysisInput = {
  acute_blood: [
    { geneSymbol: 'FOXO1', inputSource: FOXO1_AC_INPUT },
    { geneSymbol: 'ID1', inputSource: ID1_AC_INPUT },
    { geneSymbol: 'PPARGC1A', inputSource: PPARGC1A_AC_INPUT },
    { geneSymbol: 'SMAD3', inputSource: SMAD3_AC_INPUT },
    { geneSymbol: 'VEGFA', inputSource: VEGFA_AC_INPUT },
  ],
  acute_muscle: [
    { geneSymbol: 'FOXO1', inputSource: FOXO1_AM_INPUT },
    { geneSymbol: 'ID1', inputSource: ID1_AM_INPUT },
    { geneSymbol: 'PPARGC1A', inputSource: PPARGC1A_AM_INPUT },
    { geneSymbol: 'SMAD3', inputSource: SMAD3_AM_INPUT },
    { geneSymbol: 'VEGFA', inputSource: VEGFA_AM_INPUT },
  ],
  longterm_blood: [],
  longterm_muscle: [
    { geneSymbol: 'FOXO1', inputSource: FOXO1_LM_INPUT },
    { geneSymbol: 'SMAD3', inputSource: SMAD3_LM_INPUT },
  ],
}

// summary stats JSON source files
const acute_blood_gene_stats = require('./stats/acute_blood');
const acute_muscle_gene_stats = require('./stats/acute_muscle');
const longterm_blood_gene_stats = require('./stats/longterm_blood');
const longterm_muscle_gene_stats = require('./stats/longterm_muscle');

export const summaryStats = {
  acute_blood: acute_blood_gene_stats,
  acute_muscle: acute_muscle_gene_stats,
  longterm_blood: longterm_blood_gene_stats,
  longterm_muscle: longterm_muscle_gene_stats,
};

const MetaAnalysisGenes = [
  'FOXO1',
  'ID1',
  'PPARGC1A',
  'SMAD3',
  'VEGFA',
];

export default MetaAnalysisGenes;
