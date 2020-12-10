async function main () {
    // iterate through "excel" folder
    const fs = require("fs");
    const excelFiles = fs.readdirSync('../excel');
    const firstExcel = excelFiles[0];
    if (!firstExcel) {
        console.log('error: no input excel! Put excel file you want import in the root excel folder and run again!');
        return;
    }
    console.log('Importing ' + firstExcel + ' into ' + 'mysql database famima table fami_codes...');
    const xlsx = require('node-xlsx');
    const parsed = xlsx.parse(`../excel/${firstExcel}`);
    const firstExcelBook = parsed[0].data;
    const { q } = require('../db/db2');
    async function insertRow(qrCode, code) {
        await q(`insert into fami_codes (qr_code, code, is_used) VALUES ('${qrCode}', '${code}', 0)`)
    }
    function padSpaceAtLast(str, length) {
        let result = str;
        for (let i = 0; i < length - str.length; i++) {
            result += ' ';
        }
        return result;
    }

    for (let i = 0; i < firstExcelBook.length; i++) {
        const row = firstExcelBook[i];
        const code = row[2];
        const part1 = 'Famiport';
        const part2 = '01';
        const part3 = 'BICO001';
        const part4 = padSpaceAtLast('directqr', 32);
        console.log('part4.length = ', part4.length);
        const part5 = row[0];
        const part6 = padSpaceAtLast(code, 36);
        console.log('part6.length = ', part6.length);
        const part7 = padSpaceAtLast('', 36);
        console.log('part7.length = ', part7.length);
        const qrCode = part1 + part2 + part3 + part4 + part5 + part6 + part7;
        await insertRow(qrCode, code);
        console.log(`${i + 1} inserted`)
    }
    console.log('finished...');
    process.exit(0);
}

main();


