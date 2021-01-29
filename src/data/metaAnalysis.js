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
