import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[ecsIpv4Validator]'
})
export class Ipv4ValidatorDirective implements Validator {
  constructor() {}
  static ipv4(control: AbstractControl): ValidationErrors | null {
    // tslint:disable-next-line:max-line-length
    if (/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(control.value)) {
      return null;
    }
    return { invalid: true };
  }
  validate(control: AbstractControl): ValidationErrors | null {
    return Ipv4ValidatorDirective.ipv4(control);
  }
}

@Directive({
  selector: '[ecsIpv6Validator]'
})
export class Ipv6ValidatorDirective implements Validator {
  constructor() {}
  static segmentFillZeroString(segmentArr: string[]) {
    const fillZeroList = [];
    for (let i = 0; i < segmentArr.length; i += 1) {
      let String2Bit;
      if (segmentArr[i] !== '0') {
        String2Bit = parseInt(segmentArr[i], 16).toString(2);
        const fillZeroIndex = 16 - String2Bit.length;
        if (fillZeroIndex > 0) {
          const fillString = Array(fillZeroIndex).fill('0').join('');
          String2Bit = fillString + String2Bit;
        }
      } else {
        String2Bit = Array(16).fill('0').join('');
      }
      fillZeroList[i] = String2Bit;
    }
    return fillZeroList.join('');
  }
  static checkIPv6InSubnet(ipv6: string, cidr: string) {
    const ipv6Arr = Ipv6ValidatorDirective.getIpv6Arr(ipv6);
    const ipv6SubnetCidrArr = Ipv6ValidatorDirective.getIpv6Arr(cidr.split('/')[0]);
    const mask = Number(cidr.split('/')[1]);
    const segmentFillZeroString = Ipv6ValidatorDirective.segmentFillZeroString;
    return segmentFillZeroString(ipv6Arr).substr(0, mask) === segmentFillZeroString(ipv6SubnetCidrArr).substr(0, mask) &&
      segmentFillZeroString(ipv6Arr).substr(mask) !== segmentFillZeroString(ipv6SubnetCidrArr).substr(mask);
  }
  static getIpv6Arr(cidr: string) {
    let ipv6SegmentArr = cidr.split(':');
    const ellipsisZero = 8 - ipv6SegmentArr.length;
    const zeroIndex = ipv6SegmentArr.indexOf('');
    if (zeroIndex === 0) {
      return Array(8).fill('0');
    } else if (zeroIndex > 0) {
      if (ipv6SegmentArr[ipv6SegmentArr.length - 1] === '') {
        ipv6SegmentArr[ipv6SegmentArr.length - 1] = '0';
      }
      ipv6SegmentArr[zeroIndex] = '0';
      const zeroArr = Array(ellipsisZero).fill('0');
      const ipv6SegmentArrBefore = ipv6SegmentArr.slice(0, zeroIndex + 1);
      const ipv6SegmentArrAfter = ipv6SegmentArr.slice(zeroIndex + 1);
      ipv6SegmentArr = ipv6SegmentArrBefore.concat(zeroArr).concat(ipv6SegmentArrAfter);
    }
    return ipv6SegmentArr;
  }
  static ipv6Regex(control: AbstractControl): ValidationErrors | null {
    // tslint:disable-next-line:max-line-length
    if (/^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/.test(control.value)) {
      return null;
    }
    return { ipv6Regex: true };
  }
  static ipv6(control: AbstractControl, cidr?: string): ValidationErrors | null {
    const ipv6Regex = Ipv6ValidatorDirective.ipv6Regex(control);
    if (ipv6Regex) {
      return ipv6Regex;
    }
    if (!cidr || Ipv6ValidatorDirective.checkIPv6InSubnet(control.value, cidr)) {
      return null;
    }
    return { cidrError: true };
  }
  validate(control: AbstractControl): ValidationErrors | null {
    return Ipv6ValidatorDirective.ipv6Regex(control);
  }
}
