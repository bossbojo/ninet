import { Pipe, PipeTransform } from '@angular/core';
import { chunkArray } from '../utils/helpers';

@Pipe({
    name: 'numbertothaibaht'
})
export class NumberToThaiBahtPipe implements PipeTransform {
    private thaiNum = ['ศูนย์', 'หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า'];
    private thaiUnit = ['', 'สิบ', 'ร้อย', 'พัน', 'หมื่น', 'แสน', 'ล้าน'];

    transform(value: any, args?: any): any {
        if (isNaN(value) || value === null) { return value; }

        const splitArray = value.toString().split('.');
        const bahtArray = splitArray[0].replace('-', '')
            .split('')
            .reverse()
            .map((val: string) => parseInt(val, 10));

        const resultBahtArray = [];

        resultBahtArray.push('บาท');
        const resultBaht = this.transformArray(bahtArray);
        resultBahtArray.push(resultBaht.reverse().join(''));

        if (splitArray[1] === undefined) {
            return resultBahtArray.reverse().join('');
        }

        const satangArray = splitArray[1].replace('-', '')
            .split('')
            .reverse()
            .map((val: string) => parseInt(val, 10));

        const resultSatangArray = [];

        resultSatangArray.push('สตางค์');
        const resultSatang = this.transformArray(satangArray).join('');
        resultSatangArray.push(resultSatang);

        return resultBahtArray.reverse().join('') + resultSatangArray.reverse().join('');
    }

    private transformArray(array: any[]) {
        return chunkArray(array, 6).map((chunk, chunkIndex) => {
            const chunkResult = [];

            if (chunkIndex > 0) {
                chunkResult.push('ล้าน');
            }

            chunk.forEach((num: number, index: number) => {
                if (num === 0 && chunk[index + 1] !== undefined) {
                    return;
                }

                if (num === 1 && index === 0 && chunk.length > 1) {
                    chunkResult.push('เอ็ด');
                    return;
                }

                if (num === 1 && index === 1) {
                    chunkResult.push(this.thaiUnit[index]);
                    return;
                }

                if (num === 2 && index === 1) {
                    chunkResult.push('ยี่' + this.thaiUnit[index]);
                    return;
                }

                if (num === 0 && index !== 0) {
                    return;
                }

                chunkResult.push(this.thaiNum[num] + this.thaiUnit[index]);
            });

            return chunkResult.reverse().join('');
        });
    }
}
