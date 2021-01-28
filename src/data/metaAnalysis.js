// plot image source files
// acute blood
import FOXO1_AC_PLOT from './plots/acute_blood/FOXO1.png';
import ID1_AC_PLOT from './plots/acute_blood/ID1.png';
import PPARGC1A_AC_PLOT from './plots/acute_blood/PPARGC1A.png';
import SMAD3_AC_PLOT from './plots/acute_blood/SMAD3.png';
import VEGFA_AC_PLOT from './plots/acute_blood/VEGFA.png';
// acute muscle
import FOXO1_AM_PLOT from './plots/acute_muscle/FOXO1.png';
import ID1_AM_PLOT from './plots/acute_muscle/ID1.png';
import PPARGC1A_AM_PLOT from './plots/acute_muscle/PPARGC1A.png';
import SMAD3_AM_PLOT from './plots/acute_muscle/SMAD3.png';
import VEGFA_AM_PLOT from './plots/acute_muscle/VEGFA.png';
// longterm muscle
import FOXO1_LM_PLOT from './plots/longterm_muscle/FOXO1.png';
import SMAD3_LM_PLOT from './plots/longterm_muscle/SMAD3.png';

export const metaAnalysisPlots = {
  acute_blood: [
    { geneSymbol: 'FOXO1', plotSource: FOXO1_AC_PLOT },
    { geneSymbol: 'ID1', plotSource: ID1_AC_PLOT },
    { geneSymbol: 'PPARGC1A', plotSource: PPARGC1A_AC_PLOT },
    { geneSymbol: 'SMAD3', plotSource: SMAD3_AC_PLOT },
    { geneSymbol: 'VEGFA', plotSource: VEGFA_AC_PLOT },
  ],
  acute_muscle: [
    { geneSymbol: 'FOXO1', plotSource: FOXO1_AM_PLOT },
    { geneSymbol: 'ID1', plotSource: ID1_AM_PLOT },
    { geneSymbol: 'PPARGC1A', plotSource: PPARGC1A_AM_PLOT },
    { geneSymbol: 'SMAD3', plotSource: SMAD3_AM_PLOT },
    { geneSymbol: 'VEGFA', plotSource: VEGFA_AM_PLOT },
  ],
  longterm_blood: [],
  longterm_muscle: [
    { geneSymbol: 'FOXO1', plotSource: FOXO1_LM_PLOT },
    { geneSymbol: 'SMAD3', plotSource: SMAD3_LM_PLOT },
  ],
}

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
