import report from 'wdio-cucumberjs-json-reporter';

export const addLog = (log: string) => {
  report.attach(`STEP: ${log}`);
  console.log(`STEP: ${log}`);
};
