import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RappiderDataOrderService {


  changeOrderByStartAndEndIndex(previousData: any[], changedData: any[], startIndex: number, endIndex: number) {
    const finalData = [
      ...previousData.slice(0, startIndex),
      ...changedData,
      ...previousData.slice(endIndex + 1)
    ];
    return finalData;
  }

}
